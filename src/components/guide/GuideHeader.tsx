import React from 'react';
import { Book, Rocket, Wrench } from 'lucide-react';

export default function GuideHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">StackSpot Platform Guide</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Your complete guide to accelerating development with StackSpot's developer platform
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <Rocket className="h-8 w-8 text-blue-200" />
              <h3 className="text-lg font-semibold">Quick Start</h3>
            </div>
            <p className="mt-2 text-blue-100">Get started with StackSpot in minutes</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <Wrench className="h-8 w-8 text-blue-200" />
              <h3 className="text-lg font-semibold">Features</h3>
            </div>
            <p className="mt-2 text-blue-100">Explore platform capabilities</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <Book className="h-8 w-8 text-blue-200" />
              <h3 className="text-lg font-semibold">Best Practices</h3>
            </div>
            <p className="mt-2 text-blue-100">Learn recommended approaches</p>
          </div>
        </div>
      </div>
    </div>
  );
}