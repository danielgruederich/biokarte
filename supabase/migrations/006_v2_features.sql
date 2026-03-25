-- v2 Features Migration
-- Profile types, new block types, admin banners, analytics index

-- 1. Profile type
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS profile_type text NOT NULL DEFAULT 'musician'
  CHECK (profile_type IN ('musician', 'business', 'collective'));

-- 2. Expand block type constraint (add profile_tags, booking_cta, document_links)
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
    'banner_link',
    'profile_tags',
    'booking_cta',
    'document_links'
  ));

-- 3. Admin banners table
CREATE TABLE IF NOT EXISTS public.admin_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  link_url text,
  is_active boolean DEFAULT true,
  position text DEFAULT 'bottom' CHECK (position IN ('top', 'bottom')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.admin_banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Banners are viewable by everyone"
  ON public.admin_banners FOR SELECT USING (true);

CREATE POLICY "Admins can insert banners"
  ON public.admin_banners FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update banners"
  ON public.admin_banners FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete banners"
  ON public.admin_banners FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- 4. Composite index for analytics time-range queries
CREATE INDEX IF NOT EXISTS idx_analytics_profile_time
  ON public.analytics_events(profile_id, created_at);
