import { createClient } from './supabase/client'

export async function trackEvent(
  profileId: string,
  eventType: 'view' | 'click',
  targetId?: string,
  targetType?: string
) {
  const supabase = createClient()
  await supabase.from('analytics_events').insert({
    profile_id: profileId,
    event_type: eventType,
    target_id: targetId,
    target_type: targetType,
    referrer: typeof document !== 'undefined' ? document.referrer : null,
  })
}
