interface StatTileProps {
  label: string
  desc: string
}

export default function StatTile({ label, desc }: StatTileProps) {
  return (
    <div className="border-t-2 border-brand pt-5">
      <p className="text-[12px] font-semibold text-brand uppercase tracking-wide mb-2">
        {label}
      </p>
      <p className="text-[16px] text-slate leading-relaxed">{desc}</p>
    </div>
  )
}
