import { api } from "encore.dev/api";

// Health check endpoint
export const health = api(
  { method: "GET", expose: true, path: "/health" },
  async (): Promise<{ status: string; message: string; timestamp: string }> => {
    return {
      status: "healthy",
      message: "GOAT Alliance API is running",
      timestamp: new Date().toISOString(),
    };
  }
);

// Get alliance info
interface AllianceInfo {
  name: string;
  description: string;
  memberCount: number;
  features: string[];
}

export const getAllianceInfo = api(
  { method: "GET", expose: true, path: "/alliance/info" },
  async (): Promise<AllianceInfo> => {
    return {
      name: "GOAT Alliance",
      description: "Network of Vetted Professionals",
      memberCount: 1250,
      features: [
        "Vetted professional network",
        "Secure connections",
        "Verified expertise", 
        "Collaborative opportunities",
        "Industry networking",
        "Professional development"
      ],
    };
  }
);

// Ping endpoint for connectivity testing
interface PingParams {
  name?: string;
}

interface PingResponse {
  message: string;
  timestamp: string;
}

export const ping = api(
  { method: "POST", expose: true, path: "/ping" },
  async (params: PingParams): Promise<PingResponse> => {
    const name = params.name || "World";
    return {
      message: `Hello ${name} from GOAT Alliance API!`,
      timestamp: new Date().toISOString(),
    };
  }
);