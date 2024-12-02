import React from 'react';
import { Code2, Download } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { APISpec } from '../../types/api';

interface APISpecViewerProps {
  spec: APISpec;
}

export default function APISpecViewer({ spec }: APISpecViewerProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Code2 className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium">{spec.format} Specification</h3>
        </div>
        <button className="btn-secondary">
          <Download className="h-4 w-4 mr-2" />
          Download Spec
        </button>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 overflow-auto max-h-96">
        <SyntaxHighlighter language="json" className="text-sm">
          {`{
  "openapi": "3.0.0",
  "info": {
    "title": "Example API",
    "version": "1.0.0"
  }
}`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}