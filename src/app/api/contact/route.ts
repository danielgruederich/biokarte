import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Strip CR/LF so user input can't inject extra mail headers
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { blockId?: unknown; name?: unknown; email?: unknown; message?: unknown; company?: unknown }
    | null

  if (!body) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  const { blockId, name, email, message, company } = body

  // Honeypot — pretend success so bots don't retry
  if (company) {
    return NextResponse.json({ ok: true })
  }

  if (
    typeof blockId !== 'string' ||
    typeof name !== 'string' ||
    name.trim().length === 0 ||
    name.length > 100 ||
    typeof email !== 'string' ||
    !EMAIL_RE.test(email) ||
    typeof message !== 'string' ||
    message.trim().length === 0 ||
    message.length > 5000
  ) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  // Resolve the recipient server-side from the DB. The client never supplies it,
  // otherwise the form could be abused as an open relay to arbitrary addresses.
  const supabase = await createClient()
  const { data: block } = await supabase
    .from('content_blocks')
    .select('data')
    .eq('id', blockId)
    .eq('type', 'contact_form')
    .eq('is_visible', true)
    .single()

  const recipient = (block?.data as { recipient_email?: string } | null)?.recipient_email
  if (!recipient || !EMAIL_RE.test(recipient)) {
    return NextResponse.json({ error: 'unavailable' }, { status: 404 })
  }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM ?? user

  if (!host || !user || !pass || !from) {
    console.error('Contact form: SMTP not configured')
    return NextResponse.json({ error: 'unavailable' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: { user, pass },
  })

  const safeName = sanitizeHeader(name)

  try {
    await transporter.sendMail({
      from,
      to: recipient,
      replyTo: `${safeName} <${email}>`,
      subject: `Neue Kontaktanfrage von ${safeName}`,
      text: `Name: ${safeName}\nE-Mail: ${email}\n\n${message}`,
    })
  } catch (err) {
    console.error('Contact form: mail send failed', err)
    return NextResponse.json({ error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
