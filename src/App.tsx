import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { DatasetManager } from './components/DatasetManager';
import { DatasetProfiler } from './components/DatasetProfiler';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AskAIAnalyst } from './components/AskAIAnalyst';
import { ReportsView } from './components/ReportsView';
import { ArchitectureView } from './components/ArchitectureView';
import { CreateModal } from './components/CreateModal';
import { Organization, Workspace, Dataset } from './types';

export function App() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWs, setSelectedWs] = useState<Workspace | null>(null);

  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  const [activeTab, setActiveTab] = useState<ActiveTab>('datasets');
  const [createModalType, setCreateModalType] = useState<'org' | 'ws' | null>(null);
  const [loading, setLoading] = useState(true);

  // Initial load: Organizations & Workspaces
  useEffect(() => {
    async function loadInit() {
      try {
        const [orgRes, wsRes] = await Promise.all([
          fetch('/api/organizations'),
          fetch('/api/workspaces'),
        ]);
        if (orgRes.ok && wsRes.ok) {
          const orgData: Organization[] = await orgRes.json();
          const wsData: Workspace[] = await wsRes.json();
          setOrganizations(orgData);
          if (orgData.length > 0) {
            setSelectedOrg(orgData[0]);
            const filteredWs = wsData.filter(w => w.organizationId === orgData[0].id);
            setWorkspaces(filteredWs);
            if (filteredWs.length > 0) {
              setSelectedWs(filteredWs[0]);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInit();
  }, []);

  // When selectedOrg changes, filter workspaces
  const handleSelectOrg = async (org: Organization) => {
    setSelectedOrg(org);
    try {
      const res = await fetch(`/api/workspaces?orgId=${org.id}`);
      if (res.ok) {
        const data: Workspace[] = await res.json();
        setWorkspaces(data);
        if (data.length > 0) {
          setSelectedWs(data[0]);
        } else {
          setSelectedWs(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // When selectedWs changes, load datasets
  useEffect(() => {
    if (!selectedWs) {
      loadAllDatasets();
      return;
    }
    loadDatasetsForWs(selectedWs.id);
  }, [selectedWs?.id]);

  const loadAllDatasets = async () => {
    try {
      const res = await fetch('/api/datasets');
      if (res.ok) {
        const data: Dataset[] = await res.json();
        setDatasets(data);
        if (data.length > 0 && !selectedDataset) {
          setSelectedDataset(data[0]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadDatasetsForWs = async (wsId: string) => {
    try {
      const res = await fetch(`/api/datasets?workspaceId=${wsId}`);
      if (res.ok) {
        const data: Dataset[] = await res.json();
        // If empty, also fall back to all datasets so user always has rich data to explore
        if (data.length === 0) {
          loadAllDatasets();
        } else {
          setDatasets(data);
          setSelectedDataset(data[0]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Upload handler
  const handleUploadDataset = async (data: {
    name: string;
    description: string;
    filename: string;
    csvContent: string;
  }) => {
    const res = await fetch('/api/datasets/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        workspaceId: selectedWs?.id || workspaces[0]?.id,
      }),
    });
    if (res.ok) {
      const created = await res.json();
      setDatasets(prev => [created, ...prev]);
      setSelectedDataset(created);
      setActiveTab('profiler');
    }
  };

  // Delete handler
  const handleDeleteDataset = async (id: string) => {
    const res = await fetch(`/api/datasets/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setDatasets(prev => prev.filter(d => d.id !== id));
      if (selectedDataset?.id === id) {
        const remaining = datasets.filter(d => d.id !== id);
        setSelectedDataset(remaining[0] || null);
      }
    }
  };

  // Create Org handler
  const handleCreateOrg = async (name: string, plan: 'Starter' | 'Pro' | 'Enterprise') => {
    const res = await fetch('/api/organizations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, plan }),
    });
    if (res.ok) {
      const newOrg = await res.json();
      setOrganizations(prev => [...prev, newOrg]);
      handleSelectOrg(newOrg);
    }
  };

  // Create Ws handler
  const handleCreateWs = async (orgId: string, name: string, description: string) => {
    const res = await fetch('/api/workspaces', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ organizationId: orgId, name, description }),
    });
    if (res.ok) {
      const newWs = await res.json();
      setWorkspaces(prev => [...prev, newWs]);
      setSelectedWs(newWs);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Top Application Header with Organization & Workspace Selectors */}
      <Header
        organizations={organizations}
        selectedOrg={selectedOrg}
        onSelectOrg={handleSelectOrg}
        workspaces={workspaces}
        selectedWs={selectedWs}
        onSelectWs={setSelectedWs}
        datasets={datasets}
        selectedDataset={selectedDataset}
        onSelectDataset={setSelectedDataset}
        onOpenCreateModal={(type) => {
          if (type === 'dataset') {
            setActiveTab('datasets');
          } else {
            setCreateModalType(type);
          }
        }}
      />

      {/* Main App Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          datasetCount={datasets.length}
          healthScore={selectedDataset?.validation?.healthScore}
        />

        {/* Tab Content Panel */}
        <main className="flex-1 p-5 md:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (selectedDataset?.id || 'none')}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === 'datasets' && (
                <DatasetManager
                  datasets={datasets}
                  selectedDataset={selectedDataset}
                  onSelectDataset={setSelectedDataset}
                  onUploadDataset={handleUploadDataset}
                  onDeleteDataset={handleDeleteDataset}
                  onNavigateTab={(tab) => setActiveTab(tab as any)}
                />
              )}

              {activeTab === 'profiler' && (
                <DatasetProfiler
                  dataset={selectedDataset}
                  onNavigateToDashboard={() => setActiveTab('dashboard')}
                  onNavigateToAi={() => setActiveTab('ai-analyst')}
                />
              )}

              {activeTab === 'dashboard' && (
                <AnalyticsDashboard
                  dataset={selectedDataset}
                  onNavigateToAi={() => setActiveTab('ai-analyst')}
                />
              )}

              {activeTab === 'ai-analyst' && (
                <AskAIAnalyst dataset={selectedDataset} />
              )}

              {activeTab === 'reports' && (
                <ReportsView dataset={selectedDataset} />
              )}

              {activeTab === 'architecture' && (
                <ArchitectureView />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Modal for creating Org or Workspace */}
      <CreateModal
        type={createModalType || 'ws'}
        isOpen={createModalType !== null}
        onClose={() => setCreateModalType(null)}
        organizations={organizations}
        selectedOrg={selectedOrg}
        onCreateOrg={handleCreateOrg}
        onCreateWs={handleCreateWs}
      />
    </div>
  );
}

export default App;
