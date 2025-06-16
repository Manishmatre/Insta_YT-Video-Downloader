import { Sun, Moon } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header = ({ theme, toggleTheme }: HeaderProps) => {
  return (
    <header className="w-full py-4">
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FaYoutube className="text-red-500 text-2xl" />
          <h1 className="text-xl font-bold">VidYT</h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header; 