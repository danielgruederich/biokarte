import { createClient } from '@/lib/supabase/server'
import { getPlatform } from '@/lib/platforms'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TopLinksProps {
  userId: string
}

interface LinkClickRow {
  target_id: string
  platform: string
  username: string
  clicks: number
}

export async function TopLinks({ userId }: TopLinksProps) {
  const supabase = await createClient()

  // Get all social links for this user
  const { data: socialLinks } = await supabase
    .from('social_links')
    .select('id, platform, username')
    .eq('user_id', userId)

  if (!socialLinks || socialLinks.length === 0) {
    return (
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Top Links</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-500">Noch keine Daten</p>
        </CardContent>
      </Card>
    )
  }

  // Get click counts for each social link
  const linkIds = socialLinks.map(l => l.id)
  const { data: clickEvents } = await supabase
    .from('analytics_events')
    .select('target_id')
    .eq('profile_id', userId)
    .eq('event_type', 'click')
    .in('target_id', linkIds)

  // Aggregate click counts by target_id
  const clickCounts: Record<string, number> = {}
  for (const event of clickEvents ?? []) {
    if (event.target_id) {
      clickCounts[event.target_id] = (clickCounts[event.target_id] ?? 0) + 1
    }
  }

  // Build sorted list
  const rows: LinkClickRow[] = socialLinks.map(link => ({
    target_id: link.id,
    platform: link.platform,
    username: link.username,
    clicks: clickCounts[link.id] ?? 0,
  }))
  rows.sort((a, b) => b.clicks - a.clicks)

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Top Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pb-4">
        {rows.length === 0 ? (
          <p className="text-sm text-zinc-500">Noch keine Daten</p>
        ) : (
          rows.map(row => {
            const platform = getPlatform(row.platform)
            return (
              <div
                key={row.target_id}
                className="flex items-center justify-between gap-3 py-1.5 border-b border-zinc-800 last:border-0"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-lg shrink-0" aria-hidden="true">
                    {platform?.icon ?? '🔗'}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{platform?.name ?? row.platform}</p>
                    <p className="text-xs text-zinc-500 truncate">{row.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-medium text-zinc-300">
                    {row.clicks > 0 ? row.clicks : '—'}
                  </span>
                  {/* Share icon (no functionality yet) */}
                  <button
                    type="button"
                    aria-label="Teilen"
                    className="p-1 text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
