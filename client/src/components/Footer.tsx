import { Github, Twitter, Youtube, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-12 py-8 text-center text-gray-600 dark:text-gray-400 text-sm bg-white dark:bg-gray-900 rounded-t-xl border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About VidYT</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A powerful tool for downloading videos and audio from various platforms. Fast, secure, and free to use.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-red-500 dark:hover:text-red-400 transition-colors">Features</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-red-500 dark:hover:text-red-400 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#supported-platforms" className="hover:text-red-500 dark:hover:text-red-400 transition-colors">Supported Platforms</a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy-policy" className="hover:text-red-500 dark:hover:text-red-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-of-service" className="hover:text-red-500 dark:hover:text-red-400 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="/dmca" className="hover:text-red-500 dark:hover:text-red-400 transition-colors">DMCA</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://github.com/yourusername/vidyt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://youtube.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="mailto:contact@vidyt.com"
            className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-gray-600 dark:text-gray-400">
            Developed with ❤️ for seamless video and audio downloads.
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} VidYT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 