import { createClient } from '@/lib/supabase/server'
import { BannerManager } from './banner-manager'

export default async function BannersPage() {
  const supabase = await createClient()

  const { data: banners } = await supabase
    .from('admin_banners')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      <h1 className="text-xl font-semibold">Banner verwalten</h1>
      <BannerManager initialBanners={banners ?? []} />
    </div>
  )
}
