import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoaderState() {
  return (
    <div className="w-90 min-h-105 bg-zinc-950 text-zinc-100 flex flex-col">
      <Header />

      {/* Centered loader */}
      <main className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-cyan-400 text-sm font-semibold">
          Analyzing page…
        </div>

        <div className="text-xs text-zinc-500 text-center max-w-60 leading-relaxed">
          Evaluating accessibility signals, layout structure, readability, and
          visual density. This may take a few seconds.
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 w-40 bg-zinc-800 rounded overflow-hidden">
          <div className="h-full w-1/2 bg-cyan-400 animate-pulse" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
