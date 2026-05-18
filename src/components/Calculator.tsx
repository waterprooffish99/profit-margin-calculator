import { useState, useMemo } from 'react'
import InputForm from './InputForm'
import ResultsDashboard from './ResultsDashboard'
import WhatIfSlider from './WhatIfSlider'

export interface CalculatorState {
  cogs: number
  shipping: number
  feePercentage: number
  targetPrice: number
}

const Calculator = () => {
  const [state, setState] = useState<CalculatorState>({
    cogs: 0,
    shipping: 0,
    feePercentage: 0,
    targetPrice: 0,
  })

  const [whatIfPrice, setWhatIfPrice] = useState<number | null>(null)

  const activePrice = whatIfPrice !== null ? whatIfPrice : state.targetPrice

  const calculations = useMemo(() => {
    const feeAmount = (state.feePercentage / 100) * activePrice
    const totalCost = state.cogs + state.shipping + feeAmount
    const netProfit = activePrice - totalCost
    const marginPercentage = activePrice > 0 ? (netProfit / activePrice) * 100 : 0

    return {
      feeAmount,
      totalCost,
      netProfit,
      marginPercentage,
    }
  }, [state, activePrice])

  const handleInputChange = (key: keyof CalculatorState, value: number) => {
    setState((prev) => ({ ...prev, [key]: value }))
    // Reset what-if price when target price changes to stay in sync initially
    if (key === 'targetPrice') {
      setWhatIfPrice(null)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Cost & Pricing Inputs</h2>
          <InputForm state={state} onChange={handleInputChange} />
        </section>
        
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">"What-If" Analysis</h2>
          <WhatIfSlider 
            targetPrice={state.targetPrice} 
            value={activePrice} 
            onChange={setWhatIfPrice} 
            marginPercentage={calculations.marginPercentage}
          />
        </section>
      </div>

      <div className="lg:sticky lg:top-8 self-start">
        <ResultsDashboard 
          calculations={calculations} 
          activePrice={activePrice}
          isWhatIf={whatIfPrice !== null}
        />
      </div>
    </div>
  )
}

export default Calculator
