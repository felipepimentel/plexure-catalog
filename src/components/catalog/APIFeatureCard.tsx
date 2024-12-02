import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

interface APIFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

interface APIFeatureCardProps {
  feature: APIFeature;
  variant?: 'primary' | 'secondary';
}

export function APIFeatureCard({ feature, variant = 'primary' }: APIFeatureCardProps) {
  return (
    <Card 
      className={cn(
        "bg-[#1E1E1E] p-4 hover:border-[#FF5722] border transition-all duration-200",
        variant === 'primary' 
          ? "border-[#424242] min-h-[160px]"
          : "border-[#2A2A2A] min-h-[120px]"
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="text-[#4FC3F7] mt-1">{feature.icon}</div>
        <div className="flex-1">
          <h3 className={cn(
            "font-medium mb-1",
            variant === 'primary' ? "text-white" : "text-[#E0E0E0]"
          )}>
            {feature.title}
          </h3>
          <p className={cn(
            "text-sm mb-3",
            variant === 'primary' ? "text-[#E0E0E0]" : "text-[#9E9E9E]"
          )}>
            {feature.description}
          </p>
          <a
            href={feature.link}
            className="inline-flex items-center text-[#4FC3F7] hover:text-[#81D4FA] text-sm"
          >
            Learn more
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </Card>
  );
}