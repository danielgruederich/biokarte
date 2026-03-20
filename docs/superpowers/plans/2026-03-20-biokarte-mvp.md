# BioKarte MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a working bio-page platform MVP with auth, onboarding wizard, editor, public profile pages, and analytics dashboard.

**Architecture:** Next.js App Router with Supabase for auth, database, and storage. Public profile pages are server-rendered for SEO. Editor and dashboard are client-side with Supabase realtime. Templates use CSS Custom Properties set per-template, with Tailwind for layout.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Supabase (Auth + PostgreSQL + Storage), Vercel

**Spec:** `docs/superpowers/specs/2026-03-20-biokarte-design.md`

---

## File Structure

```
biokarte/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout with providers
│   │   ├── page.tsx                      # Landing/redirect to dashboard
│   │   ├── globals.css                   # Global styles + template CSS vars
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx            # Login page
│   │   │   ├── register/page.tsx         # Register page
│   │   │   └── callback/route.ts         # OAuth callback handler
│   │   │
│   │   ├── (app)/
│   │   │   ├── layout.tsx                # Authenticated layout with nav
│   │   │   ├── dashboard/page.tsx        # Dashboard with stats + preview
│   │   │   ├── edit/page.tsx             # Editor page
│   │   │   ├── settings/page.tsx         # User settings
│   │   │   └── onboarding/
│   │   │       ├── page.tsx              # Onboarding wizard container
│   │   │       └── steps/
│   │   │           ├── template-step.tsx  # Step 2: Choose template
│   │   │           ├── platforms-step.tsx # Step 3: Choose platforms + links
│   │   │           ├── profile-step.tsx   # Step 4: Profile details
│   │   │           └── done-step.tsx      # Step 5: Looking good!
│   │   │
│   │   └── [username]/
│   │       └── page.tsx                  # Public profile page (SSR)
│   │
│   ├── components/
│   │   ├── ui/                           # shadcn/ui components
│   │   ├── profile/
│   │   │   ├── profile-renderer.tsx      # Renders a profile (used in preview + public)
│   │   │   ├── hero-section.tsx          # Hero image + name + bio + socials
│   │   │   └── content-block.tsx         # Renders a single content block by type
│   │   ├── editor/
│   │   │   ├── phone-preview.tsx         # Phone mockup frame with profile inside
│   │   │   ├── add-panel.tsx             # Right panel with block type options
│   │   │   ├── block-editor.tsx          # Edit form for a single block
│   │   │   └── block-list.tsx            # Sortable list of blocks
│   │   ├── onboarding/
│   │   │   ├── wizard-shell.tsx          # Progress bar + step container
│   │   │   └── platform-grid.tsx         # Grid of platform icons (reusable)
│   │   └── dashboard/
│   │       ├── stats-cards.tsx           # Views, Clicks, CTR cards
│   │       └── top-links.tsx             # Top performing links list
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                # Browser Supabase client
│   │   │   ├── server.ts                # Server Supabase client
│   │   │   └── middleware.ts            # Auth middleware
│   │   ├── templates.ts                 # Template definitions (colors, fonts, config)
│   │   ├── platforms.ts                 # Platform definitions (icons, urls, names)
│   │   ├── types.ts                     # TypeScript types for all entities
│   │   └── analytics.ts                # Track view/click events
│   │
│   └── middleware.ts                    # Next.js middleware (auth redirect)
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql       # All tables, RLS policies, seed data
│
├── public/
│   └── templates/                       # Template preview images
│
├── docs/
│   └── superpowers/
│       ├── specs/
│       │   └── 2026-03-20-biokarte-design.md
│       └── plans/
│           └── 2026-03-20-biokarte-mvp.md  # This file
│
├── .env.local.example                   # Env vars template
├── CLAUDE.md                            # Project instructions
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `.env.local.example`, `CLAUDE.md`

- [ ] **Step 1: Create Next.js project**

```bash
cd /Users/danielgruederich/biokarte
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Answer prompts: Yes to all defaults.

- [ ] **Step 2: Install dependencies**

```bash
npm install @supabase/supabase-js @supabase/ssr
npx shadcn@latest init -d
npx shadcn@latest add button card input label textarea badge separator avatar dialog sheet tabs toggle-group toast
```

- [ ] **Step 3: Create `.env.local.example`**

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

- [ ] **Step 4: Create CLAUDE.md**

```markdown
# BioKarte

## What
White-label bio-page platform (like KOMI/hoo.be/Linktree).

## Stack
Next.js 15 (App Router) + Supabase + Vercel + TypeScript + Tailwind + shadcn/ui

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build

## Key Files
- `src/lib/types.ts` — all TypeScript types
- `src/lib/templates.ts` — template definitions
- `src/lib/platforms.ts` — platform definitions
- `supabase/migrations/001_initial_schema.sql` — DB schema

## Conventions
- Mobile first (375px+)
- German UI text
- Code comments in English
- CSS Custom Properties for template theming
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: Dev server on http://localhost:3000

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js project with Tailwind and shadcn/ui"
```

---

## Task 2: Types, Templates & Platform Definitions

**Files:**
- Create: `src/lib/types.ts`, `src/lib/templates.ts`, `src/lib/platforms.ts`

- [ ] **Step 1: Create types**

```typescript
// src/lib/types.ts

export type ContentBlockType = 'link' | 'social_link' | 'text' | 'section_title' | 'embed'

export interface Profile {
  id: string
  username: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  template_id: string
  status: 'online' | 'offline'
  created_at: string
}

export interface SocialLink {
  id: string
  user_id: string
  platform: string
  username: string
  url: string
  position: number
  is_visible: boolean
}

export interface ContentBlock {
  id: string
  user_id: string
  type: ContentBlockType
  position: number
  is_visible: boolean
  data: LinkBlockData | TextBlockData | SectionTitleData | EmbedBlockData | SocialLinkBlockData
  created_at: string
}

export interface LinkBlockData {
  title: string
  url: string
  thumbnail_url?: string
  layout: 'text' | 'thumbnail_left' | 'thumbnail_large' | 'full_width'
}

export interface SocialLinkBlockData {
  platform: string
  username: string
  url: string
}

export interface TextBlockData {
  text: string
}

export interface SectionTitleData {
  title: string
}

export interface EmbedBlockData {
  platform: string
  url: string
  title?: string
}

export interface Template {
  id: string
  name: string
  description: string
  colors: {
    background: string
    surface: string
    text: string
    muted: string
    accent: string
    border: string
  }
  fonts: {
    display: string
    body: string
  }
  grain: boolean
  category: 'dark' | 'light' | 'colorful'
}

export interface AnalyticsEvent {
  user_id: string
  event_type: 'view' | 'click'
  target_id?: string
  target_type?: string
}

export interface DashboardStats {
  total_views: number
  total_clicks: number
  ctr: number
  top_links: { platform: string; username: string; clicks: number }[]
}
```

- [ ] **Step 2: Create template definitions**

```typescript
// src/lib/templates.ts
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
```

- [ ] **Step 3: Create platform definitions**

```typescript
// src/lib/platforms.ts

export interface Platform {
  id: string
  name: string
  icon: string  // emoji or SVG path for MVP
  baseUrl: string
  placeholder: string
}

export const platforms: Platform[] = [
  { id: 'instagram', name: 'Instagram', icon: '📷', baseUrl: 'https://instagram.com/', placeholder: '@username' },
  { id: 'soundcloud', name: 'SoundCloud', icon: '🎵', baseUrl: 'https://soundcloud.com/', placeholder: 'username' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', baseUrl: 'https://youtube.com/@', placeholder: '@channel' },
  { id: 'tiktok', name: 'TikTok', icon: '🎬', baseUrl: 'https://tiktok.com/@', placeholder: '@username' },
  { id: 'spotify', name: 'Spotify', icon: '🎧', baseUrl: 'https://open.spotify.com/artist/', placeholder: 'artist URL' },
  { id: 'facebook', name: 'Facebook', icon: '👤', baseUrl: 'https://facebook.com/', placeholder: 'page name' },
  { id: 'x', name: 'X (Twitter)', icon: '𝕏', baseUrl: 'https://x.com/', placeholder: '@handle' },
  { id: 'threads', name: 'Threads', icon: '🧵', baseUrl: 'https://threads.net/@', placeholder: '@username' },
  { id: 'mixcloud', name: 'Mixcloud', icon: '🎛️', baseUrl: 'https://mixcloud.com/', placeholder: 'username' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', baseUrl: 'https://wa.me/', placeholder: 'phone number' },
  { id: 'website', name: 'Website', icon: '🌐', baseUrl: '', placeholder: 'https://...' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', baseUrl: 'https://linkedin.com/in/', placeholder: 'profile slug' },
  { id: 'twitch', name: 'Twitch', icon: '🟣', baseUrl: 'https://twitch.tv/', placeholder: 'username' },
  { id: 'apple_music', name: 'Apple Music', icon: '🎵', baseUrl: 'https://music.apple.com/artist/', placeholder: 'artist URL' },
  { id: 'patreon', name: 'Patreon', icon: '❤️', baseUrl: 'https://patreon.com/', placeholder: 'creator name' },
]

export function getPlatform(id: string): Platform | undefined {
  return platforms.find(p => p.id === id)
}

export function buildPlatformUrl(platform: Platform, username: string): string {
  if (platform.id === 'website') return username
  if (username.startsWith('http')) return username
  const clean = username.replace(/^@/, '')
  return `${platform.baseUrl}${clean}`
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/ && git commit -m "feat: add types, template definitions, and platform config"
```

---

## Task 3: Supabase Setup & Database Schema

**Files:**
- Create: `supabase/migrations/001_initial_schema.sql`, `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/middleware.ts`

- [ ] **Step 1: Create Supabase project**

Go to https://supabase.com/dashboard — create new project "biokarte".
Copy the URL and anon key to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxx
```

- [ ] **Step 2: Create migration SQL**

```sql
-- supabase/migrations/001_initial_schema.sql

-- Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text not null default '',
  bio text default '',
  avatar_url text,
  template_id text not null default 'dark-komi',
  status text not null default 'online' check (status in ('online', 'offline')),
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now()
);

-- Reserved slugs
create table public.reserved_slugs (
  slug text primary key
);
insert into public.reserved_slugs (slug) values
  ('admin'), ('api'), ('settings'), ('auth'), ('onboarding'),
  ('edit'), ('dashboard'), ('login'), ('register'), ('callback');

-- Username validation: lowercase, alphanumeric + hyphens, 3-30 chars
alter table public.profiles add constraint username_format
  check (username ~ '^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$');

-- Username not in reserved slugs
create or replace function public.check_username_not_reserved()
returns trigger as $$
begin
  if exists (select 1 from public.reserved_slugs where slug = new.username) then
    raise exception 'Username is reserved';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger check_username_reserved
  before insert or update on public.profiles
  for each row execute function public.check_username_not_reserved();

-- Social Links
create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles on delete cascade not null,
  platform text not null,
  username text not null,
  url text not null,
  position integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

-- Content Blocks
create table public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles on delete cascade not null,
  type text not null check (type in ('link', 'social_link', 'text', 'section_title', 'embed')),
  position integer not null default 0,
  is_visible boolean not null default true,
  data jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Analytics Events
create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles on delete cascade not null,
  event_type text not null check (event_type in ('view', 'click')),
  target_id text,
  target_type text,
  referrer text,
  created_at timestamptz not null default now()
);

-- Create index for analytics queries
create index idx_analytics_profile_id on public.analytics_events(profile_id);
create index idx_analytics_created_at on public.analytics_events(created_at);
create index idx_content_blocks_user_id on public.content_blocks(user_id, position);
create index idx_social_links_user_id on public.social_links(user_id, position);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.social_links enable row level security;
alter table public.content_blocks enable row level security;
alter table public.analytics_events enable row level security;

-- Profiles: anyone can read (public profiles), owners can update
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Social Links: anyone can read, owners can CRUD
create policy "Social links are viewable by everyone"
  on public.social_links for select using (true);

create policy "Users can manage own social links"
  on public.social_links for all using (auth.uid() = user_id);

-- Content Blocks: anyone can read visible, owners can CRUD
create policy "Visible content blocks are viewable by everyone"
  on public.content_blocks for select using (is_visible = true or auth.uid() = user_id);

create policy "Users can manage own content blocks"
  on public.content_blocks for all using (auth.uid() = user_id);

-- Analytics: anyone can insert (tracking), owners can read
create policy "Anyone can insert analytics events"
  on public.analytics_events for insert with check (true);

create policy "Users can read own analytics"
  on public.analytics_events for select using (auth.uid() = profile_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', replace(split_part(new.email, '@', 1), '.', '-')),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

- [ ] **Step 3: Run migration in Supabase SQL Editor**

Go to Supabase Dashboard → SQL Editor → paste and run the migration.

- [ ] **Step 4: Create Supabase client utilities**

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — ignore
          }
        },
      },
    }
  )
}
```

```typescript
// src/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // Public paths that don't need auth
  const publicPaths = ['/login', '/register', '/callback']
  const isPublicPath = publicPaths.some(p => path.startsWith(p))

  // Profile pages (/@username or /username) — check if it's a known app route
  const appPaths = ['/dashboard', '/edit', '/settings', '/onboarding', '/admin', '/api']
  const isAppPath = appPaths.some(p => path.startsWith(p))

  if (!user && isAppPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user && isPublicPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add Supabase setup, DB schema, auth middleware"
```

---

## Task 4: Auth Pages (Login & Register)

**Files:**
- Create: `src/app/(auth)/login/page.tsx`, `src/app/(auth)/register/page.tsx`, `src/app/(auth)/callback/route.ts`, `src/app/(auth)/layout.tsx`

- [ ] **Step 1: Create auth layout**

Centered card layout for login/register pages.

- [ ] **Step 2: Create login page**

Email/password form + Google OAuth button. Uses Supabase `signInWithPassword` and `signInWithOAuth`.

- [ ] **Step 3: Create register page**

Email/password + username field. Passes username in `options.data.username`. Uses Supabase `signUp`.

- [ ] **Step 4: Create OAuth callback route**

```typescript
// src/app/(auth)/callback/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}/onboarding`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
```

- [ ] **Step 5: Test login/register flow manually**

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add auth pages (login, register, OAuth callback)"
```

---

## Task 5: Onboarding Wizard

**Files:**
- Create: `src/app/(app)/onboarding/page.tsx`, `src/components/onboarding/wizard-shell.tsx`, all step components, `src/components/onboarding/platform-grid.tsx`

- [ ] **Step 1: Create wizard shell with progress bar**

Multi-step wizard with progress indicator. Stores state in React state, saves to Supabase on final step.

- [ ] **Step 2: Create Step 2 — Template picker**

Grid of 3 template cards (dark-komi, minimal, sunset) with visual previews. Click to select.

- [ ] **Step 3: Create Step 3 — Platform selection + links**

Platform icon grid (multi-select). When selected, show input fields for each platform with live validation.

- [ ] **Step 4: Create Step 4 — Profile details**

Avatar upload (Supabase Storage), display name input, bio textarea (150 char limit).

- [ ] **Step 5: Create Step 5 — "Looking good!" preview**

Phone mockup with live preview of the profile. "Continue building" button saves everything and redirects to dashboard.

- [ ] **Step 6: Save all data to Supabase on completion**

Update profile, insert social_links, mark `onboarding_complete = true`.

- [ ] **Step 7: Test full onboarding flow**

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: add 5-step onboarding wizard"
```

---

## Task 6: Public Profile Page

**Files:**
- Create: `src/app/[username]/page.tsx`, `src/components/profile/profile-renderer.tsx`, `src/components/profile/hero-section.tsx`, `src/components/profile/content-block.tsx`, `src/lib/analytics.ts`

- [ ] **Step 1: Create profile renderer component**

Reusable component that takes a profile, social links, content blocks, and template — renders the full profile page. Used in both public page and editor preview.

- [ ] **Step 2: Create hero section**

Profile image, name, bio, social icons row. Styled with template CSS vars. Grain overlay if template.grain is true.

- [ ] **Step 3: Create content block renderer**

Switch on block type, render appropriate component:
- `link` → card with title + optional thumbnail
- `social_link` → platform icon + username
- `text` → paragraph
- `section_title` → heading
- `embed` → iframe (YouTube, SoundCloud, Spotify via oEmbed)

- [ ] **Step 4: Create public profile page (SSR)**

```typescript
// src/app/[username]/page.tsx
// Server component: fetch profile, social links, content blocks from Supabase
// Track view event
// Render profile-renderer with template CSS vars
// 404 if not found
```

Generate metadata (title, description, og:image) from profile data.

- [ ] **Step 5: Create analytics tracking utility**

```typescript
// src/lib/analytics.ts
import { createClient } from './supabase/client'

export async function trackEvent(profileId: string, eventType: 'view' | 'click', targetId?: string, targetType?: string) {
  const supabase = createClient()
  await supabase.from('analytics_events').insert({
    profile_id: profileId,
    event_type: eventType,
    target_id: targetId,
    target_type: targetType,
    referrer: typeof document !== 'undefined' ? document.referrer : null,
  })
}
```

- [ ] **Step 6: Style with template CSS variables**

Apply template colors/fonts via CSS custom properties on the root element. Grain overlay via SVG noise filter.

- [ ] **Step 7: Test with Monschi test profile**

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: add public profile page with SSR and analytics tracking"
```

---

## Task 7: Dashboard

**Files:**
- Create: `src/app/(app)/dashboard/page.tsx`, `src/app/(app)/layout.tsx`, `src/components/dashboard/stats-cards.tsx`, `src/components/dashboard/top-links.tsx`

- [ ] **Step 1: Create authenticated app layout**

Simple layout with top nav: BioKarte logo, Dashboard, Edit, Settings links. Redirect to onboarding if `onboarding_complete = false`.

- [ ] **Step 2: Create stats cards**

Fetch analytics from Supabase: count views, count clicks, calculate CTR. Display in 3 cards.

- [ ] **Step 3: Create top links component**

Query social_links joined with analytics click events, show top 5 by clicks.

- [ ] **Step 4: Create dashboard page**

Layout: Stats cards top, "My page" preview (phone mockup) left, Page settings + Top links right. Mobile: stacked vertically.

- [ ] **Step 5: Test dashboard**

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add dashboard with stats, preview, and top links"
```

---

## Task 8: Editor

**Files:**
- Create: `src/app/(app)/edit/page.tsx`, `src/components/editor/phone-preview.tsx`, `src/components/editor/add-panel.tsx`, `src/components/editor/block-editor.tsx`, `src/components/editor/block-list.tsx`

- [ ] **Step 1: Create phone preview component**

iPhone-style frame wrapping the profile-renderer component. Responsive: scales down on mobile.

- [ ] **Step 2: Create add panel**

List of block types user can add: Link, Embed, Text, Section Title. Each is a card that opens an editor form.

- [ ] **Step 3: Create block editor forms**

Modal/sheet for each block type:
- Link: Title, URL, layout select
- Embed: Platform picker, URL
- Text: Textarea
- Section Title: Title input

Each has Draft / Add buttons.

- [ ] **Step 4: Create block list**

List of existing blocks with edit/delete/visibility toggle. Position ordering via up/down buttons (Drag & Drop is Phase 2).

- [ ] **Step 5: Create editor page**

Mobile: Tab switch between Preview and Edit panels.
Desktop: Split view — preview left, add panel right.

- [ ] **Step 6: Wire up Supabase CRUD**

Insert, update, delete content blocks. Real-time preview update via React state.

- [ ] **Step 7: Add template switcher**

Dropdown/select in editor to change template. Updates profile.template_id.

- [ ] **Step 8: Test full editor flow**

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: add editor with live preview and content block management"
```

---

## Task 9: Settings Page

**Files:**
- Create: `src/app/(app)/settings/page.tsx`

- [ ] **Step 1: Create settings page**

Sections:
- Profile Details (username, display name) — with edit
- Profile Status (online/offline toggle)
- Template (current template + change button → links to template picker)
- Danger Zone (logout button)

- [ ] **Step 2: Wire up Supabase updates**

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add settings page"
```

---

## Task 10: Deploy to Vercel

**Files:**
- Modify: `next.config.ts` if needed

- [ ] **Step 1: Connect repo to Vercel**

```bash
npx vercel link
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

- [ ] **Step 2: Deploy**

```bash
git push origin main
```

Vercel auto-deploys from main.

- [ ] **Step 3: Enable Google OAuth in Supabase**

Go to Supabase Dashboard → Authentication → Providers → Google.
Set redirect URL to `https://your-vercel-url.vercel.app/callback`.

- [ ] **Step 4: Test live deployment**

- [ ] **Step 5: Commit any fixes**

---

## Task 11: Seed Monschi Test Profile

- [ ] **Step 1: Register as Monschi**

Create account with username "monschi", add SoundCloud + Instagram links, choose dark-komi template.

- [ ] **Step 2: Add content blocks**

Add some SoundCloud embeds, text blocks, and links via the editor.

- [ ] **Step 3: Verify public profile works**

Visit `/monschi` and verify it renders correctly.

---

## Execution Strategy

Tasks 1-3 are sequential (each depends on the previous).
Tasks 4-9 can be partially parallelized after Task 3:
- **Group A (parallel):** Task 4 (Auth) + Task 6 (Public Profile) — independent
- **Group B (after Auth):** Task 5 (Onboarding) — needs auth
- **Group C (after Profile):** Task 7 (Dashboard) + Task 8 (Editor) — need profile renderer
- **Task 9** (Settings) can run in parallel with Group C
- **Task 10** (Deploy) after all others
- **Task 11** (Seed) after deploy
