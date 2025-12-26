export interface Highlight {
  id: string;
  title: string;
  description: string;
  impact: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  enabled?: boolean;
}
