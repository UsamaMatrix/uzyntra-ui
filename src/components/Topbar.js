export default function Topbar({ onMenu }) {
  return (
    <header className="border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          {onMenu ? (
            <button
              type="button"
              onClick={onMenu}
              className="mt-0.5 inline-flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 sm:hidden"
              aria-label="Open sidebar"
            >
              <span className="block h-0.5 w-4 rounded-full bg-slate-700" />
              <span className="mx-0.5 block h-0.5 w-3 rounded-full bg-slate-700" />
              <span className="block h-0.5 w-4 rounded-full bg-slate-700" />
            </button>
          ) : null}

          <div>
            <p className="text-base font-semibold text-slate-950">
              UZYNTRA Command Center
            </p>
            <p className="text-sm text-slate-600">
              Advanced API Threat Intelligence &amp; Control
            </p>
          </div>
        </div>

        <div className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 sm:w-auto">
          Admin API: 127.0.0.1:9090
        </div>
      </div>
    </header>
  );
}
