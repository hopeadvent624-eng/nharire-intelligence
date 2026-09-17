import React, { useState } from 'react';
import { ArrowRight, MessageSquare, X } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const MobileStickyCta: React.FC = () => {
  const { navigate, currentPath } = useRouter();
  const [dismissed, setDismissed] = useState(false);

  // Don't show if user dismissed or on contact/thank-you
  if (dismissed || currentPath === '/contact' || currentPath === '/thank-you') {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-xl safe-area-bottom">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          onClick={() => navigate('/platform')}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] text-white font-bold py-2.5 px-4 rounded-xl text-sm shadow-md active:scale-98 transition-transform"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigate('/contact')}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 border border-gray-200 active:scale-98 transition-transform whitespace-nowrap"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>Talk to Us</span>
        </button>

        <button
          onClick={() => setDismissed(true)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg focus:outline-none"
          aria-label="Dismiss sticky bar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
