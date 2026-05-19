/**
 * Global Constants for Profit Margin Calculator v2.0
 * 
 * Centralizing these values ensures we can update platform fees
 * or add new currencies in one place without touching component logic.
 */

import type { Platform, Currency, Benchmark } from './types';

export const GUMROAD_URL = 'https://yourusername.gumroad.com/l/profit-calculator-unlimited';

export const PLATFORMS: Platform[] = [
  { id: 'custom', name: 'None / Custom', feeFlat: 0, feePercent: 0 },
  { id: 'shopify', name: 'Shopify Basic', feeFlat: 0.30, feePercent: 2.9 },
  { id: 'etsy', name: 'Etsy', feeFlat: 0, feePercent: 6.5 },
  { id: 'amazon', name: 'Amazon FBA', feeFlat: 0, feePercent: 15 },
  { id: 'ebay', name: 'eBay', feeFlat: 0, feePercent: 13.25 },
  { id: 'tiktok', name: 'TikTok Shop', feeFlat: 0, feePercent: 8 },
  { id: 'gumroad', name: 'Gumroad', feeFlat: 0, feePercent: 10 },
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
