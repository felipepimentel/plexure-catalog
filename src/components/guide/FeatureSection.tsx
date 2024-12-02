import React from 'react';
import { Box, GitBranch, Users, Shield, Zap, Code2 } from 'lucide-react';

const features = [
  {
    title: 'Stack Creation',
    description: 'Build and maintain technology stacks with predefined templates and components',
    icon: Box
  },
  {
    title: 'Version Control',
    description: 'Integrated version control and component management',
    icon: GitBranch
  },
  {
    title: 'Team Collaboration',
    description: 'Collaborate with team members on stack development',
    icon: Users
  },
  {
    title: 'Security',
    description: 'Built-in security checks and compliance monitoring',
    icon: Shield
  },
  {
    title: 'Automation',
    description: 'Automate repetitive tasks and deployments',
    icon: Zap
  },
  {
    title: 'Custom Templates',
    description: 'Create and share custom templates across your organization',
    icon: Code2
  }
];

export default function FeatureSection() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Platform Features</h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive tools and features to accelerate your development workflow
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <feature.icon className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
              </div>
              <p className="mt-4 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}