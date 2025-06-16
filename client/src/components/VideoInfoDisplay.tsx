import React from 'react';
import { Download, Loader2, Video, Music } from 'lucide-react';

export interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  formats: {
    quality: string;
    format: string;
    formatId: string;
    size: string;
    note: string;
  }[];
}

interface VideoInfoDisplayProps {
  videoInfo: VideoInfo | null;
  handleDownload: (formatId: string, formatType: string) => Promise<void>;
  downloading: boolean;
  downloadingFormatId: string | null;
  downloadProgress: number;
  loading: boolean;
}

const VideoInfoDisplay: React.FC<VideoInfoDisplayProps> = ({
  videoInfo,
  handleDownload,
  downloading,
  downloadingFormatId,
  downloadProgress,
  loading,
}) => {
  if (!videoInfo) return null;

  const getFormatIcon = (format: string) => {
    return format === 'mp3' ? <Music className="w-4 h-4" /> : <Video className="w-4 h-4" />;
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={videoInfo.thumbnail}
          alt={videoInfo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-xl font-semibold line-clamp-2">{videoInfo.title}</h2>
          <p className="text-gray-400 text-sm mt-1">Duration: {videoInfo.duration}</p>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-300">Available Formats:</h3>
        <div className="space-y-3">
          {videoInfo.formats.map((format) => (
            <div
              key={format.formatId}
              className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getFormatIcon(format.format)}
                <div>
                  <p className="font-medium">{format.quality} {format.format.toUpperCase()}</p>
                  {format.note && <p className="text-sm text-gray-400">({format.note})</p>}
                  {format.size && <p className="text-xs text-gray-500">{format.size}</p>}
                </div>
              </div>
              <button
                onClick={() => handleDownload(format.formatId, format.format)}
                disabled={downloading || loading}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {downloading && downloadingFormatId === format.formatId ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {downloading && downloadingFormatId === format.formatId ? 
                  (downloadProgress === 100 ? 'Processing' : `${downloadProgress}%`) 
                  : 'Download'}
              </button>
            </div>
          ))}
        </div>
        
        {downloading && downloadingFormatId && (
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Downloading {videoInfo.formats.find(f => f.formatId === downloadingFormatId)?.quality} {videoInfo.formats.find(f => f.formatId === downloadingFormatId)?.format.toUpperCase()}...</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 transition-all duration-300 ease-out"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoInfoDisplay; 