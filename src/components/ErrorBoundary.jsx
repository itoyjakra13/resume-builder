import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CV-Craft ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      window.localStorage.removeItem('resume_builder_data');
      window.localStorage.removeItem('resume_builder_metadata');
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 bg-red-950/80 text-red-400 border border-red-900/60 rounded-xl flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h1 className="text-xl font-extrabold text-white">Something went wrong</h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              An unexpected error occurred while rendering the editor preview.
            </p>
            {this.state.error && (
              <pre className="bg-slate-950 p-3 rounded-lg text-left text-xs text-red-300 overflow-x-auto border border-slate-800 font-mono">
                {this.state.error.toString()}
              </pre>
            )}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Reset App Data & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
