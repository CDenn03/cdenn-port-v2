import { redirect } from 'next/navigation';

export interface RevisionResult {
  success: boolean;
  type: 'extension' | 'general' | 'cover';
  revisionId?: string;
  message?: string;
}

/**
 * Routes successful revision results to appropriate pages
 */
export function routeRevisionSuccess(result: RevisionResult): void {
  if (!result.success) {
    throw new Error('Cannot route unsuccessful revision');
  }

  const params = new URLSearchParams();
  params.set('status', 'success');
  
  if (result.revisionId) {
    params.set('id', result.revisionId);
  }
  
  if (result.message) {
    params.set('message', result.message);
  }

  // Route based on revision type
  switch (result.type) {
    case 'extension':
    case 'general':
    case 'cover':
      // All these types route to the extension page for now
      window.location.href = `/revisions/extension/?${params.toString()}`;
      break;
    default:
      throw new Error(`Unknown revision type: ${result.type}`);
  }
}

/**
 * Server-side redirect for successful revisions
 */
export function redirectRevisionSuccess(result: RevisionResult): never {
  if (!result.success) {
    throw new Error('Cannot redirect unsuccessful revision');
  }

  const params = new URLSearchParams();
  params.set('status', 'success');
  
  if (result.revisionId) {
    params.set('id', result.revisionId);
  }

  redirect(`/revisions/extension/?${params.toString()}`);
}

/**
 * Generate revision success URL
 */
export function getRevisionSuccessUrl(result: RevisionResult): string {
  const params = new URLSearchParams();
  params.set('status', 'success');
  
  if (result.revisionId) {
    params.set('id', result.revisionId);
  }
  
  if (result.message) {
    params.set('message', result.message);
  }

  return `/revisions/extension/?${params.toString()}`;
}