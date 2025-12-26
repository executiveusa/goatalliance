import { Highlight, Workflow } from '../types';

export const sampleHighlights: Highlight[] = [
  {
    id: 'hero-events',
    title: 'Seattle service pros thrive',
    description: 'Track leads, memberships, and concierge chat in one fluid workspace.',
    impact: '+18% faster bookings after onboarding to Lovable Cloud.',
  },
  {
    id: 'workflow-n8n',
    title: 'AI concierge ready',
    description: 'Pre-baked triggers for n8n and studio-hosted agents keep clients informed automatically.',
    impact: 'Reduce manual follow-ups with smart status nudges.',
  },
  {
    id: 'offline-mode',
    title: 'Offline first',
    description: 'Caching keeps teams productive even when vans go out of coverage.',
    impact: 'Sync resumes instantly when signal returns.',
  },
];

export const workflowCatalog: Workflow[] = [
  {
    id: 'ai-intake',
    name: 'AI Intake Desk',
    description: 'Route new inquiries to the concierge agent and notify owners.',
    enabled: true,
  },
  {
    id: 'n8n-sync',
    name: 'n8n Sync',
    description: 'Push deals into your CRM when they hit “qualified”.',
    enabled: false,
  },
  {
    id: 'supabase-backup',
    name: 'Offline Cache',
    description: 'Persist today’s schedule locally for airplane mode ride-alongs.',
    enabled: true,
  },
];
