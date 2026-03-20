export interface Platform {
  id: string
  name: string
  icon: string
  baseUrl: string
  placeholder: string
}

export const platforms: Platform[] = [
  { id: 'instagram', name: 'Instagram', icon: '📷', baseUrl: 'https://instagram.com/', placeholder: '@username' },
  { id: 'soundcloud', name: 'SoundCloud', icon: '🎵', baseUrl: 'https://soundcloud.com/', placeholder: 'username' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', baseUrl: 'https://youtube.com/@', placeholder: '@channel' },
  { id: 'tiktok', name: 'TikTok', icon: '🎬', baseUrl: 'https://tiktok.com/@', placeholder: '@username' },
  { id: 'spotify', name: 'Spotify', icon: '🎧', baseUrl: 'https://open.spotify.com/artist/', placeholder: 'artist URL' },
  { id: 'facebook', name: 'Facebook', icon: '👤', baseUrl: 'https://facebook.com/', placeholder: 'page name' },
  { id: 'x', name: 'X (Twitter)', icon: '𝕏', baseUrl: 'https://x.com/', placeholder: '@handle' },
  { id: 'threads', name: 'Threads', icon: '🧵', baseUrl: 'https://threads.net/@', placeholder: '@username' },
  { id: 'mixcloud', name: 'Mixcloud', icon: '🎛️', baseUrl: 'https://mixcloud.com/', placeholder: 'username' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', baseUrl: 'https://wa.me/', placeholder: 'phone number' },
  { id: 'website', name: 'Website', icon: '🌐', baseUrl: '', placeholder: 'https://...' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', baseUrl: 'https://linkedin.com/in/', placeholder: 'profile slug' },
  { id: 'twitch', name: 'Twitch', icon: '🟣', baseUrl: 'https://twitch.tv/', placeholder: 'username' },
  { id: 'apple_music', name: 'Apple Music', icon: '🎵', baseUrl: 'https://music.apple.com/artist/', placeholder: 'artist URL' },
  { id: 'patreon', name: 'Patreon', icon: '❤️', baseUrl: 'https://patreon.com/', placeholder: 'creator name' },
]

export function getPlatform(id: string): Platform | undefined {
  return platforms.find(p => p.id === id)
}

export function buildPlatformUrl(platform: Platform, username: string): string {
  if (platform.id === 'website') return username
  if (username.startsWith('http')) return username
  const clean = username.replace(/^@/, '')
  return `${platform.baseUrl}${clean}`
}
