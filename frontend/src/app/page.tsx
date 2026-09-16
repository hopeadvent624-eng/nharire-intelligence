'use client';

import React, { useEffect, useState } from 'react';
import {
  Activity,
  Server,
  Database,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { api } from '@/lib/api';
import { HealthStatus } from '@/types';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';

export default function DashboardPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getHealth();
      setHealth(data);
    } catch (err: any) {
      setError(err.message || 'Unable to communicate with FastAPI backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const architectureChecklist = [
    {
      module: 'FastAPI Backend Engine',
      status: 'Active',
      detail: 'Asynchronous Python API server with CORS and health telemetry.',
      phase: 'Phase A',
    },
    {
      module: 'Multi-Tenant PostgreSQL Architecture',
      status: 'Ready',
      detail: 'User -> Organization -> Workspace schema with Alembic versioning.',
      phase: 'Phase A',
    },
    {
      module: 'Firebase Auth & Storage Foundation',
      status: 'Configured',
      detail: 'Token verification service & isolated tenant storage paths.',
      phase: 'Phase A',
    },
    {
      module: 'Next.js 14 Enterprise Shell',
      status: 'Active',
      detail: 'TypeScript, Tailwind CSS, and resilient API client foundation.',
      phase: 'Phase A',
    },
    {
      module: 'Dataset Profiling Engine',
      status: 'Next Phase',
      detail: 'Automated schema inference and DuckDB / Polars pipeline.',
      phase: 'Phase B',
    },
    {
      module: 'Grounded AI Analyst',
      status: 'Roadmap',
      detail: 'Domain-specific analytical reasoning and question answering.',
      phase: 'Phase J',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/20 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Phase A: Core Platform Foundation
              </span>
              <span className="text-xs text-slate-500 font-mono">v0.1.0</span>
            </div>
            <h1 className="text-2xl font-black text-slate-100 tracking-tight">
              Nharire Intelligence Console
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              African-first data & AI platform foundation. Establishing multi-tenant boundaries,
              robust API contracts, secure identity integration, and high-performance frontend architecture.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/80 transition-colors"
            >
              <Server className="w-3.5 h-3.5 text-amber-400" />
              <span>Swagger API Docs</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Live System Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Backend Status Card */}
        <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Server className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {health?.status === 'ok' ? 'HEALTHY' : 'CONNECTING'}
            </span>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">FastAPI Engine</div>
            <div className="text-lg font-bold text-slate-100">
              {health ? health.service : 'Checking connection...'}
            </div>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Environment: {health ? health.environment : 'local-dev'} &bull; Python 3.11
          </div>
        </div>

        {/* Database Status Card */}
        <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Database className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              MIGRATION READY
            </span>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Relational Database</div>
            <div className="text-lg font-bold text-slate-100">PostgreSQL / SQLite</div>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Alembic Version: 0001_initial_multitenancy
          </div>
        </div>

        {/* Security & Multi-Tenancy Card */}
        <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              ENFORCED
            </span>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Multi-Tenancy Layer</div>
            <div className="text-lg font-bold text-slate-100">Org &bull; Workspace &bull; Role</div>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Firebase Auth + Storage isolated blobs
          </div>
        </div>
      </div>

      {/* Backend Connectivity Status or Error */}
      {loading && <LoadingState label="Verifying FastAPI backend connectivity..." rows={2} />}
      {error && (
        <ErrorState
          title="Backend Telemetry Alert"
          message={error}
          onRetry={fetchHealth}
        />
      )}

      {/* Architecture Execution Plan Table */}
      <div className="rounded-xl bg-slate-900/30 border border-slate-800/80 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-slate-100">Platform Foundation Architecture Tracker</h2>
            <p className="text-xs text-slate-400">
              Structured milestone delivery adhering to Nharire Data Group architectural principles.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
            Phase A In Progress
          </span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {architectureChecklist.map((item, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-900/50 transition-colors">
              <div className="flex items-center space-x-3">
                {item.status === 'Active' || item.status === 'Ready' || item.status === 'Configured' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  </div>
                )}
                <div>
                  <div className="text-xs font-semibold text-slate-200">{item.module}</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">{item.detail}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                  {item.phase}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    item.status === 'Active'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : item.status === 'Ready' || item.status === 'Configured'
                      ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
