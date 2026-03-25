import type { ProfileType } from './profile-labels'

export interface Platform {
  id: string
  name: string
  icon: string
  baseUrl: string
  placeholder: string
  category: 'music' | 'business' | 'general'
}

export const platforms: Platform[] = [
  // General
  { id: 'instagram', name: 'Instagram', icon: '📷', baseUrl: 'https://instagram.com/', placeholder: '@username', category: 'general' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', baseUrl: 'https://youtube.com/@', placeholder: '@channel', category: 'general' },
  { id: 'tiktok', name: 'TikTok', icon: '🎬', baseUrl: 'https://tiktok.com/@', placeholder: '@username', category: 'general' },
  { id: 'facebook', name: 'Facebook', icon: '👤', baseUrl: 'https://facebook.com/', placeholder: 'page name', category: 'general' },
  { id: 'x', name: 'X (Twitter)', icon: '𝕏', baseUrl: 'https://x.com/', placeholder: '@handle', category: 'general' },
  { id: 'threads', name: 'Threads', icon: '🧵', baseUrl: 'https://threads.net/@', placeholder: '@username', category: 'general' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', baseUrl: 'https://wa.me/', placeholder: 'phone number', category: 'general' },
  { id: 'website', name: 'Website', icon: '🌐', baseUrl: '', placeholder: 'https://...', category: 'general' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', baseUrl: 'https://linkedin.com/in/', placeholder: 'profile slug', category: 'general' },
  { id: 'twitch', name: 'Twitch', icon: '🟣', baseUrl: 'https://twitch.tv/', placeholder: 'username', category: 'general' },
  { id: 'patreon', name: 'Patreon', icon: '❤️', baseUrl: 'https://patreon.com/', placeholder: 'creator name', category: 'general' },

  // Music
  { id: 'soundcloud', name: 'SoundCloud', icon: '🎵', baseUrl: 'https://soundcloud.com/', placeholder: 'username', category: 'music' },
  { id: 'spotify', name: 'Spotify', icon: '🎧', baseUrl: 'https://open.spotify.com/artist/', placeholder: 'artist URL', category: 'music' },
  { id: 'mixcloud', name: 'Mixcloud', icon: '🎛️', baseUrl: 'https://mixcloud.com/', placeholder: 'username', category: 'music' },
  { id: 'apple_music', name: 'Apple Music', icon: '🎵', baseUrl: 'https://music.apple.com/artist/', placeholder: 'artist URL', category: 'music' },
  { id: 'beatport', name: 'Beatport', icon: '🎹', baseUrl: 'https://www.beatport.com/artist/', placeholder: 'artist URL', category: 'music' },
  { id: 'bandcamp', name: 'Bandcamp', icon: '📀', baseUrl: 'https://bandcamp.com/', placeholder: 'username.bandcamp.com', category: 'music' },

  // Business
  { id: 'google_business', name: 'Google Business', icon: '📍', baseUrl: '', placeholder: 'https://g.page/...', category: 'business' },
  { id: 'lieferando', name: 'Lieferando', icon: '🛵', baseUrl: 'https://www.lieferando.de/menu/', placeholder: 'restaurant-slug', category: 'business' },
  { id: 'tripadvisor', name: 'TripAdvisor', icon: '🦉', baseUrl: '', placeholder: 'https://tripadvisor.com/...', category: 'business' },
  { id: 'yelp', name: 'Yelp', icon: '⭐', baseUrl: 'https://www.yelp.com/biz/', placeholder: 'business-slug', category: 'business' },
]

export function getPlatform(id: string): Platform | undefined {
  return platforms.find(p => p.id === id)
}

// Filter platforms by profile type
export function getPlatformsForProfile(profileType: ProfileType): Platform[] {
  return platforms.filter(p => {
    if (p.category === 'general') return true
    if (p.category === 'music' && (profileType === 'musician' || profileType === 'collective')) return true
    if (p.category === 'business' && profileType === 'business') return true
    return false
  })
}

export function buildPlatformUrl(platform: Platform, username: string): string {
  if (platform.id === 'website' || platform.id === 'google_business' || platform.id === 'tripadvisor') return username
  if (username.startsWith('http')) return username
  const clean = username.replace(/^@/, '')
  return `${platform.baseUrl}${clean}`
}
