import { Youtube } from 'lucide-react';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
        <Youtube className="w-10 h-10 text-red-500" />
        YouTube Video Downloader
      </h1>
      <p className="text-gray-400">Download YouTube videos in your preferred format and quality</p>
    </div>
  );
};

export default Header; 