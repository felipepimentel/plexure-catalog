import React from 'react';
import { Shield, AlertTriangle, Clock, Users } from 'lucide-react';
import { Card } from '../ui/Card';

interface APIGovernanceProps {
  security: {
    authMethods: string[];
    scopes: string[];
    rateLimit: string;
  };
  owner: string;
  sla: string;
}

export function APIGovernance({ security, owner, sla }: APIGovernanceProps) {
  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-5 w-5 text-[#4FC3F7]" />
        <h3 className="text-lg font-semibold text-white">Governance & Security</h3>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-[#E0E0E0] font-medium mb-2">Authentication Methods</h4>
          <div className="flex flex-wrap gap-2">
            {security.authMethods.map((method) => (
              <span
                key={method}
                className="px-2 py-1 bg-[#2A2A2A] rounded text-sm text-[#E0E0E0]"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[#E0E0E0] font-medium mb-2">Required Scopes</h4>
          <div className="flex flex-wrap gap-2">
            {security.scopes.map((scope) => (
              <span
                key={scope}
                className="px-2 py-1 bg-[#2A2A2A] rounded text-sm text-[#E0E0E0]"
              >
                {scope}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-[#4FC3F7]" />
            <div>
              <p className="text-xs text-[#E0E0E0]">Rate Limit</p>
              <p className="text-sm font-medium text-white">{security.rateLimit}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-[#4FC3F7]" />
            <div>
              <p className="text-xs text-[#E0E0E0]">SLA</p>
              <p className="text-sm font-medium text-white">{sla}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-[#4FC3F7]" />
            <div>
              <p className="text-xs text-[#E0E0E0]">Owner</p>
              <p className="text-sm font-medium text-white">{owner}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}