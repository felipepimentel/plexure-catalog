import React from 'react';
import { Check, X } from 'lucide-react';

const platforms = [
  {
    name: 'StackSpot',
    features: {
      templates: true,
      versionControl: true,
      security: true,
      automation: true,
      collaboration: true,
      customization: true
    }
  },
  {
    name: 'Alternative 1',
    features: {
      templates: true,
      versionControl: true,
      security: false,
      automation: true,
      collaboration: true,
      customization: false
    }
  },
  {
    name: 'Alternative 2',
    features: {
      templates: true,
      versionControl: false,
      security: true,
      automation: false,
      collaboration: true,
      customization: true
    }
  }
];

export default function ComparisonTable() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Platform Comparison</h2>
        
        <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Feature
                </th>
                {platforms.map((platform) => (
                  <th
                    key={platform.name}
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    {platform.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {Object.keys(platforms[0].features).map((feature) => (
                <tr key={feature}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 capitalize">
                    {feature}
                  </td>
                  {platforms.map((platform) => (
                    <td key={`${platform.name}-${feature}`} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                      {platform.features[feature] ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}