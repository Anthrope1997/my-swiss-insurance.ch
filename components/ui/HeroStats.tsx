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
        <div key={s.label} className="bg-[#0f2040] rounded-xl px-5 py-4">
          <div className="text-2xl font-bold text-[#60a5fa] leading-none">{s.value}</div>
          <div className="text-[13px] font-medium text-white/80 mt-1">{s.label}</div>
          <div className="text-[12px] text-white/50 mt-0.5">{s.sub}</div>
        </div>
      ))}
    </div>
  )
}
