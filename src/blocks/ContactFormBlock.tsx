'use client'

import { useState } from 'react'
import type { ContactFormBlockData } from '@/lib/types'
import { trackEvent } from '@/lib/analytics'

interface Props {
  data: ContactFormBlockData
  blockId: string
  profileId: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.625rem 0.75rem',
  borderRadius: '0.625rem',
  fontSize: '0.875rem',
  backgroundColor: 'var(--color-background, #000)',
  color: 'var(--color-text, #fff)',
  border: '1px solid var(--color-border, #333)',
  outline: 'none',
}

function WhatsappButton({
  number,
  label,
  onClick,
}: {
  number: string
  label?: string
  onClick: () => void
}) {
  const href = `https://wa.me/${number.replace(/[^0-9]/g, '')}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
      style={{ backgroundColor: '#25D366', color: '#fff' }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.043zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
      {label ?? 'WhatsApp'}
    </a>
  )
}

export function ContactFormBlock({ data, blockId, profileId }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [company, setCompany] = useState('') // honeypot
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blockId, name, email, message, company }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
      trackEvent(profileId, 'click', blockId, 'contact_form')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="space-y-3 rounded-xl p-4"
      style={{
        backgroundColor: 'var(--color-surface, #1a1a1a)',
        border: '1px solid var(--color-border, #333)',
      }}
    >
      {data.title && (
        <h3 className="text-base font-bold" style={{ color: 'var(--color-text, #fff)' }}>
          {data.title}
        </h3>
      )}
      {data.description && (
        <p className="text-sm" style={{ color: 'var(--color-muted, #aaa)' }}>
          {data.description}
        </p>
      )}

      {status === 'success' ? (
        <p className="text-sm font-medium" style={{ color: 'var(--color-text, #fff)' }}>
          {data.success_message ?? 'Danke! Deine Nachricht wurde gesendet.'}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            maxLength={100}
            style={inputStyle}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail"
            required
            maxLength={200}
            style={inputStyle}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nachricht"
            required
            rows={4}
            maxLength={5000}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          {/* Honeypot — hidden from real users, bots tend to fill it */}
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="block w-full rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-accent, #14b8a6)',
              color: 'var(--color-background, #000)',
            }}
          >
            {status === 'sending' ? 'Senden …' : data.submit_label ?? 'Senden'}
          </button>
          {status === 'error' && (
            <p className="text-center text-xs" style={{ color: '#f87171' }}>
              Senden fehlgeschlagen. Bitte versuch es später erneut.
            </p>
          )}
        </form>
      )}

      {data.whatsapp_number && (
        <WhatsappButton
          number={data.whatsapp_number}
          label={data.whatsapp_label}
          onClick={() => trackEvent(profileId, 'click', blockId, 'whatsapp')}
        />
      )}
    </div>
  )
}
