import { clientEnv } from '@/features/env/client';

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin;
  if (clientEnv.vercel.url) return `https://${clientEnv.vercel.url}`;
  return `http://localhost:3000`;
};
