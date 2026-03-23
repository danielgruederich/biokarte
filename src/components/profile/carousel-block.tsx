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
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 600,
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
              width: '24px',
              height: '24px',
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
            <ChevronLeftIcon size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            style={{
              width: '24px',
              height: '24px',
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
            <ChevronRightIcon size={16} />
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
              width: 'calc(50% - 0.25rem)',
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
            {/* Thumbnail with play button overlay */}
            <div style={{ position: 'relative', aspectRatio: '16 / 9', width: '100%' }}>
              <Image
                src={item.thumbnail_url}
                alt={item.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="240px"
              />
              {/* Play button circle */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </div>
            </div>
            {/* Title */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text)',
                padding: '0.375rem 0.5rem',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {item.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
