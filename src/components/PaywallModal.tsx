import React, { useState } from 'react';
import { LINKS, PRICING } from '../constants';

interface PaywallModalProps {
  onBypass?: () => void;
  currencySymbol: string;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ onBypass, currencySymbol }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'bundle'>('bundle');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleBypass = (e: React.MouseEvent) => {
    // Hidden "Easter Egg" for the owner: Alt + Click the heading to bypass
    if (e.altKey && onBypass) {
      onBypass();
    }
  };

  const formatPrice = (price: number) => {
    const needsSpace = currencySymbol.length > 1;
    return `${currencySymbol}${needsSpace ? ' ' : ''}${price.toFixed(2)}`;
  };

  if (isCollapsed) {
    return (
      <div 
        onClick={() => setIsCollapsed(false)}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 border-t-2 border-emerald-500 shadow-2xl flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-colors backdrop-blur-md bg-opacity-95 md:px-8 animate-in slide-in-from-bottom duration-300"
      >
        <div className="flex items-center gap-2">
          <span className="text-emerald-400">🔒</span>
          <span className="font-semibold text-sm md:text-base">
            {PRICING.free.calculationsAllowed}/{PRICING.free.calculationsAllowed} free calculations used
          </span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsCollapsed(false);
          }}
          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm rounded-xl transition-all shadow-md shadow-emerald-900/30"
        >
          Upgrade — from {formatPrice(PRICING.starter.monthlyPrice)}/mo
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300">
      <div className="relative max-w-4xl w-full bg-white rounded-3xl shadow-2xl my-8 overflow-hidden transform animate-in zoom-in-95 duration-200">
        
        {/* X Close Button (Collapses modal) */}
        <button 
          onClick={() => setIsCollapsed(true)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all cursor-pointer z-10 font-bold"
          aria-label="Collapse Modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-10 text-center">
          {/* Section 1: Header */}
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h2 
            className="text-2xl md:text-3xl font-extrabold text-gray-950 mb-2 cursor-default select-none"
            onClick={handleBypass}
            title="Dev bypass"
          >
            🔒 You've used your {PRICING.free.calculationsAllowed} free calculations
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-8 text-sm md:text-base leading-relaxed">
            To keep calculating your profits, choose a plan below. No hidden fees. Cancel anytime.
          </p>

          {/* Toggle: Monthly | Bundle */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className={`text-sm font-semibold transition-colors ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button 
              onClick={() => setBillingPeriod(prev => prev === 'monthly' ? 'bundle' : 'monthly')}
              className="w-14 h-8 bg-emerald-100 rounded-full p-1 transition-all relative flex items-center outline-none cursor-pointer"
            >
              <div 
                className={`w-6 h-6 bg-emerald-600 rounded-full shadow transition-all transform ${billingPeriod === 'bundle' ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold transition-colors ${billingPeriod === 'bundle' ? 'text-gray-900' : 'text-gray-400'}`}>
                Bundle & Save
              </span>
              <span className="px-2 py-0.5 bg-emerald-500 text-white font-bold text-[10px] rounded-full uppercase tracking-wider">
                Up to 60% Off
              </span>
            </div>
          </div>

          {/* Section 2: Three Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left items-stretch">
            
            {/* Starter Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{PRICING.starter.label}</h3>
                <div className="h-20 flex flex-col justify-center mb-6">
                  {billingPeriod === 'monthly' ? (
                    <div>
                      <span className="text-3xl font-extrabold text-gray-950">{formatPrice(PRICING.starter.monthlyPrice)}</span>
                      <span className="text-gray-400 text-sm"> / month</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-3xl font-extrabold text-gray-950">{formatPrice(PRICING.starter.bundlePrice)}</span>
                      <span className="text-gray-400 text-xs block mt-1">for {PRICING.starter.bundlePeriod}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-400 text-xs line-through">{formatPrice(PRICING.starter.monthlyIfPaidSeparately)}</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold text-[10px] rounded-md">
                          Save {formatPrice(PRICING.starter.savings)} ({PRICING.starter.savingsPercent}% off)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-6 mb-6">
                  <ul className="space-y-3">
                    {PRICING.starter.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-600">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={LINKS.gumroadStarter}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gray-900 hover:bg-black text-white text-center font-bold text-sm rounded-xl transition-all active:scale-95 shadow-md shadow-gray-200"
              >
                Get {PRICING.starter.label}
              </a>
            </div>

            {/* Professional Card (Highlighted) */}
            <div className="bg-white border-2 border-emerald-500 rounded-2xl p-6 flex flex-col justify-between relative shadow-lg shadow-emerald-50 hover:shadow-xl transition-all">
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white font-bold text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow">
                {PRICING.professional.badge}
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">⭐ {PRICING.professional.label}</h3>
                <div className="h-20 flex flex-col justify-center mb-6">
                  {billingPeriod === 'monthly' ? (
                    <div>
                      <span className="text-3xl font-extrabold text-gray-950">{formatPrice(PRICING.professional.monthlyPrice)}</span>
                      <span className="text-gray-400 text-sm"> / month</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-3xl font-extrabold text-gray-950">{formatPrice(PRICING.professional.bundlePrice)}</span>
                      <span className="text-gray-400 text-xs block mt-1">for {PRICING.professional.bundlePeriod}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-400 text-xs line-through">{formatPrice(PRICING.professional.monthlyIfPaidSeparately)}</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold text-[10px] rounded-md">
                          Save {formatPrice(PRICING.professional.savings)} ({PRICING.professional.savingsPercent}% off)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-6 mb-6">
                  <ul className="space-y-3">
                    {PRICING.professional.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-600">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={LINKS.gumroadPro}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold text-sm rounded-xl transition-all active:scale-95 shadow-md shadow-emerald-200"
              >
                Get {PRICING.professional.label}
              </a>
            </div>

            {/* Enterprise Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{PRICING.enterprise.label}</h3>
                <div className="h-20 flex flex-col justify-center mb-6">
                  <div>
                    <span className="text-gray-400 text-xs block">Starting at</span>
                    <span className="text-3xl font-extrabold text-gray-950">{formatPrice(PRICING.enterprise.startingAt)}</span>
                    <span className="text-gray-500 text-xs block mt-1">Custom quote required</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 mb-6">
                  <ul className="space-y-3">
                    {PRICING.enterprise.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-600">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={LINKS.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gray-900 hover:bg-black text-white text-center font-bold text-sm rounded-xl transition-all active:scale-95 shadow-md shadow-gray-200"
              >
                Contact on Fiverr
              </a>
            </div>

          </div>

          {/* Section 3: Bottom Area */}
          <div className="border-t border-gray-100 mt-10 pt-8 max-w-xl mx-auto space-y-4">
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              Not sure yet?{' '}
              <a 
                href={LINKS.fiverr}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-600 font-semibold hover:underline"
              >
                Message me on Fiverr first →
              </a>
            </p>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 italic">
                "The best investment I made for my Shopify store this year." — Verified Seller ⭐⭐⭐⭐⭐
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaywallModal;
