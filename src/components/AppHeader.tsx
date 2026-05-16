import { useState, useRef, useEffect, useMemo } from 'react'

export interface SearchItem {
  id: string
  label: string
  section: string
  icon: string
  keywords?: string[]
}

export type Theme = 'light' | 'dark'
export type Density = 'comfortable' | 'cozy' | 'compact'

export interface AppHeaderProps {
  sidebarExpanded?: boolean
  onToggleSidebar?: () => void
  envLabel?: string
  envVariant?: 'production' | 'staging' | 'dev'
  onNotifications?: () => void
  notificationCount?: number
  userName?: string
  userRole?: string
  userInitials?: string
  isMobile?: boolean
  searchItems?: SearchItem[]
  onSearchNavigate?: (id: string) => void
  theme?: Theme
  density?: Density
  onThemeChange?: (t: Theme) => void
  onDensityChange?: (d: Density) => void
}

const s: Record<string, React.CSSProperties> = {
  header: {
    height: 'var(--th-header-height)',
    background: 'var(--th-bg-header)',
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    padding: '0 16px 0 0',
    borderBottom: '1px solid var(--th-border)',
    boxShadow: 'var(--th-shadow-header)',
    position: 'relative',
    zIndex: 100,
    fontFamily: 'var(--font-ui)',
    transition: 'background 0.2s, border-color 0.2s',
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '0 12px',
    height: '100%',
    flexShrink: 0,
    borderRight: '1px solid var(--th-border)',
  },
  toggleBtn: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 6,
    color: 'var(--th-icon-neutral)',
    transition: 'background 0.1s',
    flexShrink: 0,
  },
  logoWordmark: {
    fontFamily: 'var(--font-ui)',
    fontSize: 14,
    fontWeight: 700,
    color: 'var(--th-text-primary)',
    letterSpacing: '-0.01em',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  },
  iconBtn: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 6,
    color: 'var(--th-icon-neutral)',
    position: 'relative',
    transition: 'background 0.1s',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    background: 'var(--th-error)',
    borderRadius: '50%',
    border: '1.5px solid var(--th-bg-header)',
  },
  userArea: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    padding: '0 8px',
    height: 32,
    cursor: 'pointer',
    borderRadius: 6,
    transition: 'background 0.1s',
    position: 'relative',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--th-text-primary)',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
  },
  userRole: {
    fontSize: 10,
    color: 'var(--th-text-hint)',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: 'var(--th-brand)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    fontWeight: 600,
    color: '#fff',
    flexShrink: 0,
  },
  envBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    height: 18,
    padding: '0 7px',
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    flexShrink: 0,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    right: 0,
    background: 'var(--th-bg-surface)',
    borderRadius: 8,
    border: '1px solid var(--th-border-strong)',
    boxShadow: 'var(--th-shadow-dropdown)',
    minWidth: 220,
    padding: '4px 0',
    zIndex: 300,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '7px 14px',
    fontSize: 13,
    color: 'var(--th-text-primary)',
    cursor: 'pointer',
    fontFamily: 'var(--font-ui)',
    transition: 'background 0.1s',
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left',
  },
  menuDivider: {
    height: 1,
    background: 'var(--th-border-subtle)',
    margin: '3px 0',
  },
}

const envStyles: Record<string, React.CSSProperties> = {
  production: { background: '#DDFAEE', color: '#27854D' },
  staging: { background: '#FFF4DC', color: '#C47A00' },
  dev: { background: '#EAF3FC', color: '#0D4C89' },
}

function highlight(text: string, query: string) {
  if (!query) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: 'var(--th-mark-bg)', color: 'var(--th-mark-text)', borderRadius: 2, padding: '0 1px' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

const DENSITY_OPTIONS: { value: Density; label: string; icon: string }[] = [
  { value: 'compact',     label: 'Compact',     icon: 'density_small'  },
  { value: 'cozy',        label: 'Cozy',        icon: 'density_medium' },
  { value: 'comfortable', label: 'Comfortable', icon: 'density_large'  },
]

export function AppHeader({
  sidebarExpanded = true,
  onToggleSidebar,
  envLabel,
  envVariant = 'staging',
  onNotifications,
  notificationCount = 3,
  userName = 'Burton Guster',
  userRole = 'Administrator',
  userInitials = 'BG',
  isMobile = false,
  searchItems = [],
  onSearchNavigate,
  theme = 'light',
  density = 'comfortable',
  onThemeChange,
  onDensityChange,
}: AppHeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [densityMenuOpen, setDensityMenuOpen] = useState(false)
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)

  const menuRef = useRef<HTMLDivElement>(null)
  const densityRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const mobileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
      if (densityRef.current && !densityRef.current.contains(e.target as Node)) {
        setDensityMenuOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false)
        setQuery('')
        setActiveIdx(-1)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q || q.length < 1) return []
    return searchItems.filter(item => {
      const haystack = [item.label, item.section, ...(item.keywords ?? [])].join(' ').toLowerCase()
      return haystack.includes(q)
    }).slice(0, 8)
  }, [query, searchItems])

  const showDropdown = searchFocused && query.length > 0 && results.length > 0

  function navigate(item: SearchItem) {
    onSearchNavigate?.(item.id)
    setQuery('')
    setSearchFocused(false)
    setMobileSearchOpen(false)
    setActiveIdx(-1)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && activeIdx >= 0) { e.preventDefault(); navigate(results[activeIdx]) }
    if (e.key === 'Escape') { setQuery(''); setSearchFocused(false); setMobileSearchOpen(false); setActiveIdx(-1) }
  }

  const SearchInput = ({ inputRefProp, autoFocus }: { inputRefProp: React.RefObject<HTMLInputElement>; autoFocus?: boolean }) => (
    <input
      ref={inputRefProp}
      autoFocus={autoFocus}
      value={query}
      onChange={e => { setQuery(e.target.value); setActiveIdx(-1) }}
      onFocus={() => setSearchFocused(true)}
      onKeyDown={handleKey}
      placeholder="Search components, layouts…"
      style={{
        width: '100%',
        height: 32,
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontFamily: 'var(--font-ui)',
        fontSize: 13,
        color: 'var(--th-text-primary)',
      }}
    />
  )

  const Dropdown = () => (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 4px)',
      left: 0, right: 0,
      background: 'var(--th-bg-surface)',
      border: '1px solid var(--th-border-strong)',
      borderRadius: 10,
      boxShadow: 'var(--th-shadow-search)',
      overflow: 'hidden',
      zIndex: 500,
    }}>
      {results.map((item, i) => (
        <button
          key={`${item.id}-${item.label}`}
          onMouseDown={e => { e.preventDefault(); navigate(item) }}
          onMouseEnter={() => setActiveIdx(i)}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '9px 12px',
            background: i === activeIdx ? 'var(--th-brand-subtle)' : 'transparent',
            border: 'none', cursor: 'pointer', textAlign: 'left',
            borderBottom: i < results.length - 1 ? '1px solid var(--th-border-subtle)' : 'none',
            transition: 'background 0.1s',
          }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: 7, flexShrink: 0,
            background: i === activeIdx ? 'var(--th-brand-subtle)' : 'var(--th-bg-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="material-icons" style={{ fontSize: 14, color: 'var(--th-brand)', fontFamily: 'Material Icons', lineHeight: 1 }}>{item.icon}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--th-text-primary)', fontFamily: 'var(--font-ui)', marginBottom: 1 }}>
              {highlight(item.label, query)}
            </div>
            <div style={{ fontSize: 11, color: 'var(--th-text-hint)', fontFamily: 'var(--font-ui)' }}>{item.section}</div>
          </div>
          <span className="material-icons" style={{ fontSize: 14, color: 'var(--th-icon-muted)', fontFamily: 'Material Icons', lineHeight: 1 }}>arrow_forward</span>
        </button>
      ))}
    </div>
  )

  const isDark = theme === 'dark'

  return (
    <>
      <header style={s.header}>
        {/* Logo + toggle */}
        <div style={s.logoArea}>
          <button
            style={{ ...s.toggleBtn, background: hoveredBtn === 'toggle' ? 'var(--th-hover-overlay)' : 'transparent' }}
            onMouseEnter={() => setHoveredBtn('toggle')}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={onToggleSidebar}
            title={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <span className="material-icons" style={{ fontSize: 20 }}>{sidebarExpanded ? 'menu_open' : 'menu'}</span>
          </button>
          <span style={s.logoWordmark}>Design System</span>
          {envLabel && !isMobile && (
            <span style={{ ...s.envBadge, ...envStyles[envVariant] }}>{envLabel}</span>
          )}
        </div>

        {/* Desktop search — left-aligned, after logo */}
        {!isMobile && (
          <div ref={searchRef} style={{ width: 320, marginLeft: 16, position: 'relative', flexShrink: 0 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              height: 34, padding: '0 10px',
              background: searchFocused ? 'var(--th-bg-surface)' : 'var(--th-bg-search)',
              border: `1.5px solid ${searchFocused ? 'var(--th-brand)' : 'var(--th-border-strong)'}`,
              borderRadius: 8,
              transition: 'border-color 0.15s, background 0.15s',
            }}>
              <span className="material-icons" style={{ fontSize: 16, color: searchFocused ? 'var(--th-brand)' : 'var(--th-text-hint)', fontFamily: 'Material Icons', lineHeight: 1, flexShrink: 0, transition: 'color 0.15s' }}>search</span>
              <SearchInput inputRefProp={inputRef} />
              {query && (
                <button onMouseDown={() => { setQuery(''); inputRef.current?.focus() }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                  <span className="material-icons" style={{ fontSize: 14, color: 'var(--th-icon-muted)', fontFamily: 'Material Icons', lineHeight: 1 }}>close</span>
                </button>
              )}
            </div>
            {showDropdown && <Dropdown />}
          </div>
        )}

        {/* Center spacer */}
        <div style={{ flex: 1 }} />

        {/* Right controls */}
        <div style={s.headerRight}>
          {/* Mobile: search icon */}
          {isMobile && (
            <button
              style={{ ...s.iconBtn, background: hoveredBtn === 'msearch' ? 'var(--th-hover-overlay)' : 'transparent' }}
              onMouseEnter={() => setHoveredBtn('msearch')}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={() => { setMobileSearchOpen(true); setTimeout(() => mobileInputRef.current?.focus(), 50) }}
            >
              <span className="material-icons" style={{ fontSize: 20 }}>search</span>
            </button>
          )}

          {/* Density switcher — segmented pill on desktop, popover on mobile */}
          {!isMobile ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              background: 'var(--th-bg-muted)',
              border: '1px solid var(--th-border-strong)',
              borderRadius: 8,
              padding: 2,
              marginRight: 2,
            }}>
              {DENSITY_OPTIONS.map(opt => {
                const active = density === opt.value
                return (
                  <button
                    key={opt.value}
                    title={opt.label}
                    onClick={() => onDensityChange?.(opt.value)}
                    onMouseEnter={() => setHoveredBtn(`dens-${opt.value}`)}
                    onMouseLeave={() => setHoveredBtn(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      height: 26,
                      padding: '0 8px',
                      border: 'none',
                      borderRadius: 6,
                      cursor: 'pointer',
                      background: active
                        ? 'var(--th-bg-surface)'
                        : hoveredBtn === `dens-${opt.value}` ? 'var(--th-hover-overlay)' : 'transparent',
                      boxShadow: active ? 'var(--th-shadow-card)' : 'none',
                      transition: 'background 0.12s, box-shadow 0.12s',
                    }}
                  >
                    <span className="material-icons" style={{
                      fontSize: 15,
                      color: active ? 'var(--th-brand)' : 'var(--th-text-hint)',
                      fontFamily: 'Material Icons',
                      lineHeight: 1,
                      transition: 'color 0.12s',
                    }}>{opt.icon}</span>
                    <span style={{
                      fontSize: 11,
                      fontWeight: active ? 600 : 400,
                      color: active ? 'var(--th-brand)' : 'var(--th-text-secondary)',
                      fontFamily: 'var(--font-ui)',
                      transition: 'color 0.12s',
                      whiteSpace: 'nowrap',
                    }}>{opt.label}</span>
                  </button>
                )
              })}
            </div>
          ) : (
            /* Mobile density picker */
            <div style={{ position: 'relative' }} ref={densityRef}>
              <button
                style={{ ...s.iconBtn, background: densityMenuOpen || hoveredBtn === 'density' ? 'var(--th-hover-overlay)' : 'transparent' }}
                onMouseEnter={() => setHoveredBtn('density')}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={() => setDensityMenuOpen(v => !v)}
                title="Display density"
              >
                <span className="material-icons" style={{
                  fontSize: 20,
                  color: densityMenuOpen ? 'var(--th-brand)' : 'var(--th-icon-neutral)',
                  fontFamily: 'Material Icons',
                  lineHeight: 1,
                }}>
                  {DENSITY_OPTIONS.find(o => o.value === density)?.icon ?? 'density_medium'}
                </span>
              </button>

              {densityMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  background: 'var(--th-bg-surface)',
                  borderRadius: 10,
                  border: '1px solid var(--th-border-strong)',
                  boxShadow: 'var(--th-shadow-dropdown)',
                  overflow: 'hidden',
                  zIndex: 300,
                  minWidth: 172,
                }}>
                  <div style={{ padding: '8px 12px 6px', fontSize: 10, fontWeight: 600, color: 'var(--th-text-hint)', fontFamily: 'var(--font-ui)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Display Density
                  </div>
                  {DENSITY_OPTIONS.map(opt => {
                    const active = density === opt.value
                    return (
                      <button
                        key={opt.value}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          width: '100%', padding: '9px 12px',
                          background: active ? 'var(--th-brand-subtle)' : hoveredBtn === `dm-${opt.value}` ? 'var(--th-hover-overlay)' : 'transparent',
                          border: 'none', cursor: 'pointer', textAlign: 'left',
                          fontFamily: 'var(--font-ui)', transition: 'background 0.1s',
                        }}
                        onMouseEnter={() => setHoveredBtn(`dm-${opt.value}`)}
                        onMouseLeave={() => setHoveredBtn(null)}
                        onClick={() => { onDensityChange?.(opt.value); setDensityMenuOpen(false) }}
                      >
                        <span className="material-icons" style={{ fontSize: 18, color: active ? 'var(--th-brand)' : 'var(--th-icon-neutral)', fontFamily: 'Material Icons', lineHeight: 1, flexShrink: 0 }}>
                          {opt.icon}
                        </span>
                        <span style={{ fontSize: 13, color: active ? 'var(--th-brand)' : 'var(--th-text-primary)', fontWeight: active ? 600 : 400, flex: 1 }}>
                          {opt.label}
                        </span>
                        {active && (
                          <span className="material-icons" style={{ fontSize: 14, color: 'var(--th-brand)', fontFamily: 'Material Icons', lineHeight: 1 }}>check</span>
                        )}
                      </button>
                    )
                  })}
                  <div style={{ height: 4 }} />
                </div>
              )}
            </div>
          )}

          {/* Theme toggle */}
          <button
            style={{ ...s.iconBtn, background: hoveredBtn === 'theme' ? 'var(--th-hover-overlay)' : 'transparent' }}
            onMouseEnter={() => setHoveredBtn('theme')}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => onThemeChange?.(isDark ? 'light' : 'dark')}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="material-icons" style={{ fontSize: 18, color: isDark ? '#FFD04D' : 'var(--th-icon-neutral)' }}>
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Notifications — desktop only */}
          {!isMobile && (
            <button
              style={{ ...s.iconBtn, background: hoveredBtn === 'notif' ? 'var(--th-hover-overlay)' : 'transparent' }}
              onMouseEnter={() => setHoveredBtn('notif')}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={onNotifications}
            >
              <span className="material-icons" style={{ fontSize: 20 }}>notifications_none</span>
              {notificationCount > 0 && <span style={s.badge} />}
            </button>
          )}

          {/* User menu — desktop only */}
          {!isMobile && (
            <div style={{ position: 'relative' }} ref={menuRef}>
              <button
                style={{ ...s.userArea, background: userMenuOpen || hoveredBtn === 'user' ? 'var(--th-hover-overlay)' : 'transparent' }}
                onMouseEnter={() => setHoveredBtn('user')}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div style={s.userInfo}>
                  <span style={s.userName}>{userName}</span>
                  <span style={s.userRole}>{userRole}</span>
                </div>
                <div style={s.avatar}>{userInitials}</div>
              </button>

              {userMenuOpen && (
                <div style={s.dropdownMenu}>
                  {[
                    { id: 'pref',   icon: 'settings',    label: 'Preferences' },
                    { id: 'role',   icon: 'swap_horiz',  label: 'Switch role',       chevron: true },
                    { id: 'loc',    icon: 'location_on', label: 'Change location',   chevron: true },
                  ].map(item => (
                    <button key={item.id}
                      style={{ ...s.menuItem, background: hoveredBtn === `mu-${item.id}` ? 'var(--th-brand-hover)' : 'transparent' }}
                      onMouseEnter={() => setHoveredBtn(`mu-${item.id}`)}
                      onMouseLeave={() => setHoveredBtn(null)}
                    >
                      <span className="material-icons" style={{ fontSize: 16, color: 'var(--th-icon-neutral)' }}>{item.icon}</span>
                      {item.label}
                      {item.chevron && <span className="material-icons" style={{ fontSize: 14, color: 'var(--th-icon-muted)', marginLeft: 'auto' }}>chevron_right</span>}
                    </button>
                  ))}

                  <div style={s.menuDivider} />

                  <button
                    style={{ ...s.menuItem, background: hoveredBtn === 'mu-logout' ? 'rgba(224,47,58,0.05)' : 'transparent', color: 'var(--th-error)' }}
                    onMouseEnter={() => setHoveredBtn('mu-logout')}
                    onMouseLeave={() => setHoveredBtn(null)}
                  >
                    <span className="material-icons" style={{ fontSize: 16, color: 'var(--th-error)' }}>logout</span>
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mobile search overlay */}
      {isMobile && mobileSearchOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'var(--th-overlay-modal)',
          zIndex: 200,
          backdropFilter: 'blur(2px)',
        }}
          onMouseDown={() => { setMobileSearchOpen(false); setQuery(''); setSearchFocused(false) }}
        >
          <div style={{ background: 'var(--th-bg-header)', borderBottom: '1px solid var(--th-border)', padding: '10px 12px' }}
            onMouseDown={e => e.stopPropagation()}
          >
            <div ref={searchRef} style={{ position: 'relative' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                height: 40, padding: '0 12px',
                background: 'var(--th-bg-search)',
                border: '1.5px solid var(--th-brand)',
                borderRadius: 10,
              }}>
                <span className="material-icons" style={{ fontSize: 18, color: 'var(--th-brand)', fontFamily: 'Material Icons', lineHeight: 1, flexShrink: 0 }}>search</span>
                <SearchInput inputRefProp={mobileInputRef} autoFocus />
                <button
                  onMouseDown={() => { setMobileSearchOpen(false); setQuery(''); setActiveIdx(-1) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0 }}
                >
                  <span className="material-icons" style={{ fontSize: 18, color: 'var(--th-text-hint)', fontFamily: 'Material Icons', lineHeight: 1 }}>close</span>
                </button>
              </div>
              {showDropdown && <Dropdown />}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
