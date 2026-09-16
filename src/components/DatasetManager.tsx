import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, Trash2, ArrowRight, Table, Sparkles, Filter } from 'lucide-react';
import { Dataset } from '../types';

interface DatasetManagerProps {
  datasets: Dataset[];
  selectedDataset: Dataset | null;
  onSelectDataset: (ds: Dataset) => void;
  onUploadDataset: (data: { name: string; description: string; filename: string; csvContent: string }) => Promise<void>;
  onDeleteDataset: (id: string) => Promise<void>;
  onNavigateTab: (tab: 'profiler' | 'dashboard' | 'ai-analyst' | 'reports') => void;
}

export const DatasetManager: React.FC<DatasetManagerProps> = ({
  datasets,
  selectedDataset,
  onSelectDataset,
  onUploadDataset,
  onDeleteDataset,
  onNavigateTab,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [csvContent, setCsvContent] = useState('');
  const [filename, setFilename] = useState('data.csv');
  const [isUploading, setIsUploading] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setFilename(file.name);
    setUploadName(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvContent(text);
      setUploadModalOpen(true);
    };
    reader.readAsText(file);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName || !csvContent) return;
    setIsUploading(true);
    try {
      await onUploadDataset({
        name: uploadName,
        description: uploadDesc || 'Uploaded CSV dataset',
        filename,
        csvContent,
      });
      setUploadModalOpen(false);
      setUploadName('');
      setUploadDesc('');
      setCsvContent('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const filteredDatasets = datasets.filter(d =>
    d.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    d.description.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>Datasets & Data Repository</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
              {datasets.length} Active
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Upload CSV or Excel data for automated schema validation, anomaly profiling, and grounded AI insights. Each dataset is isolated within your current tenant workspace.
          </p>
        </div>
        <button
          id="btn-open-upload-modal"
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm transition-colors shrink-0"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Dataset</span>
        </button>
      </div>

      {/* Upload Drag & Drop Area */}
      <div
        id="dataset-drop-zone"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
          dragActive
            ? 'border-amber-500 bg-amber-500/10'
            : 'border-slate-800 hover:border-slate-700 bg-slate-900/20'
        }`}
      >
        <UploadCloud className="w-8 h-8 text-amber-400 mx-auto mb-2" />
        <p className="text-xs font-semibold text-slate-200">
          Drag and drop a CSV file here, or{' '}
          <label className="text-amber-400 hover:text-amber-300 cursor-pointer underline underline-offset-2">
            browse to choose file
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          Supports CSV exports with standard comma delimiters (max 15MB).
        </p>
      </div>

      {/* Dataset List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Workspace Datasets
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search datasets..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 w-48"
            />
            <Filter className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredDatasets.map((ds) => {
            const isSelected = selectedDataset?.id === ds.id;
            return (
              <div
                key={ds.id}
                id={`dataset-card-${ds.id}`}
                onClick={() => onSelectDataset(ds)}
                className={`p-5 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-slate-900/90 border-amber-500/80 shadow-md shadow-amber-950/20 ring-1 ring-amber-500/30'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-100 text-sm">{ds.name}</h3>
                        {isSelected && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {ds.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete dataset "${ds.name}"?`)) {
                        onDeleteDataset(ds.id);
                      }
                    }}
                    title="Delete dataset"
                    className="p-1.5 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Metadata badges */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                  <div className="flex items-center gap-3">
                    <span><strong>{ds.rowCount}</strong> rows</span>
                    <span>•</span>
                    <span><strong>{ds.columns?.length || 0}</strong> columns</span>
                    <span>•</span>
                    <span>{ds.fileSizeKb} KB</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">Quality:</span>
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        ds.validation.healthScore >= 80
                          ? 'text-emerald-400'
                          : ds.validation.healthScore >= 60
                          ? 'text-amber-400'
                          : 'text-red-400'
                      }`}
                    >
                      {ds.validation.healthScore >= 80 ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      )}
                      {ds.validation.healthScore}/100
                    </span>
                  </div>
                </div>

                {/* Quick actions for selected dataset */}
                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateTab('profiler');
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition-colors"
                    >
                      View Profiler
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateTab('dashboard');
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition-colors"
                    >
                      Open Dashboard
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateTab('ai-analyst');
                      }}
                      className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-[11px] font-medium flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Ask AI</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Raw Sample Preview for Selected Dataset */}
      {selectedDataset && selectedDataset.sampleRows && selectedDataset.sampleRows.length > 0 && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Table className="w-4 h-4 text-amber-400" />
                <span>Sample Data Preview ({selectedDataset.name})</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Displaying first {selectedDataset.sampleRows.length} of {selectedDataset.rowCount} total records
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('profiler')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <span>Full Profile & Schema</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                  {selectedDataset.columns.map((col) => (
                    <th key={col.name} className="px-3 py-2 font-semibold whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span>{col.name}</span>
                        <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-slate-900/80 text-slate-400 font-mono">
                          {col.type}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 font-mono text-[11px]">
                {selectedDataset.sampleRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/40">
                    {selectedDataset.columns.map((col) => (
                      <td key={col.name} className="px-3 py-2 text-slate-300 whitespace-nowrap">
                        {row[col.name] !== undefined && row[col.name] !== null
                          ? String(row[col.name])
                          : <span className="text-slate-600 italic">null</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-amber-400" />
                <span>Upload Custom Dataset</span>
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Dataset Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zimbabwe Agro-Dealer Monthly Sales"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Business Description</label>
                <input
                  type="text"
                  placeholder="Brief overview of operational context"
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  CSV Data Content (Paste CSV or upload above) *
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="region,category,sales_usd,margin_pct&#10;Harare,Beverages,4500,24.5&#10;Bulawayo,Dry Goods,3200,18.2&#10;Mutare,Personal Care,1850,29.0"
                  value={csvContent}
                  onChange={(e) => setCsvContent(e.target.value)}
                  className="w-full font-mono text-[11px] bg-slate-950 border border-slate-800 rounded-md p-3 text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-3 py-1.5 rounded text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !uploadName || !csvContent}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-md transition-colors"
                >
                  {isUploading ? 'Validating & Profiling...' : 'Upload & Validate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
