import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export interface NavItem {
  id: string
  icon: string
  label: string
  disabled?: boolean
  badge?: number
  href?: string
  onClick?: () => void
}

export interface SidebarProps {
  expanded?: boolean
  activeId?: string
  items?: NavItem[]
  bottomItems?: NavItem[]
  userName?: string
  userRole?: string
  userInitials?: string
  onNavigate?: (id: string) => void
  notificationCount?: number
  isMobile?: boolean
}

const defaultItems: NavItem[] = [
  { id: 'dashboard', icon: 'home', label: 'Dashboard' },
  { id: 'sop', icon: 'insert_chart_outlined', label: 'S&OP Planning' },
  { id: 'forecast', icon: 'calendar_today', label: 'Forecast' },
  { id: 'orders', icon: 'assignment', label: 'Orders' },
  { id: 'shipments', icon: 'local_shipping', label: 'Shipments' },
  { id: 'reports', icon: 'bar_chart', label: 'Reports' },
]

const defaultBottomItems: NavItem[] = [
  { id: 'data', icon: 'storage', label: 'Data management' },
  { id: 'config', icon: 'tune', label: 'Configuration', disabled: true },
]

export function Sidebar({
  expanded = true,
  activeId = 'sop',
  items = defaultItems,
  bottomItems = defaultBottomItems,
  userName = 'Burton Guster',
  userRole = 'Administrator',
  userInitials = 'BG',
  onNavigate,
  notificationCount = 0,
  isMobile = false,
}: SidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ label: string; y: number } | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [userMenuPos, setUserMenuPos] = useState<{ bottom: number; left: number; width: number } | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const userBtnRef = useRef<HTMLDivElement>(null)
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!userMenuOpen) return
    function onPointerDown(e: PointerEvent) {
      if (userBtnRef.current?.contains(e.target as Node)) return
      setUserMenuOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [userMenuOpen])

  function openUserMenu() {
    if (!userBtnRef.current) return
    const r = userBtnRef.current.getBoundingClientRect()
    // Open upward from the user area
    setUserMenuPos({
      bottom: window.innerHeight - r.top + 4,
      left: r.left,
      width: Math.max(r.width, 220),
    })
    setUserMenuOpen(true)
  }

  function showTooltip(label: string, y: number) {
    if (tooltipTimer.current) clearTimeout(tooltipTimer.current)
    setTooltip(prev => (prev?.label === label ? prev : { label, y }))
    // Auto-dismiss after 1 s on touch devices (desktop hides on mouse-leave)
    tooltipTimer.current = setTimeout(() => {
      setTooltip(null)
      tooltipTimer.current = null
    }, 1000)
  }

  function hideTooltip() {
    if (tooltipTimer.current) { clearTimeout(tooltipTimer.current); tooltipTimer.current = null }
    setTooltip(null)
  }

  // onMouseOver bubbles from any child element (icons, spans, etc.)
  // closest() walks up from the actual target to find the nav item wrapper
  function handleSidebarMouseOver(e: React.MouseEvent<HTMLDivElement>) {
    if (expanded) return
    const item = (e.target as HTMLElement).closest<HTMLElement>('[data-navid]')
    if (!item) { hideTooltip(); return }
    const rect = item.getBoundingClientRect()
    showTooltip(item.dataset.navlabel ?? '', rect.top + rect.height / 2)
  }

  // onMouseOut fires when leaving any child — only clear when cursor exits the sidebar entirely
  function handleSidebarMouseOut(e: React.MouseEvent<HTMLDivElement>) {
    if (!sidebarRef.current?.contains(e.relatedTarget as Node)) {
      hideTooltip()
      setHoveredId(null)
    }
  }

  const width = expanded ? 216 : 48

  const sidebarStyle: React.CSSProperties = {
    width,
    minWidth: width,
    background: '#fff',
    border: '1px solid #EBEBEB',
    boxShadow: '0 2px 4px rgba(55,23,78,0.06), 0 4px 8px -2px rgba(55,23,78,0.10)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
    fontFamily: 'var(--font-ui)',
    position: 'relative',
    flexShrink: 0,
  }


  function getItemStyle(item: NavItem): React.CSSProperties {
    const isActive = item.id === activeId
    const isHovered = hoveredId === item.id
    return {
      display: 'flex',
      alignItems: 'center',
      height: 40,
      cursor: item.disabled ? 'not-allowed' : 'pointer',
      borderLeft: `3px solid ${isActive ? '#8342BB' : 'transparent'}`,
      paddingLeft: isActive ? 11 : 13,
      gap: 10,
      background: isActive
        ? 'rgba(131,66,187,0.08)'
        : isHovered && !item.disabled
        ? 'rgba(40,40,40,0.05)'
        : 'transparent',
      transition: 'background 0.1s',
      overflow: 'hidden',
      flexShrink: 0,
    }
  }

  function getIconStyle(item: NavItem): React.CSSProperties {
    const isActive = item.id === activeId
    return {
      fontSize: 20,
      flexShrink: 0,
      color: item.disabled ? '#BFBECE' : isActive ? '#8342BB' : '#5E5C75',
    }
  }

  function getLabelStyle(item: NavItem): React.CSSProperties {
    const isActive = item.id === activeId
    return {
      fontSize: 14,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: item.disabled ? '#BFBECE' : isActive ? '#7239A4' : '#282828',
      fontWeight: item.disabled ? 400 : isActive ? 500 : 400,
      opacity: expanded ? 1 : 0,
      transition: 'opacity 0.15s',
      minWidth: 0,
    }
  }

  function renderItem(item: NavItem) {
    return (
      <div
        key={item.id}
        data-navid={item.id}
        data-navlabel={item.label}
        style={getItemStyle(item)}
        onMouseEnter={() => { if (!item.disabled) setHoveredId(item.id) }}
        onMouseLeave={() => setHoveredId(null)}
        onClick={() => !item.disabled && onNavigate?.(item.id)}
        role="button"
        tabIndex={item.disabled ? -1 : 0}
        aria-disabled={item.disabled}
      >
        <span className="material-icons" style={getIconStyle(item)}>{item.icon}</span>
        <span style={getLabelStyle(item)}>{item.label}</span>
        {expanded && item.badge && item.badge > 0 && (
          <span style={{
            marginLeft: 'auto',
            marginRight: 8,
            background: '#8342BB',
            color: '#fff',
            fontSize: 10,
            fontWeight: 600,
            borderRadius: 10,
            padding: '0 5px',
            minWidth: 16,
            height: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {item.badge}
          </span>
        )}
      </div>
    )
  }

  return (
    <>
      <div
        ref={sidebarRef}
        style={sidebarStyle}
        onMouseOver={handleSidebarMouseOver}
        onMouseOut={handleSidebarMouseOut}
      >
        {/* Scrollable nav items */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
          {items.map(renderItem)}

          <div style={{ height: 1, background: '#F0F0F4', margin: '4px 0', flexShrink: 0 }} />

          {bottomItems.map(renderItem)}
        </div>

        {/* Pinned bottom controls — always visible */}
        <div style={{ flexShrink: 0 }}>
          {isMobile && <div style={{ height: 1, background: '#F0F0F4', margin: '4px 0' }} />}
          {[
            ...(isMobile ? [
              { id: '_notif', icon: 'notifications_none', label: 'Notifications', badge: notificationCount },
            ] : []),
            { id: '_help', icon: 'help_outline', label: 'Help' },
            { id: '_settings', icon: 'settings', label: 'Settings' },
          ].map((item) => (
            <div
              key={item.id}
              data-navid={item.id}
              data-navlabel={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 40,
                cursor: 'pointer',
                borderLeft: '3px solid transparent',
                paddingLeft: 13,
                gap: 10,
                background: hoveredId === item.id ? 'rgba(40,40,40,0.05)' : 'transparent',
                transition: 'background 0.1s',
                flexShrink: 0,
                position: 'relative',
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
            <span
              className="material-icons"
              style={{ fontSize: 20, flexShrink: 0, color: (item as {accent?:boolean}).accent ? '#8342BB' : '#5E5C75' }}
            >
              {item.icon}
            </span>
            {expanded && (
              <span style={{ fontSize: 14, color: '#282828', whiteSpace: 'nowrap', flex: 1 }}>{item.label}</span>
            )}
            {/* Notification badge */}
            {(item as {badge?:number}).badge != null && (item as {badge?:number}).badge! > 0 && (
              expanded ? (
                <span style={{
                  marginRight: 10,
                  background: '#E02F3A',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 600,
                  borderRadius: 10,
                  padding: '0 5px',
                  minWidth: 16,
                  height: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {(item as {badge?:number}).badge}
                </span>
              ) : (
                <span style={{
                  position: 'absolute',
                  top: 8,
                  left: 26,
                  width: 8,
                  height: 8,
                  background: '#E02F3A',
                  borderRadius: '50%',
                  border: '1.5px solid #fff',
                }} />
              )
            )}
          </div>
          ))}

          {/* User area — mobile only (desktop has this in the AppHeader) */}
          {isMobile && (
            <div
              ref={userBtnRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 52,
              padding: expanded ? '0 12px' : '0 12px',
              gap: 10,
              cursor: 'pointer',
              borderTop: '1px solid #F0F0F4',
              justifyContent: expanded ? 'flex-start' : 'center',
              flexShrink: 0,
              background: userMenuOpen || hoveredId === '_user' ? 'rgba(131,66,187,0.05)' : 'transparent',
              transition: 'background 0.1s',
            }}
            onMouseEnter={() => setHoveredId('_user')}
            onMouseLeave={() => setHoveredId(null)}
            onClick={openUserMenu}
          >
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#8342BB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 600,
              color: '#fff',
              flexShrink: 0,
              boxShadow: userMenuOpen ? '0 0 0 2px rgba(131,66,187,0.3)' : 'none',
              transition: 'box-shadow 0.15s',
            }}>
              {userInitials}
            </div>
            {expanded && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#282828', whiteSpace: 'nowrap' }}>{userName}</span>
                  <span style={{ fontSize: 11, color: '#8C8C8C', whiteSpace: 'nowrap' }}>{userRole}</span>
                </div>
                <span className="material-icons" style={{ fontSize: 16, color: '#BFBECE', flexShrink: 0 }}>
                  expand_less
                </span>
              </>
            )}
          </div>
        )}
        </div>{/* end pinned bottom */}
      </div>

      {!expanded && tooltip && createPortal(
        <div style={{
          position: 'fixed',
          left: 56,
          top: tooltip.y - 12,
          background: '#282828',
          color: '#fff',
          fontSize: 11,
          padding: '3px 8px',
          borderRadius: 5,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 2px 8px rgba(20,16,41,0.2)',
        }}>
          {tooltip.label}
        </div>,
        document.body
      )}

      {/* Mobile user menu — opens upward from avatar, rendered in portal to escape overflow:hidden */}
      {isMobile && userMenuOpen && userMenuPos && createPortal(
        <div style={{
          position: 'fixed',
          bottom: userMenuPos.bottom,
          left: userMenuPos.left,
          width: userMenuPos.width,
          background: '#fff',
          borderRadius: 10,
          border: '1px solid #E5E5EC',
          boxShadow: '0 -4px 24px rgba(55,23,78,0.13)',
          zIndex: 9999,
          overflow: 'hidden',
        }}>
          {/* User info header */}
          <div style={{ padding: '12px 14px 10px', borderBottom: '1px solid #F0F0F4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#8342BB', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
              }}>
                {userInitials}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#282828' }}>{userName}</div>
                <div style={{ fontSize: 11, color: '#8C8C8C', marginTop: 1 }}>{userRole}</div>
              </div>
            </div>
          </div>
          {/* Menu items */}
          {[
            { id: 'pref',     icon: 'settings',    label: 'Preferences',      chevron: false },
            { id: 'role',     icon: 'swap_horiz',  label: 'Switch role',      chevron: true  },
            { id: 'location', icon: 'location_on', label: 'Change location',  chevron: true  },
          ].map((item) => (
            <button
              key={item.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '11px 14px',
                background: hoveredId === `um-${item.id}` ? 'rgba(131,66,187,0.05)' : 'transparent',
                border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-ui)', fontSize: 14, color: '#282828', textAlign: 'left',
                transition: 'background 0.1s',
              }}
              onMouseEnter={() => setHoveredId(`um-${item.id}`)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setUserMenuOpen(false)}
            >
              <span className="material-icons" style={{ fontSize: 18, color: '#5E5C75' }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.chevron && <span className="material-icons" style={{ fontSize: 16, color: '#BFBECE' }}>chevron_right</span>}
            </button>
          ))}
          <div style={{ height: 1, background: '#F0F0F4', margin: '2px 0' }} />
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', padding: '11px 14px',
              background: hoveredId === 'um-logout' ? 'rgba(224,47,58,0.05)' : 'transparent',
              border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-ui)', fontSize: 14, color: '#E02F3A', textAlign: 'left',
              transition: 'background 0.1s',
            }}
            onMouseEnter={() => setHoveredId('um-logout')}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setUserMenuOpen(false)}
          >
            <span className="material-icons" style={{ fontSize: 18, color: '#E02F3A' }}>logout</span>
            Log out
          </button>
        </div>,
        document.body
      )}
    </>
  )
}
