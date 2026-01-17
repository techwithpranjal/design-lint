export default function Header() {
  return (
    <header className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
        {/* Lightning icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>

        <span>DesignLint</span>
      </div>

      <a
        href="https://github.com/techwithpranjal/design-lint"
        target="_blank"
        rel="noopener noreferrer"
        className="w-5 h-5 flex items-center justify-center rounded-full
              border border-cyan-700
              text-cyan-400 !text-cyan-400
              visited:!text-cyan-400
              hover:border-cyan-400 hover:text-cyan-400
              text-[11px]
              transition"
        title="Documentation"
      >
        ?
      </a>
    </header>
  );
}
