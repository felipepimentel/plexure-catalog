import React from 'react';
import { Code2, Zap, Book, Lock, Users, BarChart2 } from 'lucide-react';
import { APIFeatureCard } from './APIFeatureCard';

const features = [
  {
    title: 'Interactive Docs',
    description: 'Try APIs directly in your browser with live code samples.',
    icon: <Code2 className="h-5 w-5" />,
    link: '#/docs'
  },
  {
    title: 'Quick Start',
    description: 'Get started with SDKs for popular languages.',
    icon: <Zap className="h-5 w-5" />,
    link: '#/integration'
  },
  {
    title: 'API Guides',
    description: 'Learn implementation patterns and best practices.',
    icon: <Book className="h-5 w-5" />,
    link: '#/guides'
  }
];

const secondaryFeatures = [
  {
    title: 'Security',
    description: 'Implement proper authentication and security.',
    icon: <Lock className="h-5 w-5" />,
    link: '#/security'
  },
  {
    title: 'Community',
    description: 'Join our developer community for support.',
    icon: <Users className="h-5 w-5" />,
    link: '#/community'
  },
  {
    title: 'Analytics',
    description: 'Monitor API usage and performance.',
    icon: <BarChart2 className="h-5 w-5" />,
    link: '#/analytics'
  }
];

export function APIFeaturesGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {features.map((feature) => (
        <APIFeatureCard key={feature.title} feature={feature} />
      ))}
      <div className="col-span-3 mt-2">
        <div className="grid grid-cols-3 gap-4">
          {secondaryFeatures.map((feature) => (
            <APIFeatureCard
              key={feature.title}
              feature={feature}
              variant="secondary"
            />
          ))}
        </div>
      </div>
    </div>
  );
}