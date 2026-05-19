/**
 * PaywallModal Component
 * 
 * A full-screen overlay that blocks access to the calculator after the usage limit.
 * This encourages users to upgrade to the paid version on Gumroad.
 */

import React from 'react';
import { GUMROAD_URL } from '../constants';

const PaywallModal: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/95 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-300">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Limit Reached!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            You have used your **3 free calculations**. Unlock unlimited access and take your e-commerce business to the next level.
          </p>
          
          <div className="space-y-4">
            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-1 active:scale-95 text-lg"
            >
              Unlock Unlimited Access — $19
            </a>
            <p className="text-xs text-gray-400">
              One-time payment. Lifetime updates included.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500 italic">
            "The best investment I made for my Shopify store this year." — Verified Seller
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;
