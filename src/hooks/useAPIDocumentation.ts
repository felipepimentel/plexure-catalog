import { useState } from 'react';
import { API } from '../types/api';

type DocumentationFormat = 'openapi' | 'markdown' | 'html';

export function useAPIDocumentation(api: API) {
  const [format, setFormat] = useState<DocumentationFormat>('openapi');
  const [generating, setGenerating] = useState(false);

  const generateDocumentation = async () => {
    setGenerating(true);
    try {
      // Simulate documentation generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return documentation based on format
      switch (format) {
        case 'openapi':
          return JSON.stringify({
            openapi: '3.0.0',
            info: {
              title: api.title,
              version: api.currentVersion.version,
              description: api.description
            },
            paths: {}
          }, null, 2);
        
        case 'markdown':
          return `# ${api.title}\n\n${api.description}`;
        
        case 'html':
          return `<h1>${api.title}</h1><p>${api.description}</p>`;
      }
    } finally {
      setGenerating(false);
    }
  };

  return {
    format,
    setFormat,
    generating,
    generateDocumentation
  };
}