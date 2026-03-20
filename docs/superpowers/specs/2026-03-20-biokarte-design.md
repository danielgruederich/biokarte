# BioKarte — Design Spec

> Universelle White-Label Bio-Page Plattform
> Stand: 2026-03-20

---

## 1. Produkt-Vision

**BioKarte** ist eine White-Label Bio-Page Plattform für Agenturen und Kollektive.
Jeder Kunde (Agentur/Kollektiv) bekommt eine eigene Instanz mit eigenem Branding und Domain.
Die Nutzer (DJs, Gastro-Betriebe, Kreative) erstellen darüber ihre Profilseiten.

### Erste Instanzen

| Instanz | Zielgruppe | Besonderheiten |
|---------|-----------|----------------|
| Colognebeats | DJs aus Köln | SoundCloud-Import, Mixes, Booking |
| bonuskarte.digital | Gastro/Retail | Speisekarte, Öffnungszeiten, Bonuskarte-Link |

### Dachmarke

Alle Produkte laufen unter **fuerte.digital** als Dachmarke.
Domain-Strategie wird später entschieden.

---

## 2. Konkurrenz-Analyse

| Feature | KOMI (€10-14/Mo) | hoo.be | Linktree | **BioKarte** |
|---------|-------------------|--------|----------|-------------|
| Bio Page | Ja | Ja | Ja | Ja |
| Templates | Nur Dark/Light/Custom | 16+ mit Pro | Limited | 10 zum Launch |
| Content Blocks | 30+ Typen | 6 Kategorien | Links only | Flexibel, erweiterbar |
| Onboarding | Wizard (3 Steps) | Wizard (6 Steps) | Minimal | Wizard (7 Steps, hoo.be Style) |
| Editor | Sidebar + Preview | Phone Preview + Panel | Simple | Phone Preview + Panel |
| Analytics | Views, Clicks, Performance | Views, Clicks, CTR | Pro only | Views, Clicks, CTR |
| Brand Deals | Ja (Creator Score) | Nein | Nein | Nein (später) |
| Email Marketing | Ja (Templates) | Nein | Nein | Nein (später) |
| White-Label | Nein | Nein | Nein | **Ja — Kern-Feature** |
| SoundCloud Import | Nein | Nein | Nein | **Ja — für DJ-Instanzen** |
| Preis | €10-14/Mo/User | Free + Pro | Free + Pro | Noch offen |

### Unser Vorteil

1. **White-Label** — Agenturen/Kollektive bekommen ihre eigene Plattform
2. **Branchen-Presets** — DJ-spezifisch, Gastro-spezifisch, nicht generisch
3. **SoundCloud Auto-Import** — kein anderer Anbieter hat das
4. **Kostenlos für Endnutzer** — Agenturen zahlen (Modell noch offen)

---

## 3. Tech Stack

| Layer | Tech | Warum |
|-------|------|-------|
| Frontend | Next.js (App Router) | Daniels Standard-Stack, SSR, Routing |
| Styling | Tailwind CSS + shadcn/ui | Schnelle UI-Entwicklung |
| Auth | Supabase Auth | Email/Passwort, Google OAuth, SoundCloud OAuth |
| Datenbank | Supabase (PostgreSQL) | Free Tier reicht für MVP, Row Level Security |
| Storage | Supabase Storage | Profilbilder, Uploads |
| Hosting | Vercel | Auto-Deploy, Custom Domains |
| Sprache | TypeScript | Type Safety |

---

## 4. Auth & Registrierung

### Login-Methoden

1. **Email + Passwort** — Standard für alle
2. **Google OAuth** — schneller Login, jeder hat es
3. **SoundCloud OAuth** — optional, triggert Auto-Import für DJs

### Rollen

| Rolle | Kann |
|-------|------|
| **Super Admin** (Daniel) | Instanzen erstellen, alle Daten sehen |
| **Instanz Admin** (Agentur-Betreiber) | DJs/Kunden einladen, verwalten, Templates freischalten |
| **User** (DJ/Gastro/Kreative) | Eigenes Profil bearbeiten |

---

## 5. Onboarding-Flow

Inspiriert von hoo.be — geführter Wizard, in unter 5 Minuten live.

### Steps

```
Step 1: Registrierung
  → Email/Passwort, Google oder SoundCloud
  → Bei SoundCloud: Auto-Import von Profilbild, Name, Bio, Tracks

Step 2: Template wählen
  → Grid mit visuellen Mini-Previews (4 Spalten Desktop, 2 Mobile)
  → Free vs. Pro Badge (für spätere Monetarisierung)
  → "You can change and customize anytime"

Step 3: Plattformen auswählen
  → Icon-Grid: Instagram, SoundCloud, YouTube, TikTok, Spotify,
    Facebook, X, Threads, Mixcloud, WhatsApp, Website, etc.
  → Multi-Select, nur relevante Felder im nächsten Step

Step 4: Links eintragen
  → Nur die ausgewählten Plattformen erscheinen
  → Live-Validierung: grünes Häkchen wenn Username gefunden
  → @username oder URL Format

Step 5: Suggested Links
  → Automatische Suche nach gleichem Username auf anderen Plattformen
  → "We found a few more links based on your account"
  → Ein Klick auf "+" zum Hinzufügen

Step 6: Profil-Details
  → Profilbild (Upload oder von SoundCloud importiert)
  → Titel / Name
  → Bio (max 150 Zeichen)

Step 7: "Looking good!"
  → Live Preview der fertigen Seite im Phone-Mockup
  → "Continue building" → zum Editor/Dashboard
```

---

## 6. Dashboard

Inspiriert von hoo.be — clean, keine Feature-Überladung.

```
┌──────────────────────────────────────────────────────────────┐
│ Welcome back, DJ | Monschi |                                 │
├──────────────────────────────────┬───────────────────────────┤
│                                  │ Page settings             │
│  [Total views] [Total clicks]    │ ┌───────────────────────┐ │
│  [Click through rate]            │ │ Page redirect [OFF]   │ │
│                                  │ └───────────────────────┘ │
├──────────────────────────────────┤                           │
│ My page            [Edit page]   │ Top links                 │
│ ┌──────────────────────────────┐ │ ┌───────────────────────┐ │
│ │                              │ │ │ SoundCloud  — 42 clicks│ │
│ │     [Live Preview]           │ │ │ Instagram   — 28 clicks│ │
│ │     Phone Mockup             │ │ └───────────────────────┘ │
│ │                              │ │                           │
│ └──────────────────────────────┘ │                           │
└──────────────────────────────────┴───────────────────────────┘
```

### Dashboard Features (MVP)

- **Stats:** Total views, Total clicks, Click-through rate
- **Live Preview:** Phone-Mockup der eigenen Seite
- **Edit Page:** Button zum Editor
- **Page Settings:** Page redirect Toggle
- **Top Links:** Meistgeklickte Links mit Klickzahlen

---

## 7. Editor (Edit Page)

Inspiriert von hoo.be — Live Preview links, Content Panel rechts.

```
┌──────────────────────────────────────────────────────────────┐
│                                    [Preview] [Share]         │
├──────────────────────────────┬───────────────────────────────┤
│                              │ Add                           │
│   ┌────────────────────┐     │                               │
│   │                    │     │ ┌─ Link ──────────────────┐   │
│   │   [Phone Mockup]   │     │ │ Add any link, any style │   │
│   │   Live Preview     │     │ └─────────────────────────┘   │
│   │                    │     │                               │
│   │   Drag & Drop      │     │ ┌─ Embed ─────────────────┐  │
│   │   Reorder          │     │ │ Embed socials            │  │
│   │                    │     │ └─────────────────────────┘   │
│   └────────────────────┘     │                               │
│                              │ ┌─ Carousel ──────────────┐  │
│   [+] [Reorder]              │ │ Groups of links/videos   │  │
│                              │ └─────────────────────────┘   │
│                              │                               │
│                              │ ┌─ Section Title ─────────┐  │
│                              │ │ Organize into sections   │  │
│                              │ └─────────────────────────┘   │
└──────────────────────────────┴───────────────────────────────┘
```

### Content Block Typen (MVP)

| Block | Beschreibung | Priorität |
|-------|-------------|-----------|
| **Link** | Beliebiger Link mit Thumbnail, Titel, Style | MVP |
| **Social Link** | Platform-spezifisch mit Icon (Instagram, SoundCloud...) | MVP |
| **Text** | Freitext-Block | MVP |
| **Section Title** | Seite in Abschnitte unterteilen | MVP |
| **Embed** | SoundCloud Player, YouTube Video, Spotify | MVP |
| **Carousel** | Horizontale Scroll-Gruppe (Mixes, Videos, Events) | MVP |
| **Image/Gallery** | Bilder-Upload | Phase 2 |
| **Contact Form** | Booking-Anfragen | Phase 2 |
| **Donation** | Spenden-Link | Phase 2 |
| **Event** | Event mit Datum, Location, Ticket-Link | Phase 2 |

### Editor Features

- **Live Preview** im Phone-Mockup (links)
- **Drag & Drop Reordering** der Content Blocks
- **Add Panel** (rechts) mit Content Block Kategorien
- **Inline Editing** — Klick auf Block im Preview zum Bearbeiten
- **Preview Button** — Vollbild-Preview
- **Share Button** — URL kopieren
- **Theme/Template** — wechselbar aus dem Editor

---

## 8. Öffentliche Profilseite

Die Seite die Besucher sehen unter z.B. `bio.colognebeats.com/monschi`.

### Struktur

```
┌─────────────────────────────────┐
│         [Hero Image]            │
│         Full bleed              │
│                                 │
│    Name                         │
│    Bio                          │
│                                 │
│    [Social Icons Row]           │
├─────────────────────────────────┤
│                                 │
│    [Content Blocks]             │
│    In der Reihenfolge           │
│    wie im Editor angeordnet     │
│                                 │
│    - Links                      │
│    - Embeds (SoundCloud, YT)    │
│    - Carousels                  │
│    - Text                       │
│    - etc.                       │
│                                 │
├─────────────────────────────────┤
│    Powered by [Instanz-Brand]   │
│    Privacy Policy               │
└─────────────────────────────────┘
```

### Design-Qualität

Aus dem ursprünglichen CLAUDE.md — diese Standards gelten weiterhin:

- **Grain Overlay** — kein flaches Design
- **Typografie** als Haupt-Gestaltungselement
- **Layering** — Foto → Grain → Gradient → Content
- **Entrance Animations** — staggered reveal
- **Mobile first** — alles startet mit 375px
- **godly.website-Qualität** — kein generisches AI-Design

### Design Anti-Patterns (NIEMALS)

- Generische purple gradient backgrounds
- Inter/Roboto als Display Font
- Standard Bootstrap Card-Layouts
- Vorhersehbare Link-Button Stacks (Linktree-Niveau)
- Stockfoto-Ästhetik

---

## 9. Templates

**10 Templates zum Launch.** Jedes Template definiert:
- Farbschema (CSS Custom Properties)
- Typografie (Font-Paarung)
- Layout-Variante (Hero-Stil, Card-Stil, Content-Anordnung)
- Grain/Textur-Stil
- Animation-Stil

### Template-Liste

| ID | Name | Vibe | Zielgruppe |
|----|------|------|-----------|
| `dark-komi` | Dark Komi | Dark, cinematic, lime accent | DJs, Artists |
| `festival` | Festival | Energetisch, bunt, orange | Festival DJs |
| `techno` | Techno | Industrial, Berlin, purple | Techno DJs |
| `sunset` | Sunset | Ibiza, warm, blue | Sunset/Beach DJs |
| `minimal` | Minimal | Clean, weiß, schwarz | Alle Branchen |
| `vintage` | Vintage | Analog, warm, braun | Gastro, Cafés |
| `neon` | Neon | Club, neon pink | Club DJs |
| `forest` | Forest | Outdoor, grün | Outdoor Events |
| `desert` | Desert | Warm, sand, orange | Alle Branchen |
| `ocean` | Ocean | Tief, blau, cyan | Alle Branchen |

### Template-Picker

- Grid mit Mini-Previews (hoo.be Style)
- Free vs. Pro Badges (für spätere Monetarisierung)
- Live Preview mit echten User-Daten
- "You can change and customize anytime"

### Template-Erweiterung

Daniel legt Design-Inspirationen in `~/Desktop/Biopages-Templates/` ab.
Daraus werden neue Templates gebaut.

---

## 10. White-Label Architektur

### Instanz-Konzept

Jede Instanz (Colognebeats, bonuskarte.digital, ...) hat:

| Eigenschaft | Beschreibung |
|-------------|-------------|
| **Name** | z.B. "Colognebeats" |
| **Domain** | z.B. `bio.colognebeats.com` |
| **Logo** | Custom Logo |
| **Farben** | Primary, Secondary, Accent |
| **Templates** | Welche Templates verfügbar sind |
| **Branchen-Preset** | DJ, Gastro, Retail, Generisch |
| **Admin** | Wer die Instanz verwaltet |

### Branchen-Presets

Presets definieren welche Content Blocks und Onboarding-Fragen relevant sind:

| Preset | Typische Blocks | Onboarding-Besonderheiten |
|--------|----------------|--------------------------|
| **DJ** | SoundCloud Embed, Mixes Carousel, Booking Contact | SoundCloud OAuth, Genre-Tags |
| **Gastro** | Speisekarte Link, Öffnungszeiten, Google Maps, Bonuskarte | Google Business Import |
| **Retail** | Produkt-Links, Öffnungszeiten, Bonuskarte | Google Business Import |
| **Generisch** | Alle Blocks verfügbar | Standard-Onboarding |

---

## 11. Analytics

### User-Level (Dashboard)

- **Total Views** — Seitenaufrufe
- **Total Clicks** — Klicks auf Links/Buttons
- **Click-through Rate** — Clicks / Views
- **Top Links** — Meistgeklickte Links mit Klickzahlen
- **Zeitraum-Filter** — Letzte 7 Tage, 30 Tage, 90 Tage

### Admin-Level (Instanz-Admin)

- Alle User-Stats aggregiert
- Top-performing Profiles
- Neue Registrierungen

### Tracking

- Supabase für Event-Speicherung
- Kein externes Analytics-Tool nötig für MVP
- DSGVO-konform (kein Cookie-Banner nötig wenn nur eigene Daten)

---

## 12. Datenbank-Schema (Supabase)

### Kern-Tabellen

```
instances
  id, name, slug, domain, logo_url, colors (jsonb),
  preset, settings (jsonb), created_at

users
  id (= Supabase Auth UID), instance_id, username, display_name,
  bio, avatar_url, template_id, is_admin, status (online/offline),
  created_at

content_blocks
  id, user_id, type, position (int), data (jsonb),
  is_visible, created_at

social_links
  id, user_id, platform, username, url, position,
  is_visible, created_at

templates
  id, slug, name, css_config (jsonb), is_pro,
  category, created_at

analytics_events
  id, user_id, event_type (view/click), target_id,
  referrer, user_agent, created_at
```

### Row Level Security

- Users können nur eigene Daten bearbeiten
- Instanz-Admins können alle User ihrer Instanz sehen
- Öffentliche Profilseiten lesen ohne Auth
- Analytics-Events werden anonym geschrieben

---

## 13. SoundCloud Auto-Import

Wenn ein User sich mit SoundCloud OAuth registriert:

### Automatisch importiert

| SoundCloud API | → BioKarte Feld |
|---------------|-----------------|
| `user.avatar_url` | `avatar_url` |
| `user.username` | `username` (Vorschlag) |
| `user.full_name` | `display_name` |
| `user.description` | `bio` |
| `user.city` | Content Block: Location |
| `me/tracks` | Content Blocks: SoundCloud Embeds |
| `me/playlists` | Content Blocks: Carousel |

### Username-Discovery

Nach Eingabe eines Usernames auf einer Plattform:
- Automatisch prüfen ob gleicher Username auf anderen Plattformen existiert
- "Add suggested links" — ein Klick zum Hinzufügen
- Plattformen: YouTube, TikTok, X, Facebook, Instagram, Snapchat, LinkedIn

---

## 14. Settings

### User Settings

| Setting | Beschreibung |
|---------|-------------|
| **Profile Details** | Username, Display Name |
| **Page Redirect** | Temporäre Weiterleitung zu anderem Link |
| **Profile Status** | Online / Offline Toggle |
| **Privacy Policy** | Custom Policy (Link oder PDF) |
| **Theme** | Dark / Light / Custom Colors |
| **Template** | Template wechseln |

### Instanz Settings (Admin)

| Setting | Beschreibung |
|---------|-------------|
| **Branding** | Logo, Farben, Name |
| **Domain** | Custom Domain konfigurieren |
| **Templates** | Welche Templates verfügbar |
| **Invite Links** | Einladungslinks generieren |
| **User Management** | User einladen, sperren, löschen |

---

## 15. MVP Scope

### Phase 1 — Kern (MVP)

- [ ] Auth (Email/Passwort, Google OAuth)
- [ ] Onboarding Wizard (7 Steps)
- [ ] Editor mit Live Preview
- [ ] Content Blocks: Link, Social Link, Text, Section Title, Embed
- [ ] Öffentliche Profilseite mit 3 Templates (dark-komi, minimal, sunset)
- [ ] Dashboard mit Stats (Views, Clicks, CTR)
- [ ] Settings (Profile, Theme, Status)
- [ ] Mobile-responsive (375px+)

### Phase 2 — Templates & Blocks

- [ ] Alle 10 Templates
- [ ] Carousel Block
- [ ] Image/Gallery Block
- [ ] Contact Form Block
- [ ] Drag & Drop Reordering
- [ ] Template Customization (Custom Colors)

### Phase 3 — SoundCloud & Discovery

- [ ] SoundCloud OAuth + Auto-Import
- [ ] Username Discovery (Suggested Links)
- [ ] Event Block

### Phase 4 — White-Label

- [ ] Multi-Instanz Architektur
- [ ] Instanz Admin Dashboard
- [ ] Custom Domain Support
- [ ] Branchen-Presets (DJ, Gastro, Retail)
- [ ] Invite System

### Phase 5 — Growth

- [ ] Advanced Analytics (Zeitraum-Filter, Export)
- [ ] Page Redirect
- [ ] Donation Block
- [ ] Weitere Templates aus Design-Ordner
- [ ] Monetarisierung (Pricing TBD)

---

## 16. Design-Referenzen

Alle Referenz-Materialien liegen in `~/Desktop/Biopages-Templates/`:

| Datei | Was |
|-------|-----|
| `Referenz-KOMI-Usher.pdf` | KOMI Profilseite (Usher) — Content-Struktur |
| `Referenz-hoobe-Template-Picker.jpg` | hoo.be Template Picker — Onboarding Grid |

### Zusätzliche Screenshots (im Brainstorming gesammelt)

- KOMI Dashboard: Navigation, Editor, Content Blocks, Analytics, Settings, Brand Deals
- KOMI Add Content: 30+ Block-Typen, Kategorien, Editor-Screens
- hoo.be Onboarding: Template → Plattformen → Links → Suggested Links → Profile → Done
- hoo.be Dashboard: Stats, Preview, Top Links, Page Settings
- hoo.be Editor: Phone Preview + Add Panel

---

## 17. Technische Notizen

### Vercel Deployment

- Auto-Deploy von `main` Branch
- Preview Deployments für PRs
- Custom Domains pro Instanz über Vercel

### Supabase

- Free Tier für MVP ausreichend
- Row Level Security für Multi-Tenant
- Realtime für Live Preview im Editor
- Edge Functions für SoundCloud OAuth Callback

### Performance

- SSR für öffentliche Profilseiten (SEO)
- Static Generation wo möglich
- Image Optimization via Next.js
- Lazy Loading für Embeds (SoundCloud, YouTube)
