/**
 * BenchmarkBadge Component
 * 
 * Displays a health indicator based on the calculated margin.
 * This fulfills Feature 5: Industry Benchmark Badge.
 */

import React from 'react';
import { BENCHMARKS } from '../constants';

interface BenchmarkBadgeProps {
  margin: number;
}

const BenchmarkBadge: React.FC<BenchmarkBadgeProps> = ({ margin }) => {
  const benchmark = BENCHMARKS.find((b) => margin >= b.min) || BENCHMARKS[BENCHMARKS.length - 1];

  const colorClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  const dotClasses = {
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    orange: 'bg-orange-400',
    red: 'bg-red-400',
  };

  return (
    <div className="space-y-3">
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${colorClasses[benchmark.color]}`}>
        <span className={`w-2 h-2 rounded-full mr-2 animate-pulse ${dotClasses[benchmark.color]}`}></span>
        {benchmark.label}
      </div>
      <p className="text-xs text-gray-400 italic leading-relaxed">
        {benchmark.tip}
      </p>
    </div>
  );
};

export default BenchmarkBadge;
