'use client'

import { useEffect } from 'react'
import UnifiedLeadForm from '@/components/ui/UnifiedLeadForm'
import fr from '@/dictionaries/fr.json'

interface Props {
  open: boolean
  onClose: () => void
}

export default function LeadFormModal({ open, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[60] overflow-y-auto"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center px-4 pt-20 pb-4">
        <div
          className="bg-white rounded-xl w-full max-w-[600px]"
          onClick={e => e.stopPropagation()}
        >
          <div className="px-4 pt-6 pb-3 sm:px-8 sm:pt-8 sm:pb-4">
            <div className="flex items-start justify-between gap-4 mb-6">
              <p className="text-[15px] text-slate leading-relaxed">
                {fr.modal.introPart1}{' '}
                <strong>{fr.modal.introDelai}</strong>.{' '}
                {fr.modal.introSuffix} <strong>{fr.modal.introGratuit}</strong>.
              </p>
              <button
                onClick={onClose}
                className="shrink-0 text-slate hover:text-ink transition-colors -mt-2"
                aria-label={fr.modal.fermer}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="px-3 pb-4 sm:px-8 sm:pb-8">
            <UnifiedLeadForm redirectOnSuccess="/fr/merci" />
          </div>
        </div>
      </div>
    </div>
  )
}
