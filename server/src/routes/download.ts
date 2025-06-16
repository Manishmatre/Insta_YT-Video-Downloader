import express from 'express';
import youtubeDl from 'youtube-dl-exec';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';

const router = express.Router();
const pipelineAsync = promisify(pipeline);

// Ensure temp directory exists
const tempDir = path.join(__dirname, '../../temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

router.post('/', async (req, res) => {
  const { url, format } = req.body;
  let fileStream: fs.ReadStream | null = null;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  if (!format || !['mp4', 'mp3'].includes(format)) {
    return res.status(400).json({ error: 'Invalid format. Must be mp4 or mp3' });
  }

  // Generate unique filename
  const timestamp = Date.now();
  const filename = `download_${timestamp}.${format}`;
  let outputPath = path.join(tempDir, filename);

  // Cleanup function
  const cleanup = () => {
    try {
      if (fileStream) {
        fileStream.destroy();
        fileStream = null;
      }
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
    } catch (err) {
      console.error('Error cleaning up:', err);
    }
  };

  try {
    // First get video info
    const info = await youtubeDl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      callHome: false,
      noCheckCertificates: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    });

    if (!info || !info.title) {
      throw new Error('Failed to get video information');
    }

    // Download options based on format
    const downloadOptions = {
      output: outputPath,
      noWarnings: true,
      callHome: false,
      noCheckCertificates: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      ...(format === 'mp3' ? {
        extractAudio: true,
        audioFormat: 'mp3',
        audioQuality: 0,
        format: 'bestaudio'
      } : {
        format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'
      })
    };

    console.log('[DOWNLOAD] Starting yt-dlp download:', url, downloadOptions);
    await youtubeDl(url, downloadOptions);
    console.log('[DOWNLOAD] yt-dlp finished:', outputPath, fs.existsSync(outputPath));

    // Wait up to 5 seconds for yt-dlp to finalize file (handles .part rename on slow FS)
    let retries = 10;
    while (!fs.existsSync(outputPath) && retries > 0) {
      await new Promise(r => setTimeout(r, 500));
      retries--;
    }
    if (!fs.existsSync(outputPath)) {
      console.warn('[WARN] Expected output not found, searching for alternate file');
      const baseName = `download_${timestamp}`;
      const alt = fs.readdirSync(tempDir).find(f => f.startsWith(baseName));
      if (alt) {
        console.log('[WARN] Using alternate downloaded file:', alt);
        outputPath = path.join(tempDir, alt);
      }
    }
    if (!fs.existsSync(outputPath)) {
      console.error('[ERROR] File not created after yt-dlp and no alternate found:', outputPath);
      throw new Error('Download failed - file not created');
    }
    console.log('[DOWNLOAD] File exists:', outputPath);

    const stats = fs.statSync(outputPath);
    if (stats.size === 0) {
      throw new Error('Download failed - empty file');
    }

    // Set headers
    res.setHeader('Content-Type', format === 'mp3' ? 'audio/mpeg' : 'video/mp4');
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Content-Disposition', `attachment; filename="${info.title}.${format}"`);

    // Create read stream with error handling
    console.log('[STREAM] Creating file stream:', outputPath);
    fileStream = fs.createReadStream(outputPath);
    
    // Set timeout for the stream
    const timeout = setTimeout(() => {
      if (fileStream) {
        fileStream.destroy(new Error('Stream timeout'));
      }
    }, 30000); // 30 second timeout

    // Handle errors during streaming
    fileStream.on('error', (error) => {
      clearTimeout(timeout);
      console.error('Stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error streaming file' });
      }
      cleanup();
    });

    // Handle client disconnect
    req.on('close', () => {
      clearTimeout(timeout);
      cleanup();
    });

    // Stream to response with error handling
    try {
      console.log('[STREAM] Streaming file to client:', outputPath);
      await pipelineAsync(fileStream, res);
      clearTimeout(timeout);
      console.log('[STREAM] Stream finished successfully:', outputPath);
    } catch (error) {
      clearTimeout(timeout);
      console.error('[STREAM ERROR] Error during streaming:', error);
      throw error;
    }

    // Cleanup after successful stream
    cleanup();

  } catch (error: any) {
    console.error('[FATAL ERROR] Download error:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to download video',
        details: error.message || 'Unknown error occurred',
        stack: error.stack || null
      });
    }
    cleanup();
  }
});

export default router;