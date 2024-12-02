import React, { useState, useCallback } from 'react';
import { Editor } from '@monaco-editor/react';
import { Play, Code, Copy, Download, History, Settings, Save } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { APIPlaygroundToolbar } from './APIPlaygroundToolbar';
import { APIPlaygroundSidebar } from './APIPlaygroundSidebar';
import { APIPlaygroundResponse } from './APIPlaygroundResponse';
import { APIPlaygroundHistory } from './APIPlaygroundHistory';
import { APIPlaygroundSettings } from './APIPlaygroundSettings';
import { useAPIPlayground } from '../../hooks/useAPIPlayground';
import { API } from '../../types/api';

interface APIPlaygroundProps {
  api: API;
}

export function APIPlayground({ api }: APIPlaygroundProps) {
  const {
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
    loadRequest
  } = useAPIPlayground(api);

  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleSend = useCallback(async () => {
    await sendRequest();
  }, [sendRequest]);

  return (
    <div className="flex h-[calc(100vh-12rem)]">
      <APIPlaygroundSidebar api={api} onEndpointSelect={setEndpoint} />

      <div className="flex-1 mx-4">
        <Card className="bg-[#1E1E1E] h-full flex flex-col">
          <APIPlaygroundToolbar
            method={method}
            onMethodChange={setMethod}
            onHistoryClick={() => setShowHistory(true)}
            onSettingsClick={() => setShowSettings(true)}
            onSaveClick={saveRequest}
          />

          <div className="flex-1 flex flex-col p-4">
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Badge
                  variant={method === 'GET' ? 'success' : method === 'POST' ? 'default' : 'error'}
                  className="uppercase"
                >
                  {method}
                </Badge>
                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  placeholder="Enter endpoint URL"
                  className="flex-1 px-4 py-2 bg-[#2A2A2A] border border-[#424242] rounded-lg text-white placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                />
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Send</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-[#E0E0E0] text-sm font-medium mb-2">Headers</h3>
                  <Editor
                    height="150px"
                    defaultLanguage="json"
                    value={JSON.stringify(headers, null, 2)}
                    onChange={(value) => setHeaders(JSON.parse(value || '{}'))}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 12,
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-[#E0E0E0] text-sm font-medium mb-2">Request Body</h3>
                  <Editor
                    height="150px"
                    defaultLanguage="json"
                    value={requestBody}
                    onChange={(value) => setRequestBody(value || '')}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 12,
                    }}
                  />
                </div>
              </div>
            </div>

            <APIPlaygroundResponse response={response} />
          </div>
        </Card>
      </div>

      {showHistory && (
        <APIPlaygroundHistory
          history={history}
          onSelect={loadRequest}
          onClose={() => setShowHistory(false)}
        />
      )}

      {showSettings && (
        <APIPlaygroundSettings
          settings={settings}
          onChange={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}