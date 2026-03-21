# BioKarte Landing Page — Design Spec

**Datum:** 2026-03-21
**URL:** bio.colognebeats.com (Root `/`)
**Ziel:** Landing Page im KOMI-Style, die DJs/Kreative zur Registrierung bringt

## Zielgruppe

Zwei Segmente auf einer Seite:
1. **Kreative** — DJs, Produzenten, Künstler (erstellen Bio-Pages)
2. **Kollektive** — DJ-Kollektive, Labels, Agenturen (verwalten mehrere Profile)

## Farbschema

| Token | Wert | Verwendung |
|-------|------|------------|
| `bg-primary` | #0A0A0A | Haupthintergrund |
| `bg-gradient` | #0A0A0A → #1C1108 | Gradient über gesamte Seite (top to bottom) |
| `accent` | #F59E0B (amber-500) | CTAs, Highlights |
| `accent-hover` | #D97706 (amber-600) | Button Hover |
| `text-primary` | #FAFAFA | Headlines, Body |
| `text-muted` | #A1A1AA (zinc-400) | Subtitles, Descriptions |
| `card-bg` | #18181B (zinc-900) | Karten-Hintergrund |
| `card-border` | #27272A (zinc-800) | Karten-Border |

## Typografie

- **Headlines:** `Big Shoulders Display` (bereits in globals.css importiert), Uppercase, font-black (900), tracking-tight
- **Body:** Geist (via next/font), font-normal (400), text-lg
- **Nav:** Geist, font-semibold (600)

## SEO / Meta-Tags

Werden in `layout.tsx` gesetzt (ersetzt "Create Next App"):
- **Title:** "BioKarte — Deine Bio-Page für Köln"
- **Description:** "Die kostenlose Bio-Page Plattform für Kölner DJs, Produzenten, Künstler und Kollektive. Alle Links an einem Ort."
- **OG Image:** Wird später ergänzt
- **lang:** "de" (statt "en")

## Spacing

- Sektions-Abstände: `py-24 md:py-32`
- Karussell: full-width (kein max-w), alle anderen Sektionen: max-w-6xl

## Sektionen

### 1. Navigation (sticky)

```
[BioKarte]                              [Login]
```

- Links: "BioKarte" als Bold-Text, Weiß
- Rechts: "Login" Button (Ghost-Style, border-white/20) → `/login`
- Sticky top, Glassmorphism-Background bei Scroll (backdrop-blur)
- Maximale Breite: max-w-6xl, zentriert (gilt auch für Hero, Features, Footer)

### 2. Hero

```
DIE BIOKARTE FÜR
KÖLNER DJS, PRODUZENTEN,
KÜNSTLER, KREATIVE
& KOLLEKTIVE

Alle deine Links. Ein Profil. Dein Style.

[Kostenlos Registrieren]    [Beispiele ansehen ↓]
```

- Headline: text-5xl md:text-7xl, uppercase, font-black
- Subtile Gradient-Glow hinter der Headline (radial, orange/amber, opacity-20)
- Subtitle: text-xl, text-muted
- Primärer CTA: "Kostenlos Registrieren" → `/register`, bg-amber-500, text-black, font-bold, rounded-full, px-8 py-4
- Sekundärer CTA: "Beispiele ansehen ↓" → `<a href="#karussell">` mit `scroll-behavior: smooth` (CSS only, kein JS)
- Rechte Seite (Desktop): Phone-Mockup mit Beispiel-Bio-Page (CSS-Mockup, kein Bild nötig)
- Layout: Grid 2 Spalten auf Desktop, 1 Spalte auf Mobile (Text zentriert)

### 3. Features (3 Spalten)

Drei Feature-Cards in einer Reihe:

| Icon | Headline | Text |
|------|----------|------|
| LinkIcon | Alle Links an einem Ort | Social Media, Musik, Booking — alles auf einer Seite |
| PaletteIcon | Eigenes Design wählen | Wähle aus verschiedenen Templates und mach dein Profil einzigartig |
| BarChartIcon | Statistiken & Analytics | Sieh wer dein Profil besucht und welche Links geklickt werden |

- Layout: Grid 1/2/3 Spalten (mobile/tablet/desktop)
- Card-Style: card-bg Background, rounded-2xl, p-8
- Icons: Lucide Icons, 48px, amber-500
- Headline: text-xl, font-bold, weiß
- Text: text-muted

### 4. Beispiel-Profile (Karussell)

```
        KÖLNER KREATIVE AUF BIOKARTE

  [Card] [Card] [Card] [Card] [Card] →→→
```

- Section-Headline: text-3xl md:text-5xl, uppercase, font-black, zentriert
- Horizontal scrollendes Karussell mit Auto-Scroll (CSS animation, kein JS-Framework)
- Infinite loop (Elemente dupliziert für seamless scroll)
- Pause on hover
- Karten: 280px breit, rounded-2xl, card-bg
  - Platzhalter-Bild oben (Gradient als Placeholder, aspect-[3/4])
  - Name: font-bold, weiß
  - Kategorie-Badge: "DJ" / "Producer" / "Collective" — kleines Pill, bg-amber-500/20, text-amber-500
- Dummy-Profile: DJ Monschi, DJ Nachtfalke, Producer Beats.Cologne, Collective Colognebeats, DJ Vinyl Kai, Kreativ Studio Ehrenfeld

### 5. Footer

```
─────────────────────────────────────
BioKarte                    Login | Registrieren
                            Impressum | Datenschutz

            Ein Projekt von Colognebeats
─────────────────────────────────────
```

- Hintergrund: Etwas dunkler als bg-primary (#050505)
- Border-top: border-zinc-800
- Links: text-muted, hover:text-white
- Impressum → `/impressum` (existierende Route prüfen, ggf. als statische Seite anlegen)
- Datenschutz → `/datenschutz` (existierende Route prüfen, ggf. als statische Seite anlegen)
- "Ein Projekt von Colognebeats" — text-sm, text-muted

## Responsive Verhalten

| Breakpoint | Änderungen |
|------------|------------|
| Mobile (<640px) | Hero: 1 Spalte, kein Phone-Mockup, text-4xl. Features: 1 Spalte. Karussell: volle Breite. |
| Tablet (640-1024px) | Hero: 1 Spalte mit Mockup darunter. Features: 2 Spalten. |
| Desktop (>1024px) | Hero: 2 Spalten. Features: 3 Spalten. |

## Animationen

- **Karussell:** CSS `@keyframes scroll` — translateX von 0 zu -50%, linear, infinite, 30s Dauer
- **Hero Headline:** Fade-in von unten beim Laden (CSS animation)
- **Feature Cards:** Leichter Hover-Lift (transform: translateY(-4px), shadow)
- **Keine** heavy JS-Animationen — Performance first

## Technische Umsetzung

- Datei: `src/app/page.tsx` (ersetzt das aktuelle Next.js-Default)
- Server Component (kein "use client" nötig, Karussell ist pure CSS)
- Icons: Lucide React (bereits im Projekt)
- Keine neuen Dependencies
- Keine Bilder nötig — alles mit CSS Gradients und Lucide Icons

## Nicht im Scope

- Echte DJ-Fotos (kommen später wenn Profile existieren)
- Video-Embeds
- Mehrsprachigkeit
- Cookie-Banner
