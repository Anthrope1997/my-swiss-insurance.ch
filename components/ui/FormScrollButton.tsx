'use client'

interface Props {
  intent?: string
  children: React.ReactNode
  className?: string
}

export default function FormScrollButton({ intent, children, className }: Props) {
  function handleClick() {
    document.getElementById('formulaire')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (intent) {
      window.dispatchEvent(new CustomEvent('canton-form-intent', { detail: intent }))
    }
  }
  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
