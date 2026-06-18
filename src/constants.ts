/**
 * Global Constants for Profit Margin Calculator v2.0
 * 
 * Centralizing these values ensures we can update platform fees
 * or add new currencies in one place without touching component logic.
 */

import type { Platform, Currency, Benchmark } from './types';

// This is the live Gumroad product link.
export const GUMROAD_URL = 'https://salmanhasssan.gumroad.com/l/profit-margin-calculator';

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
