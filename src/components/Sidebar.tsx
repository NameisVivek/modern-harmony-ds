import { useState, useRef } from 'react'
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
}: SidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ label: string; y: number } | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // onMouseOver bubbles from any child element (icons, spans, etc.)
  // closest() walks up from the actual target to find the nav item wrapper
  function handleSidebarMouseOver(e: React.MouseEvent<HTMLDivElement>) {
    if (expanded) return
    const item = (e.target as HTMLElement).closest<HTMLElement>('[data-navid]')
    if (!item) { setTooltip(null); return }
    const rect = item.getBoundingClientRect()
    const y = rect.top + rect.height / 2
    const label = item.dataset.navlabel ?? ''
    setTooltip(prev => (prev?.label === label ? prev : { label, y }))
  }

  // onMouseOut fires when leaving any child — only clear when cursor exits the sidebar entirely
  function handleSidebarMouseOut(e: React.MouseEvent<HTMLDivElement>) {
    if (!sidebarRef.current?.contains(e.relatedTarget as Node)) {
      setTooltip(null)
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
        {items.map(renderItem)}

        <div style={{ height: 1, background: '#F0F0F4', margin: '4px 0', flexShrink: 0 }} />

        {bottomItems.map(renderItem)}

        <div style={{ flex: 1, minHeight: 20 }} />

        {[
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
            }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <span className="material-icons" style={{ fontSize: 20, flexShrink: 0, color: '#5E5C75' }}>{item.icon}</span>
            {expanded && (
              <span style={{ fontSize: 14, color: '#282828', whiteSpace: 'nowrap' }}>{item.label}</span>
            )}
          </div>
        ))}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 44,
            padding: expanded ? '0 10px' : '0 12px',
            gap: 8,
            cursor: 'pointer',
            borderTop: '1px solid #F0F0F4',
            justifyContent: expanded ? 'flex-start' : 'center',
            flexShrink: 0,
            background: hoveredId === '_user' ? 'rgba(40,40,40,0.04)' : 'transparent',
            transition: 'background 0.1s',
          }}
          onMouseEnter={() => setHoveredId('_user')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: '#8342BB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 9,
            fontWeight: 500,
            color: '#fff',
            flexShrink: 0,
          }}>
            {userInitials}
          </div>
          {expanded && (
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#282828', whiteSpace: 'nowrap' }}>{userName}</span>
              <span style={{ fontSize: 10, color: '#8C8C8C', whiteSpace: 'nowrap' }}>{userRole}</span>
            </div>
          )}
        </div>
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
    </>
  )
}
