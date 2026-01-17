import Footer from "../components/Footer";
import Header from "../components/Header";

export default function EmptyResultsView({
  onNewScan,
}: {
  onNewScan: () => void;
}) {
  return (
    <div className="w-90 min-h-105 bg-zinc-950 text-zinc-100 flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-6 flex flex-col">
        <button
          className="mb-6 w-full rounded-md bg-cyan-500/10 border border-cyan-500/30
                       text-cyan-400 text-sm py-2 hover:bg-cyan-500/20 transition"
          onClick={onNewScan}
        >
          Run new scan
        </button>

        <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
          <div className="text-sm text-zinc-300">No scan results yet</div>
          <div className="text-xs text-zinc-500 max-w-65">
            Run a new scan to analyze layout quality, accessibility, and visual
            density of the current page. Make sure the page you want to analyze
            is open and fully loaded.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
