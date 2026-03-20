import type { Template } from './types'

export const templates: Template[] = [
  {
    id: 'dark-komi',
    name: 'Dark Komi',
    description: 'Dark, cinematic, lime green accent',
    colors: {
      background: '#0a0a0a',
      surface: '#161616',
      text: '#ffffff',
      muted: 'rgba(255,255,255,0.45)',
      accent: '#c8ff00',
      border: 'rgba(255,255,255,0.08)',
    },
    fonts: {
      display: "'Big Shoulders Display', sans-serif",
      body: "'DM Sans', sans-serif",
    },
    grain: true,
    category: 'dark',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, white, professional',
    colors: {
      background: '#fafafa',
      surface: '#ffffff',
      text: '#111111',
      muted: 'rgba(0,0,0,0.45)',
      accent: '#111111',
      border: 'rgba(0,0,0,0.08)',
    },
    fonts: {
      display: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
    },
    grain: false,
    category: 'light',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm, Ibiza vibes, ocean blue accent',
    colors: {
      background: '#0a1628',
      surface: '#0f1f3a',
      text: '#ffffff',
      muted: 'rgba(255,255,255,0.5)',
      accent: '#4d9fff',
      border: 'rgba(255,255,255,0.1)',
    },
    fonts: {
      display: "'Big Shoulders Display', sans-serif",
      body: "'DM Sans', sans-serif",
    },
    grain: true,
    category: 'dark',
  },
]

export function getTemplate(id: string): Template {
  return templates.find(t => t.id === id) ?? templates[0]
}

export function getTemplateCSSVars(template: Template): Record<string, string> {
  return {
    '--bg': template.colors.background,
    '--surface': template.colors.surface,
    '--text': template.colors.text,
    '--muted': template.colors.muted,
    '--accent': template.colors.accent,
    '--border': template.colors.border,
    '--font-display': template.fonts.display,
    '--font-body': template.fonts.body,
  }
}
