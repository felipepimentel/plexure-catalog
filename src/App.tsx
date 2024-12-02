import React, { useState } from 'react';
import { APICatalog } from './components/catalog/APICatalog';
import { APIDetailsView } from './components/catalog/APIDetailsView';
import { API } from './types/api';
import { sampleAPIs } from './data/sampleAPIs';

export default function App() {
  const [selectedAPI, setSelectedAPI] = useState<API | null>(null);

  return (
    <div className="min-h-screen bg-[#121212]">
      {selectedAPI ? (
        <APIDetailsView
          api={selectedAPI}
          onBack={() => setSelectedAPI(null)}
        />
      ) : (
        <main>
          {/* Header */}
          <div className="border-b border-[#2A2A2A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">API Catalog</h1>
                  <p className="mt-1 text-[#E0E0E0]">Explore and integrate with our APIs</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-[#4FC3F7] to-[#2196F3] text-white rounded-lg hover:from-[#81D4FA] hover:to-[#42A5F5] transition-all font-medium">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center space-x-8">
                <a href="#" className="flex items-center space-x-2 text-[#4FC3F7] hover:text-[#81D4FA] transition-colors py-2">
                  <code className="text-sm bg-[#2A2A2A] px-2 py-1 rounded">{'</>'}</code>
                  <span className="text-sm font-medium">Interactive Docs</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-[#4FC3F7] hover:text-[#81D4FA] transition-colors py-2">
                  <code className="text-sm bg-[#2A2A2A] px-2 py-1 rounded">⚡</code>
                  <span className="text-sm font-medium">Quick Start</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-[#4FC3F7] hover:text-[#81D4FA] transition-colors py-2">
                  <code className="text-sm bg-[#2A2A2A] px-2 py-1 rounded">📚</code>
                  <span className="text-sm font-medium">API Guides</span>
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <APICatalog
              apis={sampleAPIs}
              onSelectAPI={setSelectedAPI}
            />
          </div>
        </main>
      )}
    </div>
  );
}