import { useState, useEffect } from 'react';
import { API } from '../types/api';

interface APIMetrics {
  requestVolume: number;
  latency: number;
  errorRate: number;
  uptime: string;
}

export function useAPIMetrics(api: API) {
  const [metrics, setMetrics] = useState<APIMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMetrics({
          requestVolume: Math.floor(Math.random() * 1000000),
          latency: Math.floor(Math.random() * 100),
          errorRate: Math.random() * 1,
          uptime: '99.99%'
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [api.id]);

  return { metrics, loading, error };
}