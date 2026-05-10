interface InfoBoxProps {
  title: string
  items: string[]
}

export default function InfoBox({ title, items }: InfoBoxProps) {
  return (
    <div className="bg-white border border-edge rounded-xl p-5">
      <p className="text-2xl font-semibold text-ink mb-3">{title}</p>
      <ul className="space-y-3">
        {items.map((phrase, i) => (
          <li key={i} className="flex gap-2.5 text-[17px] text-slate leading-relaxed">
            <span className="text-brand font-bold shrink-0 mt-0.5" aria-hidden="true">•</span>
            <span>{phrase}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
