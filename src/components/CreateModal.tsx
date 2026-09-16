import React, { useState } from 'react';
import { Building2, Layers, Plus } from 'lucide-react';
import { Organization } from '../types';

interface CreateModalProps {
  type: 'org' | 'ws';
  isOpen: boolean;
  onClose: () => void;
  organizations: Organization[];
  selectedOrg: Organization | null;
  onCreateOrg: (name: string, plan: 'Starter' | 'Pro' | 'Enterprise') => Promise<void>;
  onCreateWs: (orgId: string, name: string, description: string) => Promise<void>;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  type,
  isOpen,
  onClose,
  organizations,
  selectedOrg,
  onCreateOrg,
  onCreateWs,
}) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [plan, setPlan] = useState<'Starter' | 'Pro' | 'Enterprise'>('Pro');
  const [orgId, setOrgId] = useState(selectedOrg?.id || organizations[0]?.id || '');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      if (type === 'org') {
        await onCreateOrg(name, plan);
      } else {
        await onCreateWs(orgId || selectedOrg?.id || '', name, desc);
      }
      setName('');
      setDesc('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            {type === 'org' ? (
              <Building2 className="w-5 h-5 text-amber-400" />
            ) : (
              <Layers className="w-5 h-5 text-amber-400" />
            )}
            <h3 className="font-bold text-slate-100 text-sm">
              {type === 'org' ? 'Create New Organization' : 'Create New Workspace'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 text-lg leading-none">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {type === 'ws' && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Organization</label>
              <select
                value={orgId}
                onChange={(e) => setOrgId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name} ({org.plan})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {type === 'org' ? 'Organization Legal Name *' : 'Workspace Name *'}
            </label>
            <input
              type="text"
              required
              placeholder={type === 'org' ? 'e.g. Masvingo Agro-Logistics Ltd' : 'e.g. Q1 Marketing & FMCG'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {type === 'org' ? (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Subscription Tier</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Starter">Starter (Up to 5 datasets)</option>
                <option value="Pro">Pro (Unlimited datasets + AI queries)</option>
                <option value="Enterprise">Enterprise (Custom analytics pipelines)</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Workspace Description</label>
              <input
                type="text"
                placeholder="Scope of work or project focus"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-md transition-colors"
            >
              {submitting ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
