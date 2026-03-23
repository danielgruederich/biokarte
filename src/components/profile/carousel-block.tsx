'use client'

import { useRef } from 'react'
import Image from 'next/image'
import type { CarouselBlockData } from '@/lib/types'
import { trackEvent } from '@/lib/analytics'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons/social-icons'

interface CarouselBlockProps {
  data: CarouselBlockData
  blockId: string
  profileId: string
}

export function CarouselBlock({ data, blockId, profileId }: CarouselBlockProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.7
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  const handleClick = async (url: string) => {
    await trackEvent(profileId, 'click', blockId, 'carousel')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (!data.items || data.items.length === 0) return null

  return (
    <div style={{ marginBottom: '0.625rem' }}>
      {/* Header with title and arrows */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--text)',
            margin: 0,
          }}
        >
          {data.title}
        </h3>

        {/* < > Arrow buttons */}
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            onClick={() => scroll('left')}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              background: 'transparent',
              color: 'var(--text)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <ChevronLeftIcon size={28} />
          </button>
          <button
            onClick={() => scroll('right')}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              background: 'transparent',
              color: 'var(--text)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <ChevronRightIcon size={28} />
          </button>
        </div>
      </div>

      {/* Scrollable items */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <style>{`.carousel-scroll::-webkit-scrollbar { display: none; }`}</style>
        {data.items.map((item, i) => (
          <button
            key={i}
            onClick={() => handleClick(item.url)}
            className="carousel-scroll"
            style={{
              flexShrink: 0,
              width: 'calc(65% - 0.25rem)',
              borderRadius: 'var(--card-radius, 0.875rem)',
              overflow: 'hidden',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: 'var(--surface)',
              scrollSnapAlign: 'start',
              textAlign: 'left',
            }}
          >
            {/* Thumbnail with overlaid title and play button */}
            <div style={{ position: 'relative', aspectRatio: '4 / 3', width: '100%' }}>
              <Image
                src={item.thumbnail_url}
                alt={item.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="240px"
              />
              {/* Dark gradient overlay for title readability */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
              {/* Title overlaid on thumbnail */}
              <p
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  padding: '0.5rem 0.625rem',
                  margin: 0,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'white',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  zIndex: 2,
                }}
              >
                {item.title}
              </p>
              {/* Play button circle */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.3)',
                  border: '2px solid rgba(255,255,255,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <polygon points="8,4 20,12 8,20" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
