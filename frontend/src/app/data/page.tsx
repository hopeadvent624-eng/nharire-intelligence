'use client';

import React from 'react';
import { Database, UploadCloud, FileSpreadsheet, ShieldAlert, Sparkles } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';

export default function DataPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-slate-100">Dataset Management & Ingestion</h1>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Phase B Foundation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tenant-isolated dataset storage and profiling catalog for Nharire Intelligence.
          </p>
        </div>

        <button
          disabled
          className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 text-slate-500 text-xs font-semibold cursor-not-allowed border border-slate-800"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Dataset (Phase B)</span>
        </button>
      </div>

      {/* Storage Architecture Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <span>Supported Formats</span>
          </div>
          <p className="text-xs text-slate-400">
            CSV, Parquet, JSON, and Excel tabular datasets with automated encoding detection.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
            <Database className="w-4 h-4 text-amber-400" />
            <span>Storage Engine</span>
          </div>
          <p className="text-xs text-slate-400">
            Firebase Cloud Storage with tenant-partitioned blob keys (<code className="font-mono text-[10px] text-amber-300">tenants/:org_id/:ws_id/</code>).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Analytical Runtime</span>
          </div>
          <p className="text-xs text-slate-400">
            Dual execution using DuckDB for instant SQL queries and Polars for memory-efficient transformations.
          </p>
        </div>
      </div>

      {/* Empty State */}
      <EmptyState
        icon={Database}
        badge="Phase B Pipeline Ready"
        title="No Datasets Ingested Yet"
        description="Dataset upload, automated profiling, and schema detection will be activated in Phase B. The underlying Firebase Storage service and tenant isolation paths are established in backend/app/services/firebase_storage.py."
      />
    </div>
  );
}
