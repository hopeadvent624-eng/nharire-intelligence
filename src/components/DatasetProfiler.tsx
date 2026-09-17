import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle, CheckCircle2, BarChart2, Hash, Calendar, Tag, Layers, ArrowRight } from 'lucide-react';
import { Dataset, ColumnProfile } from '../types';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedColumn, setSelectedColumn] = useState<ColumnProfile | null>(null);

  if (!dataset) {
    return (
      <div
        className={`p-12 text-center rounded-xl border transition-colors ${
          isDark
            ? 'bg-slate-900/40 border-slate-800 text-slate-400'
            : 'bg-white border-gray-200 text-gray-500 shadow-xs'
        }`}
      >
        <p>No dataset selected. Please choose or upload a dataset first.</p>
      </div>
    );
  }

  const { validation, columns } = dataset;
  const activeCol = selectedColumn || columns[0] || null;

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <div
        className={`border rounded-xl p-6 transition-colors ${
          isDark
            ? 'bg-slate-900/70 border-slate-800'
            : 'bg-white border-gray-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                  isDark
                    ? 'text-[#00D2FF] bg-[#00D2FF]/10 border-[#00D2FF]/30'
                    : 'text-[#0284C7] bg-[#E0F2FE] border-[#38BDF8]/40'
                }`}
              >
                Phase 1 Schema Profiling & Health Inspection
              </span>
            </div>
            <h1 className={`text-xl font-bold mt-1 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{dataset.name}</h1>
            <p className={`text-xs max-w-2xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              Automated data validation engine computes complete descriptive statistics, checks missing value density, and flags structural anomalies before analytics modeling.
            </p>
          </div>

          {/* Health Score Pill Card */}
          <div
            className={`flex items-center gap-4 p-4 rounded-xl shrink-0 border transition-colors ${
              isDark
                ? 'bg-slate-950/80 border-slate-800'
                : 'bg-slate-50 border-gray-200'
            }`}
          >
            <div
              className={`relative flex items-center justify-center w-14 h-14 rounded-full border-2 ${
                isDark
                  ? 'bg-slate-900 border-[#00D2FF]/40'
                  : 'bg-white border-[#0284C7]/40 shadow-xs'
              }`}
            >
              <span className={`text-lg font-extrabold ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`}>
                {validation.healthScore}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>Data Quality Score</span>
                {validation.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00D2FF]" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                {validation.passed ? 'Verified safe for automated analytics' : 'Warnings present — review anomalies'}
              </p>
            </div>
          </div>
        </div>

        {/* Quick summary grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
          <div className={`p-3 rounded-lg border transition-colors ${isDark ? 'bg-slate-800/40 border-slate-700/50' : 'bg-slate-50 border-gray-200'}`}>
            <span className={`text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Total Row Count</span>
            <p className={`text-base font-bold mt-0.5 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{dataset.rowCount.toLocaleString()}</p>
          </div>
          <div className={`p-3 rounded-lg border transition-colors ${isDark ? 'bg-slate-800/40 border-slate-700/50' : 'bg-slate-50 border-gray-200'}`}>
            <span className={`text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Total Columns</span>
            <p className={`text-base font-bold mt-0.5 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{columns.length}</p>
          </div>
          <div className={`p-3 rounded-lg border transition-colors ${isDark ? 'bg-slate-800/40 border-slate-700/50' : 'bg-slate-50 border-gray-200'}`}>
            <span className={`text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Duplicate Rows</span>
            <p className={`text-base font-bold mt-0.5 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{validation.duplicateRows}</p>
          </div>
          <div className={`p-3 rounded-lg border transition-colors ${isDark ? 'bg-slate-800/40 border-slate-700/50' : 'bg-slate-50 border-gray-200'}`}>
            <span className={`text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Missing Cells</span>
            <p className={`text-base font-bold mt-0.5 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{validation.missingCellsCount}</p>
          </div>
        </div>
      </div>

      {/* Validation Checklist */}
      {validation.issues.length > 0 && (
        <div
          className={`border rounded-xl p-5 space-y-3 transition-colors ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-gray-200 shadow-xs'
          }`}
        >
          <h2 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>Validation Checks & Anomaly Signals ({validation.issues.length})</span>
          </h2>
          <div className="space-y-2">
            {validation.issues.map((issue, idx) => (
              <div
                key={idx}
                className={`flex items-start justify-between p-3 rounded-lg border text-xs transition-colors ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-gray-200'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      issue.severity === 'high'
                        ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                        : issue.severity === 'medium'
                        ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                        : 'bg-slate-700/20 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {issue.severity}
                  </span>
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>{issue.message}</p>
                    <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                      Type: <span className={`font-mono ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{issue.type}</span>
                      {issue.column && <span> • Target column: <span className="font-mono text-[#0284C7] font-semibold">{issue.column}</span></span>}
                    </p>
                  </div>
                </div>
                <span className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Count: {issue.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Column Schema & Profiling Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Column List */}
        <div
          className={`lg:col-span-5 border rounded-xl p-4 space-y-2 transition-colors ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-gray-200 shadow-xs'
          }`}
        >
          <div className={`flex items-center justify-between pb-2 border-b px-2 ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
              Dataset Attributes ({columns.length})
            </h3>
            <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Click to inspect stats</span>
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
                      ? isDark
                        ? 'bg-[#00D2FF]/15 border-[#00D2FF]/50 text-slate-100 shadow-xs'
                        : 'bg-[#E0F2FE] border-[#0284C7]/50 text-[#0284C7] shadow-xs'
                      : isDark
                        ? 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/50 text-slate-300'
                        : 'bg-slate-50 border-gray-200 hover:bg-slate-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {col.type === 'numeric' && <Hash className={`w-3.5 h-3.5 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`} />}
                    {col.type === 'categorical' && <Tag className="w-3.5 h-3.5 text-sky-400" />}
                    {col.type === 'date' && <Calendar className="w-3.5 h-3.5 text-indigo-400" />}
                    <div>
                      <p className="text-xs font-semibold">{col.name}</p>
                      <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                        {col.uniqueCount} distinct • {col.nullPercentage}% nulls
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded border ${
                      isDark
                        ? 'bg-slate-800 text-slate-300 border-slate-700'
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    {col.type}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Column Deep Profile Stats */}
        <div
          className={`lg:col-span-7 border rounded-xl p-5 space-y-4 transition-colors ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-gray-200 shadow-xs'
          }`}
        >
          {activeCol ? (
            <>
              <div className={`flex items-start justify-between pb-3 border-b ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{activeCol.name}</h3>
                    <span
                      className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${
                        isDark
                          ? 'bg-[#00D2FF]/20 text-[#00D2FF] border-[#00D2FF]/30'
                          : 'bg-[#E0F2FE] text-[#0284C7] border-[#38BDF8]/40'
                      }`}
                    >
                      {activeCol.type}
                    </span>
                  </div>
                  <p className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    Descriptive statistical characteristics calculated from {activeCol.totalCount} entries.
                  </p>
                </div>
              </div>

              {/* Numeric Stats */}
              {activeCol.type === 'numeric' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className={`p-3 rounded-lg border transition-colors ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-gray-200'}`}>
                    <span className={`text-[10px] font-semibold uppercase ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Mean (Average)</span>
                    <p className={`text-sm font-bold mt-0.5 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`}>
                      {activeCol.mean?.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg border transition-colors ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-gray-200'}`}>
                    <span className={`text-[10px] font-semibold uppercase ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Median</span>
                    <p className={`text-sm font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
                      {activeCol.median?.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg border transition-colors ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-gray-200'}`}>
                    <span className={`text-[10px] font-semibold uppercase ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Std Deviation</span>
                    <p className={`text-sm font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
                      &plusmn;{activeCol.stdDev?.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg border transition-colors ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-gray-200'}`}>
                    <span className={`text-[10px] font-semibold uppercase ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Minimum</span>
                    <p className={`text-sm font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
                      {activeCol.min?.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg border transition-colors ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-gray-200'}`}>
                    <span className={`text-[10px] font-semibold uppercase ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Maximum</span>
                    <p className={`text-sm font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
                      {activeCol.max?.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg border transition-colors ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-gray-200'}`}>
                    <span className={`text-[10px] font-semibold uppercase ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Null Rate</span>
                    <p className={`text-sm font-bold mt-0.5 ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
                      {activeCol.nullPercentage}% ({activeCol.nullCount})
                    </p>
                  </div>
                </div>
              )}

              {/* Categorical / Distribution Bars */}
              {activeCol.distribution && activeCol.distribution.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                    <BarChart2 className={`w-3.5 h-3.5 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`} />
                    <span>Top Value Frequency Distribution</span>
                  </h4>
                  <div className="space-y-1.5">
                    {activeCol.distribution.map((item, idx) => {
                      const maxVal = activeCol.distribution![0].count;
                      const pct = Math.round((item.count / maxVal) * 100);
                      return (
                        <div key={idx} className="space-y-1 text-xs">
                          <div className={`flex justify-between text-[11px] ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                            <span className="truncate max-w-[200px] font-medium">{item.label}</span>
                            <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{item.count} occurrences</span>
                          </div>
                          <div className={`h-2 w-full rounded-full overflow-hidden border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-gray-200 border-gray-300'}`}>
                            <div
                              className="h-full bg-gradient-to-r from-[#0284C7] to-[#00D2FF] rounded-full"
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
              <div className={`pt-2 border-t ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
                <span className={`text-[10px] uppercase font-bold block mb-1.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  Sample Observed Values
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {activeCol.sampleValues.map((sv, sIdx) => (
                    <span
                      key={sIdx}
                      className={`px-2 py-0.5 rounded border ${
                        isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      {String(sv)}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className={`text-center py-12 text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
              Select a column to inspect descriptive metrics.
            </div>
          )}
        </div>
      </div>

      {/* Next Step Navigation CTA */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border gap-4 transition-colors ${
          isDark
            ? 'bg-gradient-to-r from-sky-950/30 to-slate-900 border-[#0284C7]/30'
            : 'bg-gradient-to-r from-sky-50 to-white border-[#38BDF8]/40 shadow-xs'
        }`}
      >
        <div>
          <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-[#38BDF8]' : 'text-[#0284C7]'}`}>
            Ready for Analysis & Reporting
          </h4>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            Data profile is verified. Proceed to generate live interactive charts or consult the Grounded AI Analyst.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToDashboard}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
            }`}
          >
            Launch Dashboard
          </button>
          <button
            onClick={onNavigateToAi}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Ask Nharire AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
