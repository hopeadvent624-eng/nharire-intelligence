'use client';

import React from 'react';
import { Building2, Layers, ShieldCheck, Activity, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentOrgName?: string;
  currentWorkspaceName?: string;
  apiConnected?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentOrgName = 'Harare Commercial Data Hub',
  currentWorkspaceName = 'Production Operations',
  apiConnected = true,
}) => {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Brand & Organization Context */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-amber-500/20">
            N
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm text-slate-100 tracking-tight">
                Nharire Intelligence
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                Phase A Foundation
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Nharire Data Group &bull; African Data Intelligence</p>
          </div>
        </div>

        <div className="hidden md:block h-6 w-px bg-slate-800" />

        {/* Tenant Scope Indicators */}
        <div className="hidden lg:flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-[11px]">{currentOrgName}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </div>

          <span className="text-slate-600">/</span>

          <div className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-[11px]">{currentWorkspaceName}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </div>
        </div>
      </div>

      {/* Status & User */}
      <div className="flex items-center space-x-4">
        {/* API Health */}
        <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px]">
          <div className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
          <span className="font-mono text-slate-400">
            {apiConnected ? 'FastAPI Connected' : 'Connecting to API...'}
          </span>
        </div>

        {/* User Pill */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-800 text-xs">
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-xs font-semibold">
            TC
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-200 leading-none">Tendai Chiwenga</p>
            <p className="text-[10px] text-slate-500 leading-tight">Lead Data Architect</p>
          </div>
        </div>
      </div>
    </header>
  );
};
