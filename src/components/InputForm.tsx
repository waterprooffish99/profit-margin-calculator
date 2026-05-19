/**
 * InputForm Component
 * 
 * Handles the main numerical inputs for the calculator.
 * Updated to support dynamic currency symbols and shipping costs.
 */

import React from 'react'
import type { CalculatorState, Currency } from '../types'

interface InputFormProps {
  state: CalculatorState
  currency: Currency
  onChange: (key: keyof CalculatorState, value: number) => void
}

const InputForm: React.FC<InputFormProps> = ({ state, currency, onChange }) => {
  const inputs = [
    { label: 'Cost of Goods Sold (COGS)', key: 'cogs', prefix: currency.symbol },
    { label: 'Shipping Cost per Unit', key: 'shipping', prefix: currency.symbol },
    { label: 'Target Selling Price', key: 'targetPrice', prefix: currency.symbol },
  ]

  const handleChange = (key: keyof CalculatorState, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0
    onChange(key, value)
  }

  return (
    <div className="space-y-4">
      {inputs.map((input) => (
        <div key={input.key}>
          <label htmlFor={input.key} className="block text-sm font-medium text-gray-700 mb-1">
            {input.label}
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{input.prefix}</span>
            </div>
            <input
              type="number"
              name={input.key}
              id={input.key}
              className={`block w-full border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm p-2.5 border outline-none transition-colors ${
                currency.symbol.length > 1 ? 'pl-12' : 'pl-8'
              }`}
              placeholder="0.00"
              value={state[input.key as keyof CalculatorState] || ''}
              onChange={(e) => handleChange(input.key as keyof CalculatorState, e)}
              step="0.01"
              min="0"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default InputForm
