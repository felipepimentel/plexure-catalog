import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

interface APICardProps {
  title: string;
  description: string;
  category: string;
  version: string;
  status: 'stable' | 'beta' | 'deprecated';
}

export default function APICard({ title, description, category, version, status }: APICardProps) {
  const statusColors = {
    stable: 'bg-green-100 text-green-800',
    beta: 'bg-yellow-100 text-yellow-800',
    deprecated: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
              {status}
            </span>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded-full">
            <Star className="h-5 w-5 text-gray-400 hover:text-yellow-400" />
          </button>
        </div>
        
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{category}</span>
            <span>v{version}</span>
          </div>
          
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Explore API
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}