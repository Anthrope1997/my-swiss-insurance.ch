import UnifiedLeadForm from '@/components/ui/UnifiedLeadForm'
import fr from '@/dictionaries/fr.json'

export default function NeedHelpSection({ className = '' }: { className?: string }) {
  return (
    <div id="contact" className={`scroll-mt-20 border-t border-edge pt-12 mt-4${className ? ` ${className}` : ''}`}>
      <h2 className="text-2xl font-semibold text-ink mb-3">
        {fr.needHelp.titre}
      </h2>
      <p className="text-[16px] text-slate mb-6 leading-relaxed">
        {fr.needHelp.description}
      </p>
      <UnifiedLeadForm redirectOnSuccess="/fr/merci" />
    </div>
  )
}
