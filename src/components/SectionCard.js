export default function SectionCard({ title, children, right }) {
  return (
    <section className="panel rounded-3xl overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-900">
          {title}
        </h2>
        {right ? <div className="flex flex-wrap gap-2">{right}</div> : null}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}
