import { Clipboard, Loader2 } from 'lucide-react';
import React from 'react';

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  handlePaste: () => void;
  handleClear: () => void;
  handleGetInfo: () => void;
  loading: boolean;
  downloading: boolean;
  isAnalyzing: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({
  url,
  setUrl,
  handlePaste,
  handleClear,
  handleGetInfo,
  loading,
  downloading,
  isAnalyzing,
}) => {
  return (
    <div className="flex gap-3">
      <div className="flex-1 relative">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL here"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 outline-none transition-all pr-24"
          disabled={loading || downloading}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {url && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-white transition-colors"
              title="Clear input"
              disabled={loading || downloading}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            onClick={handlePaste}
            className="text-gray-400 hover:text-white transition-colors"
            title="Paste from clipboard"
            disabled={loading || downloading}
          >
            <Clipboard className="w-5 h-5" />
          </button>
        </div>
      </div>
      <button
        onClick={handleGetInfo}
        disabled={loading || downloading || !url}
        className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {isAnalyzing ? 'Analyzing...' : 'Loading...'}
          </>
        ) : (
          'Get Info'
        )}
      </button>
    </div>
  );
};

export default UrlInput; 