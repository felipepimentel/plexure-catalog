import React from 'react';
import { Book, Key, Code, ArrowUpRight } from 'lucide-react';

const quickStartItems = [
  {
    title: 'Authentication Guide',
    description: 'Learn how to authenticate your API requests',
    icon: Key,
    href: '#/auth'
  },
  {
    title: 'API Guidelines',
    description: 'Best practices and standards',
    icon: Book,
    href: '#/guidelines'
  },
  {
    title: 'SDKs & Tools',
    description: 'Official SDKs and developer tools',
    icon: Code,
    href: '#/tools'
  }
];

export default function QuickStart() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900">Quick Start</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {quickStartItems.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="relative rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-gray-400 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <item.icon className="h-6 w-6 text-blue-600" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-gray-400" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}