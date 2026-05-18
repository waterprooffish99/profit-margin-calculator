/**
 * ResultsDashboard Component
 * 
 * Displays the high-level summary of calculations.
 * Updated to support Features 5 (Benchmarks) and 6 (Export).
 */

import React from 'react';
import { CalculationResults, Currency } from '../types';
import BenchmarkBadge from './BenchmarkBadge';
import ExportButtons from './ExportButtons';

interface ResultsDashboardProps {
  calculations: CalculationResults;
  currency: Currency;
  isWhatIf: boolean;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ calculations, currency, isWhatIf }) => {
  const formatCurrency = (val: number) => {
    return `${currency.symbol}${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const isProfit = calculations.netProfit >= 0;

  return (
    <div className={`p-8 rounded-3xl shadow-xl border transition-all duration-300 ${
      isWhatIf ? 'bg-indigo-900 border-indigo-700' : 'bg-gray-900 border-gray-800'
    }`}>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider">
            {isWhatIf ? 'Simulated Net Profit' : 'Estimated Net Profit'}
          </h2>
          <p className={`text-5xl font-bold mt-2 tracking-tight ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
            {isProfit ? '' : '-'}{formatCurrency(Math.abs(calculations.netProfit))}
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Gross Margin</h2>
          <p className={`text-3xl font-bold mt-2 ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
            {calculations.marginPercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
        <div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Selling Price</p>
          <p className="text-xl font-semibold text-white mt-1">{formatCurrency(calculations.sellingPrice)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Total Costs</p>
          <p className="text-xl font-semibold text-white mt-1">{formatCurrency(calculations.totalCost)}</p>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
        <BenchmarkBadge margin={calculations.marginPercentage} />
        <ExportButtons calculations={calculations} currency={currency} />
      </div>
    </div>
  );
};

export default ResultsDashboard;
