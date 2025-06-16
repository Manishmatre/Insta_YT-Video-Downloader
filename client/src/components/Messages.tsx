import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface MessagesProps {
  error: string;
  successMessage: string;
}

const Messages = ({ error, successMessage }: MessagesProps) => {
  return (
    <>
      {error && (
        <div className="bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          {successMessage}
        </div>
      )}
    </>
  );
};

export default Messages; 