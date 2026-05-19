/**
 * MinPriceCalculator Component
 * 
 * A "reverse" calculator that tells the user what price they should set
 * to achieve a specific target margin.
 * This fulfills Feature 7: Minimum Viable Price Calculator.
 */

import React, { useState, useMemo } from 'react';
import type { CalculatorState, Platform, Currency } from '../types';

interface MinPriceCalculatorProps {
  state: CalculatorState;
  activePlatform: Platform;
  currency: Currency;
}

const MinPriceCalculator: React.FC<MinPriceCalculatorProps> = ({ state, activePlatform, currency }) => {
  const [targetMargin, setTargetMargin] = useState<number>(40);

  const minPrice = useMemo(() => {
    const marginDec = targetMargin / 100;
    const platformFeeDec = (state.platformId === 'custom' ? state.customFeePercentage : activePlatform.feePercent) / 100;
    const flatFee = state.platformId === 'custom' ? 0 : activePlatform.feeFlat;

    /**
     * Calculation Logic:
     * Price = (COGS + Shipping + FlatFee) / (1 - Margin% - PlatformFee%)
     */
    const denominator = 1 - marginDec - platformFeeDec;
    
    if (denominator <= 0) return 0;
    
    return (state.cogs + state.shipping + flatFee) / denominator;
  }, [state, activePlatform, targetMargin]);

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">What's my minimum price?</h2>
      <p className="text-sm text-gray-500 mb-6">Calculate the selling price needed to hit a specific margin.</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="targetMargin" className="block text-sm font-medium text-gray-700 mb-1">
            Desired Margin %
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="targetMargin"
              value={targetMargin || ''}
              onChange={(e) => setTargetMargin(parseFloat(e.target.value) || 0)}
              className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5 border outline-none transition-colors pr-8"
              placeholder="40"
              min="0"
              max="99"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-800 font-medium">
            To achieve a <span className="font-bold">{targetMargin}%</span> margin, you must sell at minimum:
          </p>
          <p className="text-2xl font-bold text-blue-900 mt-1">
            {currency.symbol}{minPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MinPriceCalculator;
