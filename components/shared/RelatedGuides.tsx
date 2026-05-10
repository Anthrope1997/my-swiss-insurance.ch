import Link from 'next/link'
import fr from '@/dictionaries/fr.json'

interface Guide {
  href: string
  label: string
}

interface RelatedGuidesProps {
  guides: Guide[]
  title?: string
}

export default function RelatedGuides({ guides, title = fr.shared.guidesAssocies }: RelatedGuidesProps) {
  return (
    <section>
      <p className="text-[13px] font-semibold text-slate uppercase tracking-widest mb-4">
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {guides.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 text-[14px] text-slate hover:text-brand border border-edge rounded-[8px] px-4 py-3 transition-colors hover:border-brand/30"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {label}
          </Link>
        ))}
      </div>
    </section>
  )
}
