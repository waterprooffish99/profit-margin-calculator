/**
 * PaywallModal Component
 * 
 * A full-screen overlay that blocks access to the calculator after the usage limit.
 * This encourages users to upgrade to the paid version on Gumroad or Fiverr.
 */

import React from 'react';
import { GUMROAD_URL, FIVERR_URL } from '../constants';

interface PaywallModalProps {
  onBypass?: () => void;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ onBypass }) => {
  const handleBypass = (e: React.MouseEvent) => {
    // Hidden "Easter Egg" for the owner: Alt + Click the heading to bypass
    if (e.altKey && onBypass) {
      onBypass();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/95 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-300">
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h2 
            className="text-2xl font-bold text-gray-900 mb-2 cursor-default select-none animate-pulse"
            onClick={handleBypass}
            title="Owner Bypass: Alt+Click"
          >
            Limit Reached!
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed text-sm">
            You have used your <span className="font-extrabold text-emerald-600">3 free calculations</span>.
          </p>

          <div className="bg-emerald-50 rounded-2xl p-5 mb-8 text-left border border-emerald-100">
            <h3 className="text-emerald-950 font-bold text-sm mb-4">
              Unlock unlimited access:
            </h3>
            <ul className="space-y-3 text-sm text-emerald-800">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">→</span>
                <span>
                  Buy source code on Gumroad: <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 hover:text-emerald-900 underline">Gumroad Link - $19</a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">→</span>
                <span>
                  Hire me for custom work on Fiverr: <a href={FIVERR_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 hover:text-emerald-900 underline">Fiverr Link</a>
                </span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-1 active:scale-95 text-lg"
            >
              Get Lifetime Access — $19
            </a>
            <p className="text-xs text-gray-500">
              Questions? <a href={FIVERR_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-semibold hover:underline">Message me on Fiverr</a> before buying.
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
