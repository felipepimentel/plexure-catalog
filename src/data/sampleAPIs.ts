import { API } from '../types/api';

export const sampleAPIs: API[] = [
  {
    id: '1',
    title: 'Payment Processing API',
    description: 'Secure payment processing system with support for multiple payment methods, fraud detection, and real-time transaction monitoring.',
    category: 'Financial',
    visibility: 'public',
    status: 'stable',
    currentVersion: {
      version: '2.8.0',
      releaseDate: '2024-03-01',
      changelog: 'Added cryptocurrency support',
      breaking: false,
      supported: true
    },
    versions: [],
    metrics: {
      uptime: '99.99%',
      latency: '120ms',
      requests: '8M/day',
      errorRate: '0.01%',
      satisfaction: 98
    },
    tags: [
      { id: '1', name: 'payments', category: 'Financial' },
      { id: '2', name: 'transactions', category: 'Financial' },
      { id: '3', name: 'security', category: 'Security' }
    ],
    dependencies: [],
    feedback: [],
    documentation: { overview: '', quickStart: '', tutorials: [], examples: [] },
    security: { authMethods: [], scopes: [], rateLimit: '' },
    support: { email: '', slack: '', forum: '' }
  },
  {
    id: '2',
    title: 'User Authentication API',
    description: 'Enterprise-grade authentication system with OAuth 2.0, MFA support, and seamless social login integration.',
    category: 'Security',
    visibility: 'public',
    status: 'stable',
    currentVersion: {
      version: '3.5.0',
      releaseDate: '2024-02-15',
      changelog: 'Added biometric authentication',
      breaking: false,
      supported: true
    },
    versions: [],
    metrics: {
      uptime: '99.999%',
      latency: '85ms',
      requests: '12M/day',
      errorRate: '0.001%',
      satisfaction: 99
    },
    tags: [
      { id: '4', name: 'authentication', category: 'Security' },
      { id: '5', name: 'oauth', category: 'Security' },
      { id: '6', name: 'mfa', category: 'Security' }
    ],
    dependencies: [],
    feedback: [],
    documentation: { overview: '', quickStart: '', tutorials: [], examples: [] },
    security: { authMethods: [], scopes: [], rateLimit: '' },
    support: { email: '', slack: '', forum: '' }
  },
  {
    id: '3',
    title: 'Analytics Engine API',
    description: 'Real-time analytics processing with advanced data visualization, custom metrics, and automated reporting capabilities.',
    category: 'Analytics',
    visibility: 'public',
    status: 'beta',
    currentVersion: {
      version: '1.2.0',
      releaseDate: '2024-02-28',
      changelog: 'Added predictive analytics',
      breaking: false,
      supported: true
    },
    versions: [],
    metrics: {
      uptime: '99.95%',
      latency: '150ms',
      requests: '5M/day',
      errorRate: '0.05%',
      satisfaction: 92
    },
    tags: [
      { id: '7', name: 'analytics', category: 'Analytics' },
      { id: '8', name: 'reporting', category: 'Analytics' },
      { id: '9', name: 'visualization', category: 'Analytics' }
    ],
    dependencies: [],
    feedback: [],
    documentation: { overview: '', quickStart: '', tutorials: [], examples: [] },
    security: { authMethods: [], scopes: [], rateLimit: '' },
    support: { email: '', slack: '', forum: '' }
  },
  {
    id: '4',
    title: 'Document Processing API',
    description: 'Advanced document analysis and processing with OCR capabilities, format conversion, and content extraction.',
    category: 'Analytics',
    visibility: 'public',
    status: 'stable',
    currentVersion: {
      version: '2.1.0',
      releaseDate: '2024-02-20',
      changelog: 'Added PDF annotation',
      breaking: false,
      supported: true
    },
    versions: [],
    metrics: {
      uptime: '99.9%',
      latency: '200ms',
      requests: '3M/day',
      errorRate: '0.02%',
      satisfaction: 95
    },
    tags: [
      { id: '10', name: 'documents', category: 'Content' },
      { id: '11', name: 'ocr', category: 'Analytics' },
      { id: '12', name: 'processing', category: 'Analytics' }
    ],
    dependencies: [],
    feedback: [],
    documentation: { overview: '', quickStart: '', tutorials: [], examples: [] },
    security: { authMethods: [], scopes: [], rateLimit: '' },
    support: { email: '', slack: '', forum: '' }
  },
  {
    id: '5',
    title: 'Notification Service API',
    description: 'Multi-channel notification delivery system supporting email, SMS, push notifications, and in-app messaging.',
    category: 'Communication',
    visibility: 'public',
    status: 'stable',
    currentVersion: {
      version: '4.0.0',
      releaseDate: '2024-03-05',
      changelog: 'Added message templating',
      breaking: false,
      supported: true
    },
    versions: [],
    metrics: {
      uptime: '99.98%',
      latency: '95ms',
      requests: '15M/day',
      errorRate: '0.01%',
      satisfaction: 97
    },
    tags: [
      { id: '13', name: 'notifications', category: 'Communication' },
      { id: '14', name: 'messaging', category: 'Communication' },
      { id: '15', name: 'realtime', category: 'Communication' }
    ],
    dependencies: [],
    feedback: [],
    documentation: { overview: '', quickStart: '', tutorials: [], examples: [] },
    security: { authMethods: [], scopes: [], rateLimit: '' },
    support: { email: '', slack: '', forum: '' }
  },
  {
    id: '6',
    title: 'Machine Learning API',
    description: 'Pre-trained ML models for natural language processing, image recognition, and predictive analytics.',
    category: 'Analytics',
    visibility: 'public',
    status: 'beta',
    currentVersion: {
      version: '0.9.0',
      releaseDate: '2024-03-10',
      changelog: 'Added custom model training',
      breaking: false,
      supported: true
    },
    versions: [],
    metrics: {
      uptime: '99.9%',
      latency: '250ms',
      requests: '2M/day',
      errorRate: '0.08%',
      satisfaction: 90
    },
    tags: [
      { id: '16', name: 'ml', category: 'Analytics' },
      { id: '17', name: 'ai', category: 'Analytics' },
      { id: '18', name: 'prediction', category: 'Analytics' }
    ],
    dependencies: [],
    feedback: [],
    documentation: { overview: '', quickStart: '', tutorials: [], examples: [] },
    security: { authMethods: [], scopes: [], rateLimit: '' },
    support: { email: '', slack: '', forum: '' }
  }
];

export function getAPIsByCategory(apis: API[]): Record<string, API[]> {
  return apis.reduce((acc, api) => {
    if (!acc[api.category]) {
      acc[api.category] = [];
    }
    acc[api.category].push(api);
    return acc;
  }, {} as Record<string, API[]>);
}

export function getFeaturedAPIs(apis: API[]): API[] {
  return apis.filter(api => 
    api.status === 'stable' && 
    api.metrics.satisfaction > 95
  ).slice(0, 3);
}

export function getRelatedAPIs(api: API, apis: API[]): API[] {
  return apis.filter(a => 
    a.id !== api.id && (
      a.category === api.category ||
      a.tags.some(t => api.tags.some(apiTag => apiTag.category === t.category))
    )
  ).slice(0, 3);
}