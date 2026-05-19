/**
 * Calculator Component - Version 2.0
 * 
 * This is the central hub of the application. It manages state for inputs,
 * platforms, and currencies, and performs real-time calculations.
 */

import { useState, useMemo } from 'react'
import InputForm from './InputForm'
import ResultsDashboard from './ResultsDashboard'
import WhatIfSlider from './WhatIfSlider'
import PlatformSelector from './PlatformSelector'
import CurrencySwitcher from './CurrencySwitcher'
import BreakdownPanel from './BreakdownPanel'
import MinPriceCalculator from './MinPriceCalculator'
import type { CalculatorState, CalculationResults } from '../types'
import { PLATFORMS, CURRENCIES } from '../constants'

const Calculator = () => {
  // Initialize state with default values
  const [state, setState] = useState<CalculatorState>({
    cogs: 0,
    shipping: 0,
    customFeePercentage: 0,
    platformId: 'custom',
    targetPrice: 0,
    currencyCode: 'USD',
  })

  const [whatIfPrice, setWhatIfPrice] = useState<number | null>(null)

  // Find active platform and currency objects
  const activePlatform = PLATFORMS.find(p => p.id === state.platformId) || PLATFORMS[0]
  const activeCurrency = CURRENCIES.find(c => c.code === state.currencyCode) || CURRENCIES[0]
  const activePrice = whatIfPrice !== null ? whatIfPrice : state.targetPrice

  // Core Calculation Engine
  const calculations = useMemo((): CalculationResults => {
    // Determine which fee percentage to use
    const feePercent = state.platformId === 'custom' 
      ? state.customFeePercentage 
      : activePlatform.feePercent

    const percentageFee = (feePercent / 100) * activePrice
    const flatFee = state.platformId === 'custom' ? 0 : activePlatform.feeFlat
    const totalFee = percentageFee + flatFee

    const totalCost = state.cogs + state.shipping + totalFee
    const netProfit = activePrice - totalCost
    
    const marginPercentage = activePrice > 0 ? (netProfit / activePrice) * 100 : 0
    const markupPercentage = state.cogs > 0 ? (netProfit / state.cogs) * 100 : 0

    return {
      feeAmount: totalFee,
      totalCost,
      netProfit,
      marginPercentage,
      markupPercentage,
      sellingPrice: activePrice,
    }
  }, [state, activePrice, activePlatform])

  const handleStateChange = (updates: Partial<CalculatorState>) => {
    setState((prev) => ({ ...prev, ...updates }))
    // Reset what-if slider if target price changes
    if ('targetPrice' in updates) {
      setWhatIfPrice(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Global Settings: Currency */}
      <div className="flex justify-end">
        <CurrencySwitcher 
          value={state.currencyCode} 
          onChange={(code) => handleStateChange({ currencyCode: code })} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Inputs Section */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Details</h2>
            <div className="space-y-6">
              <PlatformSelector 
                value={state.platformId} 
                customFee={state.customFeePercentage}
                onChange={(platformId, customFee) => handleStateChange({ platformId, customFeePercentage: customFee })}
              />
              <InputForm 
                state={state} 
                currency={activeCurrency}
                onChange={(key, val) => handleStateChange({ [key]: val })} 
              />
            </div>
          </section>
          
          {/* Analysis Tools */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">"What-If" Analysis</h2>
            <WhatIfSlider 
              targetPrice={state.targetPrice} 
              value={activePrice} 
              onChange={setWhatIfPrice} 
              marginPercentage={calculations.marginPercentage}
              currency={activeCurrency}
            />
          </section>

          <MinPriceCalculator 
            state={state} 
            activePlatform={activePlatform} 
            currency={activeCurrency}
          />
        </div>

        {/* Results Section */}
        <div className="lg:sticky lg:top-8 self-start space-y-6">
          <ResultsDashboard 
            calculations={calculations} 
            currency={activeCurrency}
            isWhatIf={whatIfPrice !== null}
          />
          <BreakdownPanel 
            state={state}
            calculations={calculations}
            currency={activeCurrency}
            platformName={activePlatform.name}
          />
        </div>
      </div>
    </div>
  )
}

export default Calculator
