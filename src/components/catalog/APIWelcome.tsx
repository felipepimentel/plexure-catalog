import React from 'react';
import { APIFeaturesGrid } from './APIFeaturesGrid';
import { ArrowRight } from 'lucide-react';

export function APIWelcome() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome to Our API Platform
          </h2>
          <p className="text-[#E0E0E0]">
            Build amazing applications with our developer-first platform.
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors">
          <span>Get Started</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <APIFeaturesGrid />
    </div>
  );
}