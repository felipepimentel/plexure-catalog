import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-[#1E1E1E] shadow-sm transition-all duration-200',
        className
      )}
      {...props}
    />
  );
}