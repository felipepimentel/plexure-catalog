import React from 'react';
import { Search } from 'lucide-react';

export function APIHeader() {
  return (
    <div className="bg-gradient-to-r from-[#1E1E1E] to-[#2A2A2A] border-b border-[#424242]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">API Catalog</h1>
            <p className="mt-1 text-[#E0E0E0]">Explore and integrate with our APIs</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}