import { useState, useEffect } from 'react'
import Calculator from './components/Calculator'
import { LINKS, DEV_BYPASS_KEY, DEV_SESSION_KEY } from './constants'

function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret combo: Ctrl + Shift + D
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        const input = prompt(''); // Blank prompt — no hint
        if (input === DEV_BYPASS_KEY) {
          sessionStorage.setItem(DEV_SESSION_KEY, 'true');
          showToast('Developer mode activated — paywall disabled');
          // Reload page after showing toast for 1.5 seconds to refresh paywall checks
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 w-full">
        <header className="mb-12 text-center" id="top">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Profit Margin Calculator
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Evaluate your product pricing strategy instantly with real-time profit analysis.
          </p>
        </header>
        
        <main className="w-full max-w-4xl flex-grow">
          <Calculator />
        </main>
      </div>

      {/* Professional Branded Footer */}
      <footer className="w-full bg-gray-900 text-gray-400 py-10 px-4 border-t border-gray-800 flex flex-col items-center gap-4 text-center mt-12">
        <p className="text-gray-300 font-semibold text-sm">
          © 2026 Profit Margin Calculator v2.1 by Salman Hassan
        </p>
        <p className="text-xs text-gray-500">
          Built for Shopify · Amazon FBA · Etsy · eBay sellers worldwide
        </p>

        <nav className="flex flex-wrap justify-center gap-6 mt-2 text-xs md:text-sm font-semibold">
          <a href="#top" className="hover:text-white transition-colors">Try Free</a>
          <a href={LINKS.gumroadStarter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Starter — $59.99
          </a>
          <a href={LINKS.gumroadPro} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Professional — $119.99
          </a>
          <a href={LINKS.fiverr} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Hire on Fiverr
          </a>
        </nav>
      </footer>

      {/* Developer Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-emerald-600 text-white font-bold py-3 px-6 rounded-2xl shadow-xl border border-emerald-500 flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-300">
          <span className="text-lg">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

export default App
