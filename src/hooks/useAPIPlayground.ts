import { useState, useCallback } from 'react';
import axios from 'axios';
import { API } from '../types/api';

interface RequestHistory {
  id: string;
  method: string;
  endpoint: string;
  headers: Record<string, string>;
  body: string;
  timestamp: string;
  response?: any;
}

interface PlaygroundSettings {
  theme: 'dark' | 'light';
  fontSize: number;
  timeout: number;
  autoSave: boolean;
  cacheResponses: boolean;
}

export function useAPIPlayground(api: API) {
  const [method, setMethod] = useState<string>('GET');
  const [endpoint, setEndpoint] = useState<string>('');
  const [requestBody, setRequestBody] = useState<string>('{\n  \n}');
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<RequestHistory[]>([]);
  const [settings, setSettings] = useState<PlaygroundSettings>({
    theme: 'dark',
    fontSize: 12,
    timeout: 5000,
    autoSave: true,
    cacheResponses: true,
  });

  const sendRequest = useCallback(async () => {
    setLoading(true);
    try {
      const start = Date.now();
      const res = await axios({
        method,
        url: endpoint,
        headers,
        data: method !== 'GET' ? JSON.parse(requestBody) : undefined,
        timeout: settings.timeout,
      });
      const duration = Date.now() - start;

      const responseData = {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        data: res.data,
        duration,
      };

      setResponse(responseData);

      if (settings.autoSave) {
        const historyItem: RequestHistory = {
          id: Date.now().toString(),
          method,
          endpoint,
          headers,
          body: requestBody,
          timestamp: new Date().toISOString(),
          response: responseData,
        };
        setHistory((prev) => [historyItem, ...prev]);
      }
    } catch (error: any) {
      setResponse({
        error: true,
        status: error.response?.status,
        statusText: error.response?.statusText || error.message,
        data: error.response?.data,
      });
    } finally {
      setLoading(false);
    }
  }, [method, endpoint, headers, requestBody, settings]);

  const generateCode = useCallback((language: string) => {
    // Implementation for code generation in different languages
    return '';
  }, [method, endpoint, headers, requestBody]);

  const saveRequest = useCallback(() => {
    const savedRequest = {
      method,
      endpoint,
      headers,
      body: requestBody,
    };
    localStorage.setItem(`saved_request_${Date.now()}`, JSON.stringify(savedRequest));
  }, [method, endpoint, headers, requestBody]);

  const loadRequest = useCallback((historyItem: RequestHistory) => {
    setMethod(historyItem.method);
    setEndpoint(historyItem.endpoint);
    setHeaders(historyItem.headers);
    setRequestBody(historyItem.body);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<PlaygroundSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  return {
    method,
    setMethod,
    endpoint,
    setEndpoint,
    requestBody,
    setRequestBody,
    headers,
    setHeaders,
    response,
    loading,
    sendRequest,
    history,
    settings,
    updateSettings,
    generateCode,
    saveRequest,
    loadRequest,
  };
}