/**
 * PlatformSelector Component
 * 
 * Allows users to select a selling platform from a list of presets.
 * If 'Custom' is selected, it provides an input for a manual fee percentage.
 */

import React from 'react';
import { PLATFORMS } from '../constants';

interface PlatformSelectorProps {
  value: string;
  customFee: number;
  onChange: (platformId: string, customFee: number) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ value, customFee, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
          Selling Platform
        </label>
        <select
          id="platform"
          value={value}
          onChange={(e) => onChange(e.target.value, customFee)}
          className="block w-full border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2.5 border outline-none bg-white transition-colors"
        >
          {PLATFORMS.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
      </div>

      {value === 'custom' && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
          <label htmlFor="customFee" className="block text-sm font-medium text-gray-700 mb-1">
            Custom Fee Percentage
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="customFee"
              value={customFee || ''}
              onChange={(e) => onChange(value, parseFloat(e.target.value) || 0)}
              className="block w-full border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2.5 border outline-none transition-colors pr-8"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformSelector;
