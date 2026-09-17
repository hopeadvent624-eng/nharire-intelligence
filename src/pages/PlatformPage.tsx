import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  Sparkles, 
  BarChart3, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Sliders, 
  Lock,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useTheme } from '../context/ThemeContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Organization, Workspace, Dataset } from '../types';
import { DatasetManager } from '../components/DatasetManager';
import { DatasetProfiler } from '../components/DatasetProfiler';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { AskAIAnalyst } from '../components/AskAIAnalyst';
import { ReportsView } from '../components/ReportsView';
import { ArchitectureView } from '../components/ArchitectureView';
import { ActiveTab } from '../components/Sidebar';

interface PlatformPageProps {
  organizations: Organization[];
  selectedOrg: Organization | null;
  onSelectOrg: (org: Organization) => void;
  workspaces: Workspace[];
  selectedWs: Workspace | null;
  onSelectWs: (ws: Workspace) => void;
  datasets: Dataset[];
  selectedDataset: Dataset | null;
  onSelectDataset: (ds: Dataset) => void;
  onUploadDataset: (data: { name: string; description: string; filename: string; csvContent: string }) => Promise<void>;
  onDeleteDataset: (id: string) => Promise<void>;
}

export const PlatformPage: React.FC<PlatformPageProps> = ({
  organizations,
  selectedOrg,
  onSelectOrg,
  workspaces,
  selectedWs,
  onSelectWs,
  datasets,
  selectedDataset,
  onSelectDataset,
  onUploadDataset,
  onDeleteDataset,
}) => {
  const { navigate } = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [viewMode, setViewMode] = useState<'architecture' | 'sandbox'>('architecture');
  const [sandboxTab, setSandboxTab] = useState<ActiveTab>('dashboard');

  return (
    <div
      className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
        isDark ? 'bg-[#0A1128] text-slate-100' : 'bg-[#F8FAFC] text-[#111827]'
      }`}
    >
      <SeoHead
        title="Platform Architecture &amp; Intelligence Engine | Nharire Intelligence"
        description="Explore the Nharire Intelligence SaaS platform architecture: automated data health profiling, regional telemetry, and grounded AI analytics."
        path="/platform"
      />

      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: 'Platform' }]} />

        {/* Header Hero */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 border transition-colors ${
                isDark
                  ? 'bg-[#00D2FF]/15 border-[#00D2FF]/30 text-[#00D2FF]'
                  : 'bg-[#E0F2FE] border-[#38BDF8]/30 text-[#0284C7]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Stack Enterprise Intelligence</span>
            </div>
            <h1
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight transition-colors ${
                isDark ? 'text-white' : 'text-[#111827]'
              }`}
            >
              The Nharire Intelligence Platform
            </h1>
            <p
              className={`mt-4 text-base sm:text-lg leading-relaxed transition-colors ${
                isDark ? 'text-slate-400' : 'text-[#6B7280]'
              }`}
            >
              An integrated end-to-end data operating system designed for African market conditions. Combines multi-tenant data warehousing, automated schema profiling, interactive regional dashboards, and grounded generative AI analysis.
            </p>
          </div>

          {/* Toggle between Architecture View and Live Sandbox */}
          <div
            className={`border p-1.5 rounded-2xl flex items-center shrink-0 self-start lg:self-auto shadow-xs transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-[#E5E7EB]'
            }`}
          >
            <button
              onClick={() => setViewMode('architecture')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'architecture'
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] text-white shadow-sm font-bold'
                  : isDark
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Architecture &amp; Specs</span>
            </button>
            <button
              onClick={() => setViewMode('sandbox')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'sandbox'
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] text-white shadow-sm font-bold'
                  : isDark
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Launch Live Workbench</span>
            </button>
          </div>
        </div>

        {/* VIEW MODE 1: ARCHITECTURAL OVERVIEW & SPECIFICATIONS */}
        {viewMode === 'architecture' ? (
          <div className="space-y-16">
            
            {/* Interactive High-Level Architecture Callout */}
            <div
              className={`border rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xs transition-colors ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-[#E5E7EB]'
              }`}
            >
              <div
                className={`flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b ${
                  isDark ? 'border-slate-800' : 'border-gray-100'
                }`}
              >
                <div>
                  <h2 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    The 5-Layer Intelligence Pipeline
                  </h2>
                  <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                    How data transitions from raw, fragmented merchant records into verified executive decisions.
                  </p>
                </div>
                <button
                  onClick={() => setViewMode('sandbox')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-sm self-start transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Try It in Live Sandbox</span>
                </button>
              </div>

              {/* 5-Layer Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
                
                {/* Step 1 */}
                <div
                  className={`border rounded-2xl p-5 flex flex-col justify-between transition-colors ${
                    isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                  }`}
                >
                  <div>
                    <div
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-block mb-3 border ${
                        isDark
                          ? 'text-[#00D2FF] bg-[#00D2FF]/15 border-[#00D2FF]/30'
                          : 'text-[#0284C7] bg-[#E0F2FE] border-[#38BDF8]/30'
                      }`}
                    >
                      LAYER 01
                    </div>
                    <h3 className={`font-bold text-sm mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Ingestion Engine
                    </h3>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                      Accepts POS dumps, CSV, JSON, and mobile money transaction streams with schema auto-inference.
                    </p>
                  </div>
                  <div
                    className={`mt-4 pt-2 border-t text-[10px] font-mono ${
                      isDark ? 'border-slate-800 text-slate-500' : 'border-gray-200 text-gray-400'
                    }`}
                  >
                    Multi-Tenant Ingestion
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  className={`border rounded-2xl p-5 flex flex-col justify-between transition-colors ${
                    isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                  }`}
                >
                  <div>
                    <div
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-block mb-3 border ${
                        isDark
                          ? 'text-[#00D2FF] bg-[#00D2FF]/15 border-[#00D2FF]/30'
                          : 'text-[#0284C7] bg-[#E0F2FE] border-[#38BDF8]/30'
                      }`}
                    >
                      LAYER 02
                    </div>
                    <h3 className={`font-bold text-sm mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Data Health Profiler
                    </h3>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                      Computes null-rates, removes duplicates, flags outliers, and outputs a 0–100 Data Health Index.
                    </p>
                  </div>
                  <div
                    className={`mt-4 pt-2 border-t text-[10px] font-mono ${
                      isDark ? 'border-slate-800 text-slate-500' : 'border-gray-200 text-gray-400'
                    }`}
                  >
                    Deterministic Cleansing
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  className={`border rounded-2xl p-5 flex flex-col justify-between transition-colors ${
                    isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                  }`}
                >
                  <div>
                    <div
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-block mb-3 border ${
                        isDark
                          ? 'text-[#00D2FF] bg-[#00D2FF]/15 border-[#00D2FF]/30'
                          : 'text-[#0284C7] bg-[#E0F2FE] border-[#38BDF8]/30'
                      }`}
                    >
                      LAYER 03
                    </div>
                    <h3 className={`font-bold text-sm mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Visual Dashboards
                    </h3>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                      Interactive KPIs, channel velocity charts, category distributions, and geographic trends.
                    </p>
                  </div>
                  <div
                    className={`mt-4 pt-2 border-t text-[10px] font-mono ${
                      isDark ? 'border-slate-800 text-slate-500' : 'border-gray-200 text-gray-400'
                    }`}
                  >
                    Real-Time Aggregations
                  </div>
                </div>

                {/* Step 4 */}
                <div
                  className={`border rounded-2xl p-5 flex flex-col justify-between transition-colors ${
                    isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                  }`}
                >
                  <div>
                    <div
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-block mb-3 border ${
                        isDark
                          ? 'text-[#00D2FF] bg-[#00D2FF]/15 border-[#00D2FF]/30'
                          : 'text-[#0284C7] bg-[#E0F2FE] border-[#38BDF8]/30'
                      }`}
                    >
                      LAYER 04
                    </div>
                    <h3 className={`font-bold text-sm mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Grounded AI Analyst
                    </h3>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                      Math pre-computed server-side. LLM synthesizes natural-language business directives without hallucination.
                    </p>
                  </div>
                  <div
                    className={`mt-4 pt-2 border-t text-[10px] font-mono ${
                      isDark ? 'border-slate-800 text-slate-500' : 'border-gray-200 text-gray-400'
                    }`}
                  >
                    Zero Hallucination
                  </div>
                </div>

                {/* Step 5 */}
                <div
                  className={`border rounded-2xl p-5 flex flex-col justify-between transition-colors ${
                    isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                  }`}
                >
                  <div>
                    <div
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-block mb-3 border ${
                        isDark
                          ? 'text-[#00D2FF] bg-[#00D2FF]/15 border-[#00D2FF]/30'
                          : 'text-[#0284C7] bg-[#E0F2FE] border-[#38BDF8]/30'
                      }`}
                    >
                      LAYER 05
                    </div>
                    <h3 className={`font-bold text-sm mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Automated Reports
                    </h3>
                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                      Generates executive briefings with key findings, strategic next steps, and verified numbers.
                    </p>
                  </div>
                  <div
                    className={`mt-4 pt-2 border-t text-[10px] font-mono ${
                      isDark ? 'border-slate-800 text-slate-500' : 'border-gray-200 text-gray-400'
                    }`}
                  >
                    Boardroom Briefings
                  </div>
                </div>

              </div>
            </div>

            {/* Deep-Dive Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Feature 1 */}
              <div
                className={`border rounded-3xl p-7 shadow-xs transition-colors ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-[#E5E7EB]'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isDark ? 'bg-[#00D2FF]/15 text-[#00D2FF]' : 'bg-[#E0F2FE] text-[#0284C7]'
                    }`}
                  >
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Automated Dataset Profiler
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Deterministic Statistical Cleansing
                    </p>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  Every uploaded dataset undergoes algorithmic profiling before ingestion. The engine infers column data types (numeric, date, categorical, boolean), measures null densities, detects statistical outliers (3σ deviations), and identifies duplicate transactions.
                </p>
                <div
                  className={`p-3.5 rounded-xl border text-[11px] font-mono space-y-1 ${
                    isDark
                      ? 'bg-slate-950/80 border-slate-800 text-slate-300'
                      : 'bg-[#F8FAFC] border-gray-200 text-gray-700'
                  }`}
                >
                  <div>✓ Health score penalized for missing cells &amp; duplicates</div>
                  <div>✓ Automatic date format recognition (ISO, standard)</div>
                  <div>✓ Mean, median, standard deviation, and min/max boundaries</div>
                </div>
              </div>

              {/* Feature 2 */}
              <div
                className={`border rounded-3xl p-7 shadow-xs transition-colors ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-[#E5E7EB]'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isDark ? 'bg-[#00D2FF]/15 text-[#00D2FF]' : 'bg-[#E0F2FE] text-[#0284C7]'
                    }`}
                  >
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Grounded AI Analyst ("Ask Nharire")
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Server-Side Verified Calculations
                    </p>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  Generative models are prone to hallucinating arithmetic when analyzing financial data. Nharire solves this with server-side fact binding: our backend calculates exact metrics and passes them as verified ground truths into the model prompt.
                </p>
                <div
                  className={`p-3.5 rounded-xl border text-[11px] font-mono space-y-1 ${
                    isDark
                      ? 'bg-slate-950/80 border-slate-800 text-slate-300'
                      : 'bg-[#F8FAFC] border-gray-200 text-gray-700'
                  }`}
                >
                  <div>✓ Strict mathematical verification before generation</div>
                  <div>✓ Verified data snippet attached to every AI answer</div>
                  <div>✓ Actionable business advice grounded in regional context</div>
                </div>
              </div>

              {/* Feature 3 */}
              <div
                className={`border rounded-3xl p-7 shadow-xs transition-colors ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-[#E5E7EB]'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isDark ? 'bg-[#00D2FF]/15 text-[#00D2FF]' : 'bg-[#E0F2FE] text-[#0284C7]'
                    }`}
                  >
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Dynamic Dashboards &amp; Visualizations
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Synthesized Recharts Visuals
                    </p>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  Dashboards dynamically synthesize based on dataset column signatures. Visualizes revenue velocity across dates, categorical shares (e.g. spaza vs. wholesale), and top KPIs without requiring manual dashboard authoring.
                </p>
                <div
                  className={`p-3.5 rounded-xl border text-[11px] font-mono space-y-1 ${
                    isDark
                      ? 'bg-slate-950/80 border-slate-800 text-slate-300'
                      : 'bg-[#F8FAFC] border-gray-200 text-gray-700'
                  }`}
                >
                  <div>✓ Automated KPI discovery from numeric fields</div>
                  <div>✓ Time-series velocity area charts</div>
                  <div>✓ Categorical comparison bar charts &amp; share donuts</div>
                </div>
              </div>

              {/* Feature 4 */}
              <div
                className={`border rounded-3xl p-7 shadow-xs transition-colors ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-[#E5E7EB]'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isDark ? 'bg-[#00D2FF]/15 text-[#00D2FF]' : 'bg-[#E0F2FE] text-[#0284C7]'
                    }`}
                  >
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Sovereignty, Security &amp; Isolation
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      African Data Governance
                    </p>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                  Every organization operates in an isolated tenant container. Workspaces partition operational departments, ensuring sensitive commercial pricing is inaccessible outside authorized personnel.
                </p>
                <div
                  className={`p-3.5 rounded-xl border text-[11px] font-mono space-y-1 ${
                    isDark
                      ? 'bg-slate-950/80 border-slate-800 text-slate-300'
                      : 'bg-[#F8FAFC] border-gray-200 text-gray-700'
                  }`}
                >
                  <div>✓ AES-256 encryption at rest, TLS 1.3 in transit</div>
                  <div>✓ Customer data never used to train public LLMs</div>
                  <div>✓ Strict POPIA, Zimbabwe DPA &amp; GDPR compliance</div>
                </div>
              </div>

            </div>

            {/* Platform Interactive CTA */}
            <div className="bg-[#0A1128] border border-[#1E293B] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="text-xs uppercase font-bold tracking-widest text-[#00D2FF] bg-[#0F1D40] px-3 py-1 rounded-full border border-[#00D2FF]/30">
                  Interactive Intelligence
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">Experience the Live Workbench</h3>
                <p className="text-sky-100/90 text-sm mt-2 max-w-xl">
                  Test the profiling engine, explore preloaded realistic Harare FMCG and East African horticulture datasets, and converse with Nharire AI right now.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto relative z-10">
                <button
                  onClick={() => setViewMode('sandbox')}
                  className="w-full sm:w-auto bg-white hover:bg-sky-50 text-[#0F172A] font-bold px-6 py-3 rounded-xl text-sm shadow-md shadow-[#00D2FF]/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Launch Live Workbench</span>
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full sm:w-auto bg-[#0F1D40] hover:bg-[#162752] text-white font-semibold px-6 py-3 rounded-xl text-sm border border-[#38BDF8]/40 transition-colors text-center"
                >
                  Talk to Us
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* VIEW MODE 2: LIVE INTERACTIVE WORKBENCH SANDBOX */
          <div className="space-y-6">
            
            {/* Sandbox Notice Banner */}
            <div
              className={`rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs border transition-colors ${
                isDark
                  ? 'bg-[#00D2FF]/10 border-[#00D2FF]/30 text-slate-200'
                  : 'bg-[#E0F2FE]/80 border-[#38BDF8]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D2FF] shadow-[0_0_6px_#00D2FF] animate-pulse" />
                <span className={`font-bold ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`}>
                  Live Interactive Intelligence Sandbox
                </span>
                <span className={`hidden md:inline ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  — Test dataset profiling, dynamic charts, AI queries, and reports.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('architecture')}
                  className={`font-bold underline px-2 py-1 transition-colors ${
                    isDark ? 'text-[#00D2FF] hover:text-white' : 'text-[#0284C7] hover:text-[#0369A1]'
                  }`}
                >
                  Return to Specs
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white font-bold px-3.5 py-1.5 rounded-xl text-xs shadow-xs"
                >
                  Get Enterprise Access
                </button>
              </div>
            </div>

            {/* Sandbox Workspace Body */}
            <div
              className={`border rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-colors ${
                isDark ? 'border-slate-800 bg-[#0B132B]' : 'border-[#E5E7EB] bg-white'
              }`}
            >
              {/* Internal Sidebar */}
              <div
                className={`md:w-64 border-b md:border-b-0 md:border-r p-5 transition-colors ${
                  isDark ? 'border-slate-800 bg-[#0A1128]' : 'border-[#E5E7EB] bg-[#F8FAFC]'
                }`}
              >
                
                {/* Org & Workspace Switchers */}
                <div className="space-y-3.5 mb-6">
                  <div>
                    <label className={`text-[10px] uppercase font-bold block mb-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Organization
                    </label>
                    <select
                      value={selectedOrg?.id || ''}
                      onChange={(e) => {
                        const org = organizations.find(o => o.id === e.target.value);
                        if (org) onSelectOrg(org);
                      }}
                      className={`w-full text-xs rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30 border transition-colors ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-100'
                          : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    >
                      {organizations.map(org => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`text-[10px] uppercase font-bold block mb-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Workspace
                    </label>
                    <select
                      value={selectedWs?.id || ''}
                      onChange={(e) => {
                        const ws = workspaces.find(w => w.id === e.target.value);
                        if (ws) onSelectWs(ws);
                      }}
                      className={`w-full text-xs rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30 border transition-colors ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-100'
                          : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    >
                      {workspaces.map(ws => (
                        <option key={ws.id} value={ws.id}>{ws.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`text-[10px] uppercase font-bold block mb-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Active Dataset
                    </label>
                    <select
                      value={selectedDataset?.id || ''}
                      onChange={(e) => {
                        const ds = datasets.find(d => d.id === e.target.value);
                        if (ds) onSelectDataset(ds);
                      }}
                      className={`w-full text-xs rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30 border transition-colors ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-100'
                          : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    >
                      {datasets.map(ds => (
                        <option key={ds.id} value={ds.id}>{ds.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sub-Navigation Tabs */}
                <div className={`space-y-1 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
                  <div className={`text-[10px] uppercase font-bold mb-2 px-1 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>
                    Workbench Views
                  </div>
                  {[
                    { id: 'dashboard', label: 'Dynamic Dashboard', icon: BarChart3 },
                    { id: 'profiler', label: 'Dataset Profiler', icon: Sliders },
                    { id: 'ai-analyst', label: 'Ask AI Analyst', icon: Sparkles },
                    { id: 'reports', label: 'Executive Reports', icon: FileText },
                    { id: 'datasets', label: 'Manage & Upload', icon: Database },
                    { id: 'architecture', label: 'Data Topology', icon: Layers },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = sandboxTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSandboxTab(tab.id as ActiveTab)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                          isActive
                            ? 'bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] text-white font-bold shadow-xs'
                            : isDark
                              ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                              : 'text-gray-700 hover:bg-gray-200/70'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Sandbox Main Area */}
              <div
                className={`flex-1 p-5 md:p-8 overflow-y-auto min-h-[580px] rounded-r-3xl transition-colors ${
                  isDark ? 'bg-[#0A1128] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
                }`}
              >
                {sandboxTab === 'dashboard' && (
                  <AnalyticsDashboard
                    dataset={selectedDataset}
                    onNavigateToAi={() => setSandboxTab('ai-analyst')}
                  />
                )}

                {sandboxTab === 'profiler' && (
                  <DatasetProfiler
                    dataset={selectedDataset}
                    onNavigateToDashboard={() => setSandboxTab('dashboard')}
                    onNavigateToAi={() => setSandboxTab('ai-analyst')}
                  />
                )}

                {sandboxTab === 'ai-analyst' && (
                  <AskAIAnalyst dataset={selectedDataset} />
                )}

                {sandboxTab === 'reports' && (
                  <ReportsView dataset={selectedDataset} />
                )}

                {sandboxTab === 'datasets' && (
                  <DatasetManager
                    datasets={datasets}
                    selectedDataset={selectedDataset}
                    onSelectDataset={onSelectDataset}
                    onUploadDataset={onUploadDataset}
                    onDeleteDataset={onDeleteDataset}
                    onNavigateTab={(t) => setSandboxTab(t as any)}
                  />
                )}

                {sandboxTab === 'architecture' && (
                  <ArchitectureView />
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
