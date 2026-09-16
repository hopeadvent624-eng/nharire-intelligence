'use client';

import React from 'react';
import { BarChart3, LineChart, PieChart, TrendingUp, Sparkles } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-slate-100">Analytics & Aggregations</h1>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Phase C Foundation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Statistical computations, time-series projections, and interactive visualization matrices.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>Statistical Profiling</span>
          </div>
          <p className="text-xs text-slate-400">
            Mean, median, quantile distribution, missingness ratios, and cardinality scoring.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>African Market Trends</span>
          </div>
          <p className="text-xs text-slate-400">
            Pre-calibrated models for African logistics, regional currency fluctuations, and seasonal demand.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
            <PieChart className="w-4 h-4 text-amber-400" />
            <span>Export & Dashboards</span>
          </div>
          <p className="text-xs text-slate-400">
            Embedded dashboards, responsive chart export, and scheduled reporting pipelines.
          </p>
        </div>
      </div>

      <EmptyState
        icon={BarChart3}
        badge="Phase C Architecture Ready"
        title="Analytics Workspace Standing By"
        description="Analytics and aggregations will be unlocked once datasets are attached in Phase B/C. The multi-tenant workspace isolation guarantees that analytical jobs run strictly within authorized boundaries."
      />
    </div>
  );
}
