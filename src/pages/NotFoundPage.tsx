import React from 'react';
import { Home, ArrowLeft, Search, Layers, HelpCircle, Phone } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/SeoHead';

export const NotFoundPage: React.FC = () => {
  const { navigate, currentPath } = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F8FAFC] text-[#111827] py-16 px-4 sm:px-6 lg:px-8">
      <SeoHead
        title="404 Page Not Found | Nharire Intelligence"
        description="The requested page could not be located on the Nharire Intelligence platform. Please return to the homepage or explore our platform solutions."
        path={currentPath}
      />

      <div className="max-w-xl w-full text-center space-y-6">
        
        {/* Watchtower 404 Emblem */}
        <div className="w-20 h-20 rounded-3xl bg-[#E0F2FE] border border-[#38BDF8]/40 flex items-center justify-center text-[#0284C7] mx-auto shadow-xs">
          <span className="text-3xl font-extrabold font-mono">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Horizon Uncharted
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
            The sentinel surveyed the coordinates <code className="text-[#0284C7] font-mono bg-[#E0F2FE] px-2 py-0.5 rounded text-xs">{currentPath}</code>, but found no active intelligence records at this location.
          </p>
        </div>

        {/* Primary Return Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-sm transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => navigate('/platform')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 transition-colors shadow-xs"
          >
            <Layers className="w-4 h-4" />
            <span>Explore Platform</span>
          </button>
        </div>

        {/* Quick Navigation Directory */}
        <div className="pt-8 border-t border-gray-200">
          <div className="text-xs uppercase font-bold text-gray-400 mb-3 tracking-wider">
            Popular Intelligence Destinations
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <button
              onClick={() => navigate('/solutions')}
              className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-[#0284C7] hover:border-[#0284C7]/40 transition-colors shadow-2xs"
            >
              Enterprise Solutions
            </button>
            <button
              onClick={() => navigate('/case-studies')}
              className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-[#0284C7] hover:border-[#0284C7]/40 transition-colors shadow-2xs"
            >
              Case Studies &amp; Benchmarks
            </button>
            <button
              onClick={() => navigate('/about')}
              className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-[#0284C7] hover:border-[#0284C7]/40 transition-colors shadow-2xs"
            >
              About Nharire Data Group
            </button>
            <button
              onClick={() => navigate('/faq')}
              className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-[#0284C7] hover:border-[#0284C7]/40 transition-colors shadow-2xs"
            >
              Frequently Asked Questions
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-[#0284C7] hover:border-[#0284C7]/40 transition-colors shadow-2xs"
            >
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
