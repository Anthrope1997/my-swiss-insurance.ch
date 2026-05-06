import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'

export default function NeedHelpSection({ className = '' }: { className?: string }) {
  return (
    <div id="contact" className={`scroll-mt-20 border-t border-edge pt-12 mt-4${className ? ` ${className}` : ''}`}>
      <h2 className="text-2xl font-semibold text-ink mb-3">
        Besoin d&apos;aide ?
      </h2>
      <p className="text-[16px] text-slate mb-6 leading-relaxed">
        Un expert vous rappelle sous 24 heures pour établir avec vous une solution
        personnalisée. Gratuit, sans engagement.
      </p>
      <MultiStepLeadForm redirectOnSuccess="/fr/merci" />
    </div>
  )
}
