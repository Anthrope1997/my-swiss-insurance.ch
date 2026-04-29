import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'

export default function NeedHelpSection({ className = '' }: { className?: string }) {
  return (
    <div id="contact" className={`scroll-mt-20 border-t border-edge pt-12 mt-4${className ? ` ${className}` : ''}`}>
      <h2 className="text-2xl font-semibold text-ink border-b border-edge pb-4 mb-6">
        Besoin d&apos;aide ?
      </h2>
      <p className="text-[15px] text-slate mb-6 max-w-xl">
        Un expert vous rappelle sous 24 heures pour vous aider à trouver l&apos;assurance maladie
        la plus adaptée à votre situation. C&apos;est gratuit et sans engagement.
      </p>
      <div className="max-w-xl">
        <MultiStepLeadForm redirectOnSuccess="/fr/merci" />
      </div>
    </div>
  )
}
