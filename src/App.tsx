import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileStickyCta } from './components/MobileStickyCta';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PlatformPage } from './pages/PlatformPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Types
import { Organization, Workspace, Dataset } from './types';

function AppContent() {
  const { currentPath } = useRouter();
  const { theme } = useTheme();

  // Core Platform Data State
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWs, setSelectedWs] = useState<Workspace | null>(null);

  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
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

  // Route matching helper
  const renderCurrentPage = () => {
    // Normalise pathname
    const path = currentPath.toLowerCase().replace(/\/$/, '') || '/';

    switch (path) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/platform':
        return (
          <PlatformPage
            organizations={organizations}
            selectedOrg={selectedOrg}
            onSelectOrg={handleSelectOrg}
            workspaces={workspaces}
            selectedWs={selectedWs}
            onSelectWs={setSelectedWs}
            datasets={datasets}
            selectedDataset={selectedDataset}
            onSelectDataset={setSelectedDataset}
            onUploadDataset={handleUploadDataset}
            onDeleteDataset={handleDeleteDataset}
          />
        );
      case '/solutions':
        return <SolutionsPage />;
      case '/case-studies':
        return <CaseStudiesPage />;
      case '/faq':
        return <FaqPage />;
      case '/contact':
        return <ContactPage />;
      case '/thank-you':
        return <ThankYouPage />;
      case '/privacy-policy':
        return <PrivacyPolicyPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col antialiased transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-[#0A1128] text-slate-100 selection:bg-[#00D2FF]/30 selection:text-[#00D2FF]'
          : 'bg-[#F8FAFC] text-[#111827] selection:bg-[#0284C7]/20 selection:text-[#0284C7]'
      }`}
    >
      {/* Top Universal Navbar */}
      <Navbar />

      {/* Main Page Dynamic Outlet with Smooth Motion Transition */}
      <main className="flex-1 pb-16 md:pb-0" id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Enterprise Footer */}
      <Footer />

      {/* Mobile Sticky CTA */}
      <MobileStickyCta />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;
