import React from 'react';
import { Database, BarChart3, Bot, FileText, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

export type ActiveTab = 'datasets' | 'profiler' | 'dashboard' | 'ai-analyst' | 'reports' | 'architecture';

interface SidebarProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  datasetCount: number;
  healthScore?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onChangeTab,
  datasetCount,
  healthScore,
}) => {
  const items: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string | number }[] = [
    { id: 'datasets', label: 'Datasets & Files', icon: Database, badge: datasetCount },
    { id: 'profiler', label: 'Data Profiler & Health', icon: CheckCircle2, badge: healthScore ? `${healthScore}%` : undefined },
    { id: 'dashboard', label: 'Executive Dashboard', icon: BarChart3 },
    { id: 'ai-analyst', label: 'Ask Nharire AI', icon: Bot, badge: 'Grounded' },
    { id: 'reports', label: 'Business Reports', icon: FileText },
    { id: 'architecture', label: 'System Architecture', icon: Cpu },
  ];

  return (
    <aside id="app-sidebar" className="w-full md:w-64 border-r border-slate-800 bg-slate-900/40 p-4 shrink-0 flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
            Intelligence Modules
          </span>
          <nav className="mt-2 space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onChangeTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? 'bg-amber-500/30 text-amber-200'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Multi-tenant status card */}
        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-200">Verified Analytics Active</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            All metrics calculated server-side in TypeScript before AI synthesis. Zero hallucination guarantee.
          </p>
        </div>
      </div>

      {/* Footer info */}
      <div className="pt-4 border-t border-slate-800/80 text-[10px] text-slate-400">
        <p className="font-semibold text-slate-400">Nharire Data Group &copy; 2025</p>
        <p>Phase 1 MVP Platform</p>
      </div>
    </aside>
  );
};
