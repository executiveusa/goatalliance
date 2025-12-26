import { Platform } from 'react-native';
import { Workflow } from '../types';

const baseUrl = process.env.EXPO_PUBLIC_AUTOMATION_URL;
const token = process.env.EXPO_PUBLIC_AUTOMATION_TOKEN;

const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
};

if (token) {
  defaultHeaders.Authorization = `Bearer ${token}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!baseUrl) {
    throw new Error('Automation API base URL is not configured.');
  }

  const url = `${baseUrl.replace(/\/$/, '')}${path}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      ...defaultHeaders,
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`API error ${response.status}: ${detail}`);
  }

  return response.json();
}

export async function fetchWorkflows(): Promise<Workflow[]> {
  const payload = await request<{ workflows: Workflow[] | undefined }>('/workflows');
  return payload.workflows ?? [];
}

export async function toggleWorkflow(id: string, enabled: boolean): Promise<Workflow> {
  const payload = await request<Workflow>(`/workflows/${id}`, {
    method: 'POST',
    body: JSON.stringify({ enabled, source: Platform.OS }),
  });

  return payload;
}
