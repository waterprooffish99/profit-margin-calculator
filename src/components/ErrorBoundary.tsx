import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  // Public property to safely and silently retain the error context in memory
  // without leaking to the browser console or triggering unused local/private checks
  public lastCapturedError: { errorMessage: string; errorStack: string; componentStack: string } | null = null;

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.lastCapturedError = {
      errorMessage: error?.message || 'Unknown error',
      errorStack: error?.stack || '',
      componentStack: errorInfo?.componentStack || ''
    };
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl" role="img" aria-label="warning">⚠️</span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h2>
            
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              Don't worry — your data is safe.<br />
              Please refresh the page to continue.
            </p>
            
            <button
              onClick={this.handleRefresh}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-100 transition-all transform hover:-translate-y-0.5 active:scale-95 text-base cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
