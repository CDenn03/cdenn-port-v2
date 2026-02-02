"use client";

import { useState } from 'react';
import { useRevisions } from '@/app/hooks/useRevisions';

export function RevisionForm() {
  const [formData, setFormData] = useState({
    coverType: 'general',
    description: '',
    attachments: [],
  });
  
  const { isProcessing, error, submitRevision } = useRevisions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitRevision('extension', formData);
      // If successful, user will be redirected to /revisions/extension/
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mb-6">
        Submit Extension Cover Revision
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Cover Type
          </label>
          <select
            value={formData.coverType}
            onChange={(e) => setFormData(prev => ({ ...prev, coverType: e.target.value }))}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
          >
            <option value="general">General Extension</option>
            <option value="specific">Specific Extension</option>
            <option value="emergency">Emergency Extension</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            placeholder="Describe your revision request..."
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? 'Processing...' : 'Submit Revision'}
        </button>
      </form>
    </div>
  );
}