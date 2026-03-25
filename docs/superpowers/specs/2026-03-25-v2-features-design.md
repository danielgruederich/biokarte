# v2 Features Design — BioKarte

## Overview

Activate the v2 profile fields (genres, locations, booking) that already exist in the database schema, add profile types for context-dependent labels, introduce three new content block types, expand platform support, add an internal ad banner system, and provide a user-facing analytics dashboard.

## Design Decisions

- **Profile type per user** (not per tenant) — user selects during onboarding
- **Labels are context-dependent** — same DB fields, different UI labels per profile type
- **New blocks read profile data** — `profile_tags` and `booking_cta` need the `profile` object passed via the block registry (registry signature extended with `profile` prop)
- **Documents are URL-only** — no file upload in MVP, users paste external URLs (Supabase Storage can be added later)
- **One active banner at a time** — simplest approach, admin toggles active/inactive
- **Banner clicks tracked as `click`** with `target_type = 'banner'` — no new event type needed
- **All existing profiles default to `musician`** — confirmed: no business users exist yet

## Target Groups

1. **Musician** (`musician`) — DJs, producers, artists
2. **Business** (`business`) — cafes, restaurants, burger joints (bonuskarte.digital customers)
3. **Collective** (`collective`) — labels, collectives, clubs/locations (placeholder, same labels as musician for now)

## 1. Profile Type

### Database

New column on `profiles`:

```sql
ALTER TABLE profiles ADD COLUMN profile_type text NOT NULL DEFAULT 'musician'
  CHECK (profile_type IN ('musician', 'business', 'collective'));
```

### Label Mapping

All context-dependent labels are defined in a single mapping file (`src/lib/profile-labels.ts`):

```ts
export const profileLabels = {
  musician: {
    typeName: 'Musiker / DJ',
    genres: 'Genres',
    genresPlaceholder: 'z.B. Techno, House, Drum & Bass',
    locations: 'Standorte',
    locationsPlaceholder: 'z.B. Köln, Berlin',
    bookingEmail: 'Booking E-Mail',
    bookingText: 'Booking Info',
    bookingCta: 'Booking anfragen',
  },
  business: {
    typeName: 'Geschäft / Gastro',
    genres: 'Kategorien',
    genresPlaceholder: 'z.B. Pizza, Burger, Café',
    locations: 'Standorte',
    locationsPlaceholder: 'z.B. Ehrenfeld, Südstadt',
    bookingEmail: 'Kontakt E-Mail',
    bookingText: 'Kontakt Info',
    bookingCta: 'Kontakt',
  },
  collective: {
    typeName: 'Kollektiv / Label',
    genres: 'Genres',
    genresPlaceholder: 'z.B. Techno, House, Drum & Bass',
    locations: 'Standorte',
    locationsPlaceholder: 'z.B. Köln, Berlin',
    bookingEmail: 'Booking E-Mail',
    bookingText: 'Booking Info',
    bookingCta: 'Booking anfragen',
  },
} as const

export type ProfileType = keyof typeof profileLabels
```

### Onboarding

New **Step 1** (before template selection): "Was beschreibt dich am besten?"

- Three cards: Musiker/DJ, Geschäft/Gastro, Kollektiv/Label
- Each with icon and short description
- Selection stored in wizard state, saved together with all other fields in `handleFinish()` (consistent with existing pattern)
- Existing steps shift: Template (2) → Plattformen (3) → Profil (4) → Fertig (5)

### Settings

Profile type is also changeable in Settings under "Profil-Details" as a select/dropdown.

## 2. v2 Fields in Settings

New section **"Profil-Infos"** in `/settings` between "Profil-Details" and "Profilstatus":

- **Genres/Kategorien** — comma-separated tag input, stored as `text[]`
- **Standorte** — comma-separated tag input, stored as `text[]`
- **Booking/Kontakt E-Mail** — email input field
- **Booking/Kontakt Info** — textarea

All labels adapt based on `profile_type` using the mapping above.

Inline-edit pattern (same as existing username/display name editing):
- Show current values as read-only
- Click "Bearbeiten" to edit
- Save/Cancel buttons

## 3. New Content Block Types

### 3.1 `profile_tags`

Displays genres/categories and locations as pill badges.

```ts
interface ProfileTagsBlockData {
  showGenres: boolean    // default true
  showLocations: boolean // default true
}
```

- Reads data from the `profile` prop (passed via extended block registry signature) — genres and locations
- Labels adapt to profile_type
- Renders as horizontal pill/badge row, wrapping on overflow
- Uses template accent color for pills

### 3.2 `booking_cta`

Displays a booking/contact call-to-action button.

```ts
interface BookingCtaBlockData {
  style: 'button' | 'card' // default 'button'
}
```

- Reads `booking_email` and `booking_text` from `profile` prop (passed via extended block registry signature)
- Button label adapts to profile_type ("Booking anfragen" / "Kontakt")
- If `booking_email` set: `mailto:` link
- If only `booking_text` set: shows text in a card
- If both: button opens mailto, text shown below
- If neither set: shows muted hint "Bitte Kontaktdaten in den Einstellungen ergänzen" (only visible to profile owner, hidden on public page)

### 3.3 `document_links`

Displays a list of documents/PDFs.

```ts
interface DocumentLinksBlockData {
  title: string
  items: {
    label: string          // e.g. "Speisekarte", "Getränkekarte"
    url: string            // link to PDF or document
    thumbnail_url?: string // optional preview image
  }[]
}
```

- Renders as a card with title and list of document items
- Each item shows PDF icon + label, tapping opens URL in new tab
- Optional thumbnail shown as small preview
- Useful for restaurant menus, rider specs, press kits
- Maximum 10 items per block (enforced in editor)
- MVP: URL input only (no file upload). Supabase Storage can be added later.

## 4. New Platforms

The `Platform` interface gets a new `category` field to filter platforms by profile type:

```ts
export interface Platform {
  id: string
  name: string
  icon: string
  baseUrl: string
  placeholder: string
  category: 'music' | 'business' | 'general' // NEW
}
```

In onboarding and editor, platforms are filtered: `general` shown to all, `music` only to musician/collective, `business` only to business profiles.

### Existing Platforms — Category Assignment

All existing platforms get `category: 'general'` except:
- `soundcloud`, `spotify`, `mixcloud`, `apple_music` → `'music'`

### New Music Platforms

```ts
{ id: 'beatport', name: 'Beatport', icon: '🎹', baseUrl: 'https://www.beatport.com/artist/', placeholder: 'artist URL', category: 'music' }
{ id: 'bandcamp', name: 'Bandcamp', icon: '📀', baseUrl: 'https://bandcamp.com/', placeholder: 'username.bandcamp.com', category: 'music' }
```

### New Gastro/Business Platforms

```ts
{ id: 'google_business', name: 'Google Business', icon: '📍', baseUrl: '', placeholder: 'https://g.page/...', category: 'business' }
{ id: 'lieferando', name: 'Lieferando', icon: '🛵', baseUrl: 'https://www.lieferando.de/menu/', placeholder: 'restaurant-slug', category: 'business' }
{ id: 'tripadvisor', name: 'TripAdvisor', icon: '🦉', baseUrl: '', placeholder: 'https://tripadvisor.com/...', category: 'business' }
{ id: 'yelp', name: 'Yelp', icon: '⭐', baseUrl: 'https://www.yelp.com/biz/', placeholder: 'business-slug', category: 'business' }
```

## 5. Internal Ad Banner

### Purpose

Platform-internal advertising only (community events, webinars, features). No external ads, no ad tracking, no third-party networks.

### Database

```sql
CREATE TABLE admin_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  link_url text,
  is_active boolean DEFAULT true,
  position text DEFAULT 'bottom' CHECK (position IN ('top', 'bottom')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Banners are viewable by everyone"
  ON admin_banners FOR SELECT USING (true);

CREATE POLICY "Admins can insert banners"
  ON admin_banners FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update banners"
  ON admin_banners FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete banners"
  ON admin_banners FOR DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
```

### Admin UI

New page `/admin/banners`:
- Create/edit/delete banners
- Fields: title, description (optional), image URL, link URL, position (top/bottom), active toggle
- Only one banner active at a time — activating one deactivates all others

### Public Display

- Active banner rendered on every public bio page (`/[username]`)
- Fetched in `Promise.all` alongside profile, social_links, and content_blocks
- Fixed position (top or bottom of page), not part of user's content blocks
- User cannot remove or reorder it
- Simple card with title, optional image, link
- Small "Anzeige" label to mark it as platform content
- Click on banner tracked as analytics event with `event_type = 'click'` and `target_type = 'banner'` (uses existing event types, no new type needed)

## 6. User Analytics Dashboard

### Location

New section in existing `/dashboard` page, below the current quick stats.

### Data

Aggregates from existing `analytics_events` table:
- **Views** — events where `event_type = 'view'`
- **Clicks** — events where `event_type = 'click'`
- **CTR** — clicks / views

### Time Ranges

Toggle between:
- **Heute** (today)
- **7 Tage** (last 7 days)
- **30 Tage** (last 30 days)

### Display

Simple number cards (no charts for now):
- Total Views in period
- Total Clicks in period
- CTR percentage
- Top 3 clicked links/blocks

### Implementation

Server-side aggregation query via Supabase:

```sql
SELECT
  date_trunc('day', created_at) AS day,
  event_type,
  COUNT(*) as count
FROM analytics_events
WHERE profile_id = $1
  AND created_at >= $2
GROUP BY day, event_type
ORDER BY day DESC;
```

Composite index for performance (added in migration):

```sql
CREATE INDEX IF NOT EXISTS idx_analytics_profile_time ON analytics_events(profile_id, created_at);
```

## 7. Onboarding Flow (Updated)

```
Step 1: Profile Type     → "Was beschreibt dich am besten?" (musician/business/collective)
Step 2: Template          → Template grid (existing, unchanged)
Step 3: Platforms         → Platform multi-select (now includes new platforms)
Step 4: Profile Details   → Display name, bio, avatar URL (existing)
Step 5: Done              → Redirect to dashboard (existing)
```

## 8. Database Migration (006_v2_features.sql)

```sql
-- 1. Profile type
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_type text NOT NULL DEFAULT 'musician'
  CHECK (profile_type IN ('musician', 'business', 'collective'));

-- 2. Expand block type constraint
ALTER TABLE content_blocks DROP CONSTRAINT IF EXISTS content_blocks_type_check;
ALTER TABLE content_blocks ADD CONSTRAINT content_blocks_type_check
  CHECK (type IN (
    'link', 'social_link', 'text', 'section_title', 'embed',
    'carousel', 'music_card', 'banner_link',
    'profile_tags', 'booking_cta', 'document_links'
  ));

-- 3. Admin banners table
CREATE TABLE IF NOT EXISTS admin_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  link_url text,
  is_active boolean DEFAULT true,
  position text DEFAULT 'bottom' CHECK (position IN ('top', 'bottom')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Banners are viewable by everyone"
  ON admin_banners FOR SELECT USING (true);

CREATE POLICY "Admins can insert banners"
  ON admin_banners FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update banners"
  ON admin_banners FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete banners"
  ON admin_banners FOR DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 4. Composite index for analytics time-range queries
CREATE INDEX IF NOT EXISTS idx_analytics_profile_time ON analytics_events(profile_id, created_at);
```

## 9. Bug Fixes (included in this migration)

- Fix `AnalyticsEvent` TypeScript interface: rename `user_id` to `profile_id` to match DB column name
- Fix `ContentBlockData` union type: add `ProfileTagsBlockData | BookingCtaBlockData | DocumentLinksBlockData`

## Files to Create/Modify

### New Files
- `src/lib/profile-labels.ts` — label mapping per profile type
- `src/blocks/profile-tags.tsx` — profile tags block renderer
- `src/blocks/booking-cta.tsx` — booking CTA block renderer
- `src/blocks/document-links.tsx` — document links block renderer
- `src/components/onboarding/profile-type-step.tsx` — new onboarding step
- `src/components/admin/banner-manager.tsx` — admin banner CRUD
- `supabase/migrations/006_v2_features.sql` — database migration

### Modified Files
- `src/lib/types.ts` — add ProfileType, new block data interfaces, fix AnalyticsEvent (user_id → profile_id), extend ContentBlockData union
- `src/lib/platforms.ts` — add `category` field to Platform interface, assign categories to existing platforms, add 6 new platforms
- `src/blocks/registry.ts` — extend block render signature with `profile` prop, register 3 new block types
- `src/app/(app)/settings/page.tsx` — add profile type dropdown + v2 fields section (Profil-Infos)
- `src/app/(app)/dashboard/page.tsx` — add analytics time-range section (Heute/7 Tage/30 Tage)
- `src/components/onboarding/wizard-shell.tsx` — add step 1 (profile type), shift step indices, save profile_type in handleFinish()
- `src/app/[username]/page.tsx` — fetch + render admin banner, pass profile to block registry
- `src/components/editor/` — add editors for new block types
