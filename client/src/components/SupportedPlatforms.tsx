import React from 'react';
import { Youtube, Instagram, Twitter, Facebook } from 'lucide-react';

interface Platform {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const supportedPlatforms: Platform[] = [
  {
    name: 'YouTube',
    icon: <Youtube className="w-8 h-8 text-red-500" />,
    description: 'Download videos and audio from YouTube.',
  },
  {
    name: 'Instagram',
    icon: <Instagram className="w-8 h-8 text-pink-500" />,
    description: 'Download videos and reels from Instagram.',
  },
  {
    name: 'Twitter',
    icon: <Twitter className="w-8 h-8 text-blue-400" />,
    description: 'Download videos from Twitter.',
  },
  {
    name: 'Facebook',
    icon: <Facebook className="w-8 h-8 text-blue-600" />,
    description: 'Download videos from Facebook.',
  },
];

const SupportedPlatforms = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Supported Platforms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
        {supportedPlatforms.map((platform) => (
          <div
            key={platform.name}
            className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md text-center space-y-4 border border-gray-200 dark:border-gray-600"
          >
            {platform.icon}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{platform.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{platform.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportedPlatforms; 