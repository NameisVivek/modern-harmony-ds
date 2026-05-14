// Modern Harmony — Main Dashboard Content
// S&OP Landing: starred pages, KPI widgets, forecast calendar, data grid

const KPI_CARDS = [
  { label: 'Open Orders',       value: '12,847', unit: 'units',  trend: '+3.2%', dir: 'up',      icon: 'list_alt',      color: '#8342BB' },
  { label: 'On-time Delivery',  value: '94.2',   unit: '%',      trend: '−1.1%', dir: 'down',    icon: 'local_shipping', color: '#27854D' },
  { label: 'Forecast Accuracy', value: '87.6',   unit: '%',      trend: '+0.8%', dir: 'up',      icon: 'assessment',    color: '#0066CC' },
  { label: 'Active Shipments',  value: '3,241',  unit: '',       trend: 'Stable', dir: 'neutral', icon: 'flight_takeoff', color: '#C47A00' },
];

const STARRED = [
  { initials: 'LT', label: 'Long-term Plan',     bg: '#F0F0F4', border: '#BFBECE', text: '#5E5C75' },
  { initials: 'LH', label: 'Lead-time Horizon',  bg: '#ECE4F5', border: '#B9ACE8', text: '#7239A4' },
  { initials: 'LF', label: 'Logistics Forecast', bg: '#C5F3DF', border: '#A1EECC', text: '#27854D' },
  { initials: 'LE', label: 'Lane Explorer',       bg: '#C0E0FF', border: '#3399FF', text: '#0066CC' },
  { initials: 'LN', label: 'Live Networks',       bg: '#FFEDC0', border: '#FFB84D', text: '#C47A00' },
];

const FORECAST = [
  { label: 'Aug',      val: '48,291', bg: '#8B8AA5', color: '#fff'     },
  { label: 'Sep',      val: '51,034', bg: '#BFBECE', color: '#282828'  },
  { label: 'Oct',      val: '49,876', bg: '#C6C7D2', color: '#282828'  },
  { label: 'Nov',      val: '52,410', bg: '#DDDDE5', color: '#282828'  },
  { label: 'Dec ←',   val: '54,012', bg: '#A1EECC', color: '#27854D', today: true },
  { label: 'Jan 25',   val: '56,800', bg: '#ECE4F5', color: '#7239A4'  },
  { label: 'Feb',      val: '58,200', bg: '#E4DAEF', color: '#7239A4'  },
  { label: 'Mar',      val: '59,100', bg: '#B9ACE8', color: '#4D3075'  },
  { label: 'Q2 2025',  val: '62,400', bg: '#B49AD6', color: '#4D3075'  },
];

const GRID_ROWS = [
  { id: 'ORD-48201', origin: 'Shanghai, CN',  dest: 'Los Angeles, US', sku: 'SKU-9483', qty: '1,240', eta: '15 Jan 2025', status: 'In transit', sc: 'info'    },
  { id: 'ORD-48199', origin: 'Hamburg, DE',   dest: 'New York, US',    sku: 'SKU-2917', qty: '876',   eta: '18 Jan 2025', status: 'Delayed',    sc: 'error'   },
  { id: 'ORD-48198', origin: 'Singapore, SG', dest: 'Sydney, AU',      sku: 'SKU-6641', qty: '2,100', eta: '22 Jan 2025', status: 'On track',   sc: 'success' },
  { id: 'ORD-48195', origin: 'Rotterdam, NL', dest: 'Montreal, CA',    sku: 'SKU-1182', qty: '543',   eta: '10 Jan 2025', status: 'Warning',    sc: 'warning' },
  { id: 'ORD-48192', origin: 'Tokyo, JP',     dest: 'Seattle, US',     sku: 'SKU-7720', qty: '3,800', eta: '25 Jan 2025', status: 'In transit', sc: 'info'    },
];

const STATUS = {
  info:    { bg: '#C0E0FF', text: '#0066CC', dot: '#3399FF' },
  error:   { bg: '#FFCDD0', text: '#B02530', dot: '#E02F3A' },
  success: { bg: '#C5F3DF', text: '#27854D', dot: '#5BD6A0' },
  warning: { bg: '#FFEDC0', text: '#C47A00', dot: '#FFB84D' },
};

/* ── KPI Card ── */
const KPICard = ({ label, value, unit, trend, dir, icon, color }) => {
  const trendColor = dir === 'up' ? '#27854D' : dir === 'down' ? '#E02F3A' : '#767676';
  const trendIcon  = dir === 'up' ? 'trending_up' : dir === 'down' ? 'trending_down' : 'trending_flat';
  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #EBEBEB', padding: '16px 18px', boxShadow: '0 2px 4px rgba(55,23,78,0.06),0 4px 8px -2px rgba(55,23,78,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: "'Switzer',sans-serif", fontSize: 12, color: '#767676' }}>{label}</span>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-icons" style={{ fontSize: 16, color }}>{icon}</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: "'Roboto Mono',monospace", fontWeight: 500, fontSize: 24, color: '#282828', lineHeight: 1 }}>{value}</span>
        {unit && <span style={{ fontFamily: "'Switzer',sans-serif", fontSize: 12, color: '#767676' }}>{unit}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <span className="material-icons" style={{ fontSize: 14, color: trendColor }}>{trendIcon}</span>
        <span style={{ fontFamily: "'Switzer',sans-serif", fontSize: 11, color: trendColor, fontWeight: 500 }}>{trend}</span>
        <span style={{ fontFamily: "'Switzer',sans-serif", fontSize: 10, color: '#8C8C8C', marginLeft: 2 }}>vs last period</span>
      </div>
    </div>
  );
};

/* ── Data Grid ── */
const GridTable = () => {
  const th = { padding: '0 12px', fontFamily: "'Inter','Switzer',sans-serif", fontSize: 10.5, fontWeight: 500, color: '#5E5C75', letterSpacing: '0.03em', height: 32, textAlign: 'left', background: '#F0F0F4', borderBottom: '1px solid #DDDDE5', whiteSpace: 'nowrap' };
  const td = { padding: '0 12px', fontFamily: "'Switzer',sans-serif", fontSize: 13, color: '#282828', height: 32 };
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {['Order ID','Origin','Destination','SKU','Qty','ETA','Status',''].map((h, i) => (
            <th key={i} style={{ ...th, textAlign: i === 4 ? 'right' : 'left' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {GRID_ROWS.map((row, i) => {
          const s = STATUS[row.sc];
          return (
            <tr key={row.id} style={{ background: i % 2 === 1 ? '#F0F0F4' : '#fff', borderBottom: '1px solid #EBEBEB' }}>
              <td style={{ ...td, color: '#7239A4', fontWeight: 500 }}>{row.id}</td>
              <td style={td}>{row.origin}</td>
              <td style={td}>{row.dest}</td>
              <td style={{ ...td, fontFamily: "'Roboto Mono',monospace", fontSize: 12, color: '#767676' }}>{row.sku}</td>
              <td style={{ ...td, textAlign: 'right', fontFamily: "'Roboto Mono',monospace" }}>{row.qty}</td>
              <td style={td}>{row.eta}</td>
              <td style={td}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 9999, background: s.bg, color: s.text, fontSize: 11, fontWeight: 500, fontFamily: "'Switzer',sans-serif" }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
                  {row.status}
                </span>
              </td>
              <td style={{ ...td, width: 36 }}>
                <button style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 4 }}>
                  <span className="material-icons" style={{ fontSize: 16, color: '#8C8C8C' }}>more_vert</span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

/* ── Btn helpers ── */
const PrimaryBtn = ({ icon, children }) => (
  <button style={{ height: 32, padding: '0 14px', background: '#8342BB', backgroundImage: 'linear-gradient(180deg,rgba(255,255,255,0.08) 0%,transparent 100%)', color: '#fff', border: 'none', borderRadius: 8, fontFamily: "'Switzer',sans-serif", fontWeight: 500, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, boxShadow: '0 1px 2px rgba(55,23,78,0.25)' }}>
    {icon && <span className="material-icons" style={{ fontSize: 15 }}>{icon}</span>}{children}
  </button>
);
const DefaultBtn = ({ icon, children }) => (
  <button style={{ height: 32, padding: '0 12px', background: '#fff', color: '#282828', border: '1px solid #DDDDE5', borderRadius: 8, fontFamily: "'Switzer',sans-serif", fontWeight: 500, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, boxShadow: '0 1px 2px rgba(55,23,78,0.06)' }}>
    {icon && <span className="material-icons" style={{ fontSize: 15 }}>{icon}</span>}{children}
  </button>
);

/* ── Main content ── */
const MainContent = () => (
  <main style={{ flex: 1, overflowY: 'auto', background: '#F0F0F4', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
    {/* Page header */}
    <div style={{ background: '#fff', borderBottom: '1px solid #EBEBEB', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
      <div>
        <div style={{ fontFamily: "'Roboto Mono',monospace", fontWeight: 500, fontSize: 17, color: '#282828', lineHeight: 1 }}>S&amp;OP Planning</div>
        <div style={{ fontFamily: "'Switzer',sans-serif", fontSize: 12, color: '#8C8C8C', marginTop: 3 }}>Sales &amp; Operations Planning · Demand / Supply Balancing</div>
      </div>
      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 9999, background: 'rgba(131,66,187,0.1)', color: '#7239A4', fontSize: 10, fontWeight: 500, fontFamily: "'Switzer',sans-serif" }}>S&amp;OP</span>
      <div style={{ flex: 1 }} />
      <DefaultBtn icon="filter_list">Filters</DefaultBtn>
      <DefaultBtn icon="cloud_download">Export</DefaultBtn>
      <PrimaryBtn icon="add">New scenario</PrimaryBtn>
    </div>

    {/* Scrollable content */}
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* Starred pages */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span className="material-icons" style={{ fontSize: 15, color: '#C47A00' }}>star</span>
          <span style={{ fontFamily: "'Switzer',sans-serif", fontWeight: 500, fontSize: 12, color: '#5E5C75' }}>Starred</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {STARRED.map(p => (
            <div key={p.initials} style={{ flex: 1, background: '#fff', borderRadius: 10, border: '1px solid #EBEBEB', padding: '10px 12px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(55,23,78,0.05)', display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: p.bg, border: `1px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: "'Switzer',sans-serif", fontWeight: 500, fontSize: 9, color: p.text }}>{p.initials}</span>
              </div>
              <span style={{ fontFamily: "'Switzer',sans-serif", fontSize: 12, fontWeight: 500, color: '#282828', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* KPI widgets */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {KPI_CARDS.map(c => <KPICard key={c.label} {...c} />)}
      </section>

      {/* Forecast calendar */}
      <section>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #EBEBEB', boxShadow: '0 1px 2px rgba(55,23,78,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px', borderBottom: '1px solid #EBEBEB', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-icons" style={{ fontSize: 15, color: '#8342BB' }}>calendar_today</span>
            <span style={{ fontFamily: "'Switzer',sans-serif", fontWeight: 500, fontSize: 13, color: '#282828' }}>Forecast Calendar</span>
            <div style={{ flex: 1 }} />
            <span style={{ fontFamily: "'Switzer',sans-serif", fontSize: 11, color: '#8C8C8C' }}>Unit: 000s · Rolling 9 months</span>
          </div>
          <div style={{ display: 'flex' }}>
            {FORECAST.map((m, i) => (
              <div key={i} style={{ flex: 1, borderRight: i < FORECAST.length - 1 ? '1px solid rgba(255,255,255,0.35)' : 'none', borderLeft: m.today ? '2px solid #27854D' : 'none' }}>
                <div style={{ padding: '5px 4px', textAlign: 'center', background: m.bg, borderBottom: '1px solid rgba(0,0,0,0.05)', fontFamily: "'Switzer',sans-serif", fontSize: 9.5, fontWeight: 500, color: m.color, letterSpacing: '0.02em' }}>{m.label}</div>
                <div style={{ padding: '7px 4px', textAlign: 'center', background: m.bg }}>
                  <div style={{ fontFamily: "'Roboto Mono',monospace", fontWeight: 500, fontSize: 12, color: m.color }}>{m.val}</div>
                  {m.today && <div style={{ width: 4, height: 4, background: '#27854D', borderRadius: '50%', margin: '3px auto 0' }} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order lines grid */}
      <section>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #EBEBEB', boxShadow: '0 1px 2px rgba(55,23,78,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px', borderBottom: '1px solid #EBEBEB', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="material-icons" style={{ fontSize: 15, color: '#8342BB' }}>table_rows</span>
            <span style={{ fontFamily: "'Switzer',sans-serif", fontWeight: 500, fontSize: 13, color: '#282828' }}>Order lines</span>
            <span style={{ fontFamily: "'Switzer',sans-serif", fontSize: 11, color: '#8C8C8C' }}>12,847 records</span>
            <div style={{ flex: 1 }} />
            <DefaultBtn icon="search">Search</DefaultBtn>
            <DefaultBtn icon="filter_list">Filters</DefaultBtn>
          </div>
          <GridTable />
        </div>
      </section>
    </div>
  </main>
);

Object.assign(window, { MainContent, KPICard, GridTable });
