import { useState } from 'react'

export interface ButtonGroupOption {
  value: string
  label: string
  icon?: string
  disabled?: boolean
}

export interface ButtonGroupProps {
  options: ButtonGroupOption[]
  value?: string
  onChange?: (value: string) => void
  variant?: 'default' | 'primary'
  size?: 'sm' | 'md'
  iconOnly?: boolean
}

export function ButtonGroup({
  options,
  value,
  onChange,
  variant = 'default',
  size = 'md',
  iconOnly = false,
}: ButtonGroupProps) {
  const [hoveredValue, setHoveredValue] = useState<string | null>(null)

  const height = size === 'sm' ? 28 : 32
  const fontSize = size === 'sm' ? 12 : 13
  const padding = iconOnly ? 0 : size === 'sm' ? '0 10px' : '0 14px'
  const width = iconOnly ? height : undefined
  const borderRadius = size === 'sm' ? 7 : 8

  function getStyle(opt: ButtonGroupOption, i: number): React.CSSProperties {
    const isActive = opt.value === value
    const isHovered = hoveredValue === opt.value
    const isFirst = i === 0
    const isLast = i === options.length - 1

    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      height,
      padding,
      width,
      fontFamily: 'var(--font-ui)',
      fontSize,
      fontWeight: 500,
      cursor: opt.disabled ? 'not-allowed' : 'pointer',
      whiteSpace: 'nowrap',
      position: 'relative',
      borderRadius: 0,
      marginRight: -1,
      zIndex: isActive ? 2 : isHovered ? 2 : 1,
      transition: 'background 0.1s',
      outline: 'none',
    }

    if (isFirst) base.borderRadius = `${borderRadius}px 0 0 ${borderRadius}px`
    if (isLast) { base.borderRadius = `0 ${borderRadius}px ${borderRadius}px 0`; base.marginRight = 0 }
    if (isFirst && isLast) base.borderRadius = `${borderRadius}px`

    if (opt.disabled) {
      return {
        ...base,
        background: 'var(--th-bg-muted)',
        color: 'var(--th-text-hint)',
        border: '1px solid var(--th-border-strong)',
        boxShadow: 'none',
        zIndex: 0,
      }
    }

    if (variant === 'primary') {
      if (isActive) {
        return { ...base, background: '#4D3075', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 1px 2px rgba(55,23,78,0.2)' }
      }
      if (isHovered) {
        return { ...base, background: '#7239A4', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 1px 2px rgba(55,23,78,0.2)' }
      }
      return { ...base, background: 'var(--th-brand)', backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 1px 2px rgba(55,23,78,0.2)' }
    }

    // default variant
    if (isActive) {
      return { ...base, background: 'rgba(131,66,187,0.08)', color: 'var(--th-brand-medium)', border: '1px solid #8342BB' }
    }
    if (isHovered) {
      return { ...base, background: 'var(--th-bg-muted)', color: 'var(--th-text-primary)', border: '1px solid var(--th-border-strong)', boxShadow: '0 1px 2px rgba(55,23,78,0.06)' }
    }
    return { ...base, background: 'var(--th-bg-surface)', color: 'var(--th-text-primary)', border: '1px solid var(--th-border-strong)', boxShadow: '0 1px 2px rgba(55,23,78,0.06)' }
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'stretch' }}>
      {options.map((opt, i) => (
        <button
          key={opt.value}
          style={getStyle(opt, i)}
          disabled={opt.disabled}
          onMouseEnter={() => !opt.disabled && setHoveredValue(opt.value)}
          onMouseLeave={() => setHoveredValue(null)}
          onClick={() => !opt.disabled && onChange?.(opt.value)}
        >
          {opt.icon && (
            <span className="material-icons" style={{ fontSize: size === 'sm' ? 14 : 16 }}>{opt.icon}</span>
          )}
          {!iconOnly && opt.label}
        </button>
      ))}
    </div>
  )
}
