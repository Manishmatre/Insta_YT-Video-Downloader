import { Router } from 'express';
import youtubeDl from 'youtube-dl-exec';

interface VideoFormat {
  format_id: string;
  ext: string;
  url: string;
  vcodec: string;
  acodec: string;
  height?: number;
  filesize?: number;
  format_note?: string;
}

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration_string: string;
  formats: VideoFormat[];
}

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate YouTube URL
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const videoInfo = await youtubeDl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      callHome: false,
      noCheckCertificates: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    }) as VideoInfo;

    if (!videoInfo || !videoInfo.formats) {
      throw new Error('Invalid video information received');
    }

    const formats = videoInfo.formats
      .filter((format) => {
        // Filter out formats without video or audio
        if (format.vcodec === 'none' && format.acodec === 'none') return false;
        
        // Include video formats with both video and audio
        if (format.vcodec !== 'none' && format.acodec !== 'none') return true;
        
        // Include audio-only formats
        if (format.vcodec === 'none' && format.acodec !== 'none') return true;
        
        return false;
      })
      .map((format) => ({
        quality: format.height ? `${format.height}p` : 'audio',
        format: format.ext,
        formatId: format.format_id,
        size: format.filesize ? `${(format.filesize / (1024 * 1024)).toFixed(2)} MB` : 'Unknown',
        note: format.format_note || '',
      }));

    // Sort formats by quality (height) for video formats
    formats.sort((a, b) => {
      if (a.quality === 'audio') return 1;
      if (b.quality === 'audio') return -1;
      return parseInt(b.quality) - parseInt(a.quality);
    });

    res.json({
      title: videoInfo.title,
      thumbnail: videoInfo.thumbnail,
      duration: videoInfo.duration_string,
      formats,
    });
  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ 
      error: 'Failed to fetch video information',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export const videoInfoRouter = router; 