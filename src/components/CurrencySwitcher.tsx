/**
 * CurrencySwitcher Component
 * 
 * A simple dropdown to switch the active currency symbol throughout the app.
 */

import React from 'react';
import { CURRENCIES } from '../constants';

interface CurrencySwitcherProps {
  value: string;
  onChange: (code: string) => void;
}

const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="currency" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Currency:
      </label>
      <select
        id="currency"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm font-medium text-gray-700 border-none focus:ring-0 cursor-pointer hover:text-emerald-600 transition-colors"
      >
        {CURRENCIES.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.symbol} {currency.code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySwitcher;
