# BioKarte v2 — Design Spec

> Rebuild von Grund auf. Bestehendes Repo + Supabase DB, neuer Branch `v2`.
> Datum: 2026-03-24

---

## 1. Warum Rebuild

### Fehler in v1 (61 Commits, davon ~30 Styling-Iterationen)

- **Templates waren Fake** — 16 Farbvariationen statt 3 echte Layout-Klone. Größter Fehler, meiste Zeit verschwendet.
- Inline-Styles statt CSS Modules — unwartbar, kein Theming möglich
- Kein Plan, nur Reagieren — jede Iteration war ein Hotfix
- DB-Schema weicht von TypeScript-Types ab (carousel nicht im Constraint)
- Kein klarer Unterschied zwischen Layout-Kategorien (KOMI/hoo.be/Linktree)
- Supabase Client direkt im Frontend — kein API-Layer, RLS-Probleme bei Writes
- position: fixed Grain — falsch, überdeckt andere UI-Elemente
- Name zentriert statt links-ausgerichtet wie KOMI
- Pills mit Surface-Background statt Border-Bottom Tabs mit Accent-Farbe
- Body Text 14px — zu klein, schlechter Kontrast
- Social Icons zu klein (18px statt 32px)

### Was wir jetzt wissen

1. **3 Layout-Kategorien** — nicht 16 Farb-Varianten, sondern 3 echte Layouts (KOMI, hoo.be, Linktree)
2. **Block-System** — genau welche Block-Typen wir brauchen
3. **KOMI zuerst** — ein Layout 100% fertig, dann das nächste
4. **Original SVG Icons** — bereits vorhanden
5. **Logo Upload** — von Anfang an in der Architektur
6. **DB Schema** — wir wissen was fehlt
7. **CSS Modules** — keine Inline-Styles mehr

---

## 2. Strategie

- **Bestehendes Repo behalten** — Vercel, Supabase, Custom Domain, Google OAuth bereits konfiguriert
- **Neuer Branch `v2`** — alter Code auf `main` als Referenz erreichbar
- **Bestehende Supabase DB** — Monschi-Testdaten bleiben, nur Migration hinzufügen
- **Code wird überschrieben** — nicht gelöscht, aber ersetzt

### Reihenfolge der Layout-Kategorien

1. **KOMI** (`dark-komi`, dann weitere Dark-Templates) — meiste Erfahrung, Monschi als Testprofil
2. **hoo.be** — Banner-Links, visueller Ansatz
3. **Linktree** — einfachste Struktur, letzter

---

## 3. Datenbank-Schema (Migration)

```sql
-- profiles: erweitert
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS genres        text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS locations     text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS booking_email text,
  ADD COLUMN IF NOT EXISTS booking_text  text;

-- content_blocks: erweiterte Typen
ALTER TABLE content_blocks DROP CONSTRAINT IF EXISTS content_blocks_type_check;
ALTER TABLE content_blocks ADD CONSTRAINT content_blocks_type_check
  CHECK (type IN (
    'link',           -- 4 Layouts: text, thumbnail_left, thumbnail_large, full_width
    'social_link',
    'text',
    'section_title',
    'embed',          -- youtube, soundcloud, spotify
    'carousel',       -- video oder music variant
    'music_card',     -- Spotify/SC Card mit Cover + Play
    'banner_link'     -- hoo.be Full-Width Banner
  ));

-- tenants: Multi-Tenant vorbereitet (Phase 2)
CREATE TABLE IF NOT EXISTS tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE,
  name text,
  domain text,
  logo_url text,
  accent_color text,
  created_at timestamptz DEFAULT now()
);
```

### Konsistenz-Regeln
- `social_links` nutzt `user_id`
- `analytics_events` nutzt `profile_id`
- Nie mischen — immer prüfen welche Tabelle welches Feld nutzt

---

## 4. Architektur v2

### 3 Layout-Engines

```
src/
  layouts/
    komi/                    ← Phase 1: KOMI-Style
      KomiProfile.tsx
      KomiHero.tsx
      KomiNav.tsx
      KomiBlocks.tsx
      komi.module.css        ← CSS Modules, keine Inline-Styles
    hoobe/                   ← Phase 2
      HoobeProfile.tsx
      HoobeBannerLink.tsx
      hoobe.module.css
    linktree/                ← Phase 3
      LinktreeProfile.tsx
      linktree.module.css
```

### Router in page.tsx

```ts
const template = getTemplate(profile.template_id)

switch (template.layoutCategory) {
  case 'komi':     return <KomiProfile ... />
  case 'hoobe':    return <HoobeProfile ... />
  case 'linktree': return <LinktreeProfile ... />
}
```

### Block Registry (statt Switch-Statement)

```ts
// src/blocks/registry.ts
const blockRegistry = {
  link:          LinkBlock,
  embed:         EmbedBlock,
  carousel:      CarouselBlock,
  music_card:    MusicCardBlock,
  banner_link:   BannerLinkBlock,
  section_title: SectionTitleBlock,
  text:          TextBlock,
  social_link:   SocialLinkBlock,
  // Neuer Block = 1 Datei + 1 Zeile hier
}

function renderBlock(block) {
  const Component = blockRegistry[block.type]
  return Component ? <Component data={block.data} /> : null
}
```

### Server Actions (statt direkter Supabase-Calls im Frontend)

```ts
// src/actions/profile.ts
'use server'
export async function updateProfile(formData) {
  const supabase = await createServerClient()
  // Validation, sanitization, dann DB-Call
  // Service Role Key bleibt auf dem Server
}
```

### Datei-Struktur

```
src/
  app/
    [username]/page.tsx        ← Server Component, SSR
    (app)/dashboard/
    (app)/edit/
    (app)/settings/
    (auth)/login/
    (auth)/register/
    (auth)/callback/           ← WICHTIG: /callback nicht /auth/callback
  actions/
    profile.ts
    content-blocks.ts
    social-links.ts
    upload.ts
  layouts/
    komi/
    hoobe/
    linktree/
  blocks/
    registry.ts
    LinkBlock.tsx
    EmbedBlock.tsx
    CarouselBlock.tsx
    MusicCardBlock.tsx
    SectionTitleBlock.tsx
    TextBlock.tsx
    BannerLinkBlock.tsx
  components/
    icons/social-icons.tsx     ← Aus v1 wiederverwenden
    ui/                        ← shadcn nur für Dashboard
  lib/
    types.ts
    templates.ts
    platforms.ts
    supabase/
```

### Storage-Struktur

```
Supabase Storage:
  avatars/
    {user_id}/avatar.webp        ← 400x400, gecroppt, WebP
  logos/
    {user_id}/logo.webp          ← Wordmark
  content/
    {user_id}/{block_id}.webp    ← Thumbnails
```

Keine Leerzeichen, keine Sonderzeichen in Bucket-Namen.

---

## 5. KOMI Layout Spec (Phase 1)

### Referenzen
- https://rafael.komi.io
- https://usher.komi.io

### Struktur einer KOMI-Seite

```
┌─────────────────────────────┐
│  Cover Photo (4:5, rounded) │
│  Gradient Fade              │
│  LOGO / NAME (links!)       │
├─────────────────────────────┤
│  Bio Text (muted)           │
│  Social Icons (max 7, SVG)  │
├─────────────────────────────┤
│  Section Nav (scroll-spy)   │
├─────────────────────────────┤
│  ── Section Title ────────  │
│  Content Blocks...          │
├─────────────────────────────┤
│  powered by COLOGNEBEATS    │
└─────────────────────────────┘
```

### Hero — Cover Photo

- `aspectRatio: 4/5`, `maxHeight: 520px`
- `borderRadius: 1rem`
- `padding: 0.75rem` seitlich (eng wie KOMI)
- Gradient Fade: `height: 65%`, bottom
- **Name: links-ausgerichtet** — `bottom: 0.75rem, left: 1rem` (nicht zentriert!)
- Logo: wenn `logo_url` vorhanden → Logo statt Name
- Background: `#121212` (nicht `#000000`)

### Grain (PFLICHT auf allen Dark Templates)

```css
/* position: absolute — NICHT fixed! */
.grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,...noise...");
  background-size: 200px 200px;
  opacity: 0.04;
  pointer-events: none;
  z-index: 2;
}
```

### 3-Ebenen Tiefe

1. Cover Photo (Ebene 1)
2. SVG Grain Overlay, `position: absolute` (Ebene 2)
3. Gradient Fade → Content (Ebene 3)

### Social Icons

- Max 7 Icons
- Größe: **32px** (nicht 18px)
- `icons-only` Style für KOMI-Templates
- Original SVG Icons aus `/src/components/icons/social-icons.tsx` wiederverwenden

### Section Nav

- Scroll-Spy basierend auf `section_title` Blocks
- `IntersectionObserver` mit `rootMargin: '-20% 0px -60% 0px'`
- **Aktiver Zustand:**
  ```css
  border-bottom: 2px solid var(--accent);  /* nicht surface-background */
  color: var(--accent);
  border-radius: 0;
  background: transparent;
  ```
- Horizontal scrollbar, hidden (`scrollbar-width: none`)
- `isClickScrolling.current` verhindert Observer-Override

### Block-Typen für KOMI

| Block | Render | Referenz |
|-------|--------|----------|
| `section_title` | HR-Divider + H2 + ScrollSpy-Anchor | Usher: "Sign Up!" |
| `text` | Paragraph, pre-wrap | Usher: About-Text |
| `link` (text) | Surface-Card, Titel + Chevron | "Follow on Instagram" |
| `link` (thumbnail_left) | 120px Cover + Titel | "Listen to COMING HOME" |
| `link` (thumbnail_large) | 16:9 Card + Play-Button | "Super Bowl Halftime Show" |
| `embed` (soundcloud) | iframe 166px, accent #c8ff00 | Monschi: "Café de Cologne" |
| `embed` (youtube) | 16:9 iframe | Standard |
| `embed` (spotify) | iframe 152px | Standard |
| `carousel` (video) | Horizontal Scroll, 65% erstes Item, Titel-Overlay, Play-Button, Arrows | Usher: "Official Music Videos" |
| `carousel` (music) | Horizontal Scroll, Cover links + Titel + Artist + Play, Arrows | Rafael: "All By Design" |

### Carousel Block Datenstruktur

```ts
interface CarouselBlockData {
  title: string
  variant: 'video' | 'music'   // bestimmt Card-Layout
  items: CarouselItem[]
}

interface CarouselItem {
  title: string
  subtitle?: string             // Artist-Name bei music
  url: string
  thumbnail_url: string
  action?: 'play' | 'link'
}
```

### Horizontale Scroll-Elemente

| Element | Scroll | Details |
|---------|--------|---------|
| Section Nav | Horizontal, hidden scrollbar | Kein Wrap |
| Video Carousel | Horizontal, snap, Arrows < > | Erstes Item ~65% Breite |
| Music Carousel | Horizontal, snap, Arrows < > | Cover links, Text rechts |
| Link Cards | **Vertikal gestapelt** | Kein Scroll |

---

## 6. Design-Regeln (nicht verhandelbar)

### Font — KOMI nutzt Inter (nicht DM Sans!)

- Body Text: **Inter** (aus Usher-Seite bestätigt)
- Display/Name: **Big Shoulders Display** für KOMI-Templates
- Body-Font für Section Titles (nicht Display-Font)

### Schriftgrößen (Mobile First, 375px Basis)

- Body Text: **mindestens 16px** (nicht 14px/0.875rem wie v1)
- Section Titles: **mindestens 20px**
- Muted Text: **mindestens rgba(255,255,255,0.7)** — nie unter 0.6

### Icon-Größen

- Social Icons im Hero: **32px** (nicht 18px)
- Carousel Arrows: **28px+**
- Block Icons: **24px+**

### Kontrast

- WCAG AA Minimum auf allen Text/Background Kombinationen
- Muted-Text auf #121212: mindestens #B3B3B3 (0.7 opacity weiß)
- Kein Text unter 0.5 Opacity auf dunklem Hintergrund

### Touch Targets

- Mindestens **44×44px** auf allen interaktiven Elementen

### Mobile First

- 375px ist der Ausgangspunkt — immer
- Alles was auf 375px nicht funktioniert wird nicht gebaut
- Desktop ist die Erweiterung, nicht umgekehrt

---

## 7. Template-System v2

### Template Interface (erweitert)

```ts
interface Template {
  id: string
  name: string
  layoutCategory: 'komi' | 'hoobe' | 'linktree'  // NEU — bestimmt Layout-Engine
  colors: {
    background: string   // #121212 für dark-komi
    surface: string      // rgba(255,255,255,0.07) — semi-transparent!
    text: string
    muted: string        // mindestens rgba(255,255,255,0.7)
    accent: string       // #c8ff00 für dark-komi
    border: string
  }
  backgroundCSS: string
  backgroundOverlay?: string
  fonts: {
    display: string      // Big Shoulders Display für KOMI
    body: string         // Inter (nicht DM Sans!)
  }
  grain: boolean         // true auf allen Dark Templates
  layout: {
    heroStyle: 'cover-photo' | 'circle-avatar'
    socialStyle: 'icons-only' | 'pills'
    nameSize: 'md' | 'lg' | 'xl'
    cardRadius: string
  }
}
```

### Wichtige Template-Werte (dark-komi)

```ts
{
  id: 'dark-komi',
  layoutCategory: 'komi',
  colors: {
    background: '#121212',              // nicht #000000!
    surface: 'rgba(255,255,255,0.07)', // semi-transparent
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.7)',    // mindestens 0.7
    accent: '#c8ff00',
    border: 'rgba(255,255,255,0.1)',
  },
  grain: true,                          // PFLICHT für Dark Templates
  layout: {
    heroStyle: 'cover-photo',
    socialStyle: 'icons-only',
    nameSize: 'xl',
  }
}
```

### Was aus v1 wiederverwendet wird

- Original KOMI SVG Icons (`social-icons.tsx`)
- Monschi Logo (weiß, Supabase Storage)
- Monschi Testdaten
- Template-Farbwerte für dark-komi
- `getTemplateCSSVars()` Konzept
- Embed-URLs (SoundCloud, YouTube, Spotify)
- SectionNav IntersectionObserver Logik

### Was NICHT wiederverwendet wird

- Inline-Styles → CSS Modules
- Switch-Statement → Block Registry
- `position: fixed` Grain → `position: absolute`
- Zentrierter Name → links-ausgerichtet
- Pills → Border-Bottom Tabs mit Accent

---

## 8. Bekannte Backend-Learnings aus v1

- Google OAuth Callback muss `/callback` sein — nicht `/auth/callback`
- Supabase publishable key kann keine RLS-geschützten Inserts — Service Role Key für Writes
- Storage Bucket-Namen ohne Leerzeichen
- `social_links` nutzt `user_id`, `analytics_events` nutzt `profile_id` — nie verwechseln
- `carousel` war in TypeScript-Types aber nicht im DB CHECK Constraint

---

## 9. Scalability

### Multi-Tenant (vorbereitet, nicht aktiv in Phase 1)

```ts
// 1 Tenant in Phase 1: Colognebeats
// Zweiten Tenant hinzufügen = 1 DB-Row + DNS
tenants (
  id, slug, name, domain, logo_url, accent_color
)
profiles.tenant_id → tenants.id
```

### Self-Service Onboarding (Ziel)

- Registrierung unter 3 Minuten
- SoundCloud OAuth → Auto-Import Avatar, Bio, Tracks (Phase 2)
- Template Picker mit Live-Preview
- Editor-UI den jeder DJ selbst bedienen kann

---

## 10. Phase 1 — Start

**Branch:** `v2`
**Ziel:** KOMI Layout 100% fertig mit dark-komi Template

### Reihenfolge

1. Branch `v2` erstellen
2. DB Migration schreiben (`002_v2_schema.sql`)
3. `types.ts` updaten (layoutCategory, neue Block-Typen)
4. `templates.ts` updaten (dark-komi mit grain: true, layoutCategory: 'komi')
5. `src/layouts/komi/` aufbauen (KomiProfile, KomiHero, KomiNav, KomiBlocks)
6. `src/blocks/registry.ts` aufbauen
7. Alle Block-Komponenten in `src/blocks/`
8. `src/app/[username]/page.tsx` auf Layout-Router umstellen
9. Mit Monschi testen
10. Erst wenn 100% fertig → dark-komi weitere Farbvarianten

**Nicht anfangen bevor KOMI 100% steht:**
- hoo.be Layout
- Linktree Layout
- Template Picker UI
- SoundCloud OAuth
