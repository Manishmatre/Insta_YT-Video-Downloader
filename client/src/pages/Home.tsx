import { FaYoutube } from 'react-icons/fa';

const Home = () => {
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
    </div>
  );
};

export default Home; 