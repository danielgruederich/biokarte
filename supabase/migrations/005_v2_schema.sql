-- v2 Schema Migration
-- Erweitert profiles, content_blocks und bereitet Multi-Tenant vor

-- profiles: neue Felder
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS genres        text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS locations     text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS booking_email text,
  ADD COLUMN IF NOT EXISTS booking_text  text;

-- content_blocks: erweiterte Typen (carousel, music_card, banner_link)
ALTER TABLE public.content_blocks DROP CONSTRAINT IF EXISTS content_blocks_type_check;
ALTER TABLE public.content_blocks ADD CONSTRAINT content_blocks_type_check
  CHECK (type IN (
    'link',
    'social_link',
    'text',
    'section_title',
    'embed',
    'carousel',
    'music_card',
    'banner_link'
  ));

-- tenants: Multi-Tenant vorbereitet (Phase 2)
CREATE TABLE IF NOT EXISTS public.tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE,
  name text,
  domain text,
  logo_url text,
  accent_color text,
  created_at timestamptz DEFAULT now()
);

-- RLS for tenants
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenants are viewable by everyone"
  ON public.tenants FOR SELECT USING (true);
