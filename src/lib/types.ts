// === Block Types ===

export type ContentBlockType =
  | 'link'
  | 'social_link'
  | 'text'
  | 'section_title'
  | 'embed'
  | 'carousel'
  | 'music_card'
  | 'banner_link'

// === Layout Categories ===

export type LayoutCategory = 'komi' | 'hoobe' | 'linktree'

// === Profile ===

export interface Profile {
  id: string
  username: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  logo_url: string | null
  template_id: string
  status: 'online' | 'offline'
  role: 'user' | 'admin'
  onboarding_complete: boolean
  created_at: string
  // v2 fields
  genres: string[]
  locations: string[]
  booking_email: string | null
  booking_text: string | null
}

// === Social Links ===

export interface SocialLink {
  id: string
  user_id: string
  platform: string
  username: string
  url: string
  position: number
  is_visible: boolean
}

// === Content Blocks ===

export interface ContentBlock {
  id: string
  user_id: string
  type: ContentBlockType
  position: number
  is_visible: boolean
  data: ContentBlockData
  created_at: string
}

export type ContentBlockData =
  | LinkBlockData
  | TextBlockData
  | SectionTitleData
  | EmbedBlockData
  | SocialLinkBlockData
  | CarouselBlockData
  | MusicCardBlockData
  | BannerLinkBlockData

// === Block Data Types ===

export interface LinkBlockData {
  title: string
  url: string
  thumbnail_url?: string
  layout: 'text' | 'thumbnail_left' | 'thumbnail_large' | 'full_width'
}

export interface SocialLinkBlockData {
  platform: string
  username: string
  url: string
}

export interface TextBlockData {
  text: string
}

export interface SectionTitleData {
  title: string
}

export interface EmbedBlockData {
  platform: string
  url: string
  urls?: string[]  // Multiple URLs for rotation (random on each load)
  title?: string
}

export interface CarouselItem {
  title: string
  subtitle?: string
  url: string
  thumbnail_url: string
  action?: 'play' | 'link'
}

export interface CarouselBlockData {
  title: string
  variant: 'video' | 'music' | 'soundcloud'
  items: CarouselItem[]
}

export interface MusicCardBlockData {
  title: string
  artist: string
  url: string
  cover_url: string
  platform: 'spotify' | 'soundcloud'
}

export interface BannerLinkBlockData {
  title: string
  url: string
  image_url: string
  subtitle?: string
}

// === Template ===

export interface Template {
  id: string
  name: string
  description: string
  layoutCategory: LayoutCategory
  colors: {
    background: string
    surface: string
    text: string
    muted: string
    accent: string
    border: string
  }
  backgroundCSS: string
  backgroundOverlay?: string
  fonts: {
    display: string
    body: string
  }
  grain: boolean
  category: 'dark' | 'light' | 'colorful'
  layout: {
    heroStyle: 'circle-avatar' | 'cover-photo'
    cardRadius: string
    socialStyle: 'pills' | 'icons-only'
    nameSize: 'md' | 'lg' | 'xl'
  }
}

// === Tenants (Multi-Tenant, Phase 2) ===

export interface Tenant {
  id: string
  slug: string
  name: string
  domain: string | null
  logo_url: string | null
  accent_color: string | null
  created_at: string
}

// === Analytics ===

export interface AnalyticsEvent {
  user_id: string
  event_type: 'view' | 'click'
  target_id?: string
  target_type?: string
}

export interface DashboardStats {
  total_views: number
  total_clicks: number
  ctr: number
  top_links: { platform: string; username: string; clicks: number }[]
}
