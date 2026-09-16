import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to load component',
  message,
  onRetry,
}) => {
  return (
    <div className="p-6 rounded-xl bg-red-950/20 border border-red-900/40 text-red-300 space-y-3">
      <div className="flex items-center space-x-2">
        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
        <h4 className="text-sm font-bold text-red-200">{title}</h4>
      </div>
      <p className="text-xs text-red-300/80 leading-relaxed font-mono">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-900/40 hover:bg-red-900/60 border border-red-800/50 text-xs font-semibold text-red-100 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
};
