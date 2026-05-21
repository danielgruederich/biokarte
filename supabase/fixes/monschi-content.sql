-- Monschi content fixes — run in the Supabase SQL editor against the live DB.
-- Each section is self-contained; review before running.

-- ---------------------------------------------------------------------------
-- 1) Fix Instagram link  ->  https://www.instagram.com/monschi_music
-- ---------------------------------------------------------------------------
UPDATE public.social_links
SET url = 'https://www.instagram.com/monschi_music',
    username = 'monschi_music'
WHERE user_id = (SELECT id FROM public.profiles WHERE username = 'monschi')
  AND platform = 'instagram';

UPDATE public.content_blocks
SET data = data || jsonb_build_object(
             'url', 'https://www.instagram.com/monschi_music',
             'username', 'monschi_music'
           )
WHERE user_id = (SELECT id FROM public.profiles WHERE username = 'monschi')
  AND type = 'social_link'
  AND data->>'platform' = 'instagram';

-- ---------------------------------------------------------------------------
-- 2) Promote SoundCloud set  ->  cafe-de-paris (replaces the current SC embed)
--    NOTE: if the SELECT showed multiple SoundCloud embeds, add `AND id = '...'`.
-- ---------------------------------------------------------------------------
UPDATE public.content_blocks
SET data = (data - 'urls') || jsonb_build_object(
             'url',   'https://soundcloud.com/monschi/cafe-de-paris',
             'title', 'Café de Paris'
           )
WHERE user_id = (SELECT id FROM public.profiles WHERE username = 'monschi')
  AND type = 'embed'
  AND data->>'platform' = 'soundcloud';

-- ---------------------------------------------------------------------------
-- 3) Replace the broken booking CTA with the new contact form block.
--    Requires migration 007_contact_form.sql to be applied first.
-- ---------------------------------------------------------------------------

-- Hide the old (broken) booking CTA, if present
UPDATE public.content_blocks
SET is_visible = false
WHERE user_id = (SELECT id FROM public.profiles WHERE username = 'monschi')
  AND type = 'booking_cta';

-- Insert the contact form, reusing the booking block's slot (or appending)
INSERT INTO public.content_blocks (user_id, type, position, is_visible, data)
SELECT
  p.id,
  'contact_form',
  COALESCE(
    (SELECT position FROM public.content_blocks
      WHERE user_id = p.id AND type = 'booking_cta'
      ORDER BY position LIMIT 1),
    (SELECT COALESCE(MAX(position), 0) + 1 FROM public.content_blocks WHERE user_id = p.id)
  ),
  true,
  jsonb_build_object(
    'title',           'Booking & Kontakt',
    'description',     'Schreib mir direkt hier für Booking-Anfragen.',
    'recipient_email', 'daniel@colognebeats.com',
    'submit_label',    'Anfrage senden',
    'success_message', 'Danke! Ich melde mich so schnell wie möglich.',
    'whatsapp_number', '491737130733',
    'whatsapp_label',  'Per WhatsApp schreiben'
  )
FROM public.profiles p
WHERE p.username = 'monschi';
