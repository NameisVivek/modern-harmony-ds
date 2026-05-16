import React from 'react'

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'high-risk'
  | 'outline'
  | 'dark'

export type BadgeSize = 'sm' | 'md'

export interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: string
  dot?: boolean
  children: React.ReactNode
}

interface VariantStyle {
  background: string
  color: string
  border?: string
  dotColor?: string
}

const variantStyles: Record<BadgeVariant, VariantStyle> = {
  default: {
    background: 'var(--core-cool-100)',
    color: 'var(--core-cool-600)',
  },
  secondary: {
    background: 'rgba(131,66,187,0.10)',
    color: 'var(--core-violet-675)',
    dotColor: 'var(--core-violet-600)',
  },
  success: {
    background: 'var(--core-green-75)',
    color: 'var(--core-green-500)',
    dotColor: 'var(--core-green-500)',
  },
  error: {
    background: 'var(--badge-error-bg)',
    color: 'var(--badge-error-text)',
    dotColor: 'var(--badge-error-text)',
  },
  warning: {
    background: 'var(--badge-warning-bg)',
    color: 'var(--badge-warning-text)',
    dotColor: 'var(--badge-warning-text)',
  },
  'high-risk': {
    background: 'var(--badge-high-risk-bg)',
    color: 'var(--badge-high-risk-text)',
    dotColor: 'var(--badge-high-risk-text)',
  },
  info: {
    background: 'var(--badge-info-bg)',
    color: 'var(--badge-info-text)',
    dotColor: 'var(--badge-info-text)',
  },
  outline: {
    background: 'var(--th-bg-surface)',
    color: 'var(--dec-color-text-body)',
    border: '1px solid var(--core-cool-200)',
  },
  dark: {
    background: 'var(--core-gray-875)',
    color: '#fff',
  },
}

const sizeStyles = {
  sm: {
    padding: '1px 6px',
    fontSize: 10,
    lineHeight: '14px',
    iconSize: 12,
    dotSize: 5,
  },
  md: {
    padding: '2px 8px',
    fontSize: 11,
    lineHeight: '16px',
    iconSize: 14,
    dotSize: 6,
  },
}

export function Badge({
  variant = 'default',
  size = 'md',
  icon,
  dot = false,
  children,
}: BadgeProps) {
  const vs = variantStyles[variant]
  const sz = sizeStyles[size]

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: sz.padding,
    borderRadius: 9999,
    fontSize: sz.fontSize,
    fontWeight: 500,
    lineHeight: sz.lineHeight,
    fontFamily: 'var(--font-ui)',
    background: vs.background,
    color: vs.color,
    border: vs.border ?? 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  }

  const iconStyle: React.CSSProperties = {
    fontFamily: 'Material Icons',
    fontSize: sz.iconSize,
    lineHeight: 1,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    display: 'inline-block',
    userSelect: 'none',
  }

  const dotStyle: React.CSSProperties = {
    width: sz.dotSize,
    height: sz.dotSize,
    borderRadius: '50%',
    background: vs.dotColor ?? vs.color,
    flexShrink: 0,
  }

  return (
    <span style={style}>
      {dot && !icon && <span style={dotStyle} />}
      {icon && <span style={iconStyle}>{icon}</span>}
      {children}
    </span>
  )
}
