import UrlInput from './UrlInput';
import Messages from './Messages';

interface HeroSectionProps {
  url: string;
  setUrl: (url: string) => void;
  handlePaste: () => void;
  handleClear: () => void;
  handleGetInfo: () => void;
  loading: boolean;
  downloading: boolean;
  isAnalyzing: boolean;
  error: string;
  successMessage: string;
}

const HeroSection = ({
  url,
  setUrl,
  handlePaste,
  handleClear,
  handleGetInfo,
  loading,
  downloading,
  isAnalyzing,
  error,
  successMessage,
}: HeroSectionProps) => {
  return (
    <section className="py-12 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Download YouTube Videos & Music
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Paste your YouTube URL below to get started.
      </p>
      <div className="space-y-6">
        <UrlInput
          url={url}
          setUrl={setUrl}
          handlePaste={handlePaste}
          handleClear={handleClear}
          handleGetInfo={handleGetInfo}
          loading={loading}
          downloading={downloading}
          isAnalyzing={isAnalyzing}
        />

        <Messages error={error} successMessage={successMessage} />
      </div>
    </section>
  );
};

export default HeroSection; 