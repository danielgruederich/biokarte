import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getTemplate, getTemplateCSSVars } from '@/lib/templates'
import { ProfileRenderer } from '@/components/profile/profile-renderer'
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

  // Fetch social links and content blocks in parallel
  const [{ data: socialLinksRaw }, { data: contentBlocksRaw }] = await Promise.all([
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
  ])

  const socialLinks = (socialLinksRaw ?? []) as unknown as SocialLink[]
  const contentBlocks = (contentBlocksRaw ?? []) as unknown as ContentBlock[]

  const template = getTemplate(typedProfile.template_id)
  const cssVars = getTemplateCSSVars(template)

  return (
    <>
      {/* Apply template background color to the html/body via a global style tag */}
      <style>{`
        html, body {
          background-color: ${template.colors.background} !important;
          margin: 0;
          padding: 0;
        }
      `}</style>

      <ProfileRenderer
        profile={typedProfile}
        socialLinks={socialLinks}
        contentBlocks={contentBlocks}
        template={template}
      />
    </>
  )
}
