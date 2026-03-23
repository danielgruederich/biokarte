// SVG social media icons — KOMI-style, monochrome, inherit currentColor

interface IconProps {
  size?: number
  className?: string
}

export function InstagramIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SoundCloudIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M1 18V12h1v6H1Zm2.5-2V10h1v6h-1Zm2.5 1V9h1v8H6Zm2.5-1V7h1v9h-1Zm2.5 1V5h1v12h-1Zm2.5 0V8h1v9h-1Zm2.37 0C15.31 17 15 16.51 15 15.87V9.87C15 8.32 16.79 7 19 7c1.1 0 2.09.37 2.81.97.26.22.19.53-.12.53h-5.82c-.38 0-.62.28-.62.63v7.74c0 .35.24.63.62.63H22c.41 0 .75-.34.75-.75v-3.5c0-1.24-.84-2.25-1.88-2.25s-1.87 1.01-1.87 2.25v3.5c0 .41-.34.75-.75.75h-1.88Z" />
    </svg>
  )
}

export function YouTubeIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
    </svg>
  )
}

export function TikTokIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.32 6.95A4.46 4.46 0 0 1 16.5 4h-3v11.5a2.5 2.5 0 1 1-2.5-2.5c.17 0 .34.02.5.05V9.87A5.5 5.5 0 1 0 16.5 15.5V9.77a7.45 7.45 0 0 0 4.5 1.48V7.76a4.46 4.46 0 0 1-1.68-.81Z" />
    </svg>
  )
}

export function SpotifyIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0Zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.24.54.66.3 1.02Zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-.96-.12-1.08-.6-.12-.48.12-.96.6-1.08 4.38-1.32 9.78-.66 13.5 1.62.36.24.48.78.18 1.14Zm.12-3.36C15.24 8.4 8.88 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-.96.6-1.44.3Z" />
    </svg>
  )
}

export function FacebookIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07Z" />
    </svg>
  )
}

export function XIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.24 2.25h3.51l-7.66 8.76 9.01 11.9h-7.06l-5.53-7.23-6.33 7.23H.67l8.2-9.37L0 2.25h7.24l5 6.6 5.78-6.6h.22Zm-1.23 18.56h1.95L6.98 4.25H4.9l12.11 16.56Z" />
    </svg>
  )
}

export function ThreadsIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.19 2C6.81 2 3.52 5.62 3.52 11.82s3.66 10.18 8.67 10.18c5.82 0 8.29-4.22 8.29-8.57 0-3.57-1.98-6.18-5.21-6.56-.2-.03-.4-.04-.58-.04-1.84 0-3.34.87-4.12 2.37l1.48.82c.52-.97 1.46-1.5 2.64-1.5.13 0 .27.01.41.03 1.78.22 2.88 1.5 2.88 3.6 0 2.2-1.15 4.32-2.44 5.3-.81.62-1.73.86-2.66.86-2.52 0-4.33-2.05-4.33-5.49 0-4.17 2-7.82 5.65-7.82.58 0 1.19.08 1.82.26l.5-1.72A8.87 8.87 0 0 0 12.19 2Z" />
    </svg>
  )
}

export function AppleMusicIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.99 6.55v10.2a5.3 5.3 0 0 1-.3 1.77 4.52 4.52 0 0 1-2.37 2.7c-.6.3-1.24.48-1.9.57-.53.07-1.06.1-1.6.06a3.61 3.61 0 0 1-2.44-1.17 3.02 3.02 0 0 1-.72-1.7 3.2 3.2 0 0 1 .67-2.36 3.42 3.42 0 0 1 1.82-1.19c.68-.2 1.38-.33 2.08-.44.59-.1 1.18-.19 1.73-.39.36-.13.55-.38.57-.76V8.19L9.85 10.1v9.38c0 .48-.02.96-.12 1.43a3.55 3.55 0 0 1-1.06 1.92 3.38 3.38 0 0 1-1.78.93c-.53.12-1.07.16-1.62.13a3.6 3.6 0 0 1-2.42-1.15 3.05 3.05 0 0 1-.75-1.75A3.2 3.2 0 0 1 2.76 18.6a3.43 3.43 0 0 1 1.83-1.18c.68-.21 1.38-.34 2.08-.45.59-.09 1.17-.18 1.72-.38.37-.14.56-.39.58-.78V4.1c0-.45.07-.88.3-1.28.27-.47.68-.76 1.18-.9.38-.1.77-.18 1.16-.26l5.41-1.1c.8-.16 1.6-.33 2.4-.48.3-.06.62-.04.92.04.55.14.87.57.93 1.14.02.17.02.34.02.5v4.79l-.5-.01Z" />
    </svg>
  )
}

export function WebsiteIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export function LinkedInIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export function TwitchIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.57 4.71h1.72v5.14h-1.72V4.71Zm4.71 0H18v5.14h-1.72V4.71ZM4.29 0 1.14 3.43v17.14h5.72V24l3.43-3.43h2.57L19.72 13.7V0H4.29Zm13.71 12.86-2.57 2.57h-2.57l-2.29 2.28v-2.28H7.71V1.72h10.29v11.14Z" />
    </svg>
  )
}

export function WhatsAppIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.76.97-.94 1.17-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.49 1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Zm-5.42 7.4A9.87 9.87 0 0 1 6.97 20l-.36-.21-3.73.98 1-3.64-.24-.37a9.87 9.87 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89a9.89 9.89 0 0 1 9.9 9.9c-.01 5.45-4.45 9.89-9.9 9.89l.02-.02ZM12.04 0C5.39 0 .01 5.38.01 12.02a12 12 0 0 0 1.6 6.01L0 24l6.15-1.61a12.02 12.02 0 0 0 5.89 1.54c6.65 0 12.04-5.38 12.04-12.02C24.07 5.27 18.69 0 12.04 0Z" />
    </svg>
  )
}

export function MixcloudIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M2.46 11.5c0-2.8 2.06-5.07 4.72-5.47a5.08 5.08 0 0 1 4.41 1.53 6.3 6.3 0 0 1 5.46-3.18c3.47 0 6.28 2.78 6.34 6.22A3.63 3.63 0 0 1 24 14.15a3.64 3.64 0 0 1-3.64 3.64H5.55A3.1 3.1 0 0 1 2.46 14.7v-3.2Z" />
    </svg>
  )
}

export function PatreonIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21ZM2 21.6h3.5V2.41H2V21.6Z" />
    </svg>
  )
}

// Map platform IDs to icon components
export const socialIconMap: Record<string, (props: IconProps) => React.ReactElement> = {
  instagram: InstagramIcon,
  soundcloud: SoundCloudIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
  spotify: SpotifyIcon,
  facebook: FacebookIcon,
  x: XIcon,
  threads: ThreadsIcon,
  apple_music: AppleMusicIcon,
  website: WebsiteIcon,
  linkedin: LinkedInIcon,
  twitch: TwitchIcon,
  whatsapp: WhatsAppIcon,
  mixcloud: MixcloudIcon,
  patreon: PatreonIcon,
}
