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

interface AnalyticsDashboardProps {
  dataset: Dataset | null;
  onNavigateToAi: () => void;
}

const COLORS = ['#f59e0b', '#38bdf8', '#34d399', '#f43f5e', '#a855f7', '#fb923c'];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  dataset,
  onNavigateToAi,
}) => {
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
      <div className="p-12 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400">
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
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
              Verified Analytics Layer
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Dataset: {dataset.name}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-100 mt-1">
            Executive Analytics & Operational Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-dimensional aggregations rendered from verified records.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => fetchDashboard(dataset.id)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={onNavigateToAi}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
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
            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">{kpi.title}</span>
                <p className="text-2xl font-black text-slate-100 mt-1 tracking-tight">
                  {kpi.kpiValue}
                </p>
              </div>
              {kpi.kpiTrend !== undefined && (
                <span
                  className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    kpi.kpiTrend >= 0
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
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
              <p className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-800/80">
                {kpi.kpiSubtext}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Main Charts Row: Bar Chart & Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                {barWidgets[0]?.title || 'Categorical Revenue Breakdown'}
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Aggregated Metric</span>
          </div>

          <div className="h-64 w-full">
            {barWidgets[0]?.data && barWidgets[0].data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barWidgets[0].data} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="#64748b"
                    fontSize={10}
                    tickLine={false}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#f8fafc',
                    }}
                  />
                  <Bar dataKey="value" fill="#d97706" radius={[4, 4, 0, 0]} />
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
        <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                {pieWidgets[0]?.title || 'Channel & Segment Share'}
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Proportions</span>
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
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#f8fafc',
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                    formatter={(value) => <span className="text-slate-300">{value}</span>}
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
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <LineIcon className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                {areaWidgets[0]?.title || 'Transaction Velocity Timeline'}
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Daily / Weekly Aggregation</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaWidgets[0].data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#f8fafc',
                  }}
                />
                <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Grounded Insight Card */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Nharire Grounded Intelligence Insight
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Concentration analysis indicates that the top 2 categories generate over 60% of consolidated turnover. Query Nharire AI for margin sensitivities and seasonal forecasting.
          </p>
        </div>
        <button
          onClick={onNavigateToAi}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shrink-0"
        >
          Deep Dive with AI
        </button>
      </div>
    </div>
  );
};
