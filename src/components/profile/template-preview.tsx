'use client'

import type { Template } from '@/lib/types'

interface TemplatePreviewProps {
  template: Template
  selected?: boolean
  onClick?: () => void
}

/**
 * Abstract mini-preview of a template (hoo.be style).
 * Shows background, avatar placeholder circles, and button placeholders
 * in the template's actual colors, fonts, and shapes.
 */
export function TemplatePreview({ template, selected, onClick }: TemplatePreviewProps) {
  const t = template
  const { cardRadius, socialStyle } = t.layout

  // Determine button border-radius display
  const btnRadius = cardRadius === '999px' ? '999px' : cardRadius === '0.5rem' ? '6px' : '10px'

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '9 / 16',
        borderRadius: '16px',
        overflow: 'hidden',
        border: selected ? '3px solid #14b8a6' : '2px solid transparent',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.15s, transform 0.15s',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: t.backgroundCSS,
        }}
      />

      {/* Background overlay (starfield, monogram pattern, etc.) */}
      {t.backgroundOverlay && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: t.backgroundOverlay,
            backgroundRepeat: 'repeat',
          }}
        />
      )}

      {/* Grain overlay */}
      {t.grain && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '100px 100px',
            opacity: 0.05,
          }}
        />
      )}

      {/* Abstract content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: '20% 12% 12%',
          gap: '8%',
        }}
      >
        {/* Avatar placeholder(s) */}
        {socialStyle === 'icons-only' ? (
          // Monogram/Contrast style: 3 small circles in a row
          <div style={{ display: 'flex', gap: '6px' }}>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: t.colors.surface,
                  border: `1.5px solid ${t.colors.border}`,
                }}
              />
            ))}
          </div>
        ) : (
          // Single large avatar circle
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: t.colors.surface,
              border: `2px solid ${t.colors.border}`,
              flexShrink: 0,
            }}
          />
        )}

        {/* Button placeholders — 3 buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            width: '100%',
          }}
        >
          {[0.9, 1, 0.85].map((widthFactor, i) => (
            <div
              key={i}
              style={{
                width: `${widthFactor * 100}%`,
                height: '28px',
                borderRadius: btnRadius,
                background: t.colors.surface,
                border: `1px solid ${t.colors.border}`,
                alignSelf: 'center',
              }}
            />
          ))}
        </div>
      </div>

      {/* Selected checkmark */}
      {selected && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: '#14b8a6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  )
}
