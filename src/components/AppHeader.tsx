import { useState, useRef, useEffect } from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
  children?: BreadcrumbItem[]
}

export interface AppHeaderProps {
  sidebarExpanded?: boolean
  onToggleSidebar?: () => void
  breadcrumbs?: BreadcrumbItem[]
  envLabel?: string
  envVariant?: 'production' | 'staging' | 'dev'
  onNotifications?: () => void
  notificationCount?: number
  userName?: string
  userRole?: string
  userInitials?: string
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
  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    overflow: 'hidden',
    flexShrink: 1,
    minWidth: 0,
    paddingLeft: 4,
    gap: 0,
  },
  bcSep: {
    fontSize: 13,
    color: '#BFBECE',
    padding: '0 2px',
    flexShrink: 0,
    userSelect: 'none',
    fontWeight: 400,
  },
  bcBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    height: 30,
    padding: '0 7px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 6,
    whiteSpace: 'nowrap',
    fontFamily: 'var(--font-ui)',
    fontSize: 13,
    color: '#282828',
    transition: 'background 0.1s',
    fontWeight: 400,
  },
  bcBtnActive: {
    color: '#7239A4',
    fontWeight: 500,
  },
  headerRight: {
    marginLeft: 'auto',
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
  aiBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    height: 30,
    padding: '0 10px',
    background: 'transparent',
    border: '1px solid #DDDDE5',
    borderRadius: 6,
    cursor: 'pointer',
    fontFamily: 'var(--font-ui)',
    fontSize: 12,
    fontWeight: 500,
    color: '#282828',
    transition: 'background 0.1s, border-color 0.1s',
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

export function AppHeader({
  sidebarExpanded = true,
  onToggleSidebar,
  breadcrumbs = [
    { label: 'S&OP Planning', children: [{ label: 'Dashboard' }, { label: 'Forecast' }] },
    { label: 'Demand planning' },
  ],
  envLabel,
  envVariant = 'staging',
  onNotifications,
  notificationCount = 3,
  userName = 'Burton Guster',
  userRole = 'Administrator',
  userInitials = 'BG',
}: AppHeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header style={s.header}>
      {/* Logo + toggle area */}
      <div style={s.logoArea}>
        <button
          style={{
            ...s.toggleBtn,
            background: hoveredBtn === 'toggle' ? 'rgba(40,40,40,0.06)' : 'transparent',
          }}
          onMouseEnter={() => setHoveredBtn('toggle')}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={onToggleSidebar}
          title={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <span className="material-icons" style={{ fontSize: 20 }}>
            {sidebarExpanded ? 'left_panel_open' : 'left_panel_close'}
          </span>
        </button>
        <span style={s.logoWordmark}>Design System</span>
        {envLabel && (
          <span style={{ ...s.envBadge, ...envStyles[envVariant] }}>
            {envLabel}
          </span>
        )}
      </div>

      {/* Breadcrumbs */}
      <nav style={s.breadcrumbs}>
        {breadcrumbs.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            {i > 0 && <span style={s.bcSep}>/</span>}
            <button
              style={{
                ...s.bcBtn,
                ...(i === breadcrumbs.length - 1 ? s.bcBtnActive : {}),
                background: hoveredBtn === `bc-${i}` ? 'rgba(40,40,40,0.06)' : 'transparent',
              }}
              onMouseEnter={() => setHoveredBtn(`bc-${i}`)}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              {item.label}
              {item.children && (
                <span className="material-icons" style={{ fontSize: 14, color: '#8C8C8C' }}>
                  expand_more
                </span>
              )}
            </button>
          </div>
        ))}
      </nav>

      {/* Right controls */}
      <div style={s.headerRight}>
        {/* AI Assistant */}
        <button
          style={{
            ...s.aiBtn,
            background: hoveredBtn === 'ai' ? '#F8F8FB' : 'transparent',
          }}
          onMouseEnter={() => setHoveredBtn('ai')}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          <span className="material-icons" style={{ fontSize: 14, color: '#8342BB' }}>auto_awesome</span>
          Assistant
        </button>

        {/* Notifications */}
        <button
          style={{
            ...s.iconBtn,
            background: hoveredBtn === 'notif' ? 'rgba(40,40,40,0.06)' : 'transparent',
          }}
          onMouseEnter={() => setHoveredBtn('notif')}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={onNotifications}
        >
          <span className="material-icons" style={{ fontSize: 20 }}>notifications_none</span>
          {notificationCount > 0 && <span style={s.badge} />}
        </button>

        {/* User menu */}
        <div style={{ position: 'relative' }} ref={menuRef}>
          <button
            style={{
              ...s.userArea,
              background: userMenuOpen || hoveredBtn === 'user' ? 'rgba(40,40,40,0.05)' : 'transparent',
            }}
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
              <button
                style={{
                  ...s.menuItem,
                  background: hoveredBtn === 'mu-pref' ? 'rgba(131,66,187,0.05)' : 'transparent',
                }}
                onMouseEnter={() => setHoveredBtn('mu-pref')}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                <span className="material-icons" style={{ fontSize: 16, color: '#5E5C75' }}>settings</span>
                Preferences
              </button>
              <button
                style={{
                  ...s.menuItem,
                  background: hoveredBtn === 'mu-role' ? 'rgba(131,66,187,0.05)' : 'transparent',
                }}
                onMouseEnter={() => setHoveredBtn('mu-role')}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                <span className="material-icons" style={{ fontSize: 16, color: '#5E5C75' }}>swap_horiz</span>
                Switch role
                <span className="material-icons" style={{ fontSize: 14, color: '#BFBECE', marginLeft: 'auto' }}>chevron_right</span>
              </button>
              <button
                style={{
                  ...s.menuItem,
                  background: hoveredBtn === 'mu-loc' ? 'rgba(131,66,187,0.05)' : 'transparent',
                }}
                onMouseEnter={() => setHoveredBtn('mu-loc')}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                <span className="material-icons" style={{ fontSize: 16, color: '#5E5C75' }}>location_on</span>
                Change location
                <span className="material-icons" style={{ fontSize: 14, color: '#BFBECE', marginLeft: 'auto' }}>chevron_right</span>
              </button>
              <div style={s.menuDivider} />
              <button
                style={{
                  ...s.menuItem,
                  background: hoveredBtn === 'mu-logout' ? 'rgba(224,47,58,0.05)' : 'transparent',
                  color: '#E02F3A',
                }}
                onMouseEnter={() => setHoveredBtn('mu-logout')}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                <span className="material-icons" style={{ fontSize: 16, color: '#E02F3A' }}>logout</span>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
