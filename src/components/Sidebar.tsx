import React from 'react';
import { Home, Book, Lock, Settings, HelpCircle, BarChart3, Box } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: Home },
  { name: 'APIs', icon: Box },
  { name: 'Documentation', icon: Book },
  { name: 'Authentication', icon: Lock },
  { name: 'Analytics', icon: BarChart3 },
  { name: 'Settings', icon: Settings },
  { name: 'Support', icon: HelpCircle },
];

export default function Sidebar() {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href="#"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <item.icon className="mr-3 h-6 w-6" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}