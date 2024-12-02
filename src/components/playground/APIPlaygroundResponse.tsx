import React from 'react';
import { Editor } from '@monaco-editor/react';
import { Clock, AlertTriangle, Check } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface APIPlaygroundResponseProps {
  response: any;
}

export function APIPlaygroundResponse({ response }: APIPlaygroundResponseProps) {
  if (!response) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#9E9E9E]">
        Send a request to see the response
      </div>
    );
  }

  const isSuccess = !response.error && response.status >= 200 && response.status < 300;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Badge
            variant={isSuccess ? 'success' : 'error'}
            className="flex items-center space-x-1"
          >
            {isSuccess ? (
              <Check className="h-3 w-3" />
            ) : (
              <AlertTriangle className="h-3 w-3" />
            )}
            <span>{response.status} {response.statusText}</span>
          </Badge>
          {response.duration && (
            <div className="flex items-center text-[#9E9E9E] text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>{response.duration}ms</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="json"
          value={JSON.stringify(response.data, null, 2)}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 12,
          }}
        />
      </div>
    </div>
  );
}