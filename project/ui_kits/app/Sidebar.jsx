// Modern Harmony — Sidebar Component
// Collapsible left nav: 48px collapsed / 216px expanded

const NAV_GROUPS = [
  {
    items: [
      { icon: 'home', label: 'Dashboard', id: 'dashboard' },
      { icon: 'insert_chart_outlined', label: 'S&OP Planning', id: 'sop' },
      { icon: 'calendar_today', label: 'Forecast', id: 'forecast' },
      { icon: 'assignment', label: 'Orders', id: 'orders' },
      { icon: 'local_shipping', label: 'Shipments', id: 'shipments' },
      { icon: 'bar_chart', label: 'Reports', id: 'reports' },
    ]
  },
  {
    divider: true,
    items: [
      { icon: 'storage', label: 'Data management', id: 'data' },
      { icon: 'tune', label: 'Configuration', id: 'config' },
    ]
  }
];

const BOTTOM_NAV = [
  { icon: 'help_outline', label: 'Help', id: 'help' },
  { icon: 'settings', label: 'Settings', id: 'settings' },
];

const SidebarItem = ({ item, expanded, active, onClick }) => (
  <div
    role="button"
    tabIndex={0}
    onClick={() => onClick(item.id)}
    title={!expanded ? item.label : undefined}
    style={{
      display: 'flex', alignItems: 'center', gap: 0,
      height: 40, cursor: 'pointer', position: 'relative',
      background: active ? 'rgba(131,66,187,0.08)' : 'transparent',
      borderLeft: active ? '4px solid #8342BB' : '4px solid transparent',
      paddingLeft: active ? 10 : 10,
    }}
  >
    <span className="material-icons" style={{ fontSize: 20, color: active ? '#8342BB' : '#5E5C75', flexShrink: 0, width: 24, textAlign: 'center' }}>
      {item.icon}
    </span>
    {expanded && (
      <span style={{
        fontFamily: "'Switzer',sans-serif", fontSize: 14,
        fontWeight: active ? 500 : 400,
        color: active ? '#7239A4' : '#282828',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        marginLeft: 10,
      }}>
        {item.label}
      </span>
    )}
  </div>
);

const Sidebar = ({ expanded, activeId, onNavigate }) => {
  return (
    <aside style={{
      width: expanded ? 216 : 48, flexShrink: 0,
      background: '#fff',
      borderRight: '1px solid #EBEBEB',
      boxShadow: '0px 2px 4px rgba(55,23,78,0.06), 0px 4px 8px -2px rgba(55,23,78,0.12)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.2s ease-out',
      overflow: 'hidden', zIndex: 90,
    }}>
      {/* Main nav */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 8, overflowY: 'auto', overflowX: 'hidden' }}>
        {NAV_GROUPS.map((group, gi) => (
          <React.Fragment key={gi}>
            {group.divider && (
              <div style={{ height: 1, background: '#F0F0F4', margin: '6px 0' }} />
            )}
            {group.items.map(item => (
              <SidebarItem
                key={item.id} item={item} expanded={expanded}
                active={activeId === item.id}
                onClick={onNavigate}
              />
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom: settings + user */}
      <div style={{ flexShrink: 0, borderTop: '1px solid #F0F0F4', paddingBottom: 4 }}>
        {BOTTOM_NAV.map(item => (
          <SidebarItem
            key={item.id} item={item} expanded={expanded}
            active={activeId === item.id}
            onClick={onNavigate}
          />
        ))}
        {/* User row */}
        <div style={{
          display: 'flex', alignItems: 'center', height: 44, paddingLeft: 10,
          cursor: 'pointer', gap: 10,
          borderTop: '1px solid #F0F0F4', marginTop: 2,
        }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#8342BB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Switzer',sans-serif", fontWeight: 500, fontSize: 9, color: '#fff', flexShrink: 0 }}>
            JD
          </div>
          {expanded && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontFamily: "'Switzer',sans-serif", fontSize: 13, fontWeight: 500, color: '#282828', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Jane Doe</div>
              <div style={{ fontFamily: "'Switzer',sans-serif", fontSize: 10, color: '#8C8C8C', whiteSpace: 'nowrap' }}>Supply Planner</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

Object.assign(window, { Sidebar, SidebarItem });
