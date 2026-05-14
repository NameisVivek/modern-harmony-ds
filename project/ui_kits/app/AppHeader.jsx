// Modern Harmony — App Header (matches Figma reference)
// White · dummy app icon · breadcrumbs with / separator · outlined assistant btn · favorites bar

// ── Dummy app icon (rounded square with panel grid) ──────────────────────────
const AppIcon = () => (
  <div style={{
    width: 32, height: 32, borderRadius: 8, background: '#282828',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  }}>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.9)"/>
      <rect x="10" y="2" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.5)"/>
      <rect x="2" y="10" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.5)"/>
      <rect x="10" y="10" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.3)"/>
    </svg>
  </div>
);

// ── Leo logo ──────────────────────────────────────────────────────────────────
const E2OpenLogo = () => (
  <img src="../../assets/logo-leo.png" alt="leo" style={{height:40,width:'auto',background:'#fff',borderRadius:6,padding:'2px 6px'}}/>
);

// ── Sparkle SVG ───────────────────────────────────────────────────────────────
const SparkleIcon = () => (
  <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
    <path d="M4.73 8.09L5.64 6.1L7.63 5.19L5.64 4.28L4.73 2.29L3.82 4.28L1.83 5.19L3.82 6.1L4.73 8.09ZM4.73 9.92L3.25 6.67L0 5.19L3.25 3.71L4.73 0.46L6.21 3.71L9.45 5.19L6.21 6.67L4.73 9.92ZM9.94 11.54L9.21 9.9L7.58 9.17L9.21 8.43L9.94 6.81L10.69 8.43L12.31 9.17L10.69 9.9L9.94 11.54Z" fill="#7239A4"/>
  </svg>
);

// ── Breadcrumbs with / separator ─────────────────────────────────────────────
const BREADCRUMBS = [
  { text: 'Supernatural Tracking System (STS)', hasDropdown: true, menu: ['Animal Transport', 'Zoo Management', 'Food Sourcing'] },
  { text: 'Crimes Against Nature',               hasDropdown: true, menu: ['My Workspace', 'Transport Request', 'Orders', 'Inquiries'] },
  { text: 'Resurrected Pets',                    hasDropdown: false },
];

const HeaderBreadcrumbs = () => {
  const [openIdx, setOpenIdx] = React.useState(null);
  const timers = React.useRef({});

  const open  = (i) => { clearTimeout(timers.current[i]); setOpenIdx(i); };
  const close = (i) => { timers.current[i] = setTimeout(() => setOpenIdx(o => o === i ? null : o), 160); };
  const keep  = (i) => clearTimeout(timers.current[i]);

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 0, height: '100%', overflow: 'hidden', flex: 1, minWidth: 0 }}>
      {BREADCRUMBS.map((bc, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span style={{ fontSize: 13, color: '#BFBECE', padding: '0 4px', flexShrink: 0 }}>/</span>
          )}
          <div
            style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}
            onMouseEnter={() => bc.hasDropdown && open(i)}
            onMouseLeave={() => bc.hasDropdown && close(i)}
          >
            <button
              style={{
                display: 'flex', alignItems: 'center', gap: 3,
                height: 28, padding: '0 6px', background: openIdx === i ? 'rgba(40,40,40,0.05)' : 'transparent',
                border: 'none', cursor: bc.hasDropdown ? 'pointer' : 'default',
                borderRadius: 5, fontFamily: "'Switzer',sans-serif", fontSize: 13,
                fontWeight: 400, color: '#282828', whiteSpace: 'nowrap',
              }}
            >
              {bc.text}
              {bc.hasDropdown && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M2 4L6 8L10 4" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>

            {/* Dropdown */}
            {bc.hasDropdown && openIdx === i && (
              <div
                onMouseEnter={() => keep(i)}
                onMouseLeave={() => close(i)}
                style={{
                  position: 'absolute', top: '100%', left: 0, zIndex: 300,
                  background: '#fff', borderRadius: 8, border: '1px solid #EBEBEB',
                  boxShadow: '0 4px 16px rgba(55,23,78,0.12)', minWidth: 200,
                  padding: '4px 0',
                }}
              >
                {bc.menu.map((m, mi) => (
                  <div
                    key={mi}
                    style={{ padding: '7px 14px', fontSize: 13, color: '#282828', cursor: 'pointer', fontFamily: "'Switzer',sans-serif" }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(131,66,187,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {m}
                  </div>
                ))}
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};

// ── User menu items ───────────────────────────────────────────────────────────
const USER_MENU_ITEMS = [
  { icon: 'sync_alt',  label: 'Switch role',       subMenu: ['Administrator', 'Demand planner', 'Financial planner'], sep: false },
  { icon: 'person',    label: 'Preferences',        sep: true },
  { icon: 'pin_drop',  label: 'Change location',    subMenu: ['Northeast', 'Northwest', 'Central', 'Southeast'], sep: false },
  { icon: 'settings',  label: 'Update preferences', sep: false },
  { icon: 'info',      label: 'About leo',       sep: true },
  { icon: 'support',   label: 'Contact support',    sep: false },
  { icon: 'logout',    label: 'Log out',            sep: false },
];

const UserMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [subIdx, setSubIdx] = React.useState(null);
  const closeT = React.useRef(null);

  const startClose  = () => { closeT.current = setTimeout(() => { setOpen(false); setSubIdx(null); }, 200); };
  const cancelClose = () => clearTimeout(closeT.current);

  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={startClose}
    >
      {/* Trigger */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '0 6px 0 8px', height: 40,
        borderRadius: 8, cursor: 'default',
        background: open ? 'rgba(40,40,40,0.05)' : 'transparent', transition: 'background 0.1s',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontFamily: "'Switzer',sans-serif", fontSize: 12, fontWeight: 600, color: '#282828', lineHeight: 1.3, whiteSpace: 'nowrap' }}>Allabastar Plasma Guicci</span>
          <span style={{ fontFamily: "'Switzer',sans-serif", fontSize: 11, fontWeight: 400, color: '#767676', lineHeight: 1.3, whiteSpace: 'nowrap' }}>Demand Planner</span>
        </div>
        {/* Dark avatar */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: '#282828',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Switzer',sans-serif", fontWeight: 600, fontSize: 11,
          color: '#fff', flexShrink: 0, letterSpacing: '0.03em',
        }}>
          AP
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={startClose}
          style={{
            position: 'absolute', top: 'calc(100% + 4px)', right: 0,
            background: '#fff', borderRadius: 10, border: '1px solid #EBEBEB',
            boxShadow: '0 4px 20px rgba(55,23,78,0.14)', minWidth: 220, zIndex: 500,
            paddingTop: 6, paddingBottom: 6,
          }}
        >
          <div style={{ padding: '6px 14px 10px', borderBottom: '1px solid #F0F0F4', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#282828', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Switzer',sans-serif", fontWeight: 600, fontSize: 11, color: '#fff', flexShrink: 0 }}>AP</div>
            <div>
              <div style={{ fontFamily: "'Switzer',sans-serif", fontSize: 13, fontWeight: 600, color: '#282828' }}>Allabastar Plasma Guicci</div>
              <div style={{ fontFamily: "'Switzer',sans-serif", fontSize: 11, color: '#767676' }}>Demand Planner</div>
            </div>
          </div>
          {USER_MENU_ITEMS.map((item, i) => (
            <React.Fragment key={i}>
              {item.sep && <div style={{ height: 1, background: '#F0F0F4', margin: '4px 0' }} />}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setSubIdx(item.subMenu ? i : null)}
                onMouseLeave={() => setSubIdx(null)}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', cursor: 'pointer', background: subIdx === i && item.subMenu ? 'rgba(131,66,187,0.06)' : 'transparent' }}
                  onMouseEnter={e => { if (!item.subMenu) e.currentTarget.style.background = 'rgba(40,40,40,0.05)'; }}
                  onMouseLeave={e => { if (!item.subMenu) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span className="material-icons" style={{ fontSize: 16, color: '#5E5C75' }}>{item.icon}</span>
                  <span style={{ fontFamily: "'Switzer',sans-serif", fontSize: 13, color: '#282828', flex: 1 }}>{item.label}</span>
                  {item.subMenu && <span className="material-icons" style={{ fontSize: 14, color: '#BFBECE' }}>chevron_right</span>}
                </div>
                {item.subMenu && subIdx === i && (
                  <div style={{ position: 'absolute', left: '100%', top: 0, background: '#fff', borderRadius: 10, border: '1px solid #EBEBEB', boxShadow: '0 4px 16px rgba(55,23,78,0.12)', minWidth: 180, padding: '4px 0', zIndex: 600 }}>
                    {item.subMenu.map((s, si) => (
                      <div key={si} style={{ padding: '7px 14px', fontSize: 13, color: '#282828', fontFamily: "'Switzer',sans-serif", cursor: 'pointer' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(131,66,187,0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Icon button ───────────────────────────────────────────────────────────────
const IconBtn = ({ icon, title, badge }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button
        title={title}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hov ? 'rgba(40,40,40,0.06)' : 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6,
        }}
      >
        <span className="material-icons" style={{ fontSize: 20, color: '#5E5C75' }}>{icon}</span>
      </button>
      {badge > 0 && (
        <div style={{ position: 'absolute', top: 4, right: 3, minWidth: 14, height: 14, padding: '0 3px', background: '#E02F3A', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff', fontFamily: "'Switzer',sans-serif", border: '1.5px solid #fff', pointerEvents: 'none' }}>
          {badge}
        </div>
      )}
    </div>
  );
};

// ── Favorites bar ─────────────────────────────────────────────────────────────
const FAVORITES = [
  { label: 'Favorite Group',    hasDropdown: true,  external: false },
  { label: 'Inquiries Search',  hasDropdown: true,  external: false },
  { label: 'My Watch List',     hasDropdown: true,  external: false },
  { label: 'Admin Stuff',       hasDropdown: true,  external: false },
  { label: 'Favorite 1',        hasDropdown: false, external: false },
  { label: 'Favorite 2',        hasDropdown: false, external: false },
  { label: 'Favorite 3',        hasDropdown: false, external: false },
  { label: 'External Link',     hasDropdown: false, external: true  },
  { label: 'External Link 2',   hasDropdown: false, external: true  },
  { label: 'External Link 3',   hasDropdown: false, external: true  },
  { label: 'External Link 3',   hasDropdown: false, external: true  },
  { label: 'External Group',    hasDropdown: true,  external: false },
];

const FavoritesBar = () => (
  <div style={{
    height: 32, background: '#fff', borderBottom: '1px solid #EBEBEB',
    display: 'flex', alignItems: 'center', padding: '0 10px', gap: 4, overflow: 'hidden',
  }}>
    {FAVORITES.map((fav, i) => (
      <button key={i} style={{
        display: 'flex', alignItems: 'center', gap: 4, height: 24, padding: '0 8px',
        background: 'transparent', border: '1px solid #DDDDE5', borderRadius: 12,
        cursor: 'pointer', fontFamily: "'Switzer',sans-serif", fontSize: 11, fontWeight: 400,
        color: '#282828', whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.1s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(131,66,187,0.06)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        {/* Leading icon */}
        {fav.external ? (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="3" width="8" height="8" rx="1.5" stroke="#8C8C8C" strokeWidth="1.2" fill="none"/>
            <path d="M7 1h4v4M11 1L6 6" stroke="#8C8C8C" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="#8C8C8C" strokeWidth="1.2"/>
          </svg>
        )}
        {fav.label}
        {fav.hasDropdown && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 3.5L5 6.5L8 3.5" stroke="#8C8C8C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    ))}
    {/* More button */}
    <button style={{
      display: 'flex', alignItems: 'center', gap: 3, height: 24, padding: '0 8px',
      background: 'transparent', border: '1px solid #DDDDE5', borderRadius: 12,
      cursor: 'pointer', fontFamily: "'Switzer',sans-serif", fontSize: 11, color: '#282828',
      whiteSpace: 'nowrap', flexShrink: 0,
    }}
      onMouseEnter={e => e.currentTarget.style.background = '#F0F0F4'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      more
      <span style={{ fontSize: 14, color: '#8C8C8C' }}>…</span>
    </button>
  </div>
);

// ── Main App Header ───────────────────────────────────────────────────────────
const AppHeader = ({ onToggleSidebar, sidebarExpanded }) => {
  const [searchFocused, setSearchFocused] = React.useState(false);

  return (
    <div style={{ flexShrink: 0, zIndex: 100 }}>
      {/* ── Main row ── */}
      <header style={{
        height: 48, background: '#fff', display: 'flex', alignItems: 'center',
        borderBottom: '1px solid #EBEBEB', padding: '0 10px 0 12px',
        gap: 10,
      }}>

        {/* Logo area: app icon + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <AppIcon />
          <E2OpenLogo />
        </div>

        {/* Breadcrumbs — flex 1, truncates */}
        <HeaderBreadcrumbs />

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, marginLeft: 'auto' }}>

          {/* Search — pill shape, grey fill, icon right */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, height: 32, width: 240,
            padding: '0 12px', borderRadius: 20,
            background: searchFocused ? '#E0E0E8' : '#E8E8EE',
            border: 'none',
            boxShadow: searchFocused ? '0 0 0 2px rgba(131,66,187,0.2)' : 'none',
            transition: 'all 0.15s', cursor: 'text',
          }}>
            <input
              type="text" placeholder="What are you looking for?"
              onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: "'Switzer',sans-serif", fontSize: 13, color: '#282828' }}
            />
            <span className="material-icons" style={{ fontSize: 18, color: '#8C8C8C', flexShrink: 0 }}>search</span>
          </div>

          {/* Assistant — outlined violet */}
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px',
              background: 'transparent', border: '1px solid #8342BB', borderRadius: 20,
              cursor: 'pointer', fontFamily: "'Switzer',sans-serif", fontSize: 12, fontWeight: 500, color: '#7239A4',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(131,66,187,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <SparkleIcon />
            Assistant
          </button>

          {/* Bell */}
          <IconBtn icon="notifications_none" title="Notifications" badge={0} />

          {/* More (three dots) */}
          <IconBtn icon="more_vert" title="More options" badge={0} />

          {/* Thin divider */}
          <div style={{ width: 1, height: 20, background: '#EBEBEB', flexShrink: 0 }} />

          {/* User */}
          <UserMenu />
        </div>
      </header>

      {/* ── Favorites bar ── */}
      <FavoritesBar />
    </div>
  );
};

Object.assign(window, { AppHeader });
