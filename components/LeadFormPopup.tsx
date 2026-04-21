'use client'

import { useState } from 'react'
import LeadForm from './LeadForm'

interface Props {
  trigger?: React.ReactNode
  label?: string
}

export default function LeadFormPopup({ trigger, label = 'Obtenir un conseil gratuit' }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger ?? (
          <button className="btn-primary">
            {label} →
          </button>
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
              <div>
                <p className="font-semibold text-[#0f2040]">Conseil personnalisé gratuit</p>
                <p className="text-[13px] text-[#475569] mt-0.5">Un conseiller vous rappelle sous 24h</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#94a3b8] hover:text-[#0f2040] transition-colors p-1"
                aria-label="Fermer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5">
              <LeadForm />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
