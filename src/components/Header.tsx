import React from 'react';
import { Building2, Layers, Database, ShieldCheck, ChevronDown, Plus, Sparkles } from 'lucide-react';
import { Organization, Workspace, Dataset } from '../types';

interface HeaderProps {
  organizations: Organization[];
  selectedOrg: Organization | null;
  onSelectOrg: (org: Organization) => void;
  workspaces: Workspace[];
  selectedWs: Workspace | null;
  onSelectWs: (ws: Workspace) => void;
  datasets: Dataset[];
  selectedDataset: Dataset | null;
  onSelectDataset: (ds: Dataset) => void;
  onOpenCreateModal: (type: 'org' | 'ws' | 'dataset') => void;
}

export const Header: React.FC<HeaderProps> = ({
  organizations,
  selectedOrg,
  onSelectOrg,
  workspaces,
  selectedWs,
  onSelectWs,
  datasets,
  selectedDataset,
  onSelectDataset,
  onOpenCreateModal,
}) => {
  return (
    <header id="app-header" className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-5 py-3 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Brand & Tagline */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md shadow-amber-950/40 text-slate-950 font-bold text-lg">
              <span>N</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-100 tracking-tight text-base">Nharire Intelligence</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  Data Group
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
                See Further. Know More. Decide Better.
              </p>
            </div>
          </div>

          <div className="hidden lg:block h-6 w-px bg-slate-800" />

          {/* Org & Workspace Selectors */}
          <div className="flex items-center gap-2">
            {/* Organization Selector */}
            <div className="relative group">
              <select
                id="org-selector"
                value={selectedOrg?.id || ''}
                onChange={(e) => {
                  const found = organizations.find((o) => o.id === e.target.value);
                  if (found) onSelectOrg(found);
                }}
                aria-label="Select Organization"
                className="appearance-none bg-slate-800/80 border border-slate-700 hover:border-slate-600 rounded-md py-1.5 pl-8 pr-7 text-xs font-medium text-slate-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {organizations.map((org) => (
                  <option key={org.id} value={org.id} className="bg-slate-900 text-slate-200">
                    {org.name} ({org.plan})
                  </option>
                ))}
              </select>
              <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Workspace Selector */}
            <div className="relative group">
              <select
                id="workspace-selector"
                value={selectedWs?.id || ''}
                onChange={(e) => {
                  const found = workspaces.find((w) => w.id === e.target.value);
                  if (found) onSelectWs(found);
                }}
                aria-label="Select Workspace"
                className="appearance-none bg-slate-800/80 border border-slate-700 hover:border-slate-600 rounded-md py-1.5 pl-8 pr-7 text-xs font-medium text-slate-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {workspaces.map((ws) => (
                  <option key={ws.id} value={ws.id} className="bg-slate-900 text-slate-200">
                    {ws.name}
                  </option>
                ))}
              </select>
              <Layers className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              id="btn-add-workspace"
              onClick={() => onOpenCreateModal('ws')}
              title="Create new workspace"
              className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Active Dataset Pill & Actions */}
        <div className="flex items-center gap-3">
          {datasets.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium hidden md:inline">Dataset:</span>
              <div className="relative">
                <select
                  id="active-dataset-selector"
                  value={selectedDataset?.id || ''}
                  onChange={(e) => {
                    const found = datasets.find((d) => d.id === e.target.value);
                    if (found) onSelectDataset(found);
                  }}
                  aria-label="Select Active Dataset"
                  className="appearance-none bg-amber-500/10 border border-amber-500/30 hover:border-amber-500/60 rounded-md py-1.5 pl-8 pr-7 text-xs font-medium text-amber-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400"
                >
                  {datasets.map((d) => (
                    <option key={d.id} value={d.id} className="bg-slate-900 text-slate-200">
                      {d.name} ({d.rowCount} rows)
                    </option>
                  ))}
                </select>
                <Database className="w-3.5 h-3.5 text-amber-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <ChevronDown className="w-3 h-3 text-amber-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}

          <button
            id="btn-upload-nav"
            onClick={() => onOpenCreateModal('dataset')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold text-xs rounded-md shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Data</span>
          </button>
        </div>
      </div>
    </header>
  );
};
