'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
  title?: string
}

export default function FAQ({ items, title = 'Questions fréquentes' }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-[#0f2040] mb-8">{title}</h2>
      <div className="divide-y divide-[#e2e8f0]">
        {items.map((item, i) => (
          <div key={i} className="py-4">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left"
            >
              <span className="text-[#0f2040] font-medium text-base">{item.question}</span>
              <span className="text-[#1d4ed8] font-bold text-lg flex-shrink-0">
                {open === i ? '−' : '+'}
              </span>
            </button>
            {open === i && (
              <p className="mt-3 text-[#475569] text-sm leading-relaxed max-w-2xl">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
