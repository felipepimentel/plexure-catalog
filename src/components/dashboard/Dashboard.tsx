import React from 'react';
import SearchBar from '../search/SearchBar';
import QuickStart from './QuickStart';
import APICard from '../api/APICard';
import { API } from '../../types/api';

const featuredAPIs: API[] = [
  {
    id: '1',
    title: 'Payments API',
    description: 'Process payments, refunds, and manage payment methods securely.',
    category: 'Financial',
    version: '2.1.0',
    status: 'stable',
    spec: {
      format: 'OpenAPI',
      url: '/specs/payments.yaml',
      lastUpdated: '2024-02-20'
    },
    versions: [
      {
        version: '2.1.0',
        releaseDate: '2024-02-20',
        changelog: 'Added support for crypto payments',
        breaking: false
      }
    ],
    owner: 'Payments Team',
    sla: '99.99%',
    rateLimit: '1000/min',
    authentication: ['OAuth 2.0', 'API Key'],
    tags: ['payments', 'financial', 'secure']
  },
  {
    id: '2',
    title: 'Accounts API',
    description: 'Manage customer accounts, balances, and transactions.',
    category: 'Banking',
    version: '1.8.0',
    status: 'stable',
    spec: {
      format: 'OpenAPI',
      url: '/specs/accounts.yaml',
      lastUpdated: '2024-02-15'
    },
    versions: [
      {
        version: '1.8.0',
        releaseDate: '2024-02-15',
        changelog: 'Added transaction history endpoints',
        breaking: false
      }
    ],
    owner: 'Core Banking Team',
    sla: '99.95%',
    rateLimit: '500/min',
    authentication: ['OAuth 2.0'],
    tags: ['accounts', 'banking', 'core']
  }
];

export default function Dashboard() {
  const handleSearch = (query: string) => {
    console.log('Searching:', query);
  };

  const handleFilter = () => {
    console.log('Opening filters');
  };

  const handleExploreAPI = (api: API) => {
    console.log('Exploring API:', api.title);
  };

  return (
    <div className="flex-1 relative z-0 flex overflow-hidden">
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">API Catalog</h1>
              <button className="btn-primary">
                Request API Access
              </button>
            </div>

            <div className="mt-8">
              <QuickStart />
            </div>

            <div className="mt-8">
              <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
              
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Featured APIs</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredAPIs.map((api) => (
                    <APICard 
                      key={api.id} 
                      api={api} 
                      onExplore={handleExploreAPI}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}