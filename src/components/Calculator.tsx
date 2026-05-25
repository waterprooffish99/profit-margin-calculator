/**
 * Calculator Component - Version 2.0
 * 
 * This is the central hub of the application. It manages state for inputs,
 * platforms, and currencies, and performs real-time calculations.
 */

import { useState, useMemo, useEffect, useRef } from 'react'
import InputForm from './InputForm'
import ResultsDashboard from './ResultsDashboard'
import WhatIfSlider from './WhatIfSlider'
import PlatformSelector from './PlatformSelector'
import CurrencySwitcher from './CurrencySwitcher'
import BreakdownPanel from './BreakdownPanel'
import MinPriceCalculator from './MinPriceCalculator'
import PaywallModal from './PaywallModal'
import type { CalculatorState, CalculationResults } from '../types'
import { PLATFORMS, CURRENCIES } from '../constants'

const STORAGE_KEY = 'profit_calc_usage_v2';
const FREE_LIMIT = 5;

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

  const [usageCount, setUsageCount] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [whatIfPrice, setWhatIfPrice] = useState<number | null>(null)
  const isFirstRender = useRef(true);
  
  // Track unique product combinations already counted in this session
  // to avoid double-counting the same product being edited.
  const countedCombinations = useRef<Set<string>>(new Set());
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Increment usage count with "Unique Product" logic
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Only count if below the limit
    if (usageCount >= FREE_LIMIT) return;

    // Only count if they've entered both a price and a cost
    const hasData = state.targetPrice > 0 && state.cogs > 0;
    if (!hasData) return;

    // Create a hash based on rounded values to allow minor edits without new counts
    const productHash = `${Math.round(state.targetPrice)}-${Math.round(state.cogs)}-${state.platformId}`;
    
    // If we've already counted this product combination in this session, skip
    if (countedCombinations.current.has(productHash)) return;

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    // Long debounce (10s) ensures they've actually "settled" on a calculation
    debounceTimer.current = setTimeout(() => {
      setUsageCount((prev) => {
        const newCount = prev + 1;
        localStorage.setItem(STORAGE_KEY, newCount.toString());
        countedCombinations.current.add(productHash);
        return newCount;
      });
    }, 10000); 

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [state, usageCount]);

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
      {usageCount >= FREE_LIMIT && <PaywallModal onBypass={() => setUsageCount(0)} />}

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
            isLocked={usageCount >= FREE_LIMIT - 1} // Lock when they have 1 try left or reached limit
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
