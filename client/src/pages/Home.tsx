import { useState, useEffect, useCallback } from 'react';
import { FaYoutube } from 'react-icons/fa';

const Home = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [videoInfo, setVideoInfo] = useState<any>(null);

  const clearAllMessages = useCallback(() => {
    setError('');
    setSuccess('');
  }, []);

  useEffect(() => {
    if (success) {
      const timer = window.setTimeout(clearAllMessages, 2000);
      return () => window.clearTimeout(timer);
    }
  }, [success, clearAllMessages]);

  const getInfo = async () => {
    if (!url) {
      setError('Please enter a YouTube URL');
      return;
    }

    clearAllMessages();
    setLoading(true);
    setVideoInfo(null);

    try {
      const response = await fetch(`/api/info?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get video info');
      }

      setVideoInfo(data);
      setSuccess('Video information retrieved successfully');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    clearAllMessages();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedUrl = e.clipboardData.getData('text');
    setUrl(pastedUrl);
    clearAllMessages();
    setTimeout(getInfo, 100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
          <FaYoutube className="text-red-500 text-5xl" />
          VidYT
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Fast, free, and easy to use. Download YouTube videos and music in MP4, MP3, and more formats.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            onPaste={handlePaste}
            placeholder="Paste YouTube URL here"
            className="input flex-1"
          />
          <button
            onClick={getInfo}
            disabled={loading}
            className="btn btn-primary whitespace-nowrap"
          >
            {loading ? 'Loading...' : 'Get Info'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md">
            {success}
          </div>
        )}

        {videoInfo && (
          <div className="mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <img
                  src={videoInfo.thumbnail}
                  alt={videoInfo.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{videoInfo.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {videoInfo.duration}
                </p>
                <div className="flex flex-wrap gap-2">
                  {videoInfo.formats.map((format: any) => (
                    <button
                      key={format.itag}
                      onClick={() => window.open(`/api/download?url=${encodeURIComponent(url)}&format=${format.itag}`, '_blank')}
                      className="btn btn-primary"
                    >
                      Download {format.qualityLabel || format.mimeType.split(';')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 