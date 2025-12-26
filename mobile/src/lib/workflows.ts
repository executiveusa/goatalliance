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
import type { Dispatch, SetStateAction } from "react";

export type Workflow = {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
};

type Fetcher = typeof fetch;

const STUDIO_BASE_URL = process.env.STUDIO_BASE_URL ?? process.env.EXPO_PUBLIC_STUDIO_BASE_URL;
const STUDIO_API_TOKEN = process.env.STUDIO_API_TOKEN ?? process.env.EXPO_PUBLIC_STUDIO_API_TOKEN;

const defaultBaseUrl = "https://studio.goatalliance.ai";
const workflowsEndpoint = "/api/agent/workflows";

function getBaseUrl() {
  return (STUDIO_BASE_URL ?? defaultBaseUrl).replace(/\/$/, "");
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STUDIO_API_TOKEN) {
    headers.Authorization = `Bearer ${STUDIO_API_TOKEN}`;
  }

  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.json() as Promise<T>;
}

export async function listWorkflows(options: { fetcher?: Fetcher; signal?: AbortSignal } = {}): Promise<Workflow[]> {
  const { fetcher = fetch, signal } = options;
  const response = await fetcher(`${getBaseUrl()}${workflowsEndpoint}`, {
    headers: getHeaders(),
    signal,
  });

  const payload = await handleResponse<{ data?: Workflow[]; workflows?: Workflow[]; items?: Workflow[] }>(response);
  return payload.data ?? payload.workflows ?? payload.items ?? [];
}

export async function toggleWorkflowStatus(
  workflowId: string,
  enabled: boolean,
  options: { fetcher?: Fetcher; signal?: AbortSignal } = {},
): Promise<Workflow> {
  const { fetcher = fetch, signal } = options;
  const response = await fetcher(`${getBaseUrl()}${workflowsEndpoint}/${workflowId}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ enabled }),
    signal,
  });

  const payload = await handleResponse<{ data?: Workflow; workflow?: Workflow }>(response);
  return payload.data ?? payload.workflow ?? { id: workflowId, name: workflowId, enabled };
}

export function updateLocalWorkflowState(
  setter: Dispatch<SetStateAction<Workflow[]>>,
  workflowId: string,
  enabled: boolean,
) {
  setter((current) =>
    current.map((workflow) =>
      workflow.id === workflowId
        ? {
            ...workflow,
            enabled,
          }
        : workflow,
    ),
  );
}
