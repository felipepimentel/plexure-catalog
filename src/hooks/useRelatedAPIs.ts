import { useState, useEffect } from 'react';
import { API } from '../types/api';

interface RelatedAPI {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  benefit: string;
  category: string;
  integration: string;
}

export function useRelatedAPIs(currentAPI: API) {
  const [relatedAPIs, setRelatedAPIs] = useState<RelatedAPI[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRelatedAPIs = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Generate recommendations based on current API
        const recommendations = generateRecommendations(currentAPI);
        setRelatedAPIs(recommendations);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedAPIs();
  }, [currentAPI]);

  return { relatedAPIs, loading, error };
}

function generateRecommendations(api: API): RelatedAPI[] {
  const recommendations: RelatedAPI[] = [];

  // Authentication & Security APIs
  if (api.category === 'Security' || api.security.authMethods.includes('OAuth 2.0')) {
    recommendations.push({
      name: 'User Management API',
      description: 'Comprehensive user profile and role management system',
      priority: 'high',
      benefit: 'Enhanced Security',
      category: 'Security',
      integration: 'Direct integration via OAuth 2.0'
    });
  }

  // Analytics & Monitoring
  if (api.metrics.requests !== '0') {
    recommendations.push({
      name: 'Performance Monitoring API',
      description: 'Real-time performance tracking and alerting system',
      priority: 'medium',
      benefit: 'Improved Reliability',
      category: 'Analytics',
      integration: 'Webhook-based integration'
    });
  }

  // Notification Services
  if (api.category === 'Financial' || api.category === 'Banking') {
    recommendations.push({
      name: 'Notification Service API',
      description: 'Multi-channel notification delivery system',
      priority: 'high',
      benefit: 'Better User Experience',
      category: 'Communication',
      integration: 'Event-driven integration'
    });
  }

  // Data Processing
  if (api.category === 'Analytics') {
    recommendations.push({
      name: 'Data Processing API',
      description: 'Advanced data transformation and enrichment pipeline',
      priority: 'medium',
      benefit: 'Enhanced Analytics',
      category: 'Analytics',
      integration: 'Batch processing integration'
    });
  }

  // Compliance & Audit
  if (api.security.scopes.some(scope => scope.includes('write'))) {
    recommendations.push({
      name: 'Audit Trail API',
      description: 'Comprehensive activity logging and compliance reporting',
      priority: 'high',
      benefit: 'Compliance Ready',
      category: 'Security',
      integration: 'Event streaming integration'
    });
  }

  return recommendations;
}