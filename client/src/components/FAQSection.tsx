import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is YouTube Downloader?",
    answer: "YouTube Downloader is a web application that allows you to download YouTube videos in various formats, including MP4 and MP3.",
  },
  {
    question: "Is it free to use?",
    answer: "Yes, our YouTube Downloader is completely free to use. There are no hidden charges or subscriptions.",
  },
  {
    question: "What formats are supported?",
    answer: "We support downloading videos in MP4 format (various qualities) and audio in MP3 format.",
  },
  {
    question: "How do I download a video?",
    answer: "Simply paste the YouTube video URL into the input field, click 'Get Info', and then select your desired format and click 'Download'.",
  },
  {
    question: "Is it legal to download YouTube videos?",
    answer: "Downloading copyrighted content without permission may be illegal in your country. This tool is intended for downloading public domain or creative commons videos, or your own content.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium text-gray-900 dark:text-white">{item.question}</span>
              <ChevronDown
                className={`w-6 h-6 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
              />
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-4 pt-2 text-gray-600 dark:text-gray-300">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection; 