'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Database,
  BarChart3,
  Bot,
  Building2,
  Settings,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Data', href: '/data', icon: Database, badge: 'Phase B' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, badge: 'Phase C' },
    { name: 'AI Analyst', href: '/ai-analyst', icon: Bot, badge: 'Phase J' },
    { name: 'Organizations / Workspace', href: '/workspaces', icon: Building2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-950/60 flex flex-col justify-between p-4 shrink-0">
      <div className="space-y-6">
        <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Intelligence Modules
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-slate-800 text-slate-500 font-mono">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Tenant Boundary Indicator */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
        <div className="flex items-center space-x-2 text-[11px] font-bold text-amber-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Tenant Boundary Safe</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          PostgreSQL multi-tenancy & Firebase Auth token verification configured.
        </p>
      </div>
    </aside>
  );
};
