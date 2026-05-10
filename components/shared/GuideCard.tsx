import Link from 'next/link'
import fr from '@/dictionaries/fr.json'

interface GuideCardProps {
  icon: React.ReactNode
  title: string
  desc: string
  href: string
  cta?: string
}

export default function GuideCard({ icon, title, desc, href, cta = fr.shared.lireGuide }: GuideCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col bg-white border border-edge rounded-xl p-6
                 hover:border-brand hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="mb-4">
        <div className="w-9 h-9 bg-blue-tint border border-brand/20 rounded-lg
                        flex items-center justify-center text-brand
                        group-hover:bg-brand group-hover:text-white group-hover:border-brand
                        transition-colors duration-200">
          {icon}
        </div>
      </div>
      <h3 className="font-semibold text-ink text-[16px] mb-2 group-hover:text-brand transition-colors">
        {title}
      </h3>
      <p className="text-slate text-[14px] leading-relaxed flex-1">{desc}</p>
      <div className="flex items-center gap-1 mt-4 text-brand text-[13px] font-medium">
        {cta}
        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
