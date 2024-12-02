import React, { useState } from 'react';
import { Play, Code, Copy, Download, Save, History, Settings, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';

interface RequestHistory {
  id: string;
  method: string;
  endpoint: string;
  timestamp: string;
  status?: number;
}

interface Environment {
  id: string;
  name: string;
  variables: { key: string; value: string }[];
}

interface APITestingPlaygroundProps {
  baseUrl: string;
  endpoints: {
    path: string;
    method: string;
    description: string;
    parameters?: {
      name: string;
      type: string;
      required: boolean;
      description: string;
    }[];
  }[];
}

export function APITestingPlayground({ baseUrl, endpoints }: APITestingPlaygroundProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]);
  const [requestBody, setRequestBody] = useState('{\n  \n}');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState<string>('development');
  const [history, setHistory] = useState<RequestHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [environments, setEnvironments] = useState<Environment[]>([
    {
      id: 'development',
      name: 'Development',
      variables: [
        { key: 'API_KEY', value: 'dev_key' },
        { key: 'BASE_URL', value: baseUrl }
      ]
    },
    {
      id: 'staging',
      name: 'Staging',
      variables: [
        { key: 'API_KEY', value: 'staging_key' },
        { key: 'BASE_URL', value: baseUrl.replace('api', 'staging-api') }
      ]
    }
  ]);

  const handleTest = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResponse = {
        status: 200,
        data: { message: 'Success' }
      };
      setResponse(JSON.stringify(mockResponse, null, 2));
      
      // Add to history
      const newRequest: RequestHistory = {
        id: Date.now().toString(),
        method: selectedEndpoint.method,
        endpoint: selectedEndpoint.path,
        timestamp: new Date().toISOString(),
        status: 200
      };
      setHistory([newRequest, ...history]);
    } catch (error) {
      setResponse(JSON.stringify({ error: 'Request failed' }, null, 2));
    }
    setLoading(false);
  };

  const handleEnvironmentChange = (envId: string) => {
    setSelectedEnv(envId);
  };

  const interpolateVariables = (text: string): string => {
    const env = environments.find(e => e.id === selectedEnv);
    if (!env) return text;

    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      const variable = env.variables.find(v => v.key === key);
      return variable ? variable.value : match;
    });
  };

  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">API Testing Playground</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 text-[#E0E0E0] hover:text-white rounded-lg hover:bg-[#2A2A2A]"
          >
            <History className="h-5 w-5" />
          </button>
          <button
            onClick={() => {}}
            className="p-2 text-[#E0E0E0] hover:text-white rounded-lg hover:bg-[#2A2A2A]"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="col-span-1 bg-[#2A2A2A] rounded-lg p-4">
          {showHistory ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">Request History</h4>
                <button
                  onClick={() => setHistory([])}
                  className="p-1 text-[#E0E0E0] hover:text-white rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                {history.map((request) => (
                  <div
                    key={request.id}
                    className="p-2 hover:bg-[#333333] rounded cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium
                        ${request.method === 'GET' ? 'bg-blue-900 text-blue-200' :
                          request.method === 'POST' ? 'bg-green-900 text-green-200' :
                          request.method === 'PUT' ? 'bg-yellow-900 text-yellow-200' :
                          'bg-red-900 text-red-200'}`}
                      >
                        {request.method}
                      </span>
                      <span className="text-[#E0E0E0] text-xs">
                        {new Date(request.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-[#E0E0E0] mt-1 truncate">
                      {request.endpoint}
                    </p>
                    {request.status && (
                      <span className={`text-xs ${
                        request.status < 400 ? 'text-[#4ADE80]' : 'text-[#EF4444]'
                      }`}>
                        {request.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h4 className="text-white font-medium mb-4">Endpoints</h4>
              <div className="space-y-2">
                {endpoints.map((endpoint) => (
                  <button
                    key={endpoint.path}
                    onClick={() => setSelectedEndpoint(endpoint)}
                    className={`w-full p-2 text-left rounded ${
                      selectedEndpoint.path === endpoint.path
                        ? 'bg-[#333333]'
                        : 'hover:bg-[#333333]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium
                        ${endpoint.method === 'GET' ? 'bg-blue-900 text-blue-200' :
                          endpoint.method === 'POST' ? 'bg-green-900 text-green-200' :
                          endpoint.method === 'PUT' ? 'bg-yellow-900 text-yellow-200' :
                          'bg-red-900 text-red-200'}`}
                      >
                        {endpoint.method}
                      </span>
                      <span className="text-[#E0E0E0] text-sm">{endpoint.path}</span>
                    </div>
                    <p className="text-xs text-[#9E9E9E] mt-1">
                      {endpoint.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Request Panel */}
        <div className="col-span-2">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <select
                  value={selectedEnv}
                  onChange={(e) => handleEnvironmentChange(e.target.value)}
                  className="bg-[#2A2A2A] border border-[#424242] rounded-lg text-[#E0E0E0] px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                >
                  {environments.map((env) => (
                    <option key={env.id} value={env.id}>{env.name}</option>
                  ))}
                </select>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-sm font-medium
                    ${selectedEndpoint.method === 'GET' ? 'bg-blue-900 text-blue-200' :
                      selectedEndpoint.method === 'POST' ? 'bg-green-900 text-green-200' :
                      selectedEndpoint.method === 'PUT' ? 'bg-yellow-900 text-yellow-200' :
                      'bg-red-900 text-red-200'}`}
                  >
                    {selectedEndpoint.method}
                  </span>
                  <span className="text-[#E0E0E0] font-mono text-sm">
                    {interpolateVariables(baseUrl + selectedEndpoint.path)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {}}
                  className="p-2 text-[#E0E0E0] hover:text-white rounded"
                >
                  <Save className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {}}
                  className="p-2 text-[#E0E0E0] hover:text-white rounded"
                >
                  <Code className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#E0E0E0] text-sm font-medium mb-2">
                Request Body
              </label>
              <div className="relative">
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full h-64 px-4 py-3 bg-[#2A2A2A] border border-[#424242] rounded-lg font-mono text-sm text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(requestBody)}
                  className="absolute top-2 right-2 p-1 text-[#E0E0E0] hover:text-white rounded"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[#E0E0E0] text-sm font-medium">Response</label>
                {response && (
                  <button
                    onClick={() => navigator.clipboard.writeText(response)}
                    className="p-1 text-[#E0E0E0] hover:text-white rounded"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="h-64 bg-[#2A2A2A] border border-[#424242] rounded-lg p-4 overflow-auto">
                <pre className="font-mono text-sm text-[#E0E0E0] whitespace-pre-wrap">
                  {response || 'No response yet. Click "Send Request" to test the endpoint.'}
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleTest}
              disabled={loading}
              className="px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Send Request</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}