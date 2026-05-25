/**
 * TypeScript Definitions for Profit Margin Calculator v2.0
 */

export type UserTier = 'BASIC' | 'STANDARD' | 'PREMIUM';

export interface Platform {
  id: string;
  name: string;
  feeFlat: number;
  feePercent: number;
  isPremium?: boolean; // New: To hide complex platforms from Basic users
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface Benchmark {
  min: number;
  label: string;
  color: 'emerald' | 'amber' | 'orange' | 'red';
  tip: string;
}

export interface CalculationResults {
  feeAmount: number;
  totalCost: number;
  netProfit: number;
  marginPercentage: number;
  markupPercentage: number;
  sellingPrice: number;
}

export interface CalculatorState {
  cogs: number;
  shipping: number;
  customFeePercentage: number;
  platformId: string;
  targetPrice: number;
  currencyCode: string;
}
