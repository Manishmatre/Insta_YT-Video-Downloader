import { AlertCircle, CheckCircle2 } from 'lucide-react';
import React from 'react';

interface MessagesProps {
  error: string;
  successMessage: string;
}

const Messages: React.FC<MessagesProps> = ({ error, successMessage }) => {
  return (
    <>
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          {successMessage}
        </div>
      )}
    </>
  );
};

export default Messages; 