import { ReactNode } from 'react'

interface KeyFactProps {
  label?: string
  children: ReactNode
}

export default function KeyFact({ label = 'À retenir', children }: KeyFactProps) {
  return (
    <div className="bg-[#EBF3FB] border-l-[3px] border-[#0F4C8A] rounded-r-[8px] px-[18px] py-[16px] mb-6">
      <div className="flex items-center gap-2 mb-[10px]">
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="#0F4C8A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
          <line x1="9.5" y1="18" x2="14.5" y2="18" />
          <line x1="10" y1="21" x2="14" y2="21" />
        </svg>
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#0F4C8A]">
          {label}
        </span>
      </div>
      <div className="text-[13px] leading-[1.7] text-ink">
        {children}
      </div>
    </div>
  )
}
