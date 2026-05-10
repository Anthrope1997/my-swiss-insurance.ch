interface Stat {
  value: string
  label: string
  sub: string
}

export default function HeroStats({
  stats,
  className = '',
}: {
  stats: Stat[]
  className?: string
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${className}`.trim()}>
      {stats.map(s => (
        <div key={s.label} className="bg-cloud rounded-xl px-5 py-4">
          <div className="text-2xl font-bold text-brand leading-none">{s.value}</div>
          <div className="text-[13px] font-medium text-ink mt-1">{s.label}</div>
          <div className="text-[12px] text-slate/60 mt-0.5">{s.sub}</div>
        </div>
      ))}
    </div>
  )
}
