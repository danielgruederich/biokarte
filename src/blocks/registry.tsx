import type { ContentBlockType } from '@/lib/types'
import { LinkBlock } from './LinkBlock'
import { TextBlock } from './TextBlock'
import { SectionTitleBlock } from './SectionTitleBlock'
import { EmbedBlock } from './EmbedBlock'
import { CarouselBlock } from './CarouselBlock'
import { SocialLinkBlock } from './SocialLinkBlock'
import { MusicCardBlock } from './MusicCardBlock'
import { BannerLinkBlock } from './BannerLinkBlock'

// Block registry — add new block = 1 file + 1 line here
export const blockRegistry: Record<ContentBlockType, React.ComponentType<{ data: unknown; blockId: string; profileId: string }>> = {
  link: LinkBlock as React.ComponentType<{ data: unknown; blockId: string; profileId: string }>,
  text: TextBlock as React.ComponentType<{ data: unknown; blockId: string; profileId: string }>,
  section_title: SectionTitleBlock as React.ComponentType<{ data: unknown; blockId: string; profileId: string }>,
  embed: EmbedBlock as React.ComponentType<{ data: unknown; blockId: string; profileId: string }>,
  carousel: CarouselBlock as React.ComponentType<{ data: unknown; blockId: string; profileId: string }>,
  social_link: SocialLinkBlock as React.ComponentType<{ data: unknown; blockId: string; profileId: string }>,
  music_card: MusicCardBlock as React.ComponentType<{ data: unknown; blockId: string; profileId: string }>,
  banner_link: BannerLinkBlock as React.ComponentType<{ data: unknown; blockId: string; profileId: string }>,
}

export function renderBlock(type: ContentBlockType, data: unknown, blockId: string, profileId: string) {
  const Component = blockRegistry[type]
  if (!Component) return null
  return <Component data={data} blockId={blockId} profileId={profileId} />
}
