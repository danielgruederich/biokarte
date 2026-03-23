import type { Template } from './types'

// ─── Row 1: Dark Templates ─────────────────────────────────────────────────────

const darkKomi: Template = {
  id: 'dark-komi',
  name: 'Dark Komi',
  description: 'Dark, cinematic — KOMI Style',
  colors: {
    background: '#121212',
    surface: '#2a2a2e',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.7)',
    accent: '#c8ff00',
    border: 'rgba(255,255,255,0.12)',
  },
  backgroundCSS: '#121212',
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
  description: 'Nachthimmel mit Sternen',
  colors: {
    background: '#060d20',
    surface: '#0e1a3a',
    text: '#e0e8ff',
    muted: 'rgba(224,232,255,0.5)',
    accent: '#7b9bff',
    border: 'rgba(123,155,255,0.15)',
  },
  backgroundCSS: '#060d20',
  backgroundOverlay: `
    radial-gradient(2px 2px at 8% 12%, #fff 0%, transparent 100%),
    radial-gradient(2px 2px at 15% 40%, #fff 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 22% 75%, rgba(200,220,255,0.9) 0%, transparent 100%),
    radial-gradient(2px 2px at 30% 20%, #fff 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 35% 55%, rgba(180,200,255,0.8) 0%, transparent 100%),
    radial-gradient(2.5px 2.5px at 42% 8%, #fff 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 48% 65%, #fff 0%, transparent 100%),
    radial-gradient(2px 2px at 55% 30%, rgba(200,220,255,0.9) 0%, transparent 100%),
    radial-gradient(2px 2px at 60% 80%, #fff 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 65% 15%, #fff 0%, transparent 100%),
    radial-gradient(2.5px 2.5px at 72% 50%, rgba(180,200,255,0.9) 0%, transparent 100%),
    radial-gradient(2px 2px at 78% 70%, #fff 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 82% 25%, #fff 0%, transparent 100%),
    radial-gradient(2px 2px at 88% 60%, rgba(200,220,255,0.8) 0%, transparent 100%),
    radial-gradient(2.5px 2.5px at 92% 10%, #fff 0%, transparent 100%),
    radial-gradient(2px 2px at 95% 85%, #fff 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 5% 55%, rgba(180,200,255,0.7) 0%, transparent 100%),
    radial-gradient(2px 2px at 18% 90%, #fff 0%, transparent 100%),
    radial-gradient(2.5px 2.5px at 50% 45%, rgba(220,230,255,0.9) 0%, transparent 100%),
    radial-gradient(2px 2px at 75% 35%, #fff 0%, transparent 100%),
    radial-gradient(ellipse 120px 80px at 30% 60%, rgba(60,80,160,0.25) 0%, transparent 100%),
    radial-gradient(ellipse 100px 60px at 70% 30%, rgba(50,70,150,0.2) 0%, transparent 100%)
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
  description: 'Dunkles Blau mit Wolken',
  colors: {
    background: '#080e1e',
    surface: '#12203a',
    text: '#dce6ff',
    muted: 'rgba(220,230,255,0.5)',
    accent: '#5b8def',
    border: 'rgba(91,141,239,0.15)',
  },
  backgroundCSS: `
    radial-gradient(ellipse 300px 200px at 25% 40%, rgba(40,70,140,0.5) 0%, transparent 100%),
    radial-gradient(ellipse 250px 180px at 75% 25%, rgba(50,80,160,0.4) 0%, transparent 100%),
    radial-gradient(ellipse 200px 250px at 55% 75%, rgba(30,60,130,0.45) 0%, transparent 100%),
    radial-gradient(ellipse 150px 100px at 10% 80%, rgba(60,90,170,0.3) 0%, transparent 100%),
    #080e1e
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
    background: '#1a1a1c',
    surface: '#3a3a3e',
    text: '#f0f0f2',
    muted: 'rgba(240,240,242,0.45)',
    accent: '#a1a1aa',
    border: 'rgba(255,255,255,0.08)',
  },
  backgroundCSS: '#1a1a1c',
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
  description: 'Bunter Marmor',
  colors: {
    background: '#f5f0ec',
    surface: 'rgba(255,255,255,0.8)',
    text: '#1a1a2e',
    muted: 'rgba(26,26,46,0.5)',
    accent: '#c06080',
    border: 'rgba(26,26,46,0.06)',
  },
  backgroundCSS: `
    radial-gradient(ellipse 200px 300px at 5% 15%, rgba(220,120,160,0.4) 0%, transparent 100%),
    radial-gradient(ellipse 250px 200px at 90% 10%, rgba(100,160,220,0.35) 0%, transparent 100%),
    radial-gradient(ellipse 180px 250px at 80% 80%, rgba(220,190,100,0.3) 0%, transparent 100%),
    radial-gradient(ellipse 200px 150px at 15% 70%, rgba(100,200,160,0.25) 0%, transparent 100%),
    radial-gradient(ellipse 300px 200px at 50% 50%, rgba(180,140,200,0.2) 0%, transparent 100%),
    #f5f0ec
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
  description: 'Aquarell-Himmel',
  colors: {
    background: '#eef2f8',
    surface: 'rgba(255,255,255,0.75)',
    text: '#1e2a40',
    muted: 'rgba(30,42,64,0.45)',
    accent: '#5a80c0',
    border: 'rgba(30,42,64,0.06)',
  },
  backgroundCSS: `
    radial-gradient(ellipse 350px 250px at 40% 20%, rgba(120,160,210,0.4) 0%, transparent 100%),
    radial-gradient(ellipse 280px 300px at 70% 60%, rgba(140,170,220,0.3) 0%, transparent 100%),
    radial-gradient(ellipse 200px 180px at 20% 70%, rgba(160,180,210,0.25) 0%, transparent 100%),
    radial-gradient(ellipse 250px 150px at 85% 15%, rgba(130,150,200,0.2) 0%, transparent 100%),
    #eef2f8
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
  description: 'Navy mit Muster',
  colors: {
    background: '#0c1428',
    surface: '#ffffff',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.5)',
    accent: '#ffffff',
    border: 'rgba(255,255,255,0.1)',
  },
  backgroundCSS: '#0c1428',
  backgroundOverlay: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L38 20H22Z' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.5'/%3E%3Cpath d='M30 55L38 40H22Z' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.5'/%3E%3Ccircle cx='10' cy='30' r='4' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3Ccircle cx='50' cy='30' r='4' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3Cpath d='M5 5L15 15M45 5L55 15M5 55L15 45M45 55L55 45' stroke='rgba(255,255,255,0.06)' stroke-width='1'/%3E%3C/svg%3E")`,
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
  description: 'Schwarz + Weiß',
  colors: {
    background: '#000000',
    surface: '#ffffff',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.5)',
    accent: '#ffffff',
    border: 'rgba(255,255,255,0.1)',
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
  description: 'Warmes Beige',
  colors: {
    background: '#f0e8dd',
    surface: '#ddd3c5',
    text: '#3d3428',
    muted: 'rgba(61,52,40,0.5)',
    accent: '#8b7355',
    border: 'rgba(61,52,40,0.06)',
  },
  backgroundCSS: '#f0e8dd',
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
  description: 'Sanftes Peach',
  colors: {
    background: '#f5e8e4',
    surface: '#c8b0cc',
    text: '#2e2035',
    muted: 'rgba(46,32,53,0.5)',
    accent: '#7060a0',
    border: 'rgba(46,32,53,0.06)',
  },
  backgroundCSS: '#f5e8e4',
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
  description: 'Elfenbein mit Punkten',
  colors: {
    background: '#f8f5f0',
    surface: '#ebe6de',
    text: '#2a2520',
    muted: 'rgba(42,37,32,0.45)',
    accent: '#7a7060',
    border: 'rgba(42,37,32,0.06)',
  },
  backgroundCSS: '#f8f5f0',
  backgroundOverlay: `radial-gradient(circle 1.5px at 10px 10px, rgba(0,0,0,0.08) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 30px 10px, rgba(0,0,0,0.08) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 10px 30px, rgba(0,0,0,0.08) 0%, transparent 100%),
    radial-gradient(circle 1.5px at 30px 30px, rgba(0,0,0,0.08) 0%, transparent 100%)`,
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
  description: 'Kühles Grau',
  colors: {
    background: '#e4e6ea',
    surface: '#f5f6f8',
    text: '#1a1d24',
    muted: 'rgba(26,29,36,0.45)',
    accent: '#5a6070',
    border: 'rgba(26,29,36,0.05)',
  },
  backgroundCSS: 'linear-gradient(180deg, #e8eaee 0%, #dddfe4 100%)',
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
  description: 'Regenbogen-Gradient',
  colors: {
    background: '#6b44c0',
    surface: 'rgba(50,25,90,0.6)',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.65)',
    accent: '#a78bfa',
    border: 'rgba(255,255,255,0.12)',
  },
  backgroundCSS: 'linear-gradient(160deg, #e8c840 0%, #60c060 18%, #40a0c8 36%, #5060d0 54%, #8840c0 72%, #c040a0 90%)',
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
  description: 'Hot Pink Gradient',
  colors: {
    background: '#a01060',
    surface: 'rgba(70,15,70,0.55)',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.65)',
    accent: '#ff80c0',
    border: 'rgba(255,255,255,0.12)',
  },
  backgroundCSS: 'linear-gradient(160deg, #d82888 0%, #c830a0 35%, #a028b8 65%, #7020c8 100%)',
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
  description: 'Warmer Sonnenuntergang',
  colors: {
    background: '#d08040',
    surface: 'rgba(255,255,255,0.22)',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.7)',
    accent: '#fff0d0',
    border: 'rgba(255,255,255,0.15)',
  },
  backgroundCSS: 'linear-gradient(160deg, #f0c848 0%, #e89040 28%, #e06848 52%, #d04878 76%, #b840a0 100%)',
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
  description: 'Pink zu Cyan',
  colors: {
    background: '#a060b0',
    surface: 'rgba(255,255,255,0.22)',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.7)',
    accent: '#ffffff',
    border: 'rgba(255,255,255,0.18)',
  },
  backgroundCSS: 'linear-gradient(160deg, #e080b0 0%, #c080d0 25%, #8090e0 50%, #60b8d8 75%, #50d0b8 100%)',
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
  darkKomi, starfield, nebula, slate,
  marble, watercolor, monogram, contrast,
  cream, blush, ivory, silver,
  rainbow, magenta, sunset, aurora,
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
