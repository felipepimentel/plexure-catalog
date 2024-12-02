// Add these interfaces to the existing types file

export interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  authentication: {
    type: string;
    description: string;
  };
  rateLimit: {
    requests: number;
    period: string;
  };
  request: {
    query?: Record<string, string>;
    body?: Record<string, string>;
    example: any;
  };
  response: Record<string, {
    description: string;
    schema: Record<string, any>;
    example?: any;
  }>;
}

export interface APICategory {
  name: string;
  description: string;
  endpoints: APIEndpoint[];
}