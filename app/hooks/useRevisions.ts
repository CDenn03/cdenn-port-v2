"use client";

import { useState } from 'react';
import { routeRevisionSuccess, type RevisionResult } from '@/app/utils/revisionRouter';

interface UseRevisionsReturn {
  isProcessing: boolean;
  error: string | null;
  submitRevision: (type: 'extension' | 'general' | 'cover', data: any) => Promise<void>;
}

export function useRevisions(): UseRevisionsReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRevision = async (
    type: 'extension' | 'general' | 'cover', 
    data: any
  ): Promise<void> => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/revisions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          coverData: data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Revision submission failed');
      }

      // If we get here, the server should have redirected
      // But in case it didn't, we can handle client-side routing
      const result = await response.json();
      if (result.success) {
        routeRevisionSuccess(result as RevisionResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    error,
    submitRevision,
  };
}