import React, { useState, useRef, useEffect } from 'react'

export interface SplitItem {
  label: string
  icon?: string
  onClick: () => void
}

export interface ButtonProps {
  variant?: 'primary' | 'default' | 'borderless' | 'inline' | 'selected' | 'destructive' | 'on-dark'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  done?: boolean
  iconLeft?: string
  iconRight?: string
  iconOnly?: string
  onDark?: boolean
  onClick?: () => void
  children?: React.ReactNode
  split?: boolean
  splitItems?: SplitItem[]
}

const sizeConfig = {
  sm: { height: 28, padding: '0 12px', fontSize: 12, borderRadius: 7, iconSize: 15 },
  md: { height: 32, padding: '0 16px', fontSize: 14, borderRadius: 8, iconSize: 18 },
  lg: { height: 40, padding: '0 20px', fontSize: 15, borderRadius: 9, iconSize: 20 },
  xl: { height: 48, padding: '0 24px', fontSize: 16, borderRadius: 10, iconSize: 22 },
}

const variantBase: Record<string, React.CSSProperties> = {
  primary: {
    background: 'var(--core-violet-600)',
    backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 1px 2px rgba(55,23,78,0.2), inset 0 1px 0 rgba(255,255,255,0.12)',
  },
  default: {
    background: 'var(--th-bg-surface)',
    color: 'var(--dec-color-text-body)',
    border: '1px solid var(--core-cool-100)',
    boxShadow: '0 1px 2px rgba(55,23,78,0.08)',
  },
  borderless: {
    background: 'transparent',
    color: 'var(--dec-color-text-body)',
    border: '1px solid transparent',
    boxShadow: 'none',
  },
  inline: {
    background: 'transparent',
    color: 'var(--core-violet-675)',
    border: 'none',
    boxShadow: 'none',
  },
  selected: {
    background: 'rgba(131,66,187,0.08)',
    color: 'var(--core-violet-675)',
    border: '1px solid var(--core-cool-200)',
    boxShadow: 'none',
  },
  destructive: {
    background: 'var(--core-red-500)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 1px 2px rgba(176,37,48,0.3)',
  },
  'on-dark': {
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.16)',
    boxShadow: 'none',
  },
}

const variantHover: Record<string, React.CSSProperties> = {
  primary: { background: 'var(--core-violet-675)', backgroundImage: 'none' },
  default: { background: 'var(--core-cool-50)' },
  borderless: { background: 'rgba(40,40,40,0.07)' },
  inline: { textDecoration: 'underline' },
  selected: { background: 'rgba(131,66,187,0.14)' },
  destructive: { background: 'var(--core-red-600)' },
  'on-dark': { background: 'rgba(255,255,255,0.2)' },
}

const variantActive: Record<string, React.CSSProperties> = {
  primary: { background: 'var(--core-violet-775)', backgroundImage: 'none' },
  default: { background: 'var(--core-cool-75)' },
  borderless: { background: 'rgba(40,40,40,0.12)' },
  inline: {},
  selected: { background: 'rgba(131,66,187,0.18)' },
  destructive: { background: 'var(--core-red-700)' },
  'on-dark': { background: 'rgba(255,255,255,0.24)' },
}

const variantDisabled: Record<string, React.CSSProperties> = {
  primary: { background: 'var(--core-cool-100)', color: 'var(--th-text-disabled)', boxShadow: 'none', backgroundImage: 'none', border: 'none' },
  default: { background: 'var(--core-cool-50)', color: 'var(--th-text-disabled)', border: '1px solid transparent', boxShadow: 'none' },
  borderless: { background: 'transparent', color: 'var(--th-text-disabled)', border: '1px solid transparent', boxShadow: 'none' },
  inline: { color: 'var(--th-text-disabled)', opacity: 0.7 },
  selected: { background: 'var(--core-cool-50)', color: 'var(--th-text-disabled)', border: '1px solid transparent', boxShadow: 'none' },
  destructive: { background: 'var(--core-cool-50)', color: 'var(--th-text-disabled)', boxShadow: 'none', border: 'none' },
  'on-dark': { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' },
}

const variantDone: Record<string, React.CSSProperties> = {
  primary: { background: 'var(--core-green-500)', backgroundImage: 'none' },
  default: { borderColor: 'var(--core-green-400)' },
}

export function Button({
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  done = false,
  iconLeft,
  iconRight,
  iconOnly,
  onClick,
  children,
  split = false,
  splitItems = [],
}: ButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const [splitOpen, setSplitOpen] = useState(false)
  const splitRef = useRef<HTMLDivElement>(null)

  const sz = sizeConfig[size]
  const isDisabled = disabled || loading || done
  const effectiveVariant = variant

  useEffect(() => {
    if (!splitOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (splitRef.current && !splitRef.current.contains(e.target as Node)) {
        setSplitOpen(false)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSplitOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [splitOpen])

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: variant === 'inline' ? 'auto' : `calc(${sz.height}px + var(--th-density-offset, 0px))`,
    padding: variant === 'inline' ? '0 2px' : iconOnly ? '0' : sz.padding,
    width: iconOnly ? `calc(${sz.height}px + var(--th-density-offset, 0px))` : undefined,
    borderRadius: sz.borderRadius,
    fontFamily: 'var(--font-ui)',
    fontSize: sz.fontSize,
    fontWeight: variant === 'inline' ? 400 : 500,
    letterSpacing: '0.005em',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background 0.1s, box-shadow 0.1s',
    outline: 'none',
    textDecoration: 'none',
    ...variantBase[effectiveVariant],
    ...(isDisabled ? variantDisabled[effectiveVariant] ?? variantDisabled['default'] : {}),
    ...(!isDisabled && hovered ? variantHover[effectiveVariant] ?? {} : {}),
    ...(!isDisabled && active ? variantActive[effectiveVariant] ?? {} : {}),
    ...(done && !disabled ? variantDone[effectiveVariant] ?? {} : {}),
  }

  const iconStyle: React.CSSProperties = {
    fontFamily: 'Material Icons',
    fontSize: sz.iconSize,
    lineHeight: 1,
    display: 'inline-block',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    userSelect: 'none',
  }

  const spinnerStyle: React.CSSProperties = {
    width: sz.iconSize - 4,
    height: sz.iconSize - 4,
    borderRadius: '50%',
    flexShrink: 0,
    animation: 'btn-spin 0.7s linear infinite',
    border: variant === 'primary'
      ? '2px solid rgba(255,255,255,0.3)'
      : '2px solid var(--core-cool-100)',
    borderTopColor: variant === 'primary' ? '#fff' : 'var(--core-violet-600)',
  }

  const renderContent = () => {
    if (iconOnly) {
      if (loading) return <span style={spinnerStyle} />
      if (done) return <span style={{ ...iconStyle, color: variant === 'default' ? 'var(--core-green-500)' : undefined }}>check</span>
      return <span style={iconStyle}>{iconOnly}</span>
    }
    return (
      <>
        {loading && <span style={spinnerStyle} />}
        {!loading && done && (
          <span style={{
            ...iconStyle,
            color: variant === 'default' ? 'var(--core-green-500)' : undefined,
          }}>
            {variant === 'default' ? 'check_circle_outline' : 'check'}
          </span>
        )}
        {!loading && !done && iconLeft && <span style={iconStyle}>{iconLeft}</span>}
        {children}
        {!loading && !done && iconRight && <span style={iconStyle}>{iconRight}</span>}
      </>
    )
  }

  // Split button
  if (split) {
    const splitMainStyle: React.CSSProperties = {
      ...baseStyle,
      borderRadius: `${sz.borderRadius}px 0 0 ${sz.borderRadius}px`,
    }
    const splitArrowStyle: React.CSSProperties = {
      ...variantBase[effectiveVariant],
      ...(disabled ? variantDisabled[effectiveVariant] ?? variantDisabled['default'] : {}),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: `calc(${sz.height}px + var(--th-density-offset, 0px))`,
      width: `calc(${sz.height - 4}px + var(--th-density-offset, 0px))`,
      padding: '0 8px',
      borderRadius: `0 ${sz.borderRadius}px ${sz.borderRadius}px 0`,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-ui)',
      fontSize: sz.fontSize,
      fontWeight: 500,
      borderLeft: variant === 'primary' ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--core-cool-100)',
      outline: 'none',
      transition: 'background 0.1s',
    }

    const dropdownStyle: React.CSSProperties = {
      position: 'absolute',
      top: 'calc(100% + 4px)',
      right: 0,
      background: 'var(--th-bg-surface)',
      borderRadius: 8,
      border: '1px solid var(--core-cool-75)',
      boxShadow: '0 4px 16px rgba(55,23,78,0.12)',
      minWidth: 200,
      padding: '4px 0',
      zIndex: 100,
      display: splitOpen ? 'block' : 'none',
    }

    return (
      <div ref={splitRef} style={{ display: 'inline-flex', alignItems: 'stretch', position: 'relative' }}>
        <button
          style={splitMainStyle}
          disabled={disabled}
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setActive(false) }}
          onMouseDown={() => setActive(true)}
          onMouseUp={() => setActive(false)}
        >
          {iconLeft && <span style={iconStyle}>{iconLeft}</span>}
          {children}
        </button>
        <button
          style={splitArrowStyle}
          disabled={disabled}
          onClick={(e) => { e.stopPropagation(); setSplitOpen(o => !o) }}
        >
          <span style={iconStyle}>keyboard_arrow_down</span>
        </button>
        <div style={dropdownStyle}>
          {splitItems.map((item, i) => (
            <button
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                width: '100%',
                fontFamily: 'var(--font-ui)',
                fontSize: 13,
                color: 'var(--dec-color-text-body)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
              onClick={() => { item.onClick(); setSplitOpen(false) }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(131,66,187,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {item.icon && (
                <span style={{ ...iconStyle, fontSize: 16, color: 'var(--core-cool-600)' }}>{item.icon}</span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`@keyframes btn-spin { to { transform: rotate(360deg); } }`}</style>
      <button
        style={baseStyle}
        disabled={isDisabled}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setActive(false) }}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
      >
        {renderContent()}
      </button>
    </>
  )
}
