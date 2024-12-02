import React from 'react';
import { Book, Code, PlayCircle, FileText } from 'lucide-react';
import { Card } from '../ui/Card';

interface APIDocumentationProps {
  documentation: {
    overview: string;
    quickStart: string;
    tutorials: string[];
    examples: string[];
  };
}

export function APIDocumentation({ documentation }: APIDocumentationProps) {
  return (
    <Card className="bg-[#1E1E1E] p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Documentation</h3>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <Book className="h-6 w-6 text-[#4FC3F7] mt-1" />
          <div>
            <h4 className="text-white font-medium mb-2">Overview</h4>
            <p className="text-[#E0E0E0] text-sm">{documentation.overview}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <PlayCircle className="h-6 w-6 text-[#4FC3F7] mt-1" />
          <div>
            <h4 className="text-white font-medium mb-2">Quick Start</h4>
            <p className="text-[#E0E0E0] text-sm">{documentation.quickStart}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <FileText className="h-6 w-6 text-[#4FC3F7] mt-1" />
          <div>
            <h4 className="text-white font-medium mb-2">Tutorials</h4>
            <ul className="space-y-2">
              {documentation.tutorials.map((tutorial, index) => (
                <li key={index} className="text-[#E0E0E0] text-sm hover:text-[#4FC3F7]">
                  <a href="#" className="flex items-center space-x-2">
                    <span>→</span>
                    <span>{tutorial}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Code className="h-6 w-6 text-[#4FC3F7] mt-1" />
          <div>
            <h4 className="text-white font-medium mb-2">Code Examples</h4>
            <ul className="space-y-2">
              {documentation.examples.map((example, index) => (
                <li key={index} className="text-[#E0E0E0] text-sm hover:text-[#4FC3F7]">
                  <a href="#" className="flex items-center space-x-2">
                    <span>→</span>
                    <span>{example}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}