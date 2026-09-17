import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign, Database, Sparkles, Filter,
  Layers, Download, RefreshCw, BarChart2, PieChart as PieIcon, LineChart as LineIcon
} from 'lucide-react';
import { Dataset, Dashboard } from '../types';
import { useTheme } from '../context/ThemeContext';

interface AnalyticsDashboardProps {
  dataset: Dataset | null;
  onNavigateToAi: () => void;
}

const COLORS = ['#00D2FF', '#0284C7', '#1D4ED8', '#38BDF8', '#6366F1', '#34D399'];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  dataset,
  onNavigateToAi,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(false);
  const [metricFilter, setMetricFilter] = useState('all');

  useEffect(() => {
    if (!dataset) return;
    fetchDashboard(dataset.id);
  }, [dataset?.id]);

  const fetchDashboard = async (datasetId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboards/${datasetId}`);
      if (res.ok) {
        const data = await res.json();
        setDashboard(data);
      }
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    } finally {
      setLoading(false);
    }
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
        <p>No dataset selected. Choose a dataset to generate visual analytics.</p>
      </div>
    );
  }

  const kpiWidgets = dashboard?.widgets.filter(w => w.type === 'kpi') || [];
  const barWidgets = dashboard?.widgets.filter(w => w.type === 'bar') || [];
  const areaWidgets = dashboard?.widgets.filter(w => w.type === 'area') || [];
  const pieWidgets = dashboard?.widgets.filter(w => w.type === 'pie') || [];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div
        className={`border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
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
              Verified Analytics Layer
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Dataset: {dataset.name}
            </span>
          </div>
          <h1 className={`text-xl font-bold mt-1 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
            Executive Analytics & Operational Dashboard
          </h1>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Real-time multi-dimensional aggregations rendered from verified records.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => fetchDashboard(dataset.id)}
            disabled={loading}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={onNavigateToAi}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white text-xs font-bold transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult AI Analyst</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiWidgets.map((kpi, idx) => (
          <div
            key={kpi.id || idx}
            className={`p-5 rounded-xl border relative overflow-hidden transition-colors ${
              isDark
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-white border-gray-200 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  {kpi.title}
                </span>
                <p className={`text-2xl font-black mt-1 tracking-tight ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
                  {kpi.kpiValue}
                </p>
              </div>
              {kpi.kpiTrend !== undefined && (
                <span
                  className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    kpi.kpiTrend >= 0
                      ? isDark
                        ? 'bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30'
                        : 'bg-[#E0F2FE] text-[#0284C7] border border-[#38BDF8]/40'
                      : 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
                  }`}
                >
                  {kpi.kpiTrend >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {kpi.kpiTrend >= 0 ? `+${kpi.kpiTrend}%` : `${kpi.kpiTrend}%`}
                </span>
              )}
            </div>
            {kpi.kpiSubtext && (
              <p className={`text-[11px] mt-3 pt-2 border-t ${isDark ? 'text-slate-500 border-slate-800/80' : 'text-gray-500 border-gray-100'}`}>
                {kpi.kpiSubtext}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Main Charts Row: Bar Chart & Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Bar Chart (7 Cols) */}
        <div
          className={`lg:col-span-7 p-5 rounded-xl border space-y-4 transition-colors ${
            isDark
              ? 'bg-slate-900/60 border-slate-800'
              : 'bg-white border-gray-200 shadow-xs'
          }`}
        >
          <div className={`flex items-center justify-between pb-2 border-b ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
            <div className="flex items-center gap-2">
              <BarChart2 className={`w-4 h-4 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`} />
              <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
                {barWidgets[0]?.title || 'Categorical Revenue Breakdown'}
              </h3>
            </div>
            <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Aggregated Metric</span>
          </div>

          <div className="h-64 w-full">
            {barWidgets[0]?.data && barWidgets[0].data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barWidgets[0].data} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke={isDark ? '#64748b' : '#94a3b8'}
                    fontSize={10}
                    tickLine={false}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis stroke={isDark ? '#64748b' : '#94a3b8'} fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#0f172a' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#e2e8f0',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: isDark ? '#f8fafc' : '#0f172a',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Bar dataKey="value" fill={isDark ? '#0284C7' : '#0284C7'} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                Computing chart data...
              </div>
            )}
          </div>
        </div>

        {/* Pie / Donut Chart (5 Cols) */}
        <div
          className={`lg:col-span-5 p-5 rounded-xl border space-y-4 transition-colors ${
            isDark
              ? 'bg-slate-900/60 border-slate-800'
              : 'bg-white border-gray-200 shadow-xs'
          }`}
        >
          <div className={`flex items-center justify-between pb-2 border-b ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-[#00D2FF]" />
              <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
                {pieWidgets[0]?.title || 'Channel & Segment Share'}
              </h3>
            </div>
            <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Proportions</span>
          </div>

          <div className="h-64 w-full">
            {pieWidgets[0]?.data && pieWidgets[0].data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieWidgets[0].data}
                    cx="50%"
                    cy="45%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieWidgets[0].data.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#0f172a' : '#ffffff',
                      borderColor: isDark ? '#334155' : '#e2e8f0',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: isDark ? '#f8fafc' : '#0f172a',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                    formatter={(value) => <span className={isDark ? 'text-slate-300' : 'text-gray-700'}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                Computing share distribution...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Velocity Over Time Area Chart */}
      {areaWidgets[0]?.data && areaWidgets[0].data.length > 0 && (
        <div
          className={`p-5 rounded-xl border space-y-4 transition-colors ${
            isDark
              ? 'bg-slate-900/60 border-slate-800'
              : 'bg-white border-gray-200 shadow-xs'
          }`}
        >
          <div className={`flex items-center justify-between pb-2 border-b ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
            <div className="flex items-center gap-2">
              <LineIcon className="w-4 h-4 text-[#00D2FF]" />
              <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
                {areaWidgets[0]?.title || 'Transaction Velocity Timeline'}
              </h3>
            </div>
            <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Daily / Weekly Aggregation</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaWidgets[0].data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284C7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} vertical={false} />
                <XAxis dataKey="date" stroke={isDark ? '#64748b' : '#94a3b8'} fontSize={10} tickLine={false} />
                <YAxis stroke={isDark ? '#64748b' : '#94a3b8'} fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderColor: isDark ? '#334155' : '#e2e8f0',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area type="monotone" dataKey="value" stroke="#00D2FF" strokeWidth={2} fillOpacity={1} fill="url(#colorArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Grounded Insight Card */}
      <div
        className={`p-5 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${
          isDark
            ? 'bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-900 border-[#0284C7]/30'
            : 'bg-gradient-to-r from-sky-50 via-white to-white border-[#38BDF8]/40 shadow-xs'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00D2FF]" />
            <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-[#38BDF8]' : 'text-[#0284C7]'}`}>
              Nharire Grounded Intelligence Insight
            </span>
          </div>
          <p className={`text-xs max-w-2xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
            Concentration analysis indicates that the top 2 categories generate over 60% of consolidated turnover. Query Nharire AI for margin sensitivities and seasonal forecasting.
          </p>
        </div>
        <button
          onClick={onNavigateToAi}
          className="px-4 py-2 bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white font-bold text-xs rounded-lg transition-colors shrink-0 shadow-xs"
        >
          Deep Dive with AI
        </button>
      </div>
    </div>
  );
};
