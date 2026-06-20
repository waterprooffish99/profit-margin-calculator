/**
 * Global Constants for Profit Margin Calculator v2.1
 * 
 * Centralizing these values ensures we can update platform fees,
 * custom subscription tiers, or URLs in one place.
 */

import type { Platform, Currency, Benchmark } from './types';

// ── Product Info ──────────────────────────────────────────
export const PRODUCT_NAME = 'Profit Margin Calculator';
export const PRODUCT_VERSION = 'v2.1';
export const OWNER_NAME = 'Salman Hassan';

// ── Links ─────────────────────────────────────────────────
export const LINKS = {
  fiverr: 'https://www.fiverr.com/salman_hassan86',
  gumroadStarter: 'YOUR_GUMROAD_STARTER_URL',   // owner replaces after setup
  gumroadPro: 'YOUR_GUMROAD_PRO_URL',           // owner replaces after setup
  vercel: 'https://price-profit-margin-calculator.vercel.app', // real Vercel URL
};

// ── Subscription Pricing (verified math) ─────────────────
export const PRICING = {
  free: {
    label: 'Free',
    calculationsAllowed: 3,
    description: 'Try before you buy',
  },
  starter: {
    label: 'Starter',
    monthlyPrice: 14.99,
    bundlePrice: 59.99,
    bundlePeriod: '6 months',
    bundlePeriodMonths: 6,
    monthlyIfPaidSeparately: 89.94,   // 14.99 × 6 — verified
    savings: 29.95,                    // 89.94 − 59.99 — verified
    savingsPercent: 33,                // 33% off — verified
    features: [
      'Unlimited calculations',
      'All 7 selling platforms',
      'All 6 currencies',
      'CSV export',
      'Copy summary',
    ],
  },
  professional: {
    label: 'Professional',
    monthlyPrice: 24.99,
    bundlePrice: 119.99,
    bundlePeriod: '12 months',
    bundlePeriodMonths: 12,
    monthlyIfPaidSeparately: 299.88,  // 24.99 × 12 — verified
    savings: 179.89,                   // 299.88 − 119.99 — verified
    savingsPercent: 60,                // 60% off — verified
    features: [
      'Everything in Starter',
      'Priority support via Fiverr',
      '1 customization per quarter',
      'Early access to new features',
      'Usage tips and guides',
    ],
    badge: 'Most Popular',
  },
  enterprise: {
    label: 'Enterprise',
    startingAt: 150,
    description: 'Custom pricing — contact for quote',
    features: [
      'Everything in Professional',
      'White-label (your brand + logo)',
      'Custom platforms added',
      'Your own Vercel deployment',
      'Dedicated support channel',
    ],
  },
};

// ── Developer Bypass ──────────────────────────────────────
// KEEP THIS SECRET — do not share this password publicly
export const DEV_BYPASS_KEY = 'PMC_OWNER_2026';
export const DEV_SESSION_KEY = '_pmc_dev_mode';

export const PLATFORMS: Platform[] = [
  {
    id: 'none',
    name: 'None / Custom',
    fee: 0,
    fixedFee: 0,
    description: 'Enter your own fee percentage below'
  },
  {
    id: 'shopify_basic',
    name: 'Shopify Basic',
    fee: 2.9,
    fixedFee: 0.30,
    description: '2.9% + $0.30 per transaction'
  },
  {
    id: 'etsy',
    name: 'Etsy',
    fee: 6.5,
    fixedFee: 0,
    description: '6.5% transaction fee'
  },
  {
    id: 'amazon_fba',
    name: 'Amazon FBA',
    fee: 15,
    fixedFee: 0,
    description: '15% referral fee'
  },
  {
    id: 'ebay',
    name: 'eBay',
    fee: 13.25,
    fixedFee: 0,
    description: '13.25% final value fee'
  },
  {
    id: 'tiktok_shop',
    name: 'TikTok Shop',
    fee: 8,
    fixedFee: 0,
    description: '8% commission'
  },
  {
    id: 'gumroad',
    name: 'Gumroad',
    fee: 10,
    fixedFee: 0,
    description: '10% flat fee'
  }
];

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
];

export const BENCHMARKS: Benchmark[] = [
  { 
    min: 40, 
    label: 'Excellent — Top performer', 
    color: 'emerald', 
    tip: 'Most Shopify sellers target 30–40% margin. You are above average.' 
  },
  { 
    min: 20, 
    label: 'Good — Healthy margin', 
    color: 'amber', 
    tip: 'A 20-40% margin is standard for healthy e-commerce businesses.' 
  },
  { 
    min: 10, 
    label: 'Low — Review your costs', 
    color: 'orange', 
    tip: 'Consider optimizing your shipping or COGS to increase profitability.' 
  },
  { 
    min: -Infinity, 
    label: 'Danger — Not sustainable', 
    color: 'red', 
    tip: 'At this margin, you may be losing money after accounting for overhead.' 
  },
];
