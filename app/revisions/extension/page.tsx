"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function RevisionExtensionContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const revisionId = searchParams.get('id');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-zinc-100 mb-4">
            Extension Revision
          </h1>
          {status === 'success' && (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                Revision Successful!
              </h2>
              <p className="text-emerald-700 dark:text-emerald-300">
                Your general extension cover revision has been successfully processed.
              </p>
              {revisionId && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">
                  Revision ID: {revisionId}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-8">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-zinc-100 mb-4">
            Revision Details
          </h3>
          <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
            <p>Your extension cover revision has been processed and is now active.</p>
            <p>You can now proceed with your application or make additional changes if needed.</p>
          </div>

          <div className="mt-8 flex gap-4">
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Go Back
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-6 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RevisionExtensionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    }>
      <RevisionExtensionContent />
    </Suspense>
  );
}