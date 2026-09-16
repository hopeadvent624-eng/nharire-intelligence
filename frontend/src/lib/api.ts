import { HealthStatus, Organization, Workspace, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        let errorDetail = response.statusText;
        try {
          const errJson = await response.json();
          errorDetail = errJson.detail || errJson.message || errorDetail;
        } catch {
          // ignore non-json error responses
        }
        throw new Error(`API Error [${response.status}]: ${errorDetail}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error(`Fetch failed for ${url}:`, error);
      throw error;
    }
  }

  // Health check
  async getHealth(): Promise<HealthStatus> {
    return this.request<HealthStatus>('/health');
  }

  async getV1Health(): Promise<HealthStatus> {
    return this.request<HealthStatus>('/api/v1/health');
  }

  // Organizations
  async getOrganizations(): Promise<Organization[]> {
    return this.request<Organization[]>('/api/v1/organizations');
  }

  async createOrganization(data: { name: string; slug: string; plan?: string }): Promise<Organization> {
    return this.request<Organization>('/api/v1/organizations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Workspaces
  async getWorkspaces(organizationId: string): Promise<Workspace[]> {
    return this.request<Workspace[]>(`/api/v1/workspaces?organization_id=${encodeURIComponent(organizationId)}`);
  }

  async createWorkspace(data: { organization_id: string; name: string; slug: string; description?: string }): Promise<Workspace> {
    return this.request<Workspace>('/api/v1/workspaces', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // User
  async getCurrentUser(): Promise<User> {
    return this.request<User>('/api/v1/users/me');
  }
}

export const api = new ApiClient(API_BASE_URL);
