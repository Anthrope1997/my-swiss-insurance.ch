import frDict from '@/dictionaries/fr.json'

export type Dictionary = typeof frDict

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  fr: () => import('@/dictionaries/fr.json').then(m => m.default as Dictionary),
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries['fr']
  return loader()
}
