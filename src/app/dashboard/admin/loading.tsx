export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-64 rounded-lg bg-slate-200/70 dark:bg-slate-800/70" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-32 rounded bg-slate-200/60 dark:bg-slate-800/60" />
          </div>
        ))}
      </div>

      <div className="hidden grid-cols-1 lg:grid-cols-2 gap-6" hidden>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs h-80 flex flex-col justify-between">
          <div className="h-5 w-44 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-56 w-full rounded-xl bg-slate-100 dark:bg-slate-800/50" />
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs h-80 flex flex-col justify-between">
          <div className="h-5 w-44 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-56 w-full rounded-xl bg-slate-100 dark:bg-slate-800/50" />
        </div>
      </div>
    </div>
  );
}
