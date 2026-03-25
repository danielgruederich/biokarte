import type { ContentBlockType, Profile } from '@/lib/types'
import { LinkBlock } from './LinkBlock'
import { TextBlock } from './TextBlock'
import { SectionTitleBlock } from './SectionTitleBlock'
import { EmbedBlock } from './EmbedBlock'
import { CarouselBlock } from './CarouselBlock'
import { SocialLinkBlock } from './SocialLinkBlock'
import { MusicCardBlock } from './MusicCardBlock'
import { BannerLinkBlock } from './BannerLinkBlock'
import { ProfileTagsBlock } from './ProfileTagsBlock'
import { BookingCtaBlock } from './BookingCtaBlock'
import { DocumentLinksBlock } from './DocumentLinksBlock'

// Block registry — add new block = 1 file + 1 line here
type BlockProps = { data: unknown; blockId: string; profileId: string; profile?: Profile }

export const blockRegistry: Record<ContentBlockType, React.ComponentType<BlockProps>> = {
  link: LinkBlock as React.ComponentType<BlockProps>,
  text: TextBlock as React.ComponentType<BlockProps>,
  section_title: SectionTitleBlock as React.ComponentType<BlockProps>,
  embed: EmbedBlock as React.ComponentType<BlockProps>,
  carousel: CarouselBlock as React.ComponentType<BlockProps>,
  social_link: SocialLinkBlock as React.ComponentType<BlockProps>,
  music_card: MusicCardBlock as React.ComponentType<BlockProps>,
  banner_link: BannerLinkBlock as React.ComponentType<BlockProps>,
  profile_tags: ProfileTagsBlock as React.ComponentType<BlockProps>,
  booking_cta: BookingCtaBlock as React.ComponentType<BlockProps>,
  document_links: DocumentLinksBlock as React.ComponentType<BlockProps>,
}

export function renderBlock(type: ContentBlockType, data: unknown, blockId: string, profileId: string, profile?: Profile) {
  const Component = blockRegistry[type]
  if (!Component) return null
  return <Component data={data} blockId={blockId} profileId={profileId} profile={profile} />
}
