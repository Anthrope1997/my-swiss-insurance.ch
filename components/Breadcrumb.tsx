import { Fragment } from 'react'
import Link from 'next/link'

const BASE_URL = 'https://my-swiss-insurance.ch'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav className={`flex items-center gap-2 text-[13px] text-slate ${className ?? 'mb-6'}`}>
        {items.map((item, i) => (
          <Fragment key={i}>
            {i > 0 && <span className="text-edge">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-ink transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </Fragment>
        ))}
      </nav>
    </>
  )
}
