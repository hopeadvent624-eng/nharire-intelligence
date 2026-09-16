import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle, CheckCircle2, BarChart2, Hash, Calendar, Tag, Layers, ArrowRight } from 'lucide-react';
import { Dataset, ColumnProfile } from '../types';

interface DatasetProfilerProps {
  dataset: Dataset | null;
  onNavigateToDashboard: () => void;
  onNavigateToAi: () => void;
}

export const DatasetProfiler: React.FC<DatasetProfilerProps> = ({
  dataset,
  onNavigateToDashboard,
  onNavigateToAi,
}) => {
  const [selectedColumn, setSelectedColumn] = useState<ColumnProfile | null>(null);

  if (!dataset) {
    return (
      <div className="p-12 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400">
        <p>No dataset selected. Please choose or upload a dataset first.</p>
      </div>
    );
  }

  const { validation, columns } = dataset;
  const activeCol = selectedColumn || columns[0] || null;

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Phase 1 Schema Profiling & Health Inspection
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-100">{dataset.name}</h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Automated data validation engine computes complete descriptive statistics, checks missing value density, and flags structural anomalies before analytics modeling.
            </p>
          </div>

          {/* Health Score Pill Card */}
          <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 p-4 rounded-xl shrink-0">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 border-2 border-amber-500/40">
              <span className="text-lg font-extrabold text-amber-300">
                {validation.healthScore}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-200">Data Quality Score</span>
                {validation.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {validation.passed ? 'Verified safe for automated analytics' : 'Warnings present — review anomalies'}
              </p>
            </div>
          </div>
        </div>

        {/* Quick summary grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800">
          <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Row Count</span>
            <p className="text-base font-bold text-slate-100 mt-0.5">{dataset.rowCount.toLocaleString()}</p>
          </div>
          <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Columns</span>
            <p className="text-base font-bold text-slate-100 mt-0.5">{columns.length}</p>
          </div>
          <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Duplicate Rows</span>
            <p className="text-base font-bold text-slate-100 mt-0.5">{validation.duplicateRows}</p>
          </div>
          <div className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Missing Cells</span>
            <p className="text-base font-bold text-slate-100 mt-0.5">{validation.missingCellsCount}</p>
          </div>
        </div>
      </div>

      {/* Validation Checklist */}
      {validation.issues.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Validation Checks & Anomaly Signals ({validation.issues.length})</span>
          </h2>
          <div className="space-y-2">
            {validation.issues.map((issue, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      issue.severity === 'high'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : issue.severity === 'medium'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-700/60 text-slate-300'
                    }`}
                  >
                    {issue.severity}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-200">{issue.message}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Type: <span className="font-mono text-slate-300">{issue.type}</span>
                      {issue.column && <span> • Target column: <span className="font-mono text-amber-300">{issue.column}</span></span>}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Count: {issue.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Column Schema & Profiling Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Column List */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 px-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Dataset Attributes ({columns.length})
            </h3>
            <span className="text-[10px] text-slate-400">Click to inspect stats</span>
          </div>

          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {columns.map((col) => {
              const isSelected = activeCol?.name === col.name;
              return (
                <button
                  key={col.name}
                  onClick={() => setSelectedColumn(col)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/50 text-slate-100 shadow-sm'
                      : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {col.type === 'numeric' && <Hash className="w-3.5 h-3.5 text-amber-400" />}
                    {col.type === 'categorical' && <Tag className="w-3.5 h-3.5 text-sky-400" />}
                    {col.type === 'date' && <Calendar className="w-3.5 h-3.5 text-emerald-400" />}
                    <div>
                      <p className="text-xs font-semibold">{col.name}</p>
                      <p className="text-[10px] text-slate-400">
                        {col.uniqueCount} distinct • {col.nullPercentage}% nulls
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {col.type}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Column Deep Profile Stats */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          {activeCol ? (
            <>
              <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-100">{activeCol.name}</h3>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {activeCol.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Descriptive statistical characteristics calculated from {activeCol.totalCount} entries.
                  </p>
                </div>
              </div>

              {/* Numeric Stats */}
              {activeCol.type === 'numeric' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Mean (Average)</span>
                    <p className="text-sm font-bold text-amber-300 mt-0.5">
                      {activeCol.mean?.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Median</span>
                    <p className="text-sm font-bold text-slate-200 mt-0.5">
                      {activeCol.median?.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Std Deviation</span>
                    <p className="text-sm font-bold text-slate-200 mt-0.5">
                      &plusmn;{activeCol.stdDev?.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Minimum</span>
                    <p className="text-sm font-bold text-slate-200 mt-0.5">
                      {activeCol.min?.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Maximum</span>
                    <p className="text-sm font-bold text-slate-200 mt-0.5">
                      {activeCol.max?.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Null Rate</span>
                    <p className="text-sm font-bold text-slate-200 mt-0.5">
                      {activeCol.nullPercentage}% ({activeCol.nullCount})
                    </p>
                  </div>
                </div>
              )}

              {/* Categorical / Distribution Bars */}
              {activeCol.distribution && activeCol.distribution.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Top Value Frequency Distribution</span>
                  </h4>
                  <div className="space-y-1.5">
                    {activeCol.distribution.map((item, idx) => {
                      const maxVal = activeCol.distribution![0].count;
                      const pct = Math.round((item.count / maxVal) * 100);
                      return (
                        <div key={idx} className="space-y-1 text-xs">
                          <div className="flex justify-between text-slate-300 text-[11px]">
                            <span className="truncate max-w-[200px] font-medium">{item.label}</span>
                            <span className="font-mono text-slate-400">{item.count} occurrences</span>
                          </div>
                          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                            <div
                              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sample values preview */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                  Sample Observed Values
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {activeCol.sampleValues.map((sv, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                    >
                      {String(sv)}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select a column to inspect descriptive metrics.
            </div>
          )}
        </div>
      </div>

      {/* Next Step Navigation CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-500/30 gap-4">
        <div>
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            Ready for Analysis & Reporting
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Data profile is verified. Proceed to generate live interactive charts or consult the Grounded AI Analyst.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToDashboard}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Launch Dashboard
          </button>
          <button
            onClick={onNavigateToAi}
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <span>Ask Nharire AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
