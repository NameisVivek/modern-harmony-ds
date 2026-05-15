import { useState, useRef, useEffect, useMemo } from 'react'

export interface SearchItem {
  id: string        // section to navigate to
  label: string     // component or layout name
  section: string   // parent section label
  icon: string      // material icon name
  keywords?: string[]
}

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
}

const s: Record<string, React.CSSProperties> = {
  header: {
    height: 48,
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    padding: '0 16px 0 0',
    borderBottom: '1px solid #EBEBEB',
    boxShadow: '0 1px 4px rgba(55,23,78,0.08)',
    position: 'relative',
    zIndex: 100,
    fontFamily: 'var(--font-ui)',
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '0 12px',
    height: '100%',
    flexShrink: 0,
    borderRight: '1px solid #EBEBEB',
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
    color: '#5E5C75',
    transition: 'background 0.1s',
    flexShrink: 0,
  },
  logoWordmark: {
    fontFamily: 'var(--font-ui)',
    fontSize: 14,
    fontWeight: 700,
    color: '#282828',
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
    color: '#5E5C75',
    position: 'relative',
    transition: 'background 0.1s',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    background: '#E02F3A',
    borderRadius: '50%',
    border: '1.5px solid #fff',
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
    color: '#282828',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
  },
  userRole: {
    fontSize: 10,
    color: '#8C8C8C',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: '#8342BB',
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
    background: '#fff',
    borderRadius: 8,
    border: '1px solid #E5E5EC',
    boxShadow: '0 4px 16px rgba(55,23,78,0.12)',
    minWidth: 200,
    padding: '4px 0',
    zIndex: 300,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '7px 14px',
    fontSize: 13,
    color: '#282828',
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
    background: '#F0F0F4',
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
      <mark style={{ background: '#EDE0FA', color: '#4E2975', borderRadius: 2, padding: '0 1px' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

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
}: AppHeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)

  const menuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const mobileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
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
        color: '#282828',
      }}
    />
  )

  const Dropdown = () => (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 4px)',
      left: 0, right: 0,
      background: '#fff',
      border: '1px solid #E0D9F5',
      borderRadius: 10,
      boxShadow: '0 8px 24px rgba(55,23,78,0.14)',
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
            background: i === activeIdx ? '#F5F0FC' : 'transparent',
            border: 'none', cursor: 'pointer', textAlign: 'left',
            borderBottom: i < results.length - 1 ? '1px solid #F5F0FC' : 'none',
            transition: 'background 0.1s',
          }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: 7, flexShrink: 0,
            background: i === activeIdx ? '#EDE0FA' : '#F2ECF8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="material-icons" style={{ fontSize: 14, color: '#8342BB', fontFamily: 'Material Icons', lineHeight: 1 }}>{item.icon}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#1C1C2E', fontFamily: 'var(--font-ui)', marginBottom: 1 }}>
              {highlight(item.label, query)}
            </div>
            <div style={{ fontSize: 11, color: '#9B9BAA', fontFamily: 'var(--font-ui)' }}>{item.section}</div>
          </div>
          <span className="material-icons" style={{ fontSize: 14, color: '#C4B5E8', fontFamily: 'Material Icons', lineHeight: 1 }}>arrow_forward</span>
        </button>
      ))}
    </div>
  )

  return (
    <>
      <header style={s.header}>
        {/* Logo + toggle */}
        <div style={s.logoArea}>
          <button
            style={{ ...s.toggleBtn, background: hoveredBtn === 'toggle' ? 'rgba(40,40,40,0.06)' : 'transparent' }}
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

        {/* Desktop search bar */}
        {!isMobile && (
          <div ref={searchRef} style={{ flex: 1, maxWidth: 380, margin: '0 16px', position: 'relative' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              height: 34, padding: '0 10px',
              background: searchFocused ? '#fff' : '#F5F3FA',
              border: `1.5px solid ${searchFocused ? '#8342BB' : '#E5E0F0'}`,
              borderRadius: 8,
              transition: 'border-color 0.15s, background 0.15s',
            }}>
              <span className="material-icons" style={{ fontSize: 16, color: searchFocused ? '#8342BB' : '#9B9BAA', fontFamily: 'Material Icons', lineHeight: 1, flexShrink: 0, transition: 'color 0.15s' }}>search</span>
              <SearchInput inputRefProp={inputRef} />
              {query && (
                <button onMouseDown={() => { setQuery(''); inputRef.current?.focus() }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                  <span className="material-icons" style={{ fontSize: 14, color: '#BBBBC8', fontFamily: 'Material Icons', lineHeight: 1 }}>close</span>
                </button>
              )}
            </div>
            {showDropdown && <Dropdown />}
          </div>
        )}

        {/* Right controls */}
        <div style={{ ...s.headerRight, marginLeft: isMobile ? 'auto' : 0 }}>
          {/* Mobile: search icon */}
          {isMobile && (
            <button
              style={{ ...s.iconBtn, background: hoveredBtn === 'msearch' ? 'rgba(40,40,40,0.06)' : 'transparent' }}
              onMouseEnter={() => setHoveredBtn('msearch')}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={() => { setMobileSearchOpen(true); setTimeout(() => mobileInputRef.current?.focus(), 50) }}
            >
              <span className="material-icons" style={{ fontSize: 20 }}>search</span>
            </button>
          )}

          {/* AI Assistant */}
          <button
            style={{ ...s.iconBtn, background: hoveredBtn === 'ai' ? 'rgba(40,40,40,0.06)' : 'transparent' }}
            onMouseEnter={() => setHoveredBtn('ai')}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            <span className="material-icons" style={{ fontSize: 18, color: '#8342BB' }}>auto_awesome</span>
          </button>

          {/* Notifications — desktop only */}
          {!isMobile && (
            <button
              style={{ ...s.iconBtn, background: hoveredBtn === 'notif' ? 'rgba(40,40,40,0.06)' : 'transparent' }}
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
                style={{ ...s.userArea, background: userMenuOpen || hoveredBtn === 'user' ? 'rgba(40,40,40,0.05)' : 'transparent' }}
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
                      style={{ ...s.menuItem, background: hoveredBtn === `mu-${item.id}` ? 'rgba(131,66,187,0.05)' : 'transparent' }}
                      onMouseEnter={() => setHoveredBtn(`mu-${item.id}`)}
                      onMouseLeave={() => setHoveredBtn(null)}
                    >
                      <span className="material-icons" style={{ fontSize: 16, color: '#5E5C75' }}>{item.icon}</span>
                      {item.label}
                      {item.chevron && <span className="material-icons" style={{ fontSize: 14, color: '#BFBECE', marginLeft: 'auto' }}>chevron_right</span>}
                    </button>
                  ))}
                  <div style={s.menuDivider} />
                  <button
                    style={{ ...s.menuItem, background: hoveredBtn === 'mu-logout' ? 'rgba(224,47,58,0.05)' : 'transparent', color: '#E02F3A' }}
                    onMouseEnter={() => setHoveredBtn('mu-logout')}
                    onMouseLeave={() => setHoveredBtn(null)}
                  >
                    <span className="material-icons" style={{ fontSize: 16, color: '#E02F3A' }}>logout</span>
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
          background: 'rgba(28,28,46,0.45)',
          zIndex: 200,
          backdropFilter: 'blur(2px)',
        }}
          onMouseDown={() => { setMobileSearchOpen(false); setQuery(''); setSearchFocused(false) }}
        >
          <div style={{ background: '#fff', borderBottom: '1px solid #EBEBEB', padding: '10px 12px' }}
            onMouseDown={e => e.stopPropagation()}
          >
            <div ref={searchRef} style={{ position: 'relative' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                height: 40, padding: '0 12px',
                background: '#F5F3FA',
                border: '1.5px solid #8342BB',
                borderRadius: 10,
              }}>
                <span className="material-icons" style={{ fontSize: 18, color: '#8342BB', fontFamily: 'Material Icons', lineHeight: 1, flexShrink: 0 }}>search</span>
                <SearchInput inputRefProp={mobileInputRef} autoFocus />
                <button
                  onMouseDown={() => { setMobileSearchOpen(false); setQuery(''); setActiveIdx(-1) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0 }}
                >
                  <span className="material-icons" style={{ fontSize: 18, color: '#9B9BAA', fontFamily: 'Material Icons', lineHeight: 1 }}>close</span>
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
