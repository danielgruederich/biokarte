import type { Template } from './types'

// ─── Row 1: Dark Templates ─────────────────────────────────────────────────────

const darkKomi: Template = {
  id: 'dark-komi',
  name: 'Dark Komi',
  description: 'Dark, cinematic — KOMI Style',
  colors: {
    background: '#0a0a0a',
    surface: '#1e1e1e',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.45)',
    accent: '#c8ff00',
    border: 'rgba(255,255,255,0.08)',
  },
  backgroundCSS: '#0a0a0a',
  fonts: {
    display: "'Big Shoulders Display', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  grain: false,
  category: 'dark',
  layout: {
    heroStyle: 'cover-photo',
    cardRadius: '0.875rem',
    socialStyle: 'icons-only',
    nameSize: 'xl',
  },
}

const starfield: Template = {
  id: 'starfield',
  name: 'Starfield',
  description: 'Dunkler Nachthimmel mit Sternen',
  colors: {
    background: '#070b1a',
    surface: '#111833',
    text: '#e0e8ff',
    muted: 'rgba(224,232,255,0.5)',
    accent: '#7b9bff',
    border: 'rgba(123,155,255,0.12)',
  },
  backgroundCSS: 'linear-gradient(135deg, #070b1a 0%, #0d1433 40%, #111a3a 100%)',
  backgroundOverlay: `
    radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.8) 0%, transparent 100%),
    radial-gradient(1px 1px at 25% 35%, rgba(255,255,255,0.6) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 40% 10%, rgba(200,220,255,0.9) 0%, transparent 100%),
    radial-gradient(1px 1px at 55% 45%, rgba(255,255,255,0.5) 0%, transparent 100%),
    radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,0.7) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 85% 55%, rgba(200,220,255,0.8) 0%, transparent 100%),
    radial-gradient(1px 1px at 15% 60%, rgba(255,255,255,0.6) 0%, transparent 100%),
    radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.5) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 50% 70%, rgba(200,220,255,0.7) 0%, transparent 100%),
    radial-gradient(1px 1px at 65% 85%, rgba(255,255,255,0.6) 0%, transparent 100%),
    radial-gradient(1px 1px at 80% 40%, rgba(255,255,255,0.5) 0%, transparent 100%),
    radial-gradient(1px 1px at 90% 75%, rgba(255,255,255,0.7) 0%, transparent 100%),
    radial-gradient(1px 1px at 5% 90%, rgba(255,255,255,0.4) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 45% 25%, rgba(180,200,255,0.9) 0%, transparent 100%),
    radial-gradient(1px 1px at 75% 65%, rgba(255,255,255,0.6) 0%, transparent 100%),
    radial-gradient(1px 1px at 95% 10%, rgba(255,255,255,0.5) 0%, transparent 100%)
  `,
  fonts: {
    display: "'Space Grotesk', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  grain: false,
  category: 'dark',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '0.875rem',
    socialStyle: 'pills',
    nameSize: 'lg',
  },
}

const nebula: Template = {
  id: 'nebula',
  name: 'Nebula',
  description: 'Dunkles Blau mit Wolken-Textur',
  colors: {
    background: '#0a1020',
    surface: '#15203a',
    text: '#dce6ff',
    muted: 'rgba(220,230,255,0.5)',
    accent: '#5b8def',
    border: 'rgba(91,141,239,0.12)',
  },
  backgroundCSS: `
    radial-gradient(ellipse at 20% 50%, rgba(30,50,100,0.6) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 30%, rgba(40,60,120,0.4) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(20,40,90,0.5) 0%, transparent 55%),
    linear-gradient(180deg, #0a1020 0%, #0f1830 100%)
  `,
  fonts: {
    display: "'Space Grotesk', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  grain: true,
  category: 'dark',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '0.875rem',
    socialStyle: 'pills',
    nameSize: 'lg',
  },
}

const slate: Template = {
  id: 'slate',
  name: 'Slate',
  description: 'Dunkelgrau, helle Buttons',
  colors: {
    background: '#18181b',
    surface: '#2e2e33',
    text: '#f0f0f2',
    muted: 'rgba(240,240,242,0.45)',
    accent: '#a1a1aa',
    border: 'rgba(255,255,255,0.1)',
  },
  backgroundCSS: '#18181b',
  fonts: {
    display: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  grain: false,
  category: 'dark',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '0.75rem',
    socialStyle: 'pills',
    nameSize: 'md',
  },
}

// ─── Row 2: Artistic / Pattern Templates ────────────────────────────────────────

const marble: Template = {
  id: 'marble',
  name: 'Marble',
  description: 'Heller Marmor mit bunten Akzenten',
  colors: {
    background: '#f8f6f3',
    surface: 'rgba(255,255,255,0.75)',
    text: '#1a1a2e',
    muted: 'rgba(26,26,46,0.5)',
    accent: '#c06080',
    border: 'rgba(26,26,46,0.08)',
  },
  backgroundCSS: `
    radial-gradient(ellipse at 15% 20%, rgba(200,140,180,0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 75% 15%, rgba(140,180,220,0.3) 0%, transparent 45%),
    radial-gradient(ellipse at 85% 70%, rgba(220,180,120,0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 30% 80%, rgba(160,200,180,0.2) 0%, transparent 40%),
    linear-gradient(135deg, #f8f6f3 0%, #f2ede8 100%)
  `,
  fonts: {
    display: "'DM Serif Display', serif",
    body: "'DM Sans', sans-serif",
  },
  grain: false,
  category: 'light',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '0.875rem',
    socialStyle: 'pills',
    nameSize: 'md',
  },
}

const watercolor: Template = {
  id: 'watercolor',
  name: 'Watercolor',
  description: 'Heller Aquarell-Hintergrund',
  colors: {
    background: '#f5f0f8',
    surface: 'rgba(255,255,255,0.7)',
    text: '#2a2040',
    muted: 'rgba(42,32,64,0.45)',
    accent: '#6b7ec8',
    border: 'rgba(42,32,64,0.08)',
  },
  backgroundCSS: `
    radial-gradient(ellipse at 30% 20%, rgba(150,180,220,0.35) 0%, transparent 55%),
    radial-gradient(ellipse at 70% 50%, rgba(180,160,210,0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 85%, rgba(160,190,210,0.3) 0%, transparent 45%),
    linear-gradient(180deg, #f5f0f8 0%, #eae4f0 100%)
  `,
  fonts: {
    display: "'DM Serif Display', serif",
    body: "'DM Sans', sans-serif",
  },
  grain: false,
  category: 'light',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '0.875rem',
    socialStyle: 'pills',
    nameSize: 'lg',
  },
}

const monogram: Template = {
  id: 'monogram',
  name: 'Monogram',
  description: 'Dunkelblau mit Muster',
  colors: {
    background: '#0f1a2e',
    surface: 'rgba(255,255,255,0.9)',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.5)',
    accent: '#ffffff',
    border: 'rgba(255,255,255,0.15)',
  },
  backgroundCSS: '#0f1a2e',
  backgroundOverlay: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5 L25 15 L20 25 L15 15Z' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1'/%3E%3Cpath d='M0 25 L5 35 L0 40 L-5 35Z' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1'/%3E%3Cpath d='M40 25 L45 35 L40 40 L35 35Z' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1'/%3E%3C/svg%3E")`,
  fonts: {
    display: "'Big Shoulders Display', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  grain: false,
  category: 'dark',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '0.75rem',
    socialStyle: 'icons-only',
    nameSize: 'lg',
  },
}

const contrast: Template = {
  id: 'contrast',
  name: 'Contrast',
  description: 'Schwarz mit weißen Buttons',
  colors: {
    background: '#000000',
    surface: '#ffffff',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.5)',
    accent: '#ffffff',
    border: 'rgba(255,255,255,0.15)',
  },
  backgroundCSS: '#000000',
  fonts: {
    display: "'Big Shoulders Display', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  grain: false,
  category: 'dark',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '0.75rem',
    socialStyle: 'icons-only',
    nameSize: 'xl',
  },
}

// ─── Row 3: Warm / Neutral Light Templates ──────────────────────────────────────

const cream: Template = {
  id: 'cream',
  name: 'Cream',
  description: 'Warmes Beige, sanfte Pill-Buttons',
  colors: {
    background: '#f2ece3',
    surface: '#e8e0d4',
    text: '#3d3428',
    muted: 'rgba(61,52,40,0.5)',
    accent: '#8b7355',
    border: 'rgba(61,52,40,0.08)',
  },
  backgroundCSS: '#f2ece3',
  fonts: {
    display: "'DM Serif Display', serif",
    body: "'DM Sans', sans-serif",
  },
  grain: false,
  category: 'light',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '999px',
    socialStyle: 'pills',
    nameSize: 'md',
  },
}

const blush: Template = {
  id: 'blush',
  name: 'Blush',
  description: 'Sanftes Peach / Rosé',
  colors: {
    background: '#f8ece8',
    surface: '#f0ddd6',
    text: '#3d2828',
    muted: 'rgba(61,40,40,0.5)',
    accent: '#c07070',
    border: 'rgba(61,40,40,0.08)',
  },
  backgroundCSS: '#f8ece8',
  fonts: {
    display: "'DM Serif Display', serif",
    body: "'DM Sans', sans-serif",
  },
  grain: false,
  category: 'light',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '999px',
    socialStyle: 'pills',
    nameSize: 'md',
  },
}

const ivory: Template = {
  id: 'ivory',
  name: 'Ivory',
  description: 'Helles Elfenbein, clean',
  colors: {
    background: '#faf8f4',
    surface: '#f0ece6',
    text: '#2a2520',
    muted: 'rgba(42,37,32,0.45)',
    accent: '#7a7060',
    border: 'rgba(42,37,32,0.06)',
  },
  backgroundCSS: '#faf8f4',
  fonts: {
    display: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  grain: false,
  category: 'light',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '999px',
    socialStyle: 'pills',
    nameSize: 'md',
  },
}

const silver: Template = {
  id: 'silver',
  name: 'Silver',
  description: 'Kühles Silber-Grau',
  colors: {
    background: '#e8eaed',
    surface: '#f5f6f8',
    text: '#1a1d24',
    muted: 'rgba(26,29,36,0.45)',
    accent: '#5a6070',
    border: 'rgba(26,29,36,0.06)',
  },
  backgroundCSS: 'linear-gradient(180deg, #e8eaed 0%, #dddfe3 100%)',
  fonts: {
    display: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  grain: false,
  category: 'light',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '0.75rem',
    socialStyle: 'pills',
    nameSize: 'md',
  },
}

// ─── Row 4: Gradient / Colorful Templates ───────────────────────────────────────

const rainbow: Template = {
  id: 'rainbow',
  name: 'Rainbow',
  description: 'Bunter Regenbogen-Gradient',
  colors: {
    background: '#6b44c0',
    surface: 'rgba(60,30,100,0.55)',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.65)',
    accent: '#a78bfa',
    border: 'rgba(255,255,255,0.15)',
  },
  backgroundCSS: 'linear-gradient(135deg, #f0c040 0%, #70c070 20%, #40a0d0 40%, #6060d0 60%, #9050c0 80%, #c050a0 100%)',
  fonts: {
    display: "'Big Shoulders Display', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  grain: false,
  category: 'colorful',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '999px',
    socialStyle: 'pills',
    nameSize: 'lg',
  },
}

const magenta: Template = {
  id: 'magenta',
  name: 'Magenta',
  description: 'Heißes Pink / Magenta-Gradient',
  colors: {
    background: '#a01060',
    surface: 'rgba(80,20,80,0.5)',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.65)',
    accent: '#ff80c0',
    border: 'rgba(255,255,255,0.15)',
  },
  backgroundCSS: 'linear-gradient(135deg, #d02080 0%, #e04090 30%, #c030a0 60%, #8020c0 100%)',
  fonts: {
    display: "'Big Shoulders Display', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  grain: false,
  category: 'colorful',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '999px',
    socialStyle: 'pills',
    nameSize: 'lg',
  },
}

const sunset: Template = {
  id: 'sunset',
  name: 'Sunset',
  description: 'Warmer Sonnenuntergang-Gradient',
  colors: {
    background: '#c06030',
    surface: 'rgba(180,100,60,0.4)',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.7)',
    accent: '#ffd0a0',
    border: 'rgba(255,255,255,0.15)',
  },
  backgroundCSS: 'linear-gradient(135deg, #f0c050 0%, #e89040 25%, #e06040 50%, #d04070 75%, #c040a0 100%)',
  fonts: {
    display: "'Big Shoulders Display', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  grain: false,
  category: 'colorful',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '0.875rem',
    socialStyle: 'pills',
    nameSize: 'lg',
  },
}

const aurora: Template = {
  id: 'aurora',
  name: 'Aurora',
  description: 'Pink-zu-Cyan-Gradient',
  colors: {
    background: '#b060a0',
    surface: 'rgba(255,255,255,0.2)',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.7)',
    accent: '#ffffff',
    border: 'rgba(255,255,255,0.2)',
  },
  backgroundCSS: 'linear-gradient(135deg, #e080b0 0%, #c080d0 25%, #8090e0 50%, #60c0d0 75%, #50d0b0 100%)',
  fonts: {
    display: "'Space Grotesk', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  grain: false,
  category: 'colorful',
  layout: {
    heroStyle: 'circle-avatar',
    cardRadius: '0.75rem',
    socialStyle: 'pills',
    nameSize: 'lg',
  },
}

// ─── Export ─────────────────────────────────────────────────────────────────────

export const templates: Template[] = [
  // Row 1: Dark
  darkKomi,
  starfield,
  nebula,
  slate,
  // Row 2: Artistic
  marble,
  watercolor,
  monogram,
  contrast,
  // Row 3: Warm / Neutral
  cream,
  blush,
  ivory,
  silver,
  // Row 4: Gradient / Colorful
  rainbow,
  magenta,
  sunset,
  aurora,
]

export function getTemplate(id: string): Template {
  return templates.find(t => t.id === id) ?? templates[0]
}

export function getTemplateCSSVars(template: Template): Record<string, string> {
  return {
    '--bg': template.colors.background,
    '--bg-css': template.backgroundCSS,
    '--surface': template.colors.surface,
    '--text': template.colors.text,
    '--muted': template.colors.muted,
    '--accent': template.colors.accent,
    '--border': template.colors.border,
    '--font-display': template.fonts.display,
    '--font-body': template.fonts.body,
    '--card-radius': template.layout.cardRadius,
  }
}
