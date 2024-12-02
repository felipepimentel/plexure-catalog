import React from 'react';
import { Calendar, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { APIVersion } from '../../types/api';

interface APIVersionHistoryProps {
  versions: APIVersion[];
}

export function APIVersionHistory({ versions }: APIVersionHistoryProps) {
  return (
    <Card className="bg-[#1E1E1E] p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Version History</h3>
      <div className="space-y-4">
        {versions.map((version) => (
          <div key={version.version} className="border-l-2 border-[#424242] pl-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium">v{version.version}</span>
                {version.breaking && (
                  <Badge variant="error" className="ml-2">
                    Breaking Changes
                  </Badge>
                )}
                {!version.supported && (
                  <Badge variant="error" className="ml-2">
                    Deprecated
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-[#E0E0E0] text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(version.releaseDate).toLocaleDateString()}
              </div>
            </div>
            <p className="text-[#E0E0E0] text-sm">{version.changelog}</p>
            {version.endOfLife && (
              <div className="flex items-center mt-2 text-[#EF4444] text-sm">
                <AlertTriangle className="h-4 w-4 mr-1" />
                End of Life: {new Date(version.endOfLife).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}