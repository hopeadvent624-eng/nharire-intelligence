'use client';

import React from 'react';
import { Bot, Sparkles, MessageSquare, Terminal, ShieldCheck } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';

export default function AIAnalystPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-slate-100">AI Data Analyst</h1>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Phase J Foundation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Grounded LLM intelligence for natural language querying, automated anomaly insights, and code generation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Natural Language Queries</span>
          </div>
          <p className="text-xs text-slate-400">
            Ask conversational questions in plain English, Shona, or French about organizational datasets.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>SQL & Python Synthesis</span>
          </div>
          <p className="text-xs text-slate-400">
            Generates verified, safe queries executed inside sandboxed analytical execution environments.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Zero-Data Leakage Guard</span>
          </div>
          <p className="text-xs text-slate-400">
            Context windows only receive abstracted schema metadata and statistical summaries, never raw proprietary records.
          </p>
        </div>
      </div>

      <EmptyState
        icon={Bot}
        badge="Phase J Roadmap Foundation"
        title="AI Analyst Environment Ready"
        description="The AI Analyst will be connected in Phase J using Gemini LLM models. The environment variable LLM_API_KEY and backend configurations are already established in backend/app/core/config.py."
      />
    </div>
  );
}
