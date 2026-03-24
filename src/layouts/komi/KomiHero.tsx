'use client'

import Image from 'next/image'
import type { Profile, SocialLink } from '@/lib/types'
import { getPlatform } from '@/lib/platforms'
import { socialIconMap } from '@/components/icons/social-icons'
import styles from './komi.module.css'

interface KomiHeroProps {
  profile: Profile
  socialLinks: SocialLink[]
}

export function KomiHero({ profile, socialLinks }: KomiHeroProps) {
  const visibleLinks = socialLinks.filter(l => l.is_visible).slice(0, 7)

  return (
    <div className={styles.hero}>
      {/* Cover photo */}
      <div className={styles.heroPhotoWrap}>
        <div className={styles.heroPhotoInner}>
          {profile.avatar_url ? (
            <>
              <Image
                src={profile.avatar_url}
                alt={profile.display_name}
                fill
                className={styles.heroImage}
                priority
              />
              <div className={styles.heroFade} aria-hidden="true" />
            </>
          ) : (
            <div className={styles.heroPlaceholder}>
              {profile.display_name.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Name or logo — left-aligned! */}
          {profile.logo_url ? (
            <div className={styles.heroLogo}>
              <Image
                src={profile.logo_url}
                alt={profile.display_name}
                width={400}
                height={120}
                className={styles.heroLogoImg}
              />
            </div>
          ) : (
            <h1 className={styles.heroName}>
              {profile.display_name}
            </h1>
          )}
        </div>
      </div>

      {/* Bio text + social icons */}
      <div className={styles.heroBio}>
        {profile.bio && (
          <p className={styles.bioText}>{profile.bio}</p>
        )}

        {visibleLinks.length > 0 && (
          <div className={styles.socialIcons}>
            {visibleLinks.map(link => {
              const platform = getPlatform(link.platform)
              const IconComponent = socialIconMap[link.platform]
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={platform?.name ?? link.platform}
                  className={styles.socialIcon}
                >
                  {IconComponent ? <IconComponent size={32} /> : (platform?.icon ?? '🔗')}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
