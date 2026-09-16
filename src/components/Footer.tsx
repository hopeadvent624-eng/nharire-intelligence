import React from 'react';
import { ArrowRight, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B5D3B] flex items-center justify-center shadow-md shadow-[#0B5D3B]/20">
                <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7L30 15H10L20 7Z" fill="#22C55E"/>
                  <rect x="13.5" y="15" width="13" height="7" rx="1.5" fill="#FFFFFF"/>
                  <circle cx="20" cy="18.5" r="2.5" fill="#0B5D3B"/>
                  <circle cx="20" cy="18.5" r="1" fill="#22C55E"/>
                  <path d="M11 23H29L32 33H8L11 23Z" fill="#DCFCE7"/>
                  <rect x="18.5" y="25" width="3" height="8" rx="1" fill="#0B5D3B"/>
                </svg>
              </div>
              <div>
                <span className="font-bold text-gray-900 text-lg">Nharire Intelligence</span>
                <span className="block text-[11px] text-[#0B5D3B] font-bold tracking-wide uppercase">
                  A Nharire Data Group Company
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              African-First Data &amp; AI Intelligence Platform. Unlocking insights, automating reporting, monitoring performance, and transforming data into decisive business action.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B5D3B] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                Transform Data Into Decisions.
              </span>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('/platform')} className="hover:text-[#0B5D3B] transition-colors">
                  Data Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/platform')} className="hover:text-[#0B5D3B] transition-colors">
                  AI Analyst ("Ask Nharire")
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/platform')} className="hover:text-[#0B5D3B] transition-colors">
                  Business Dashboards
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/platform')} className="hover:text-[#0B5D3B] transition-colors">
                  Automated Reporting
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/platform')} className="hover:text-[#0B5D3B] transition-colors">
                  Predictive Analytics
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/platform')} className="hover:text-[#0B5D3B] transition-colors">
                  Data Profiling Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('/solutions')} className="hover:text-[#0B5D3B] transition-colors">
                  Executive Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/solutions')} className="hover:text-[#0B5D3B] transition-colors">
                  Operational Analytics
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/solutions')} className="hover:text-[#0B5D3B] transition-colors">
                  Retail &amp; FMCG Forecasting
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/solutions')} className="hover:text-[#0B5D3B] transition-colors">
                  Agri-Logistics &amp; Cold Chain
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/solutions')} className="hover:text-[#0B5D3B] transition-colors">
                  Mining &amp; Heavy Industry
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/solutions')} className="hover:text-[#0B5D3B] transition-colors">
                  Financial Underwriting
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Company &amp; Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#0B5D3B] transition-colors">
                  About Nharire Data Group
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/case-studies')} className="hover:text-[#0B5D3B] transition-colors">
                  Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-[#0B5D3B] transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#0B5D3B] transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy-policy')} className="hover:text-[#0B5D3B] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li className="pt-2 text-xs text-gray-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0B5D3B]" />
                <span>Harare, Zimbabwe</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2026 Nharire Data Group. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/privacy-policy')} className="hover:text-gray-800">
              Privacy Policy
            </button>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#0B5D3B] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              Sovereign African Cloud Security
            </span>
            <span>•</span>
            <span>Response time: 1 business day</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
