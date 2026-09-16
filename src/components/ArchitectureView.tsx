import React from 'react';
import { Cpu, ShieldCheck, CheckCircle2, ArrowRight, Layers, Database, Lock, Server, Cloud } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
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
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
            Nharire Intelligence &bull; Architecture
          </span>
        </div>
        <h1 className="text-xl font-bold text-slate-100 mt-1">
          System Blueprint & Tenant Isolation Model
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Nharire Intelligence operates on a strict multi-tenant architecture with verified computations executed server-side before presenting data or feeding context to generative intelligence models.
        </p>
      </div>

      {/* 11-Step MVP User Journey Progress */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Phase 1 MVP User Journey (Ordered Phases A - N)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {journeySteps.map((j) => (
            <div
              key={j.step}
              className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {j.step}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-slate-100">{j.title}</h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{j.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-100">Multi-Tenant Isolation</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every organization’s data is strictly isolated. Workspace boundaries prevent cross-tenant data leakage across all REST endpoints.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Server className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-100">Verified Analytics First</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Numbers shown to users and explained by AI must come from real mathematical calculations in the analytics layer, not from AI hallucinating figures.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Cloud className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-100">Single Port Ingress</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fully compliant with AI Studio Node.js container constraints. Express server binds to port 3000 (0.0.0.0) with integrated Vite middleware.
          </p>
        </div>
      </div>
    </div>
  );
};
