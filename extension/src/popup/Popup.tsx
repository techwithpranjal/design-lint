export default function Popup() {
    return (
      <div className="w-90 p-4 space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-cyan-400">DesignLint</h1>
          <span className="text-xs text-zinc-500">v0.1</span>
        </header>
  
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm text-zinc-300">
            Analyze this page’s design quality.
          </p>
  
          <button
            className="mt-4 w-full rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:bg-cyan-400"
          >
            Analyze Page
          </button>
        </div>
  
        <footer className="text-xs text-zinc-500 text-center">
          UI design scoring · demo
        </footer>
      </div>
    );
  }