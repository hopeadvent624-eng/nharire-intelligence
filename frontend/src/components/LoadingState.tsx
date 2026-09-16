import React from 'react';

interface LoadingStateProps {
  label?: string;
  rows?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  label = 'Loading platform telemetry...',
  rows = 3,
}) => {
  return (
    <div className="w-full space-y-3 p-6 rounded-xl bg-slate-900/40 border border-slate-800 animate-pulse">
      <div className="flex items-center space-x-3">
        <div className="w-4 h-4 rounded-full bg-amber-500/40 animate-ping" />
        <span className="text-xs font-medium text-slate-400 font-mono">{label}</span>
      </div>
      <div className="space-y-2 pt-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-8 bg-slate-800/60 rounded-lg w-full"
            style={{ opacity: 1 - i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};
