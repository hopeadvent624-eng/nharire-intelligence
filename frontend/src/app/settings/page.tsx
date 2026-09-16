'use client';

import React from 'react';
import { Settings, Shield, Key, Database, Globe, Layers, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const envConfigs = [
    { key: 'APP_NAME', value: 'Nharire Intelligence', status: 'Active' },
    { key: 'APP_ENV', value: 'development', status: 'Active' },
    { key: 'DATABASE_URL', value: 'sqlite:///./nharire_dev.db (PostgreSQL ready)', status: 'Active' },
    { key: 'FRONTEND_URL', value: 'http://localhost:3000', status: 'Active' },
    { key: 'NEXT_PUBLIC_API_URL', value: 'http://localhost:8000', status: 'Active' },
    { key: 'MAX_UPLOAD_SIZE_MB', value: '50 MB', status: 'Active' },
    { key: 'FIREBASE_PROJECT_ID', value: 'Configured via .env', status: 'Pending credentials' },
    { key: 'LLM_MODEL', value: 'gemini-2.0-flash (Phase J ready)', status: 'Configured' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-xl font-bold text-slate-100">Platform Settings & Environment Foundation</h1>
        <p className="text-xs text-slate-400 mt-1">
          System telemetry, API routing contracts, and security variables for Nharire Intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Environment Audit */}
        <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
            <Key className="w-4 h-4 text-amber-400" />
            <span>Environment Variable Declarations (.env.example audit)</span>
          </div>

          <div className="divide-y divide-slate-800/60 font-mono text-xs">
            {envConfigs.map((item) => (
              <div key={item.key} className="py-2.5 flex items-center justify-between">
                <span className="text-slate-300">{item.key}</span>
                <span className="text-[11px] text-slate-500">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Authentication Architecture */}
        <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Authentication & Identity Flow</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-3">
            <p className="leading-relaxed">
              In Phase A, authentication verification logic is implemented via <code className="text-amber-300 font-mono">backend/app/services/firebase_auth.py</code>.
            </p>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Client sends Firebase ID Token via <code className="font-mono">Authorization: Bearer &lt;token&gt;</code></span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>FastAPI dependency verifies claims against Firebase Admin SDK</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>User record synced to PostgreSQL database with assigned tenant roles</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-xs font-bold text-slate-300 mb-1">Developer Mode</div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              When running locally without live Firebase private keys, backend dependencies gracefully provide a development superuser fallback for rapid workflow prototyping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
