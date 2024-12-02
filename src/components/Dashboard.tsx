import React from 'react';
import { Search, Filter, ArrowUpRight } from 'lucide-react';
import APICard from './APICard';

const featuredAPIs = [
  {
    title: 'Payments API',
    description: 'Process payments, refunds, and manage payment methods securely.',
    category: 'Financial',
    version: '2.1.0',
    status: 'stable' as const,
  },
  {
    title: 'Accounts API',
    description: 'Manage customer accounts, balances, and transactions.',
    category: 'Banking',
    version: '1.8.0',
    status: 'stable' as const,
  },
  {
    title: 'Credit Analysis API',
    description: 'Real-time credit scoring and risk assessment.',
    category: 'Analytics',
    version: '0.9.0',
    status: 'beta' as const,
  },
];

export default function Dashboard() {
  return (
    <div className="flex-1 relative z-0 flex overflow-hidden">
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">API Catalog</h1>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Request API Access
              </button>
            </div>

            <div className="mt-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900">Quick Start</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {['Authentication', 'API Guidelines', 'SDKs & Tools'].map((item) => (
                    <div key={item} className="relative rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
                      <div className="flex-1 min-w-0">
                        <a href="#" className="focus:outline-none">
                          <p className="text-sm font-medium text-gray-900">{item}</p>
                        </a>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Featured APIs</h2>
                <div className="flex items-center space-x-4">
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Search className="h-4 w-4 mr-2" />
                    Advanced Search
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featuredAPIs.map((api) => (
                  <APICard key={api.title} {...api} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}