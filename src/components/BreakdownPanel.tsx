/**
 * BreakdownPanel Component
 * 
 * Provides a detailed, itemized list of all costs and the final profit.
 * This fulfills Feature 4: Full Cost Breakdown Panel.
 */

import React from 'react';
import type { CalculatorState, CalculationResults, Currency } from '../types';

interface BreakdownPanelProps {
  state: CalculatorState;
  calculations: CalculationResults;
  currency: Currency;
  platformName: string;
}

const BreakdownPanel: React.FC<BreakdownPanelProps> = ({ state, calculations, currency, platformName }) => {
  const formatValue = (val: number) => {
    return `${currency.symbol}${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const isProfit = calculations.netProfit >= 0;

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Detailed Breakdown</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Selling Price</span>
          <span className="font-medium text-gray-900">{formatValue(calculations.sellingPrice)}</span>
        </div>
        
        <div className="border-t border-gray-100 pt-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Cost of Goods (COGS)</span>
            <span className="font-medium text-gray-600">-{formatValue(state.cogs)}</span>
          </div>
          
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">Platform Fee ({platformName})</span>
            <span className="font-medium text-gray-600">-{formatValue(calculations.feeAmount)}</span>
          </div>
          
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">Shipping Cost</span>
            <span className="font-medium text-gray-600">-{formatValue(state.shipping)}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900 text-base">Net Profit</span>
            <span className={`text-lg font-bold ${isProfit ? 'text-emerald-600' : 'text-red-600'}`}>
              {isProfit ? '' : '-'}{formatValue(Math.abs(calculations.netProfit))}
            </span>
          </div>
          
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">Gross Margin</span>
            <span className={`font-medium ${isProfit ? 'text-emerald-600' : 'text-red-600'}`}>
              {calculations.marginPercentage.toFixed(2)}%
            </span>
          </div>

          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">Markup</span>
            <span className="font-medium text-gray-700">
              {calculations.markupPercentage.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreakdownPanel;
