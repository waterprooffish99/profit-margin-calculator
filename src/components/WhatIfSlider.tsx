/**
 * WhatIfSlider Component
 * 
 * Allows users to simulate different pricing scenarios.
 * Updated for Feature 3 (Currency).
 */

import React from 'react';
import type { Currency } from '../types';

interface WhatIfSliderProps {
  targetPrice: number;
  value: number;
  onChange: (value: number | null) => void;
  marginPercentage: number;
  currency: Currency;
}

const WhatIfSlider: React.FC<WhatIfSliderProps> = ({ 
  targetPrice, 
  value, 
  onChange, 
  marginPercentage,
  currency 
}) => {
  const min = Math.max(0, targetPrice * 0.5);
  const max = targetPrice * 2 || 100;

  const isProfit = marginPercentage >= 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm font-medium text-gray-700">Test a different price:</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {currency.symbol}{value.toFixed(2)}
          </p>
        </div>
        <button 
          onClick={() => onChange(null)}
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider mb-1"
        >
          Reset to Target
        </button>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step="0.01"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
      />

      <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <span>{currency.symbol}{min.toFixed(0)}</span>
        <span>{currency.symbol}{max.toFixed(0)}</span>
      </div>

      <div className={`p-4 rounded-xl text-center transition-colors duration-300 ${
        isProfit ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
      }`}>
        <p className="text-sm font-medium">
          At this price, your margin would be <span className="font-bold">{marginPercentage.toFixed(1)}%</span>
        </p>
      </div>
    </div>
  );
};

export default WhatIfSlider;
