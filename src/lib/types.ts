export type ContentBlockType = 'link' | 'social_link' | 'text' | 'section_title' | 'embed'

export interface Profile {
  id: string
  username: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  template_id: string
  status: 'online' | 'offline'
  onboarding_complete: boolean
  created_at: string
}

export interface SocialLink {
  id: string
  user_id: string
  platform: string
  username: string
  url: string
  position: number
  is_visible: boolean
}

export interface ContentBlock {
  id: string
  user_id: string
  type: ContentBlockType
  position: number
  is_visible: boolean
  data: LinkBlockData | TextBlockData | SectionTitleData | EmbedBlockData | SocialLinkBlockData
  created_at: string
}

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
  title?: string
}

export interface Template {
  id: string
  name: string
  description: string
  colors: {
    background: string
    surface: string
    text: string
    muted: string
    accent: string
    border: string
  }
  fonts: {
    display: string
    body: string
  }
  grain: boolean
  category: 'dark' | 'light' | 'colorful'
}

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
