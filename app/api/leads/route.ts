import { NextRequest, NextResponse } from 'next/server'

interface LeadPayload {
  nom?: string
  email: string
  telephone?: string
  canton?: string
  codePostal?: string
  pays?: string
  cantonTravail?: string
  profil?: string
  situation?: string
  intention?: string
  type?: string
  genre?: string
  consentTraitement?: boolean
  consentMarketing?: boolean
  consentTraitementText?: string
  consentMarketingText?: string
}

// Replace this URL with your Google Apps Script webhook URL when ready
const WEBHOOK_URL = process.env.WEBHOOK_URL || ''

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json()

    const {
      nom, email, telephone, canton, codePostal, pays, cantonTravail,
      profil, situation, intention, type, genre,
      consentTraitement, consentMarketing, consentTraitementText, consentMarketingText,
    } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email manquant' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown'

    const lead = {
      nom:          nom          || null,
      email,
      telephone:    telephone    || null,
      canton:       canton       || null,
      codePostal:   codePostal   || null,
      pays:         pays         || null,
      cantonTravail: cantonTravail || null,
      profil:       profil       || null,
      situation:    situation    || null,
      intention:    intention    || null,
      type:         type         || 'devis',
      genre:        genre        || null,
      timestamp:    new Date().toISOString(),
      source:       req.headers.get('referer') || 'direct',
      consent: {
        timestampUtc: new Date().toISOString(),
        ip,
        case1Text:    consentTraitementText || null,
        case1Checked: consentTraitement     ?? false,
        case2Text:    consentMarketingText  || null,
        case2Checked: consentMarketing      ?? false,
        genre:        genre                 || null,
      },
    }

    console.log('[LEAD]', JSON.stringify(lead, null, 2))

    if (WEBHOOK_URL) {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[LEAD ERROR]', err)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
