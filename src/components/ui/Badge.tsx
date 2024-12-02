import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'error';
}

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-[#2A2A2A] text-white': variant === 'default',
          'bg-[#1B4D3E] text-[#4ADE80]': variant === 'success',
          'bg-[#4D1B1B] text-[#EF4444]': variant === 'error',
        },
        className
      )}
      {...props}
    />
  );
}