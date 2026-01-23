'use client';

import { usePageViewTracking } from '@/hooks/useAnalytics';

export function PageViewTracker() {
  usePageViewTracking();
  return null;
}