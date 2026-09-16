import React, { useState, useEffect } from 'react';
import { FileText, Download, Printer, CheckCircle2, ShieldCheck, Sparkles, RefreshCw, Calendar, TrendingUp } from 'lucide-react';
import { Dataset, BusinessReport } from '../types';

interface ReportsViewProps {
  dataset: Dataset | null;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ dataset }) => {
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
      <div className="p-12 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400">
        <p>No dataset selected. Choose a dataset to generate an executive report.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
              Phase 1 Deliverable
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Dataset: {dataset.name}
            </span>
          </div>
          <h1 className="text-lg font-bold text-slate-100 mt-1 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>Executive Business Report</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated multi-section briefing grounded in real transactional calculations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchReport(dataset.id)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Re-generate</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Main Report Document Container */}
      {report && (
        <div id="printable-report" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 space-y-8 shadow-xl">
          {/* Document Header */}
          <div className="border-b border-slate-800 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-sm">
                  N
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-100">{report.title}</h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Nharire Intelligence &bull; Commercial Data Intelligence Briefing
                  </p>
                </div>
              </div>

              <div className="text-right text-xs text-slate-400">
                <p className="font-semibold text-slate-300">{report.period}</p>
                <p className="text-[11px] text-slate-500">
                  Generated {new Date(report.generatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>01. Executive Summary</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {report.executiveSummary}
            </p>
          </div>

          {/* Section 2: Key Operational Findings */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>02. Verified Performance Findings</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {report.keyFindings.map((finding, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Metrics Breakdown Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>03. Verified Metric Scorecard</span>
            </h3>
            <div className="overflow-hidden rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                    <th className="px-4 py-2.5 font-semibold">Key Metric Indicator</th>
                    <th className="px-4 py-2.5 font-semibold">Verified Value</th>
                    <th className="px-4 py-2.5 font-semibold">Verification Audit Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                  {report.metricsBreakdown.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="px-4 py-2.5 font-sans font-medium text-slate-200">{row.label}</td>
                      <td className="px-4 py-2.5 font-bold text-amber-300">{row.value}</td>
                      <td className="px-4 py-2.5 font-sans text-slate-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Strategic Recommendations */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>04. Actionable Business Directives</span>
            </h3>
            <div className="space-y-2">
              {report.strategicRecommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-amber-950/15 border border-amber-500/20 text-xs text-slate-200"
                >
                  <TrendingUp className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signoff */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <p>Audited by Nharire Intelligence Engine &bull; Zero Hallucination Guaranteed</p>
            <p className="font-semibold text-slate-400">Nharire Data Group &bull; Proprietary SaaS</p>
          </div>
        </div>
      )}
    </div>
  );
};
