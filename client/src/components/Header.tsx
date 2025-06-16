import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header = ({ theme, toggleTheme }: HeaderProps) => {
  return (
    <header className="w-full py-4">
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-red-500 text-3xl font-bold">VidYT</div>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};

export default Header; 