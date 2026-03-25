import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getTemplate } from '@/lib/templates'
import { KomiProfile } from '@/layouts/komi/KomiProfile'
import { AdminBanner } from '@/components/banner/admin-banner'
import type { Profile, SocialLink, ContentBlock } from '@/lib/types'

interface PageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (!profile) return { title: 'Not Found' }

  const displayName = profile.display_name as string
  const bio = (profile.bio as string | null) ?? null

  return {
    title: `${displayName} | BioKarte`,
    description: bio ?? `${displayName} auf BioKarte`,
    openGraph: {
      title: `${displayName} | BioKarte`,
      description: bio ?? `${displayName} auf BioKarte`,
      images: profile.avatar_url ? [{ url: profile.avatar_url as string }] : [],
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title: `${displayName} | BioKarte`,
      description: bio ?? `${displayName} auf BioKarte`,
      images: profile.avatar_url ? [profile.avatar_url as string] : [],
    },
  }
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params
  const supabase = await createClient()

  // Fetch profile (must be online)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .eq('status', 'online')
    .single()

  if (!profile) notFound()

  const typedProfile = profile as unknown as Profile

  // Fetch social links, content blocks, and active banner in parallel
  const [{ data: socialLinksRaw }, { data: contentBlocksRaw }, { data: bannerRaw }] = await Promise.all([
    supabase
      .from('social_links')
      .select('*')
      .eq('user_id', typedProfile.id)
      .eq('is_visible', true)
      .order('position', { ascending: true }),
    supabase
      .from('content_blocks')
      .select('*')
      .eq('user_id', typedProfile.id)
      .eq('is_visible', true)
      .order('position', { ascending: true }),
    supabase
      .from('admin_banners')
      .select('*')
      .eq('is_active', true)
      .limit(1)
      .single(),
  ])

  const socialLinks = (socialLinksRaw ?? []) as unknown as SocialLink[]
  const contentBlocks = (contentBlocksRaw ?? []) as unknown as ContentBlock[]
  const activeBanner = bannerRaw as { id: string; title: string; description: string | null; image_url: string | null; link_url: string | null; position: 'top' | 'bottom' } | null

  const template = getTemplate(typedProfile.template_id)

  // Layout router — render based on template's layoutCategory
  switch (template.layoutCategory) {
    case 'komi':
      return (
        <>
          <style>{`
            html, body {
              background-color: ${template.colors.background} !important;
              margin: 0;
              padding: 0;
            }
          `}</style>
          {activeBanner && activeBanner.position === 'top' && (
            <div className="mx-auto max-w-[430px] px-4 pt-3">
              <AdminBanner banner={activeBanner} profileId={typedProfile.id} />
            </div>
          )}
          <KomiProfile
            profile={typedProfile}
            socialLinks={socialLinks}
            contentBlocks={contentBlocks}
            template={template}
          />
          {activeBanner && activeBanner.position === 'bottom' && (
            <div className="mx-auto max-w-[430px] px-4 pb-6">
              <AdminBanner banner={activeBanner} profileId={typedProfile.id} />
            </div>
          )}
        </>
      )

    case 'hoobe':
      // Phase 2: HoobeProfile
      return <div>hoo.be Layout — coming soon</div>

    case 'linktree':
      // Phase 3: LinktreeProfile — for now fallback to KOMI
      return (
        <>
          <style>{`
            html, body {
              background-color: ${template.colors.background} !important;
              margin: 0;
              padding: 0;
            }
          `}</style>
          {activeBanner && activeBanner.position === 'top' && (
            <div className="mx-auto max-w-[430px] px-4 pt-3">
              <AdminBanner banner={activeBanner} profileId={typedProfile.id} />
            </div>
          )}
          <KomiProfile
            profile={typedProfile}
            socialLinks={socialLinks}
            contentBlocks={contentBlocks}
            template={template}
          />
          {activeBanner && activeBanner.position === 'bottom' && (
            <div className="mx-auto max-w-[430px] px-4 pb-6">
              <AdminBanner banner={activeBanner} profileId={typedProfile.id} />
            </div>
          )}
        </>
      )

    default:
      return notFound()
  }
}
