import React from 'react';
import { ShieldCheck, CheckCircle2, Layers, Lock, Server, Cloud } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ArchitectureView: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const journeySteps = [
    { step: 1, title: 'Create Account', status: 'ready', desc: 'Firebase Auth token integration' },
    { step: 2, title: 'Create Organization', status: 'ready', desc: 'Multi-tenant root boundary' },
    { step: 3, title: 'Create Workspace', status: 'ready', desc: 'Scoped environment isolation' },
    { step: 4, title: 'Upload Dataset', status: 'active', desc: 'CSV & Excel schema intake' },
    { step: 5, title: 'Validate Dataset', status: 'active', desc: 'Anomaly detection & health scoring' },
    { step: 6, title: 'Profile Dataset', status: 'active', desc: 'Descriptive stats & distributions' },
    { step: 7, title: 'Analyze Dataset', status: 'active', desc: 'Server-side aggregation calculations' },
    { step: 8, title: 'Generate Dashboard', status: 'active', desc: 'Dynamic KPI and Recharts visual widgets' },
    { step: 9, title: 'Ask Nharire AI', status: 'active', desc: 'Grounded queries with verified data' },
    { step: 10, title: 'Generate Insights', status: 'active', desc: 'Operational anomalies & growth drivers' },
    { step: 11, title: 'Generate Report', status: 'active', desc: 'Executive briefings & action items' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Overview Banner */}
      <div
        className={`border rounded-xl p-6 transition-colors ${
          isDark
            ? 'bg-slate-900/70 border-slate-800'
            : 'bg-white border-gray-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
              isDark
                ? 'text-[#00D2FF] bg-[#00D2FF]/15 border-[#00D2FF]/30'
                : 'text-[#0284C7] bg-[#E0F2FE] border-[#38BDF8]/40'
            }`}
          >
            Nharire Intelligence &bull; Architecture
          </span>
        </div>
        <h1 className={`text-xl font-bold mt-1 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
          System Blueprint & Tenant Isolation Model
        </h1>
        <p className={`text-xs mt-1 max-w-3xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
          Nharire Intelligence operates on a strict multi-tenant architecture with verified computations executed server-side before presenting data or feeding context to generative intelligence models.
        </p>
      </div>

      {/* 11-Step MVP User Journey Progress */}
      <div
        className={`border rounded-xl p-6 space-y-4 transition-colors ${
          isDark
            ? 'bg-slate-900/60 border-slate-800'
            : 'bg-white border-gray-200 shadow-xs'
        }`}
      >
        <h2 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
          <Layers className={`w-4 h-4 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`} />
          <span>Phase 1 MVP User Journey (Ordered Phases A - N)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {journeySteps.map((j) => (
            <div
              key={j.step}
              className={`p-3.5 rounded-lg border flex items-start gap-3 transition-colors ${
                isDark
                  ? 'bg-slate-950/60 border-slate-800'
                  : 'bg-slate-50 border-gray-200'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  isDark
                    ? 'bg-[#00D2FF]/20 border-[#00D2FF]/40 text-[#00D2FF]'
                    : 'bg-sky-100 border-[#38BDF8] text-[#0284C7]'
                }`}
              >
                {j.step}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{j.title}</h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00D2FF]" />
                </div>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{j.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`p-5 rounded-xl border space-y-2 transition-colors ${
            isDark
              ? 'bg-slate-900/60 border-slate-800'
              : 'bg-white border-gray-200 shadow-xs'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDark
                ? 'bg-[#00D2FF]/15 text-[#00D2FF]'
                : 'bg-sky-50 text-[#0284C7]'
            }`}
          >
            <Lock className="w-4 h-4" />
          </div>
          <h3 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>Multi-Tenant Isolation</h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Every organization’s data is strictly isolated. Workspace boundaries prevent cross-tenant data leakage across all REST endpoints.
          </p>
        </div>

        <div
          className={`p-5 rounded-xl border space-y-2 transition-colors ${
            isDark
              ? 'bg-slate-900/60 border-slate-800'
              : 'bg-white border-gray-200 shadow-xs'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDark
                ? 'bg-[#00D2FF]/15 text-[#00D2FF]'
                : 'bg-sky-50 text-[#0284C7]'
            }`}
          >
            <Server className="w-4 h-4" />
          </div>
          <h3 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>Verified Analytics First</h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Numbers shown to users and explained by AI must come from real mathematical calculations in the analytics layer, not from AI hallucinating figures.
          </p>
        </div>

        <div
          className={`p-5 rounded-xl border space-y-2 transition-colors ${
            isDark
              ? 'bg-slate-900/60 border-slate-800'
              : 'bg-white border-gray-200 shadow-xs'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDark
                ? 'bg-[#00D2FF]/15 text-[#00D2FF]'
                : 'bg-sky-50 text-[#0284C7]'
            }`}
          >
            <Cloud className="w-4 h-4" />
          </div>
          <h3 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>Single Port Ingress</h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Fully compliant with AI Studio Node.js container constraints. Express server binds to port 3000 (0.0.0.0) with integrated Vite middleware.
          </p>
        </div>
      </div>
    </div>
  );
};
