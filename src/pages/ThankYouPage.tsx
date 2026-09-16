import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  FileText, 
  Layers, 
  Mail, 
  Building2,
  ChevronRight
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ThankYouPage: React.FC = () => {
  const { navigate } = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [userCompany, setUserCompany] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = sessionStorage.getItem('nharire_inquiry_name');
      const storedCompany = sessionStorage.getItem('nharire_inquiry_company');
      if (storedName) setUserName(storedName);
      if (storedCompany) setUserCompany(storedCompany);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] py-12 px-4 sm:px-6 lg:px-8">
      <SeoHead
        title="Thank You | Inquiry Received | Nharire Intelligence"
        description="Your enterprise inquiry has been securely routed to the Nharire Data Group technical architecture desk. We will respond within 1 business day."
        path="/thank-you"
      />

      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: 'Inquiry Confirmation' }]} />

        {/* Confirmation Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden mb-12">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#DCFCE7]/60 blur-3xl pointer-events-none" />

          {/* Success Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#DCFCE7] border border-[#22C55E]/40 flex items-center justify-center text-[#0B5D3B] mx-auto mb-6 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {userName ? `Thank you, ${userName}.` : 'Thank you for reaching out.'}
          </h1>
          <p className="text-[#0B5D3B] font-bold text-sm sm:text-base mt-2">
            Your inquiry{userCompany ? ` for ${userCompany}` : ''} has been securely logged with the Nharire Intelligence desk.
          </p>

          {/* SLA Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F8FAFC] border border-gray-200 text-xs text-gray-700 mt-6 shadow-xs">
            <Clock className="w-4 h-4 text-[#0B5D3B]" />
            <span>Response guarantee: <strong>We aim to respond within 1 business day.</strong></span>
          </div>

          {/* What Happens Next Steps */}
          <div className="mt-10 pt-8 border-t border-gray-100 text-left max-w-xl mx-auto">
            <h2 className="text-xs uppercase font-bold tracking-widest text-gray-400 mb-4 text-center">
              What Happens Next
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-start gap-3 bg-[#F8FAFC] p-4 rounded-2xl border border-gray-200">
                <span className="w-6 h-6 rounded-full bg-[#DCFCE7] text-[#0B5D3B] font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <div>
                  <strong className="text-gray-900">Technical Review:</strong> A senior data solutions architect reviews your data topology and commercial requirements.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#F8FAFC] p-4 rounded-2xl border border-gray-200">
                <span className="w-6 h-6 rounded-full bg-[#DCFCE7] text-[#0B5D3B] font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <div>
                  <strong className="text-gray-900">Direct Response:</strong> You will receive a direct reply to your work email with initial feasibility observations and scheduling availability.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#F8FAFC] p-4 rounded-2xl border border-gray-200">
                <span className="w-6 h-6 rounded-full bg-[#DCFCE7] text-[#0B5D3B] font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <div>
                  <strong className="text-gray-900">Pilot Ingestion Sandbox:</strong> We provide a private sovereign sandbox to model sample operational records under NDA.
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/platform')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B5D3B] hover:bg-[#08482e] text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-sm transition-all"
            >
              <span>Explore Live Platform Workbench</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/case-studies')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 transition-colors"
            >
              <span>Read Case Studies</span>
            </button>
          </div>
        </div>

        {/* Recommended Reading Modules */}
        <div className="mt-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6 text-center">
            Recommended Intelligence Deep-Dives While You Wait
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/case-studies')}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-6 text-left hover:shadow-lg transition-all group"
            >
              <div className="text-xs font-bold text-[#0B5D3B] mb-1">Evidence &amp; ROI</div>
              <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-[#0B5D3B] transition-colors">
                Zambezi Retail &amp; Logistics Case Study
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Review how real-time inventory profiling reduced spaza stockout latency by 34% across 120 regional depots.
              </p>
            </button>

            <button
              onClick={() => navigate('/platform')}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-6 text-left hover:shadow-lg transition-all group"
            >
              <div className="text-xs font-bold text-[#0B5D3B] mb-1">Architecture</div>
              <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-[#0B5D3B] transition-colors">
                Grounded Zero-Hallucination AI
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Discover how deterministic server-side mathematical calculations protect financial decision-making.
              </p>
            </button>

            <button
              onClick={() => navigate('/about')}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-6 text-left hover:shadow-lg transition-all group"
            >
              <div className="text-xs font-bold text-[#0B5D3B] mb-1">Heritage &amp; Vision</div>
              <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-[#0B5D3B] transition-colors">
                About Nharire Data Group
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Learn why sovereign African data technology is indispensable for the continent's next economic chapter.
              </p>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
