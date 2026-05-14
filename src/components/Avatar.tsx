import React from 'react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'profile'
export type AvatarColor = 'gray' | 'violet' | 'blue' | 'green' | 'amber' | 'red' | 'teal' | 'pink' | 'sage' | 'dark'

export interface AvatarProps {
  name?: string
  src?: string
  size?: AvatarSize
  color?: AvatarColor
}

const sizeConfig: Record<AvatarSize, { dimension: number; borderRadius: number; fontSize: number }> = {
  xs:      { dimension: 20, borderRadius: 6,  fontSize: 8  },
  sm:      { dimension: 24, borderRadius: 7,  fontSize: 9  },
  md:      { dimension: 32, borderRadius: 8,  fontSize: 11 },
  lg:      { dimension: 40, borderRadius: 10, fontSize: 13 },
  xl:      { dimension: 48, borderRadius: 12, fontSize: 15 },
  '2xl':   { dimension: 64, borderRadius: 14, fontSize: 18 },
  profile: { dimension: 80, borderRadius: 18, fontSize: 22 },
}

const colorConfig: Record<AvatarColor, { background: string; color: string }> = {
  gray:   { background: 'var(--core-gray-75)',    color: 'var(--dec-color-text-body)' },
  violet: { background: 'var(--core-violet-75)',  color: 'var(--core-violet-675)'    },
  blue:   { background: 'var(--core-blue-100)',   color: 'var(--core-blue-700)'      },
  green:  { background: 'var(--core-green-75)',   color: 'var(--core-green-500)'     },
  amber:  { background: 'var(--core-amber-75)',   color: 'var(--dec-color-warning-foreground)' },
  red:    { background: 'var(--core-red-100)',    color: '#9A112C'                   },
  teal:   { background: 'var(--core-blue-75)',    color: 'var(--core-blue-700)'      },
  pink:   { background: 'var(--core-red-200)',    color: 'var(--core-red-800)'       },
  sage:   { background: 'var(--core-green-100)',  color: 'var(--core-green-500)'     },
  dark:   { background: 'var(--core-gray-875)',   color: '#fff'                      },
}

const AVATAR_COLORS: AvatarColor[] = ['violet', 'blue', 'green', 'amber', 'teal', 'sage', 'red', 'gray']

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function autoColor(name: string): AvatarColor {
  const idx = hashString(name) % AVATAR_COLORS.length
  return AVATAR_COLORS[idx]
}

export function Avatar({
  name,
  src,
  size = 'md',
  color,
}: AvatarProps) {
  const sz = sizeConfig[size]
  const resolvedColor = color ?? (name ? autoColor(name) : 'gray')
  const cc = colorConfig[resolvedColor]

  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sz.dimension,
    height: sz.dimension,
    borderRadius: sz.borderRadius,
    fontFamily: 'var(--font-ui)',
    fontWeight: 500,
    fontSize: sz.fontSize,
    overflow: 'hidden',
    flexShrink: 0,
    userSelect: 'none',
    background: cc.background,
    color: cc.color,
    lineHeight: 1,
  }

  if (src) {
    return (
      <div style={baseStyle}>
        <img
          src={src}
          alt={name ?? ''}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    )
  }

  const initials = name ? getInitials(name) : '?'

  return (
    <div style={baseStyle} title={name} aria-label={name}>
      {initials}
    </div>
  )
}
