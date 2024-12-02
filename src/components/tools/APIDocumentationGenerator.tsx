import React, { useState } from 'react';
import { Book, Code2, Eye, Download, Copy, FileText } from 'lucide-react';
import { Card } from '../ui/Card';

interface Endpoint {
  path: string;
  method: string;
  description: string;
  parameters?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  responses?: {
    status: number;
    description: string;
    schema: object;
  }[];
}

interface APIDocumentationGeneratorProps {
  apiInfo: {
    title: string;
    version: string;
    description: string;
    baseUrl: string;
    endpoints: Endpoint[];
  };
  onGenerate: (format: 'openapi' | 'markdown' | 'html') => void;
}

export function APIDocumentationGenerator({ apiInfo, onGenerate }: APIDocumentationGeneratorProps) {
  const [selectedFormat, setSelectedFormat] = useState<'openapi' | 'markdown' | 'html'>('openapi');
  const [previewContent, setPreviewContent] = useState('');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [editedInfo, setEditedInfo] = useState(apiInfo);

  const generateDocumentation = () => {
    let content = '';
    
    switch (selectedFormat) {
      case 'openapi':
        content = JSON.stringify({
          openapi: '3.0.0',
          info: {
            title: editedInfo.title,
            version: editedInfo.version,
            description: editedInfo.description
          },
          servers: [{ url: editedInfo.baseUrl }],
          paths: editedInfo.endpoints.reduce((acc, endpoint) => ({
            ...acc,
            [endpoint.path]: {
              [endpoint.method.toLowerCase()]: {
                summary: endpoint.description,
                parameters: endpoint.parameters?.map(param => ({
                  name: param.name,
                  in: 'query',
                  required: param.required,
                  schema: { type: param.type },
                  description: param.description
                })),
                responses: endpoint.responses?.reduce((acc, response) => ({
                  ...acc,
                  [response.status]: {
                    description: response.description,
                    content: {
                      'application/json': {
                        schema: response.schema
                      }
                    }
                  }
                }), {})
              }
            }
          }), {})
        }, null, 2);
        break;

      case 'markdown':
        content = `# ${editedInfo.title}

## Overview
${editedInfo.description}

**Version:** ${editedInfo.version}
**Base URL:** ${editedInfo.baseUrl}

## Endpoints

${editedInfo.endpoints.map(endpoint => `
### ${endpoint.method} ${endpoint.path}

${endpoint.description}

${endpoint.parameters?.length ? `
#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
${endpoint.parameters.map(param => 
  `| ${param.name} | ${param.type} | ${param.required ? 'Yes' : 'No'} | ${param.description} |`
).join('\n')}
` : ''}

${endpoint.responses?.length ? `
#### Responses

${endpoint.responses.map(response => `
**${response.status}**: ${response.description}

\`\`\`json
${JSON.stringify(response.schema, null, 2)}
\`\`\`
`).join('\n')}
` : ''}
`).join('\n')}`;
        break;

      case 'html':
        // Generate HTML documentation
        content = `<!DOCTYPE html>
<html>
<head>
  <title>${editedInfo.title} Documentation</title>
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.5; max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .endpoint { border: 1px solid #ddd; border-radius: 8px; margin: 1rem 0; padding: 1rem; }
    .method { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: bold; }
    .get { background: #e3f2fd; color: #1565c0; }
    .post { background: #e8f5e9; color: #2e7d32; }
    .put { background: #fff3e0; color: #ef6c00; }
    .delete { background: #ffebee; color: #c62828; }
  </style>
</head>
<body>
  <h1>${editedInfo.title}</h1>
  <p>${editedInfo.description}</p>
  <p><strong>Version:</strong> ${editedInfo.version}</p>
  <p><strong>Base URL:</strong> ${editedInfo.baseUrl}</p>

  <h2>Endpoints</h2>
  ${editedInfo.endpoints.map(endpoint => `
    <div class="endpoint">
      <span class="method ${endpoint.method.toLowerCase()}">${endpoint.method}</span>
      <code>${endpoint.path}</code>
      <p>${endpoint.description}</p>
      
      ${endpoint.parameters?.length ? `
        <h3>Parameters</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${endpoint.parameters.map(param => `
              <tr>
                <td>${param.name}</td>
                <td>${param.type}</td>
                <td>${param.required ? 'Yes' : 'No'}</td>
                <td>${param.description}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : ''}

      ${endpoint.responses?.length ? `
        <h3>Responses</h3>
        ${endpoint.responses.map(response => `
          <h4>${response.status}</h4>
          <p>${response.description}</p>
          <pre><code>${JSON.stringify(response.schema, null, 2)}</code></pre>
        `).join('')}
      ` : ''}
    </div>
  `).join('')}
</body>
</html>`;
        break;
    }

    setPreviewContent(content);
    onGenerate(selectedFormat);
  };

  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Book className="h-5 w-5 text-[#4FC3F7]" />
          <h3 className="text-lg font-semibold text-white">Documentation Generator</h3>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value as any)}
            className="bg-[#2A2A2A] border border-[#424242] rounded-lg text-[#E0E0E0] px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
          >
            <option value="openapi">OpenAPI Spec</option>
            <option value="markdown">Markdown</option>
            <option value="html">HTML</option>
          </select>
          <button
            onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}
            className="p-2 text-[#E0E0E0] hover:text-white rounded-lg hover:bg-[#2A2A2A]"
          >
            {activeTab === 'edit' ? <Eye className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {activeTab === 'edit' ? (
        <div className="space-y-6">
          <div>
            <label className="block text-[#E0E0E0] text-sm font-medium mb-2">
              API Title
            </label>
            <input
              type="text"
              value={editedInfo.title}
              onChange={(e) => setEditedInfo({ ...editedInfo, title: e.target.value })}
              className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#424242] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
            />
          </div>

          <div>
            <label className="block text-[#E0E0E0] text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={editedInfo.description}
              onChange={(e) => setEditedInfo({ ...editedInfo, description: e.target.value })}
              className="w-full h-32 px-4 py-2 bg-[#2A2A2A] border border-[#424242] rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#E0E0E0] text-sm font-medium mb-2">
                Version
              </label>
              <input
                type="text"
                value={editedInfo.version}
                onChange={(e) => setEditedInfo({ ...editedInfo, version: e.target.value })}
                className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#424242] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
              />
            </div>
            <div>
              <label className="block text-[#E0E0E0] text-sm font-medium mb-2">
                Base URL
              </label>
              <input
                type="text"
                value={editedInfo.baseUrl}
                onChange={(e) => setEditedInfo({ ...editedInfo, baseUrl: e.target.value })}
                className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#424242] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#E0E0E0] text-sm font-medium mb-2">
              Endpoints
            </label>
            <div className="space-y-4">
              {editedInfo.endpoints.map((endpoint, index) => (
                <div key={index} className="p-4 bg-[#2A2A2A] rounded-lg">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[#E0E0E0] text-xs mb-1">Method</label>
                      <select
                        value={endpoint.method}
                        onChange={(e) => {
                          const newEndpoints = [...editedInfo.endpoints];
                          newEndpoints[index] = { ...endpoint, method: e.target.value };
                          setEditedInfo({ ...editedInfo, endpoints: newEndpoints });
                        }}
                        className="w-full px-3 py-1.5 bg-[#333333] border border-[#424242] rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                      >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#E0E0E0] text-xs mb-1">Path</label>
                      <input
                        type="text"
                        value={endpoint.path}
                        onChange={(e) => {
                          const newEndpoints = [...editedInfo.endpoints];
                          newEndpoints[index] = { ...endpoint, path: e.target.value };
                          setEditedInfo({ ...editedInfo, endpoints: newEndpoints });
                        }}
                        className="w-full px-3 py-1.5 bg-[#333333] border border-[#424242] rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-[#E0E0E0] text-xs mb-1">Description</label>
                    <textarea
                      value={endpoint.description}
                      onChange={(e) => {
                        const newEndpoints = [...editedInfo.endpoints];
                        newEndpoints[index] = { ...endpoint, description: e.target.value };
                        setEditedInfo({ ...editedInfo, endpoints: newEndpoints });
                      }}
                      className="w-full px-3 py-1.5 bg-[#333333] border border-[#424242] rounded-lg text-white text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={() => navigator.clipboard.writeText(previewContent)}
              className="p-2 text-[#E0E0E0] hover:text-white rounded bg-[#2A2A2A] hover:bg-[#333333]"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                const blob = new Blob([previewContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `api-documentation.${selectedFormat}`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="p-2 text-[#E0E0E0] hover:text-white rounded bg-[#2A2A2A] hover:bg-[#333333]"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
          <pre className="bg-[#2A2A2A] p-4 rounded-lg overflow-auto max-h-[600px] text-[#E0E0E0] text-sm">
            {previewContent || 'Click "Generate" to preview the documentation'}
          </pre>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={generateDocumentation}
          className="px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors flex items-center space-x-2"
        >
          <Code2 className="h-4 w-4" />
          <span>Generate Documentation</span>
        </button>
      </div>
    </Card>
  );
}