-- Contact form block type
-- Adds 'contact_form' to the allowed content_blocks types

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
    'document_links',
    'contact_form'
  ));
