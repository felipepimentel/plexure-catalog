import React from 'react';
import { Code2, Zap, Book } from 'lucide-react';

const quickLinks = [
  {
    icon: <Code2 className="h-5 w-5" />,
    title: 'Interactive Docs',
    description: 'Try APIs in your browser',
    href: '#/docs'
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Quick Start',
    description: 'SDK integration guides',
    href: '#/quickstart'
  },
  {
    icon: <Book className="h-5 w-5" />,
    title: 'API Guides',
    description: 'Best practices & tutorials',
    href: '#/guides'
  }
];

export function APIQuickNav() {
  return (
    <div className="bg-[#1E1E1E] border-b border-[#424242] py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-[#2A2A2A] transition-colors group"
            >
              <div className="text-[#4FC3F7] group-hover:text-[#81D4FA]">
                {link.icon}
              </div>
              <div>
                <div className="text-white font-medium text-sm">
                  {link.title}
                </div>
                <div className="text-[#9E9E9E] text-xs">
                  {link.description}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}