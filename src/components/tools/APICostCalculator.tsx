import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, Activity } from 'lucide-react';
import { Card } from '../ui/Card';

interface PricingTier {
  name: string;
  requests: number;
  price: number;
  features: string[];
}

interface APICostCalculatorProps {
  pricingTiers: PricingTier[];
}

export function APICostCalculator({ pricingTiers }: APICostCalculatorProps) {
  const [requestsPerMonth, setRequestsPerMonth] = useState<number>(10000);
  const [selectedTier, setSelectedTier] = useState<PricingTier>(pricingTiers[0]);

  const calculateCost = (requests: number, tier: PricingTier) => {
    const extraRequests = Math.max(0, requests - tier.requests);
    const extraCost = Math.ceil(extraRequests / 1000) * (tier.price / (tier.requests / 1000));
    return tier.price + extraCost;
  };

  const estimatedCost = calculateCost(requestsPerMonth, selectedTier);

  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="h-5 w-5 text-[#4FC3F7]" />
        <h3 className="text-lg font-semibold text-white">Cost Calculator</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[#E0E0E0] text-sm font-medium mb-2">
            Estimated Monthly Requests
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={requestsPerMonth}
              onChange={(e) => setRequestsPerMonth(Number(e.target.value))}
              className="flex-1 px-4 py-2 bg-[#2A2A2A] border border-[#424242] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
            />
            <Activity className="h-5 w-5 text-[#4FC3F7]" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {pricingTiers.map((tier) => (
            <button
              key={tier.name}
              onClick={() => setSelectedTier(tier)}
              className={`p-4 rounded-lg border ${
                selectedTier.name === tier.name
                  ? 'border-[#FF5722] bg-[#2A2A2A]'
                  : 'border-[#424242] hover:border-[#FF5722] hover:bg-[#2A2A2A]'
              } transition-all`}
            >
              <h4 className="text-white font-medium mb-2">{tier.name}</h4>
              <div className="text-[#4FC3F7] font-bold mb-2">
                ${tier.price}/month
              </div>
              <div className="text-[#E0E0E0] text-sm mb-4">
                Up to {tier.requests.toLocaleString()} requests
              </div>
              <ul className="space-y-2">
                {tier.features.map((feature, index) => (
                  <li key={index} className="text-[#9E9E9E] text-sm flex items-center">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <div className="bg-[#2A2A2A] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-[#4FC3F7]" />
              <span className="text-white font-medium">Estimated Monthly Cost</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-[#E0E0E0]" />
              <span className="text-[#E0E0E0] text-sm">Monthly billing</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            ${estimatedCost.toFixed(2)}
          </div>
          <p className="text-[#9E9E9E] text-sm mt-2">
            Based on {requestsPerMonth.toLocaleString()} requests/month with {selectedTier.name} tier
          </p>
        </div>
      </div>
    </Card>
  );
}