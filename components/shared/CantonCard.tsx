import Link from 'next/link'
import fr from '@/dictionaries/fr.json'

interface CantonCardProps {
  nom: string
  primeMin: string
  economieAn: string
  href: string
}

export default function CantonCard({ nom, primeMin, economieAn, href }: CantonCardProps) {
  return (
    <Link
      href={href}
      className="group bg-white border border-edge rounded-xl p-6 flex flex-col
                 hover:border-brand hover:shadow-md transition-all duration-200"
    >
      <p className="font-bold text-ink text-[22px] mb-1">{nom}</p>
      <p className="text-slate text-[13px] mb-4">
        {fr.shared.aPartirDe} <span className="font-semibold text-ink">{primeMin} {fr.shared.chfParMois}</span>
      </p>
      <div className="bg-blue-tint rounded-lg px-3 py-2 mb-5">
        <p className="text-[12px] text-brand font-medium">{fr.shared.economiePossible}</p>
        <p className="text-[18px] font-bold text-brand leading-tight">
          {economieAn} {fr.shared.chfParAn}
        </p>
      </div>
      <div className="mt-auto flex items-center gap-1 text-[13px] font-medium text-brand">
        {fr.shared.consulterCanton}
        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
