'use client';

import React, { useState, useEffect } from 'react';
import { api, User } from '../../../../lib/api';
import { 
  Users, Trash2, ShieldAlert, Edit, CheckCircle, 
  X, RefreshCw, AlertTriangle 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../../components/ui/button';

export default function UsersDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  // Modals
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Edit State
  const [editRole, setEditRole] = useState<'user' | 'admin'>('user');

  const router = useRouter();

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.users.getAll();
      setUsers(res.data || []);
    } catch (err: any) {
      setError(err.message || 'Access denied or server error loading users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const activeUser = api.auth.getCurrentUser();
    setCurrentUser(activeUser);

    if (activeUser && activeUser.role === 'admin') {
      loadUsers();
    } else {
      setLoading(false);
      setError('Access denied: Administrator permissions required.');
    }
  }, []);

  const openEditModal = (userToEdit: User) => {
    setSelectedUser(userToEdit);
    setEditRole(userToEdit.role);
    setError('');
    setIsEditOpen(true);
  };

  const openDeleteModal = (userToDelete: User) => {
    setSelectedUser(userToDelete);
    setError('');
    setIsDeleteOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setSubmitting(true);
    setError('');
    try {
      await api.users.update(selectedUser._id || selectedUser.id, { role: editRole });
      setIsEditOpen(false);
      loadUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to update user role');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!selectedUser) return;
    setSubmitting(true);
    setError('');
    try {
      await api.users.delete(selectedUser._id || selectedUser.id);
      setIsDeleteOpen(false);
      loadUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to delete user');
    } finally {
      setSubmitting(false);
    }
  };

  if (currentUser && currentUser.role !== 'admin') {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-6">
        <div className="w-14 h-14 bg-red-950/20 border border-red-900/50 rounded-full flex items-center justify-center mx-auto text-red-400">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Access Unauthorized</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Standard User accounts are not authorized to view the user logs or audit tenant records. Please sign out and sign in using administrative credentials to access this system.
        </p>
        <Button
          onClick={() => router.push('/dashboard')}
          variant="secondary"
        >
          Back to Overview
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Users Auditing Portal</h1>
        <p className="text-slate-400 text-sm mt-1">Audit active accounts, adjust platform roles, and clean up inactive tenants.</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-200 text-sm max-w-2xl">
          {error}
        </div>
      )}

      {/* Main Table */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="h-7 w-7 text-brand-500 animate-spin" />
          <p className="text-slate-500 text-sm">Loading database user table...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="py-16 text-center text-slate-500">No users found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-dark-900 bg-dark-950/40">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-dark-900 border-b border-dark-850 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Role status</th>
                <th className="py-4 px-6">Created At</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-900">
              {users.map((user) => (
                <tr key={user._id || user.id} className="hover:bg-dark-900/10 transition-colors">
                  <td className="py-4 px-6 font-medium text-white flex items-center space-x-2">
                    <div className="w-7 h-7 rounded bg-brand-500/10 flex items-center justify-center text-brand-400 font-mono text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.name}</span>
                    {currentUser && (currentUser.id === user._id || currentUser._id === user._id) && (
                      <span className="text-[9px] px-1 py-0.25 bg-dark-800 text-slate-500 rounded font-semibold">You</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-slate-300 font-mono">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                      user.role === 'admin' 
                        ? 'bg-brand-500/10 text-brand-400' 
                        : 'bg-dark-800 text-slate-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openEditModal(user)}
                      className="p-1.5 h-8 w-8 rounded-lg inline-flex items-center justify-center"
                      title="Adjust User Role"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteModal(user)}
                      disabled={currentUser && (currentUser.id === user._id || currentUser._id === user._id)}
                      className="p-1.5 h-8 w-8 rounded-lg inline-flex items-center justify-center"
                      title={currentUser && (currentUser.id === user._id || currentUser._id === user._id) ? "You cannot delete yourself" : "Delete User"}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT ROLE MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/75 backdrop-blur-sm">
          <div className="w-full max-w-md p-8 rounded-2xl glass-panel border border-brand-500/10 shadow-2xl relative">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-dark-900"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Adjust User Role</h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
              Update platform access credentials for <strong className="text-white">{selectedUser?.name}</strong>.
            </p>

            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div>
                <label className="block text-slate-300 font-semibold text-xs uppercase tracking-wider mb-2">
                  System Role Status
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setEditRole('user')}
                    className={`py-2 px-4 rounded-xl border text-sm font-semibold transition-all ${
                      editRole === 'user'
                        ? 'border-brand-500 bg-brand-500/10 text-white'
                        : 'border-dark-800 bg-dark-900/40 text-slate-400 hover:border-dark-755'
                    }`}
                  >
                    Standard User
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditRole('admin')}
                    className={`py-2 px-4 rounded-xl border text-sm font-semibold transition-all ${
                      editRole === 'admin'
                        ? 'border-brand-500 bg-brand-500/10 text-white'
                        : 'border-dark-800 bg-dark-900/40 text-slate-400 hover:border-dark-755'
                    }`}
                  >
                    Administrator
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-dark-900">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center space-x-1"
                >
                  {submitting && <RefreshCw className="h-4.5 w-4.5 animate-spin mr-1" />}
                  <span>Save Role</span>
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
            <h3 className="text-xl font-bold tracking-tight text-white mb-2">Delete User Account</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Are you sure you want to delete <strong className="text-white">{selectedUser?.name}</strong>? This action will immediately revoke their dashboard access and delete all their configured agent records.
            </p>

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
                className="flex items-center space-x-1"
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
