import { NextRequest, NextResponse } from 'next/server'

interface LeadPayload {
  prenom?: string
  email: string
  canton?: string
  situation?: string
  type?: string   // 'devis' | 'email_capture' | 'comparateur'
}

// Replace this URL with your Google Apps Script webhook URL when ready
const WEBHOOK_URL = process.env.WEBHOOK_URL || ''

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json()

    // Validation
    const { prenom, email, canton, situation, type } = body
    if (!email) {
      return NextResponse.json(
        { error: 'Email manquant' },
        { status: 400 }
      )
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    const lead = {
      prenom:    prenom    || null,
      email,
      canton:    canton    || null,
      situation: situation || null,
      type:      type      || 'devis',
      timestamp: new Date().toISOString(),
      source: req.headers.get('referer') || 'direct',
    }

    // Log the lead (console for now — connect webhook below)
    console.log('[LEAD]', JSON.stringify(lead, null, 2))

    // Forward to webhook (Google Sheets, CRM, etc.)
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
