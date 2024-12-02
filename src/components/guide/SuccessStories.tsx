import React from 'react';
import { Star } from 'lucide-react';

const stories = [
  {
    company: 'TechCorp',
    quote: 'StackSpot reduced our development time by 40% and improved code consistency across teams.',
    author: 'John Smith',
    role: 'CTO'
  },
  {
    company: 'InnovateTech',
    quote: 'The platform helped us standardize our development practices and accelerate project delivery.',
    author: 'Sarah Johnson',
    role: 'Lead Developer'
  },
  {
    company: 'DevOps Solutions',
    quote: "StackSpot's templates and automation features transformed our development workflow.",
    author: 'Michael Chen',
    role: 'DevOps Manager'
  }
];

export default function SuccessStories() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
          <p className="mt-4 text-lg text-gray-600">
            See how organizations are accelerating their development with StackSpot
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <div key={story.company} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-600 italic mb-4">"{story.quote}"</blockquote>
              <div className="border-t pt-4">
                <p className="font-medium text-gray-900">{story.author}</p>
                <p className="text-sm text-gray-500">{story.role}, {story.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}