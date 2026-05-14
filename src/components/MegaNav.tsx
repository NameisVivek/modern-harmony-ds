import React, { useState, useRef, useEffect } from 'react'

export interface MegaNavItem {
  id: string
  label: string
  icon?: string
  description?: string
  iconBg?: string
  iconColor?: string
  href?: string
}

export interface MegaNavColumn {
  heading: string
  items: MegaNavItem[]
}

export interface MegaNavMenu {
  id: string
  label: string
  columns: MegaNavColumn[]
  featured?: {
    label: string
    title: string
    body: string
    linkLabel?: string
    onLink?: () => void
  }
}

export interface MegaNavProps {
  logo?: React.ReactNode
  menus: MegaNavMenu[]
  activeMenuId?: string
  onNavigate?: (itemId: string) => void
  trailingContent?: React.ReactNode
}

const s = {
  header: {
    height: 52, background: '#282828',
    display: 'flex', alignItems: 'center',
    padding: '0 20px', gap: 0, position: 'relative' as const, zIndex: 10,
  } as React.CSSProperties,
  logo: { display: 'flex', alignItems: 'center', marginRight: 24, flexShrink: 0 } as React.CSSProperties,
  nav: { display: 'flex', alignItems: 'center', gap: 2, flex: 1 } as React.CSSProperties,
  navItem: (active: boolean, open: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 6,
    height: 36, padding: '0 14px', borderRadius: 8,
    fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: active ? 500 : 400,
    color: active || open ? '#fff' : 'rgba(255,255,255,0.65)',
    cursor: 'pointer', border: 'none',
    background: active ? 'rgba(255,255,255,0.12)' : open ? 'rgba(255,255,255,0.08)' : 'transparent',
    transition: 'background 0.1s, color 0.1s',
    whiteSpace: 'nowrap' as const,
  }),
  flyout: {
    background: '#fff', borderBottom: '1px solid #EBEBEB',
    boxShadow: '0 8px 32px rgba(20,16,41,0.12), 0 2px 8px rgba(20,16,41,0.06)',
    padding: '28px 28px 32px',
  } as React.CSSProperties,
  grid: {
    display: 'grid', gridTemplateColumns: '240px 1fr 1fr', gap: 32, maxWidth: 860,
  } as React.CSSProperties,
  featured: {
    background: '#282828', borderRadius: 16, padding: '22px 20px',
    display: 'flex', flexDirection: 'column' as const, gap: 14,
  } as React.CSSProperties,
  featLabel: {
    fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.45)',
    letterSpacing: '0.1em', textTransform: 'uppercase' as const, fontFamily: 'var(--font-ui)',
  } as React.CSSProperties,
  featTitle: { fontSize: 20, fontWeight: 600, color: '#fff', lineHeight: 1.3, fontFamily: 'var(--font-ui)' } as React.CSSProperties,
  featBody: { fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, fontFamily: 'var(--font-ui)' } as React.CSSProperties,
  featLink: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontSize: 13, fontWeight: 500, color: '#C0B4E8',
    cursor: 'pointer', background: 'none', border: 'none', padding: 0,
    fontFamily: 'var(--font-ui)', marginTop: 4,
  } as React.CSSProperties,
  colHeader: {
    fontSize: 10, fontWeight: 600, color: '#8C8C8C',
    letterSpacing: '0.1em', textTransform: 'uppercase' as const,
    paddingBottom: 10, borderBottom: '1px solid #EBEBEB', marginBottom: 4,
    fontFamily: 'var(--font-ui)',
  } as React.CSSProperties,
  menuItem: (active: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '12px 10px', borderRadius: 10, cursor: 'pointer',
    background: active ? 'rgba(131,66,187,0.07)' : 'transparent',
    border: 'none', width: '100%', textAlign: 'left' as const,
    transition: 'background 0.1s',
  }),
  menuIcon: (bg: string): React.CSSProperties => ({
    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: bg,
  }),
  menuLabel: (active: boolean): React.CSSProperties => ({
    fontSize: 14, fontWeight: 500,
    color: active ? '#7239A4' : '#282828', lineHeight: 1.3,
    fontFamily: 'var(--font-ui)',
  }),
  menuDesc: { fontSize: 12, color: '#8C8C8C', marginTop: 2, lineHeight: 1.4, fontFamily: 'var(--font-ui)' } as React.CSSProperties,
  overlay: {
    position: 'fixed' as const, inset: 0, zIndex: 9,
  } as React.CSSProperties,
}

export function MegaNav({ logo, menus, activeMenuId, onNavigate, trailingContent }: MegaNavProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const openMenu = menus.find((m) => m.id === openMenuId)

  return (
    <div ref={navRef} style={{ position: 'relative' }}>
      {openMenuId && <div style={s.overlay} onClick={() => setOpenMenuId(null)} />}
      <div style={s.header}>
        {logo && <div style={s.logo}>{logo}</div>}
        <div style={s.nav}>
          {menus.map((menu) => {
            const isActive = menu.id === activeMenuId
            const isOpen = menu.id === openMenuId
            return (
              <button
                key={menu.id}
                style={s.navItem(isActive, isOpen)}
                onClick={() => setOpenMenuId(isOpen ? null : menu.id)}
                onMouseEnter={(e) => {
                  if (!isActive && !isOpen) {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive && !isOpen) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'
                  }
                }}
              >
                {menu.label}
                <span
                  className="material-icons"
                  style={{
                    fontSize: 16, color: 'inherit',
                    transition: 'transform 0.2s',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    fontFamily: 'Material Icons',
                  }}
                >
                  expand_more
                </span>
              </button>
            )
          })}
        </div>
        {trailingContent}
      </div>

      {openMenu && (
        <div style={{ ...s.flyout, position: 'relative', zIndex: 10 }}>
          <div style={s.grid}>
            {openMenu.featured && (
              <div style={s.featured}>
                <div style={s.featLabel}>{openMenu.featured.label}</div>
                <div style={s.featTitle}>{openMenu.featured.title}</div>
                <div style={s.featBody}>{openMenu.featured.body}</div>
                {openMenu.featured.linkLabel && (
                  <button style={s.featLink} onClick={openMenu.featured.onLink}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#C0B4E8' }}
                  >
                    {openMenu.featured.linkLabel}
                    <span className="material-icons" style={{ fontSize: 16, fontFamily: 'Material Icons' }}>arrow_forward</span>
                  </button>
                )}
              </div>
            )}
            {openMenu.columns.map((col) => (
              <div key={col.heading}>
                <div style={s.colHeader}>{col.heading}</div>
                {col.items.map((item) => {
                  const isItemActive = item.id === activeMenuId
                  return (
                    <button
                      key={item.id}
                      style={s.menuItem(isItemActive)}
                      onClick={() => { onNavigate?.(item.id); setOpenMenuId(null) }}
                      onMouseEnter={(e) => { if (!isItemActive) (e.currentTarget as HTMLElement).style.background = '#F8F8FB' }}
                      onMouseLeave={(e) => { if (!isItemActive) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                    >
                      {item.icon && (
                        <div style={s.menuIcon(item.iconBg ?? '#F0F0F4')}>
                          <span className="material-icons" style={{ fontSize: 20, color: item.iconColor ?? '#5E5C75', fontFamily: 'Material Icons' }}>
                            {item.icon}
                          </span>
                        </div>
                      )}
                      <div>
                        <div style={s.menuLabel(isItemActive)}>{item.label}</div>
                        {item.description && <div style={s.menuDesc}>{item.description}</div>}
                      </div>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MegaNav
