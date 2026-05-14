import React, { useState } from 'react'

export type TagVariant = 'accent' | 'neutral' | 'success' | 'error' | 'warning' | 'info'

export interface TagProps {
  variant?: TagVariant
  removable?: boolean
  onRemove?: () => void
  children: React.ReactNode
}

interface TagVariantStyle {
  background: string
  color: string
  borderColor: string
}

const tagVariantStyles: Record<TagVariant, TagVariantStyle> = {
  accent: {
    background: 'rgba(131,66,187,0.08)',
    color: 'var(--core-violet-675)',
    borderColor: 'var(--core-cool-200)',
  },
  neutral: {
    background: 'var(--core-cool-50)',
    color: 'var(--dec-color-text-body)',
    borderColor: 'var(--core-cool-100)',
  },
  success: {
    background: 'var(--core-green-25)',
    color: 'var(--core-green-500)',
    borderColor: 'var(--core-green-100)',
  },
  error: {
    background: 'var(--core-red-25)',
    color: '#9A112C',
    borderColor: 'var(--core-red-200)',
  },
  warning: {
    background: 'var(--core-amber-25)',
    color: 'var(--dec-color-warning-foreground)',
    borderColor: 'var(--core-amber-75)',
  },
  info: {
    background: 'var(--core-blue-25)',
    color: 'var(--core-blue-700)',
    borderColor: 'var(--core-blue-100)',
  },
}

export function Tag({
  variant = 'neutral',
  removable = false,
  onRemove,
  children,
}: TagProps) {
  const [closeHovered, setCloseHovered] = useState(false)
  const vs = tagVariantStyles[variant]

  const tagStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: removable ? '2px 4px 2px 8px' : '2px 8px',
    borderRadius: 4,
    border: `1px solid ${vs.borderColor}`,
    background: vs.background,
    color: vs.color,
    fontSize: 12,
    fontWeight: 400,
    fontFamily: 'var(--font-ui)',
    cursor: 'default',
    userSelect: 'none',
    lineHeight: '16px',
  }

  const closeBtnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: 1,
    borderRadius: 3,
    background: closeHovered ? 'rgba(0,0,0,0.08)' : 'transparent',
    border: 'none',
    color: 'inherit',
    transition: 'background 0.1s',
    lineHeight: 1,
  }

  const iconStyle: React.CSSProperties = {
    fontFamily: 'Material Icons',
    fontSize: 13,
    lineHeight: 1,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    display: 'inline-block',
    userSelect: 'none',
  }

  return (
    <span style={tagStyle}>
      {children}
      {removable && (
        <button
          style={closeBtnStyle}
          onMouseEnter={() => setCloseHovered(true)}
          onMouseLeave={() => setCloseHovered(false)}
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
          aria-label="Remove"
        >
          <span style={iconStyle}>close</span>
        </button>
      )}
    </span>
  )
}
