'use client'

import { useRef } from 'react'
import Image from 'next/image'
import type { CarouselBlockData } from '@/lib/types'
import { trackEvent } from '@/lib/analytics'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons/social-icons'
import styles from '@/layouts/komi/komi.module.css'

interface Props {
  data: CarouselBlockData
  blockId: string
  profileId: string
}

export function CarouselBlock({ data, blockId, profileId }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.7
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  const handleClick = (url: string) => {
    trackEvent(profileId, 'click', blockId, 'carousel')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (!data.items || data.items.length === 0) return null

  return (
    <div style={{ marginBottom: '0.625rem' }}>
      {/* Header: title + arrows */}
      <div className={styles.carouselHeader}>
        <h3 className={styles.carouselTitle}>{data.title}</h3>
        <div className={styles.carouselArrows}>
          <button onClick={() => scroll('left')} className={styles.carouselArrow}>
            <ChevronLeftIcon size={28} />
          </button>
          <button onClick={() => scroll('right')} className={styles.carouselArrow}>
            <ChevronRightIcon size={28} />
          </button>
        </div>
      </div>

      {/* Scrollable items */}
      <div ref={scrollRef} className={styles.carouselScroll}>
        {data.variant === 'music' ? (
          // Music variant: cover + title + artist
          data.items.map((item, i) => (
            <button
              key={i}
              onClick={() => handleClick(item.url)}
              className={styles.carouselMusicItem}
            >
              <div className={styles.carouselMusicCover}>
                <Image
                  src={item.thumbnail_url}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="80px"
                />
              </div>
              <div className={styles.carouselMusicInfo}>
                <p className={styles.carouselMusicTitle}>{item.title}</p>
                {item.subtitle && (
                  <p className={styles.carouselMusicSubtitle}>{item.subtitle}</p>
                )}
              </div>
            </button>
          ))
        ) : (
          // Video variant: thumbnail with overlay
          data.items.map((item, i) => (
            <button
              key={i}
              onClick={() => handleClick(item.url)}
              className={styles.carouselVideoItem}
            >
              <div className={styles.carouselVideoThumb}>
                <Image
                  src={item.thumbnail_url}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="240px"
                />
                <div className={styles.carouselVideoGradient} />
                <p className={styles.carouselVideoTitle}>{item.title}</p>
                <div className={styles.playButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <polygon points="8,4 20,12 8,20" />
                  </svg>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
