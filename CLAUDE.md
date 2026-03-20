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
