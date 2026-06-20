/**
 * Calculator Component - Version 2.2 (Tiered Features Update)
 * 
 * This update introduces 3 packages for Fiverr:
 * 1. BASIC: 5 tries, limited platforms, no exports.
 * 2. STANDARD: Unlimited tries, all platforms, all exports.
 * 3. PREMIUM: White-label support (Custom Logo & Colors).
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
import { IS_DEV } from '../utils/environment'
import type { CalculatorState, CalculationResults, UserTier } from '../types'
import { PLATFORMS, CURRENCIES, DEV_SESSION_KEY } from '../constants'

const TIER_KEY = 'profit_calc_tier';
const FREE_LIMIT = 3;

const Calculator = () => {
  // Initialize Tier
  const [tier, setTier] = useState<UserTier>(() => {
    const saved = localStorage.getItem(TIER_KEY);
    return (saved as UserTier) || 'BASIC';
  });

  const [state, setState] = useState<CalculatorState>({
    cogs: 0,
    shipping: 0,
    customFeePercentage: 0,
    platformId: 'none',
    targetPrice: 0,
    currencyCode: 'USD',
  })

  const [usageCount, setUsageCount] = useState<number>(() => {
    if (IS_DEV) return 0; // Layer 4: Skip paywall completely on localhost
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(DEV_SESSION_KEY) === 'true') return 0; // Owner bypass on live site

    // Layer 3: Timestamp validation with cookie trap
    const hasVisitedCookie = typeof document !== 'undefined' && 
      document.cookie.split(';').some((item) => item.trim().startsWith('_pmc_v2_vis='));
    const lsTs = localStorage.getItem('_pmc_v2_ts');
    const ssTs = sessionStorage.getItem('_pmc_v2_ts');
    const hasTimestamp = lsTs || ssTs;

    // Layer 2: Save count in BOTH places and read the higher value
    const lsCount = parseInt(localStorage.getItem('_pmc_v2_sess') || '0', 10);
    const ssCount = parseInt(sessionStorage.getItem('_pmc_v2_sess') || '0', 10);
    const count = Math.max(lsCount, ssCount);

    // If they have cookie but timestamp is missing, they likely cleared storage.
    // Block them immediately by setting count to free limit.
    if (hasVisitedCookie && !hasTimestamp) {
      return FREE_LIMIT;
    }

    return count;
  });
  const [whatIfPrice, setWhatIfPrice] = useState<number | null>(null)
  const isFirstRender = useRef(true);
  
  const countedCombinations = useRef<Set<string>>(new Set());
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isBasic = tier === 'BASIC';
  const isPremium = tier === 'PREMIUM';

  // Secret Owner Panel: Use this to upgrade your buyers!
  const handleTierChange = (newTier: UserTier) => {
    setTier(newTier);
    localStorage.setItem(TIER_KEY, newTier);
  };

  useEffect(() => {
    if (IS_DEV) return; // Layer 4: Skip ALL freemium checks - owner is testing
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(DEV_SESSION_KEY) === 'true') return; // Owner bypass on live site
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (tier !== 'BASIC') return;
    if (usageCount >= FREE_LIMIT) return;
    const hasData = state.targetPrice > 0 && state.cogs > 0;
    if (!hasData) return;
    const productHash = `${Math.round(state.targetPrice)}-${Math.round(state.cogs)}-${state.platformId}`;
    if (countedCombinations.current.has(productHash)) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setUsageCount((prev) => {
        const newCount = prev + 1;
        
        // Layer 2: Save in BOTH places simultaneously
        localStorage.setItem('_pmc_v2_sess', newCount.toString());
        sessionStorage.setItem('_pmc_v2_sess', newCount.toString());

        // Layer 3: Save timestamp on first calculation
        if (!localStorage.getItem('_pmc_v2_ts')) {
          localStorage.setItem('_pmc_v2_ts', Date.now().toString());
        }
        if (!sessionStorage.getItem('_pmc_v2_ts')) {
          sessionStorage.setItem('_pmc_v2_ts', Date.now().toString());
        }

        // Set persistent cookie trap to track that calculations have been made
        document.cookie = "_pmc_v2_vis=1; max-age=31536000; path=/";

        countedCombinations.current.add(productHash);
        return newCount;
      });
    }, 10000); 
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [state, usageCount, tier]);

  const activePlatform = PLATFORMS.find(p => p.id === state.platformId) || PLATFORMS[0]
  const activeCurrency = CURRENCIES.find(c => c.code === state.currencyCode) || CURRENCIES[0]
  const activePrice = whatIfPrice !== null ? whatIfPrice : state.targetPrice

  const calculations = useMemo((): CalculationResults => {
    const feePercent = state.platformId === 'none' 
      ? state.customFeePercentage 
      : activePlatform.fee
    const totalFee = ((feePercent / 100) * activePrice) + (state.platformId === 'none' ? 0 : activePlatform.fixedFee)
    const totalCost = state.cogs + state.shipping + totalFee
    const netProfit = activePrice - totalCost
    return {
      feeAmount: totalFee,
      totalCost,
      netProfit,
      marginPercentage: activePrice > 0 ? (netProfit / activePrice) * 100 : 0,
      markupPercentage: state.cogs > 0 ? (netProfit / state.cogs) * 100 : 0,
      sellingPrice: activePrice,
    }
  }, [state, activePrice, activePlatform])

  const handleStateChange = (updates: Partial<CalculatorState>) => {
    setState((prev) => ({ ...prev, ...updates }))
    if ('targetPrice' in updates) setWhatIfPrice(null)
  }

  return (
    <div className={`space-y-8 ${isPremium ? 'premium-theme' : ''}`}>
      {/* Secret Tier Switcher (Hidden in UI, only for owner/testing) */}
      <div className="fixed bottom-4 left-4 z-50 opacity-0 hover:opacity-100 transition-opacity">
        <div className="bg-black text-white p-2 rounded text-[10px] flex gap-2">
          <button onClick={() => handleTierChange('BASIC')}>BASIC</button>
          <button onClick={() => handleTierChange('STANDARD')}>STANDARD</button>
          <button onClick={() => handleTierChange('PREMIUM')}>PREMIUM</button>
        </div>
      </div>

      {isBasic && usageCount >= FREE_LIMIT && (
        <PaywallModal 
          currencySymbol={activeCurrency.symbol}
          onBypass={() => {
            localStorage.setItem('_pmc_v2_sess', '0');
            sessionStorage.setItem('_pmc_v2_sess', '0');
            localStorage.removeItem('_pmc_v2_ts');
            sessionStorage.removeItem('_pmc_v2_ts');
            document.cookie = "_pmc_v2_vis=; max-age=0; path=/";
            setUsageCount(0);
          }} 
        />
      )}

      <div className="flex justify-between items-center">
        {isPremium ? (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="font-bold text-gray-900 tracking-tight">PREMIUM CALCULATOR</span>
          </div>
        ) : <div></div>}
        <CurrencySwitcher 
          value={state.currencyCode} 
          onChange={(code) => handleStateChange({ currencyCode: code })} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Details</h2>
            <div className="space-y-6">
              <PlatformSelector 
                value={state.platformId} 
                customFee={state.customFeePercentage}
                isBasic={isBasic}
                onChange={(platformId, customFee) => handleStateChange({ platformId, customFeePercentage: customFee })}
              />
              <InputForm 
                state={state} 
                currency={activeCurrency}
                onChange={(key, val) => handleStateChange({ [key]: val })} 
              />
            </div>
          </section>
          
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

          <MinPriceCalculator state={state} activePlatform={activePlatform} currency={activeCurrency} />
        </div>

        <div className="lg:sticky lg:top-8 self-start space-y-6">
          <ResultsDashboard 
            calculations={calculations} 
            currency={activeCurrency}
            isWhatIf={whatIfPrice !== null}
            isLocked={isBasic && usageCount >= FREE_LIMIT - 1} 
          />
          <BreakdownPanel state={state} calculations={calculations} currency={activeCurrency} platformName={activePlatform.name} />
        </div>
      </div>
    </div>
  )
}

export default Calculator
