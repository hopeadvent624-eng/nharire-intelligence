import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, Trash2, ArrowRight, Table, Sparkles, Filter } from 'lucide-react';
import { Dataset } from '../types';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border transition-colors ${
          isDark
            ? 'bg-slate-900/60 border-slate-800'
            : 'bg-white border-gray-200 shadow-xs'
        }`}
      >
        <div>
          <h1 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
            <span>Datasets & Data Repository</span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                isDark
                  ? 'bg-[#00D2FF]/15 text-[#00D2FF] border-[#00D2FF]/30'
                  : 'bg-[#E0F2FE] text-[#0284C7] border-[#38BDF8]/40'
              }`}
            >
              {datasets.length} Active
            </span>
          </h1>
          <p className={`text-xs mt-1 max-w-2xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Upload CSV or Excel data for automated schema validation, anomaly profiling, and grounded AI insights. Each dataset is isolated within your current tenant workspace.
          </p>
        </div>
        <button
          id="btn-open-upload-modal"
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white text-xs font-bold rounded-lg shadow-xs transition-colors shrink-0"
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
            ? isDark
              ? 'border-[#00D2FF] bg-[#00D2FF]/10'
              : 'border-[#0284C7] bg-sky-50'
            : isDark
              ? 'border-slate-800 hover:border-slate-700 bg-slate-900/20'
              : 'border-gray-300 hover:border-gray-400 bg-white'
        }`}
      >
        <UploadCloud className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`} />
        <p className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
          Drag and drop a CSV file here, or{' '}
          <label className={`cursor-pointer underline underline-offset-2 ${isDark ? 'text-[#00D2FF] hover:text-sky-300' : 'text-[#0284C7] hover:text-[#0369A1]'}`}>
            browse to choose file
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </p>
        <p className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          Supports CSV exports with standard comma delimiters (max 15MB).
        </p>
      </div>

      {/* Dataset List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-gray-800'}`}>
            Workspace Datasets
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search datasets..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className={`rounded-md px-3 py-1.5 text-xs w-48 border focus:outline-none ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-[#00D2FF]'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#0284C7]'
              }`}
            />
            <Filter className={`w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
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
                    ? isDark
                      ? 'bg-slate-900/90 border-[#00D2FF]/80 shadow-md ring-1 ring-[#00D2FF]/30'
                      : 'bg-white border-[#0284C7] shadow-md ring-1 ring-[#0284C7]/30'
                    : isDark
                      ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-slate-50 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isDark
                          ? 'bg-slate-800 text-[#00D2FF]'
                          : 'bg-sky-50 text-[#0284C7]'
                      }`}
                    >
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold text-sm ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>{ds.name}</h3>
                        {isSelected && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              isDark
                                ? 'bg-[#00D2FF]/20 text-[#00D2FF] border-[#00D2FF]/40'
                                : 'bg-[#E0F2FE] text-[#0284C7] border-[#38BDF8]/40'
                            }`}
                          >
                            Active
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
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
                    className={`p-1.5 rounded transition-colors ${
                      isDark
                        ? 'text-slate-500 hover:text-red-400 hover:bg-slate-800'
                        : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Metadata badges */}
                <div className={`mt-4 pt-3 border-t flex flex-wrap items-center justify-between text-[11px] gap-2 ${isDark ? 'border-slate-800/80 text-slate-400' : 'border-gray-100 text-gray-500'}`}>
                  <div className="flex items-center gap-3">
                    <span><strong>{ds.rowCount}</strong> rows</span>
                    <span>•</span>
                    <span><strong>{ds.columns?.length || 0}</strong> columns</span>
                    <span>•</span>
                    <span>{ds.fileSizeKb} KB</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={isDark ? 'text-slate-500' : 'text-gray-400'}>Quality:</span>
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        ds.validation.healthScore >= 80
                          ? isDark ? 'text-[#00D2FF]' : 'text-emerald-600'
                          : ds.validation.healthScore >= 60
                          ? 'text-amber-500'
                          : 'text-red-500'
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
                  <div className={`mt-4 pt-3 border-t flex items-center gap-2 ${isDark ? 'border-slate-800/80' : 'border-gray-100'}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateTab('profiler');
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors border ${
                        isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
                      }`}
                    >
                      View Profiler
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateTab('dashboard');
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors border ${
                        isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
                      }`}
                    >
                      Open Dashboard
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateTab('ai-analyst');
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-colors border ${
                        isDark
                          ? 'bg-[#00D2FF]/15 hover:bg-[#00D2FF]/25 text-[#00D2FF] border-[#00D2FF]/30'
                          : 'bg-sky-50 hover:bg-sky-100 text-[#0284C7] border-[#38BDF8]/40'
                      }`}
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
        <div
          className={`p-5 rounded-xl border space-y-3 transition-colors ${
            isDark
              ? 'bg-slate-900/60 border-slate-800'
              : 'bg-white border-gray-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>
                <Table className={`w-4 h-4 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`} />
                <span>Sample Data Preview ({selectedDataset.name})</span>
              </h3>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                Displaying first {selectedDataset.sampleRows.length} of {selectedDataset.rowCount} total records
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('profiler')}
              className={`text-xs font-semibold flex items-center gap-1 ${
                isDark ? 'text-[#00D2FF] hover:text-sky-300' : 'text-[#0284C7] hover:text-[#0369A1]'
              }`}
            >
              <span>Full Profile & Schema</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className={`overflow-x-auto rounded-lg border ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className={`border-b ${isDark ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-slate-100 text-gray-700 border-gray-200'}`}>
                  {selectedDataset.columns.map((col) => (
                    <th key={col.name} className="px-3 py-2 font-semibold whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span>{col.name}</span>
                        <span
                          className={`text-[9px] uppercase px-1 py-0.2 rounded font-mono border ${
                            isDark
                              ? 'bg-slate-900/80 text-slate-400 border-slate-700'
                              : 'bg-white text-gray-600 border-gray-300'
                          }`}
                        >
                          {col.type}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y font-mono text-[11px] ${isDark ? 'divide-slate-800/70' : 'divide-gray-200'}`}>
                {selectedDataset.sampleRows.map((row, rIdx) => (
                  <tr key={rIdx} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                    {selectedDataset.columns.map((col) => (
                      <td key={col.name} className={`px-3 py-2 whitespace-nowrap ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                        {row[col.name] !== undefined && row[col.name] !== null
                          ? String(row[col.name])
                          : <span className="text-gray-400 italic">null</span>}
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`border rounded-xl p-6 w-full max-w-lg shadow-2xl space-y-4 ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
              <h3 className={`font-bold text-base flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
                <UploadCloud className={`w-5 h-5 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`} />
                <span>Upload Custom Dataset</span>
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className={`text-lg leading-none ${isDark ? 'text-slate-400 hover:text-slate-200' : 'text-gray-400 hover:text-gray-600'}`}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className={`block font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Dataset Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zimbabwe Agro-Dealer Monthly Sales"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  className={`w-full rounded-md px-3 py-2 border focus:outline-none ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-[#00D2FF]'
                      : 'bg-slate-50 border-gray-300 text-gray-900 focus:border-[#0284C7]'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Business Description</label>
                <input
                  type="text"
                  placeholder="Brief overview of operational context"
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  className={`w-full rounded-md px-3 py-2 border focus:outline-none ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-[#00D2FF]'
                      : 'bg-slate-50 border-gray-300 text-gray-900 focus:border-[#0284C7]'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                  CSV Data Content (Paste CSV or upload above) *
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="region,category,sales_usd,margin_pct&#10;Harare,Beverages,4500,24.5&#10;Bulawayo,Dry Goods,3200,18.2&#10;Mutare,Personal Care,1850,29.0"
                  value={csvContent}
                  onChange={(e) => setCsvContent(e.target.value)}
                  className={`w-full font-mono text-[11px] rounded-md p-3 border focus:outline-none ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-[#00D2FF]'
                      : 'bg-slate-50 border-gray-300 text-gray-900 focus:border-[#0284C7]'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className={`px-3 py-1.5 rounded ${isDark ? 'text-slate-400 hover:text-slate-200' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !uploadName || !csvContent}
                  className="px-4 py-2 bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] disabled:opacity-50 text-white font-bold rounded-md transition-colors shadow-xs"
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
