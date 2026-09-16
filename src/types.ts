export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  createdAt: string;
}

export interface Workspace {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface ColumnProfile {
  name: string;
  type: 'numeric' | 'categorical' | 'date' | 'boolean';
  totalCount: number;
  nullCount: number;
  nullPercentage: number;
  uniqueCount: number;
  min?: number | string;
  max?: number | string;
  mean?: number;
  median?: number;
  stdDev?: number;
  sampleValues: (string | number)[];
  distribution?: { label: string; count: number }[];
}

export interface ValidationIssue {
  type: 'missing_values' | 'duplicates' | 'outliers' | 'type_mismatch' | 'formatting';
  severity: 'low' | 'medium' | 'high';
  column?: string;
  message: string;
  count: number;
}

export interface DatasetValidation {
  healthScore: number; // 0 - 100
  totalRows: number;
  totalColumns: number;
  duplicateRows: number;
  missingCellsCount: number;
  issues: ValidationIssue[];
  passed: boolean;
}

export interface Dataset {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  filename: string;
  fileSizeKb: number;
  rowCount: number;
  columns: ColumnProfile[];
  validation: DatasetValidation;
  sampleRows: Record<string, any>[];
  allRows?: Record<string, any>[];
  createdAt: string;
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'kpi' | 'bar' | 'line' | 'area' | 'pie' | 'table';
  columnX?: string;
  columnY?: string;
  aggregation?: 'sum' | 'avg' | 'count' | 'min' | 'max';
  data: any[];
  kpiValue?: string | number;
  kpiSubtext?: string;
  kpiTrend?: number;
  width?: 'half' | 'full';
}

export interface Dashboard {
  id: string;
  workspaceId: string;
  datasetId: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
  updatedAt: string;
}

export interface Insight {
  id: string;
  type: 'opportunity' | 'warning' | 'trend' | 'anomaly';
  title: string;
  description: string;
  metric: string;
  impactScore: 'High' | 'Medium' | 'Low';
  actionableRecommendation: string;
}

export interface BusinessReport {
  id: string;
  workspaceId: string;
  datasetId: string;
  title: string;
  period: string;
  executiveSummary: string;
  keyFindings: string[];
  metricsBreakdown: { label: string; value: string; note: string }[];
  strategicRecommendations: string[];
  generatedAt: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  verifiedDataSnippet?: {
    computedMetric: string;
    value: string | number;
    datasetName: string;
    breakdown?: { label: string; value: number }[];
  };
}
