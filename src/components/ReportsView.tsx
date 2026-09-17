import React, { useState, useEffect } from 'react';
import { FileText, Download, Printer, CheckCircle2, ShieldCheck, Sparkles, RefreshCw, Calendar, TrendingUp } from 'lucide-react';
import { Dataset, BusinessReport } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ReportsViewProps {
  dataset: Dataset | null;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ dataset }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [report, setReport] = useState<BusinessReport | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!dataset) return;
    fetchReport(dataset.id);
  }, [dataset?.id]);

  const fetchReport = async (datasetId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reports/${datasetId}`);
      if (res.ok) {
        const data = await res.json();
        setReport(data);
      }
    } catch (err) {
      console.error('Failed to fetch report:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!dataset) {
    return (
      <div
        className={`p-12 text-center rounded-xl border transition-colors ${
          isDark
            ? 'bg-slate-900/40 border-slate-800 text-slate-400'
            : 'bg-white border-gray-200 text-gray-500 shadow-xs'
        }`}
      >
        <p>No dataset selected. Choose a dataset to generate an executive report.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div
        className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
          isDark
            ? 'bg-slate-900/70 border-slate-800'
            : 'bg-white border-gray-200 shadow-xs'
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                isDark
                  ? 'text-[#00D2FF] bg-[#00D2FF]/10 border-[#00D2FF]/30'
                  : 'text-[#0284C7] bg-[#E0F2FE] border-[#38BDF8]/40'
              }`}
            >
              Phase 1 Deliverable
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Dataset: {dataset.name}
            </span>
          </div>
          <h1 className={`text-lg font-bold mt-1 flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
            <FileText className={`w-5 h-5 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`} />
            <span>Executive Business Report</span>
          </h1>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Automated multi-section briefing grounded in real transactional calculations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchReport(dataset.id)}
            disabled={loading}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Re-generate</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Main Report Document Container */}
      {report && (
        <div
          id="printable-report"
          className={`border rounded-2xl p-8 space-y-8 shadow-xl transition-colors ${
            isDark
              ? 'bg-slate-900/90 border-slate-800'
              : 'bg-white border-gray-200'
          }`}
        >
          {/* Document Header */}
          <div className={`border-b pb-6 ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D2FF] to-[#0284C7] flex items-center justify-center text-slate-950 font-bold text-sm shadow-xs">
                  N
                </div>
                <div>
                  <h2 className={`text-base font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{report.title}</h2>
                  <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                    Nharire Intelligence &bull; Commercial Data Intelligence Briefing
                  </p>
                </div>
              </div>

              <div className="text-right text-xs">
                <p className={`font-semibold ${isDark ? 'text-slate-300' : 'text-gray-800'}`}>{report.period}</p>
                <p className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                  Generated {new Date(report.generatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-2">
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`}>
              <span>01. Executive Summary</span>
            </h3>
            <p
              className={`text-xs leading-relaxed p-4 rounded-xl border ${
                isDark
                  ? 'text-slate-300 bg-slate-950/60 border-slate-800/80'
                  : 'text-gray-700 bg-slate-50 border-gray-200'
              }`}
            >
              {report.executiveSummary}
            </p>
          </div>

          {/* Section 2: Key Operational Findings */}
          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`}>
              <span>02. Verified Performance Findings</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {report.keyFindings.map((finding, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-lg border text-xs ${
                    isDark
                      ? 'bg-slate-950/50 border-slate-800/80 text-slate-300'
                      : 'bg-slate-50 border-gray-200 text-gray-700'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`} />
                  <span className="leading-relaxed">{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Metrics Breakdown Table */}
          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`}>
              <span>03. Verified Metric Scorecard</span>
            </h3>
            <div className={`overflow-hidden rounded-xl border ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className={`border-b ${isDark ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-slate-100 text-gray-700 border-gray-200'}`}>
                    <th className="px-4 py-2.5 font-semibold">Key Metric Indicator</th>
                    <th className="px-4 py-2.5 font-semibold">Verified Value</th>
                    <th className="px-4 py-2.5 font-semibold">Verification Audit Note</th>
                  </tr>
                </thead>
                <tbody className={`divide-y font-mono text-[11px] ${isDark ? 'divide-slate-800' : 'divide-gray-200'}`}>
                  {report.metricsBreakdown.map((row, idx) => (
                    <tr key={idx} className={isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}>
                      <td className={`px-4 py-2.5 font-sans font-medium ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>{row.label}</td>
                      <td className={`px-4 py-2.5 font-bold ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`}>{row.value}</td>
                      <td className={`px-4 py-2.5 font-sans ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Strategic Recommendations */}
          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`}>
              <span>04. Actionable Business Directives</span>
            </h3>
            <div className="space-y-2">
              {report.strategicRecommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3.5 rounded-lg border text-xs ${
                    isDark
                      ? 'bg-sky-950/20 border-[#00D2FF]/20 text-slate-200'
                      : 'bg-sky-50 border-[#38BDF8]/30 text-gray-800'
                  }`}
                >
                  <TrendingUp className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`} />
                  <span className="leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signoff */}
          <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] gap-2 ${isDark ? 'border-slate-800 text-slate-500' : 'border-gray-200 text-gray-500'}`}>
            <p>Audited by Nharire Intelligence Engine &bull; Zero Hallucination Guaranteed</p>
            <p className={`font-semibold ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Nharire Data Group &bull; Proprietary SaaS</p>
          </div>
        </div>
      )}
    </div>
  );
};
