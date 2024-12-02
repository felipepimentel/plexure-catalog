import React from 'react';
import { APIVersion } from '../../types/api';

interface APIVersionBadgeProps {
  version: APIVersion;
}

export default function APIVersionBadge({ version }: APIVersionBadgeProps) {
  return (
    <div className="inline-flex items-center space-x-2">
      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        v{version.version}
      </span>
      {version.breaking && (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Breaking Changes
        </span>
      )}
    </div>
  );
}