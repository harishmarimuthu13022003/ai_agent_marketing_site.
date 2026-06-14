'use client';

import React, { useState, useEffect } from 'react';
import { api, Agent, User } from '../../../../lib/api';
import { 
  Plus, Edit2, Trash2, Search, X, Cpu, 
  Sliders, Play, AlertTriangle, RefreshCw,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';

export default function AgentsDashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    type: 'support',
    status: 'idle',
    description: '',
    temperature: 0.7,
    systemPrompt: '',
    agentApi: ''
  });

  const loadAgents = async (searchTerm = '') => {
    setLoading(true);
    setError('');
    try {
      const res = await api.agents.getAll(searchTerm);
      setAgents(res.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load agents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadAgents(search);
  };

  const openCreateModal = () => {
    setSelectedAgent(null);
    setFormData({
      name: '',
      type: 'support',
      status: 'idle',
      description: '',
      temperature: 0.7,
      systemPrompt: '',
      agentApi: ''
    });
    setError('');
    setIsFormOpen(true);
  };

  const openEditModal = (agent: Agent) => {
    setSelectedAgent(agent);
    setFormData({
      name: agent.name || '',
      type: agent.type || 'support',
      status: agent.status || 'idle',
      description: agent.config?.description || '',
      temperature: agent.config?.temperature ?? 0.7,
      systemPrompt: agent.config?.systemPrompt || '',
      agentApi: agent.config?.agentApi || ''
    });
    setError('');
    setIsFormOpen(true);
  };

  const openDeleteModal = (agent: Agent) => {
    setSelectedAgent(agent);
    setError('');
    setIsDeleteOpen(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Agent name is required');
      return;
    }

    setSubmitting(true);
    const agentPayload = {
      name: formData.name,
      type: formData.type as 'support' | 'research' | 'workflow' | 'custom',
      status: formData.status as 'active' | 'idle' | 'failed',
      config: {
        description: formData.description,
        temperature: parseFloat(formData.temperature as any) || 0.7,
        systemPrompt: formData.systemPrompt,
        agentApi: formData.agentApi
      }
    };

    try {
      if (selectedAgent) {
        // Update Action
        await api.agents.update(selectedAgent._id, agentPayload);
      } else {
        // Create Action
        await api.agents.create(agentPayload);
      }
      setIsFormOpen(false);
      loadAgents(search);
    } catch (err: any) {
      setError(err.message || 'Failed to save agent');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!selectedAgent) return;
    setSubmitting(true);
    setError('');
    try {
      await api.agents.delete(selectedAgent._id);
      setIsDeleteOpen(false);
      loadAgents(search);
    } catch (err: any) {
      setError(err.message || 'Failed to delete agent');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400">active</span>;
      case 'failed':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-500/10 text-red-400">failed</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-500/10 text-slate-400">idle</span>;
    }
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'support':
        return <Cpu className="h-5 w-5 text-emerald-400" />;
      case 'research':
        return <Sliders className="h-5 w-5 text-violet-400" />;
      case 'workflow':
        return <Play className="h-5 w-5 text-blue-400" />;
      default:
        return <Cpu className="h-5 w-5 text-brand-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">AI Agents Workspace</h1>
          <p className="text-slate-400 text-sm mt-1">Configure and manage autonomous pipelines.</p>
        </div>
        <Button
          onClick={openCreateModal}
          className="self-start sm:self-auto hover:scale-[1.02]"
        >
          <Plus className="h-4.5 w-4.5 stroke-[2.5]" />
          <span>New Agent</span>
        </Button>
      </div>

      {/* Search Bar Form */}
      <form onSubmit={handleSearchSubmit} className="flex space-x-3 max-w-md items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agents by name..."
            className="pl-9 bg-dark-900/60 border-dark-850 hover:border-dark-750"
          />
        </div>
        <Button
          type="submit"
          variant="secondary"
          className="h-11 px-4 py-2"
        >
          Find
        </Button>
      </form>

      {/* Main List Area */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="h-7 w-7 text-brand-500 animate-spin" />
          <p className="text-slate-500 text-sm">Fetching agent configurations...</p>
        </div>
      ) : agents.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-dark-850 rounded-2xl p-8 max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-xl bg-dark-900 border border-dark-805 flex items-center justify-center mx-auto text-slate-600">
            <Cpu className="h-6 w-6" />
          </div>
          <h3 className="text-white font-bold text-base">No AI Agents Configured</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            You don't have any agent tasks running yet. Create your first autonomous support or research agent container to begin.
          </p>
          <Button
            onClick={openCreateModal}
          >
            Create Agent
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent._id} className="p-6 rounded-xl glass-panel flex flex-col justify-between hover:border-brand-500/20 transition-all duration-200">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-dark-900 border border-dark-850 flex items-center justify-center">
                      {getAgentIcon(agent.type)}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm sm:text-base leading-none truncate max-w-[130px]">{agent.name}</h3>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block mt-1">{agent.type}</span>
                    </div>
                  </div>
                  {getStatusBadge(agent.status)}
                </div>

                <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 min-h-[40px]">
                  {agent.config?.description || 'No system description set.'}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-dark-900/60">
                  <span>Temp: {agent.config?.temperature ?? 0.7}</span>
                  <span className="truncate max-w-[120px]">Owner: {typeof agent.owner === 'object' ? agent.owner?.name : 'You'}</span>
                </div>
                {agent.config?.agentApi && (
                  <div className="mt-2 pt-1 text-[11px] text-slate-500 truncate border-t border-dark-900/40">
                    <span className="font-semibold text-slate-400">API:</span> <span className="font-mono text-brand-400/90">{agent.config.agentApi}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-dark-900 flex justify-between items-center">
                <a 
                  href={agent.config?.agentApi || `http://localhost:5000/api/agents/${agent._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center space-x-1.5 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>{agent.config?.agentApi ? 'Custom API Link' : 'Live API Link'}</span>
                </a>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openEditModal(agent)}
                    className="p-2 h-9 w-9 rounded-lg"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteModal(agent)}
                    className="p-2 h-9 w-9 bg-red-950/20 border border-red-900/40 hover:bg-red-650 hover:text-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE & EDIT FORM MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/75 backdrop-blur-sm">
          <div className="w-full max-w-lg p-8 rounded-2xl glass-panel border border-brand-500/10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-dark-900"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
              {selectedAgent ? 'Update Agent Settings' : 'Deploy New Agent'}
            </h2>

            {error && (
              <div className="mb-4 p-4 rounded-xl bg-red-950/30 border border-red-900/50 flex items-start space-x-2 text-red-200 text-xs">
                <AlertTriangle className="h-4.5 w-4.5 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold text-xs uppercase tracking-wider mb-2">
                  Agent Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="e.g. support-bot-invoice"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold text-xs uppercase tracking-wider mb-2">
                    Agent Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="w-full bg-dark-900 border border-dark-850 focus:border-brand-500 focus:outline-none rounded-xl px-3 py-2.5 text-sm text-white h-11"
                  >
                    <option value="support">Customer Support</option>
                    <option value="research">Deep Research</option>
                    <option value="workflow">Workflow Automate</option>
                    <option value="custom">Custom Agent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold text-xs uppercase tracking-wider mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className="w-full bg-dark-900 border border-dark-850 focus:border-brand-500 focus:outline-none rounded-xl px-3 py-2.5 text-sm text-white h-11"
                  >
                    <option value="idle">Idle</option>
                    <option value="active">Active</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold text-xs uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={2}
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Summarize the core execution task assigned to this agent..."
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-brand-500 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white hover:border-slate-700 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between items-center">
                  <label className="block text-slate-300 font-semibold text-xs uppercase tracking-wider">
                    Model Temperature
                  </label>
                  <span className="text-xs text-brand-400 font-mono font-semibold">{formData.temperature}</span>
                </div>
                <input
                  type="range"
                  name="temperature"
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  value={formData.temperature}
                  onChange={handleFormChange}
                  className="w-full accent-brand-500 h-1.5 bg-dark-900 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold text-xs uppercase tracking-wider mb-2">
                  System Prompt
                </label>
                <textarea
                  name="systemPrompt"
                  rows={3}
                  value={formData.systemPrompt}
                  onChange={handleFormChange}
                  placeholder="You are an AI research specialist designed to scan logs..."
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-brand-500 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white font-mono text-xs hover:border-slate-700 transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold text-xs uppercase tracking-wider mb-2">
                  Agent API Endpoint
                </label>
                <Input
                  type="text"
                  name="agentApi"
                  value={formData.agentApi}
                  onChange={handleFormChange}
                  placeholder="e.g. https://api.aether.ai/v1/agents/my-agent"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-dark-900">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center space-x-1.5"
                >
                  {submitting && <RefreshCw className="h-4.5 w-4.5 animate-spin mr-1" />}
                  <span>{selectedAgent ? 'Save Changes' : 'Deploy'}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/75 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-xl glass-panel border border-red-900/20 shadow-2xl relative">
            <h3 className="text-xl font-bold tracking-tight text-white mb-2">Confirm Agent Deletion</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Are you sure you want to delete <strong className="text-white">{selectedAgent?.name}</strong>? This action cannot be undone and will immediately wipe all execution container history.
            </p>

            {error && (
              <div className="mb-4 p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-200 text-xs">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                variant="ghost"
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteSubmit}
                disabled={submitting}
                className="flex items-center space-x-1.5"
              >
                {submitting && <RefreshCw className="h-4.5 w-4.5 animate-spin mr-1" />}
                <span>Confirm Delete</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
