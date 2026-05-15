import { useState, useEffect } from 'react'

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return m
}
import {
  AppHeader,
  Sidebar,
  NavItem,
  Button,
  ButtonGroup,
  Badge,
  Tag,
  Alert,
  Progress,
  Stepper,
  Modal,
  Drawer,
  Tooltip,
  ActionSheet,
  CommandBar,
  MegaNav,
  Input,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Textarea,
  Slider,
  DatePicker,
  FileUpload,
  UploadFile,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  Pagination,
  Segments,
  Breadcrumbs,
  TreeView,
  TreeNode,
  DataGrid,
  Column,
  KPIWidget,
  FieldValuePairs,
  Accordion,
  AccordionItem,
  Card,
  Well,
  SectionHeading,
  PingPong,
  PingPongItem,
  SearchBar,
  SearchResult,
  FilterChip,
  PageFooter,
  Avatar,
  Notification,
  NotificationList,
  EmptyState,
  LineChart,
  BarChart,
  DonutChart,
  HorizontalBarChart,
  AreaChart,
} from './components'

// ── Shared style tokens ────────────────────────────────────────────────────────

const SL: React.CSSProperties = {
  fontSize: 9,
  fontWeight: 600,
  color: '#8C8C8C',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 12,
  fontFamily: 'var(--font-ui)',
}

const EC: React.CSSProperties = {
  background: '#fff',
  borderRadius: 10,
  border: '1px solid #EBEBEB',
  padding: '16px 18px',
}

const ROW: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  flexWrap: 'wrap',
}

const DIVIDER: React.CSSProperties = { height: 1, background: '#F0F0F4', margin: '4px 0' }

const PAGE_TITLE: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  color: '#282828',
  fontFamily: 'Switzer, var(--font-ui)',
  marginBottom: 4,
  letterSpacing: '-0.02em',
}

const PAGE_SUB: React.CSSProperties = {
  fontSize: 13,
  color: '#5E5C75',
  fontFamily: 'var(--font-ui)',
  marginBottom: 20,
}

// ── Section: Colors & Tokens ───────────────────────────────────────────────────

function Swatch({ hex, name, star }: { hex: string; name: string; star?: boolean }) {
  const dark = parseInt(hex.replace('#',''), 16) < 0x888888 * 1.2
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ height: 40, borderRadius: 6, background: hex, border: '1px solid rgba(0,0,0,0.06)' }} />
      <div style={{ marginTop: 4, fontSize: 8, fontWeight: 600, color: '#282828', fontFamily: 'var(--font-ui)' }}>
        {name}{star ? ' ★' : ''}
      </div>
      <div style={{ fontSize: 7.5, color: '#767676', fontFamily: 'Roboto Mono, monospace' }}>{hex}</div>
    </div>
  )
}

function SemanticGroup({ label, ramp, keys }: { label: string; ramp: string[]; keys: { name: string; hex: string; dark?: boolean }[] }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 9, fontWeight: 500, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5, fontFamily: 'var(--font-ui)' }}>{label}</div>
      <div className="ds-palette-row" style={{ gap: 3, marginBottom: 8 }}>
        {ramp.map((c, i) => <div key={i} style={{ flex: 1, minWidth: 28, height: 28, borderRadius: 4, background: c, border: '1px solid rgba(0,0,0,0.06)' }} />)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {keys.map((k) => (
          <div key={k.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 7px', borderRadius: 5, border: '1px solid rgba(0,0,0,0.06)', background: k.hex }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: k.dark ? '#fff' : k.hex === '#fff' ? '#ccc' : '#282828', border: k.dark ? 'none' : '1px solid rgba(0,0,0,0.15)' }} />
            <div style={{ fontSize: 9, fontWeight: 500, flex: 1, color: k.dark ? '#fff' : '#282828', fontFamily: 'var(--font-ui)' }}>{k.name}</div>
            <div style={{ fontSize: 8, color: k.dark ? 'rgba(255,255,255,0.7)' : '#8C8C8C', fontFamily: 'Roboto Mono, monospace' }}>{k.hex}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ColorsSection() {
  return (
    <div>
      <div style={PAGE_TITLE}>Colors & Tokens</div>
      <div style={PAGE_SUB}>All 4 color groups: brand, neutral, semantic, and forecast</div>

      {/* ── Group 1: Brand Colors ── */}
      <div style={EC}>
        <div style={SL}>Group 1 — Brand Colors</div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#282828', fontFamily: 'var(--font-ui)', marginBottom: 6 }}>Violet — Brand Accent</div>
          <div className="ds-palette-row" style={{ gap: 3 }}>
            {[
              ['10','#FCFCFF'],['25','#F9F6FE'],['50','#F2ECF8'],['75','#ECE4F5'],
              ['100','#CABAEF'],['200','#C0B4E8'],['225','#B4A4E0'],['300','#B49AD6'],
              ['400','#A27CCF'],['500','#8863D2'],['600','#8342BB'],['675','#7239A4'],
              ['700','#68349C'],['775','#4D3075'],['800','#4E2975'],['900','#37174E'],
            ].map(([n, c]) => <Swatch key={n} hex={c} name={n} star={['600','675'].includes(n)} />)}
          </div>
        </div>
        <div style={DIVIDER} />
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#282828', fontFamily: 'var(--font-ui)', marginBottom: 6 }}>Carbon — Brand near-black &amp; neutral gray</div>
          <div className="ds-palette-row" style={{ gap: 3 }}>
            {[
              ['10','#F6F6F6'],['25','#EAEAEA'],['50','#DCDCDC'],['100','#C8C8C8'],
              ['200','#A8A8A8'],['400','#787878'],['600','#484848'],['800','#282828'],['900','#141414'],
            ].map(([n, c]) => <Swatch key={n} hex={c} name={n} star={['800'].includes(n)} />)}
          </div>
        </div>
      </div>

      {/* ── Group 2: Neutral Colors ── */}
      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Group 2 — Neutral Colors</div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#282828', fontFamily: 'var(--font-ui)', marginBottom: 6 }}>Cool Gray — Purple-tinted (borders, surfaces, grid)</div>
          <div className="ds-palette-row" style={{ gap: 3 }}>
            {[
              ['25','#F8F8FA'],['50 ★','#F0F0F4'],['75','#E5E5EC'],['100 ★','#DDDDE5'],
              ['150 ★','#C6C7D2'],['200 ★','#BFBECE'],['300','#A4A3B9'],['400 ★','#8B8AA5'],
              ['500','#797390'],['600 ★','#5E5C75'],['800','#474557'],
            ].map(([n, c]) => <Swatch key={n} hex={c} name={n} />)}
          </div>
        </div>
        <div style={DIVIDER} />
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#282828', fontFamily: 'var(--font-ui)', marginBottom: 6 }}>Gray — No color cast (text, icons, disabled)</div>
          <div className="ds-palette-row" style={{ gap: 3 }}>
            {[
              ['25 ★','#FBFBFB'],['50','#F7F7F7'],['75','#EBEBEB'],['100','#DDDDDD'],
              ['150','#CCCCCC'],['200','#BFBFBF'],['300','#A4A4A4'],['400','#8C8C8C'],
              ['500','#767676'],['600','#5E5E5E'],['800','#282828'],
            ].map(([n, c]) => <Swatch key={n} hex={c} name={n} />)}
          </div>
        </div>
      </div>

      {/* ── Group 3: Semantic Colors ── */}
      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Group 3 — Semantic Colors</div>
        <div className="ds-grid-4" style={{ gap: 16 }}>
          <SemanticGroup label="Error" ramp={['#FEF7F4','#FBECE9','#F9E3DF','#F6D7D6','#F0B0AE','#ED8885','#EA5F5B','#E02F3A','#C0172D','#9A112C','#760824','#420519']}
            keys={[{name:'subtle',hex:'#FEF7F4'},{name:'base',hex:'#F6D7D6'},{name:'strong',hex:'#E02F3A',dark:true},{name:'fg',hex:'#9A112C',dark:true}]} />
          <SemanticGroup label="Success" ramp={['#EEFEF9','#DDFAEE','#C5F3DF','#A1EECC','#5BD6A0','#02A15A','#027B44','#27854D','#1A6B39','#12512A','#0B3A1E','#072411']}
            keys={[{name:'subtle',hex:'#EEFEF9'},{name:'base',hex:'#C5F3DF'},{name:'strong',hex:'#027B44',dark:true},{name:'fg',hex:'#1A6B39',dark:true}]} />
          <SemanticGroup label="Warning" ramp={['#FFFDEF','#FFF9EB','#FFEDC0','#FFD878','#FDBF14','#E89A00','#C47A00','#A05F00','#7A4600','#563000','#381E00','#1F1000']}
            keys={[{name:'subtle',hex:'#FFFDEF'},{name:'base',hex:'#FFD878'},{name:'strong',hex:'#C47A00',dark:true},{name:'fg',hex:'#7A4600',dark:true}]} />
          <SemanticGroup label="Info" ramp={['#EEF6FF','#DBF0FF','#C0E5FF','#9DD7FF','#6DC2FF','#3DAAFF','#0D8FEF','#0070CC','#0058A8','#00407A','#002E5A','#001C38']}
            keys={[{name:'subtle',hex:'#EEF6FF'},{name:'base',hex:'#9DD7FF'},{name:'strong',hex:'#0070CC',dark:true},{name:'fg',hex:'#0058A8',dark:true}]} />
        </div>
      </div>

      {/* ── Group 4: Forecast Colors ── */}
      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Group 4 — Forecast / Time Series Colors</div>
        <div className="ds-scroll-x" style={{ marginBottom: 12 }}><div style={{ display: 'flex', gap: 0, border: '1px solid #EBEBEB', borderRadius: 8, overflow: 'hidden', minWidth: 480 }}>
          {[
            { month: 'Aug', bg: '#8B8AA5', val: '48,291', lbl: 'cool-400', dark: true },
            { month: 'Sep', bg: '#BFBECE', val: '51,034', lbl: 'cool-200', dark: false },
            { month: 'Oct', bg: '#C6C7D2', val: '49,876', lbl: 'cool-150', dark: false },
            { month: 'Nov', bg: '#DDDDE5', val: '52,410', lbl: 'cool-100', dark: false },
            { month: 'Dec ← Now', bg: '#A1EECC', val: '54,012', lbl: 'green-100', dark: false, today: true },
            { month: 'Jan 25', bg: '#ECE4F5', val: '56,800', lbl: 'violet-75', dark: false },
            { month: 'Feb', bg: '#CABAEF', val: '58,200', lbl: 'violet-100', dark: false },
            { month: 'Mar', bg: '#B4A4E0', val: '59,100', lbl: 'violet-225', dark: false },
            { month: 'Q2 2025', bg: '#B49AD6', val: '62,400', lbl: 'violet-300', dark: false },
          ].map((col, i) => (
            <div key={i} style={{ flex: 1, border: col.today ? '2px solid #27854D' : 'none', marginLeft: col.today ? -1 : 0 }}>
              <div style={{ padding: '5px 4px', background: col.bg, textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                <div style={{ fontSize: 9, fontWeight: 500, color: col.dark ? '#fff' : col.today ? '#27854D' : '#282828', fontFamily: 'var(--font-ui)', whiteSpace: 'nowrap' }}>{col.month}</div>
              </div>
              <div style={{ padding: '8px 4px', background: col.bg, textAlign: 'center' }}>
                <div style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 9, fontWeight: 500, color: col.dark ? '#fff' : col.today ? '#27854D' : '#282828' }}>{col.val}</div>
                <div style={{ fontSize: 7, color: col.dark ? 'rgba(255,255,255,0.65)' : col.today ? '#27854D' : '#5E5C75', marginTop: 2, fontFamily: 'var(--font-ui)' }}>{col.lbl}</div>
              </div>
            </div>
          ))}
        </div></div>{/* /ds-scroll-x */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 500, color: '#8C8C8C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5, fontFamily: 'var(--font-ui)' }}>Past — cool gray scale</div>
            {[['cool-50','#F0F0F4'],['cool-100','#DDDDE5'],['cool-150','#C6C7D2'],['cool-200','#BFBECE'],['cool-400','#8B8AA5']].map(([n,c]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <div style={{ width: 18, height: 18, borderRadius: 3, background: c, border: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }} />
                <span style={{ fontSize: 9, color: '#282828', fontFamily: 'var(--font-ui)' }}>{n}</span>
                <span style={{ fontSize: 8, color: '#767676', fontFamily: 'Roboto Mono, monospace', marginLeft: 'auto' }}>{c}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 500, color: '#8C8C8C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5, fontFamily: 'var(--font-ui)' }}>Present — green</div>
            {[['green-100','#A1EECC'],['green-500','#027B44']].map(([n,c]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <div style={{ width: 18, height: 18, borderRadius: 3, background: c, border: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }} />
                <span style={{ fontSize: 9, color: '#282828', fontFamily: 'var(--font-ui)' }}>{n}</span>
                <span style={{ fontSize: 8, color: '#767676', fontFamily: 'Roboto Mono, monospace', marginLeft: 'auto' }}>{c}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 500, color: '#8C8C8C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5, fontFamily: 'var(--font-ui)' }}>Future — violet scale</div>
            {[['violet-75','#ECE4F5'],['violet-100','#CABAEF'],['violet-225','#B4A4E0'],['violet-300','#B49AD6']].map(([n,c]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <div style={{ width: 18, height: 18, borderRadius: 3, background: c, border: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }} />
                <span style={{ fontSize: 9, color: '#282828', fontFamily: 'var(--font-ui)' }}>{n}</span>
                <span style={{ fontSize: 8, color: '#767676', fontFamily: 'Roboto Mono, monospace', marginLeft: 'auto' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Decision Tokens ── */}
      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Decision Tokens</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { token: '--dec-color-brand-base',       hex: '#8342BB', label: 'Brand Base' },
            { token: '--dec-color-text-body',         hex: '#282828', label: 'Text Body' },
            { token: '--dec-color-text-label',        hex: '#5E5C75', label: 'Text Label' },
            { token: '--dec-color-text-hint',         hex: '#8C8C8C', label: 'Text Hint' },
            { token: '--dec-color-surface',           hex: '#FFFFFF', label: 'Surface' },
            { token: '--dec-color-surface-subtle',    hex: '#F0F0F4', label: 'Surface Subtle' },
            { token: '--dec-color-success-strong',    hex: '#027B44', label: 'Success Strong' },
            { token: '--dec-color-error-strong',      hex: '#E02F3A', label: 'Error Strong' },
            { token: '--dec-color-warning-strong',    hex: '#C47A00', label: 'Warning Strong' },
            { token: '--dec-color-info-strong',       hex: '#0070CC', label: 'Info Strong' },
          ].map((t) => (
            <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: t.hex, border: '1px solid #EBEBEB', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 11, color: '#7239A4' }}>{t.token}</div>
                <div style={{ fontSize: 11, color: '#8C8C8C', fontFamily: 'var(--font-ui)' }}>{t.label}</div>
              </div>
              <div style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 11, color: '#5E5C75' }}>{t.hex}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Section: Typography ────────────────────────────────────────────────────────

function TypographySection() {
  return (
    <div>
      <div style={PAGE_TITLE}>Typography</div>
      <div style={PAGE_SUB}>Switzer (display), system-ui (UI), Roboto Mono (code)</div>

      <div style={EC}>
        <div style={SL}>Display — Switzer</div>
        {([
          [36, 700, 'Supply chain intelligence, reimagined.'],
          [28, 700, 'Demand planning & S&OP dashboard'],
          [22, 600, 'Order fulfillment summary — Q1 2024'],
          [18, 500, 'Forecast variance by SKU and region'],
          [15, 400, 'Inventory levels are within acceptable thresholds across all active warehouses.'],
        ] as [number, number, string][]).map(([size, weight, text]) => (
          <div key={size} style={{ fontFamily: 'Switzer, sans-serif', fontSize: size, fontWeight: weight, color: '#282828', marginBottom: 10, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
            {text}
          </div>
        ))}
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>UI Scale — System Font</div>
        <div className="ds-grid-2" style={{ gap: 16 }}>
          {([
            ['Body / 14px Regular', 14, 400, 'Inventory levels are within acceptable thresholds across all regional warehouses.'],
            ['Body / 14px Medium', 14, 500, 'Updated shipment status requires your immediate attention.'],
            ['Small / 13px', 13, 400, 'Last synced 2 minutes ago via ERP connector.'],
            ['Caption / 11px', 11, 600, 'STATUS: PENDING REVIEW · SKU-7821'],
          ] as [string, number, number, string][]).map(([label, sz, wt, text]) => (
            <div key={label}>
              <div style={SL}>{label}</div>
              <div style={{ fontSize: sz, fontWeight: wt, color: '#282828', fontFamily: 'var(--font-ui)', lineHeight: 1.5 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Monospace — Roboto Mono</div>
        <div style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 13, color: '#5E5C75', background: '#F5F5F9', borderRadius: 6, padding: '14px 16px', lineHeight: 1.8 }}>
          <span style={{ color: '#8342BB' }}>const</span>{' '}forecast = <span style={{ color: '#027B44' }}>await</span>{' '}
          planningEngine.<span style={{ color: '#0D4C89' }}>compute</span>({'{'}<br />
          &nbsp;&nbsp;horizon: <span style={{ color: '#C47A00' }}>90</span>, unit: <span style={{ color: '#E02F3A' }}>"days"</span>, sku: <span style={{ color: '#E02F3A' }}>"SKU-42A"</span><br />
          {'}'})
        </div>
      </div>
    </div>
  )
}

// ── Section: Buttons ───────────────────────────────────────────────────────────

function ButtonsSection() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [bgGroup, setBgGroup] = useState('week')

  const handleLoad = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1500)
    setTimeout(() => setDone(false), 3200)
  }

  return (
    <div>
      <div style={PAGE_TITLE}>Buttons</div>
      <div style={PAGE_SUB}>Interactive action components across variants, sizes and states</div>

      <div className="ds-grid-2" style={{ gap: 12 }}>
        <div style={EC}>
          <div style={SL}>Variants</div>
          <div style={ROW}>
            <Button variant="primary">Primary</Button>
            <Button variant="default">Default</Button>
            <Button variant="borderless">Borderless</Button>
            <Button variant="inline">Inline</Button>
            <Button variant="selected">Selected</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        <div style={EC}>
          <div style={SL}>Sizes</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" size="xl">X-Large</Button>
          </div>
        </div>

        <div style={EC}>
          <div style={SL}>With Icons</div>
          <div style={ROW}>
            <Button variant="primary" iconLeft="add">Add Record</Button>
            <Button variant="default" iconLeft="cloud_download">Export</Button>
            <Button variant="default" iconRight="arrow_forward">Continue</Button>
            <Button variant="borderless" iconOnly="refresh" />
            <Button variant="borderless" iconOnly="filter_list" />
            <Button variant="borderless" iconOnly="more_horiz" />
          </div>
        </div>

        <div style={EC}>
          <div style={SL}>Loading & Done States</div>
          <div style={ROW}>
            <Button variant="primary" loading={loading} done={done} onClick={handleLoad}>
              {done ? 'Saved!' : loading ? 'Saving…' : 'Save Changes'}
            </Button>
            <Button variant="primary" disabled iconLeft="lock">Locked</Button>
            <Button variant="default" disabled>Disabled</Button>
          </div>
        </div>

        <div style={{ ...EC, background: '#282828' }}>
          <div style={{ ...SL, color: 'rgba(255,255,255,0.4)' }}>On Dark</div>
          <div style={ROW}>
            <Button variant="on-dark">On Dark</Button>
            <Button variant="on-dark" iconLeft="star">Favorite</Button>
            <Button variant="on-dark" iconOnly="notifications_none" />
            <Button variant="on-dark" disabled>Disabled</Button>
          </div>
        </div>

        <div style={EC}>
          <div style={SL}>Split Button</div>
          <div style={ROW}>
            <Button
              variant="primary"
              split
              splitItems={[
                { label: 'Save as draft', icon: 'edit_note', onClick: () => {} },
                { label: 'Save and publish', icon: 'cloud_upload', onClick: () => {} },
                { label: 'Schedule publish', icon: 'schedule', onClick: () => {} },
              ]}
            >
              Publish
            </Button>
            <Button
              variant="default"
              split
              splitItems={[
                { label: 'Export as CSV', icon: 'download', onClick: () => {} },
                { label: 'Export as XLSX', icon: 'table_chart', onClick: () => {} },
              ]}
            >
              Export
            </Button>
          </div>
        </div>

        <div style={{ ...EC, gridColumn: '1 / -1' }}>
          <div style={SL}>Button Group</div>
          <div style={ROW}>
            <ButtonGroup
              options={[
                { value: 'day', label: 'Day' },
                { value: 'week', label: 'Week' },
                { value: 'month', label: 'Month' },
                { value: 'quarter', label: 'Quarter' },
              ]}
              value={bgGroup}
              onChange={setBgGroup}
            />
            <ButtonGroup
              options={[
                { value: 'list', label: 'List', icon: 'view_list' },
                { value: 'grid', label: 'Grid', icon: 'grid_view' },
              ]}
              value="list"
              variant="primary"
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section: Form Controls ─────────────────────────────────────────────────────

function FormSection() {
  const [inputVal, setInputVal] = useState('')
  const [selectVal, setSelectVal] = useState('apac')
  const [multiVal, setMultiVal] = useState<string[]>([])
  const [checkA, setCheckA] = useState(true)
  const [checkB, setCheckB] = useState(false)
  const [radioVal, setRadioVal] = useState('90d')
  const [sw1, setSw1] = useState(true)
  const [sw2, setSw2] = useState(false)
  const [textarea, setTextarea] = useState('')
  const [sliderVal, setSliderVal] = useState(68)
  const [dateVal, setDateVal] = useState<Date | null>(new Date())
  const [files, setFiles] = useState<UploadFile[]>([
    { id: '1', name: 'forecast_q1.xlsx', size: 84320, status: 'done' },
  ])

  return (
    <div>
      <div style={PAGE_TITLE}>Form Controls</div>
      <div style={PAGE_SUB}>Inputs, selects, checkboxes, radios, switches, textarea, date picker</div>

      <div className="ds-grid-2" style={{ gap: 12 }}>
        <div style={EC}>
          <div style={SL}>Text Input</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Input label="Order Number" placeholder="e.g. ORD-2024-0042" value={inputVal} onChange={setInputVal} prefixIcon="receipt_long" />
            <Input label="Search" placeholder="Search records…" prefixIcon="search" />
            <Input label="With hint" hint="Enter the full 8-digit product code" placeholder="SKU-XXXXX" />
            <Input label="Error state" value="invalid@" error="Must be a valid email" onChange={() => {}} />
            <Input label="Disabled" value="LOCKED-VALUE" disabled prefixIcon="lock" />
          </div>
        </div>

        <div style={EC}>
          <div style={SL}>Select</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Select
              label="Warehouse Region"
              options={[
                { value: 'apac', label: 'Asia Pacific' },
                { value: 'emea', label: 'Europe / ME / Africa' },
                { value: 'amer', label: 'Americas' },
                { value: 'latam', label: 'Latin America' },
              ]}
              value={selectVal}
              onChange={(v) => setSelectVal(v as string)}
            />
            <Select
              label="Product Categories"
              options={[
                { value: 'electronics', label: 'Electronics' },
                { value: 'apparel', label: 'Apparel' },
                { value: 'food', label: 'Food & Beverage' },
                { value: 'industrial', label: 'Industrial' },
              ]}
              value={multiVal}
              onChange={(v) => setMultiVal(v as string[])}
              multiple
              searchable
              placeholder="Select categories…"
            />
            <Select
              label="Priority (error)"
              options={[{ value: 'h', label: 'High' }, { value: 'm', label: 'Medium' }]}
              value=""
              onChange={() => {}}
              error="This field is required"
              placeholder="Select priority…"
            />
          </div>
        </div>

        <div style={EC}>
          <div style={SL}>Checkbox</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Checkbox label="Enable real-time sync" checked={checkA} onChange={setCheckA} />
            <Checkbox label="Notify on threshold breach" checked={checkB} onChange={setCheckB} hint="Sends email alerts" />
            <Checkbox label="Include archived records" checked={false} onChange={() => {}} />
            <Checkbox label="Indeterminate state" indeterminate checked={false} onChange={() => {}} />
            <Checkbox label="Disabled option" checked disabled />
          </div>
        </div>

        <div style={EC}>
          <div style={SL}>Radio Group</div>
          <RadioGroup value={radioVal} onChange={setRadioVal} label="Planning Horizon">
            <Radio value="30d" label="30 days" hint="Short-term forecast" />
            <Radio value="90d" label="90 days" hint="Quarterly planning window" />
            <Radio value="180d" label="180 days" hint="Semi-annual view" />
            <Radio value="365d" label="365 days" hint="Full year projection" disabled />
          </RadioGroup>
        </div>

        <div style={EC}>
          <div style={SL}>Switches</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Switch label="Live data feed" checked={sw1} onChange={setSw1} />
            <Switch label="Auto-refresh (5 min)" checked={sw2} onChange={setSw2} hint="Refreshes the dashboard automatically" />
            <Switch label="Email digests" checked size="sm" onChange={() => {}} />
            <Switch label="Advanced analytics" checked disabled />
          </div>
        </div>

        <div style={EC}>
          <div style={SL}>Textarea</div>
          <Textarea
            label="Order Notes"
            placeholder="Add notes or special instructions…"
            value={textarea}
            onChange={setTextarea}
            rows={4}
            maxLength={300}
            hint="Optional handling instructions"
          />
        </div>

        <div style={EC}>
          <div style={SL}>Slider</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Slider min={0} max={100} value={sliderVal} onChange={setSliderVal} showValue label="Confidence threshold" />
            <Slider min={1} max={12} value={3} onChange={() => {}} showValue label="Forecast horizon (months)" />
            <Slider min={0} max={100} value={0} onChange={() => {}} disabled label="Disabled" />
          </div>
        </div>

        <div style={EC}>
          <div style={SL}>Date Picker</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <DatePicker label="Delivery Date" value={dateVal} onChange={setDateVal} />
            <DatePicker label="With Time" value={dateVal} onChange={setDateVal} showTime />
            <DatePicker label="Disabled" value={null} onChange={() => {}} disabled />
          </div>
        </div>

        <div style={{ ...EC, gridColumn: '1 / -1' }}>
          <div style={SL}>File Upload</div>
          <FileUpload
            accept=".xlsx,.csv,.pdf"
            multiple
            files={files}
            onUpload={(newFiles) => {
              const uploaded: UploadFile[] = newFiles.map((f, i) => ({
                id: String(Date.now() + i),
                name: f.name,
                size: f.size,
                status: 'done' as const,
              }))
              setFiles((prev) => [...prev, ...uploaded])
            }}
            onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
          />
        </div>
      </div>
    </div>
  )
}

// ── Section: Feedback ──────────────────────────────────────────────────────────

function FeedbackSection() {
  const [step, setStep] = useState(1)

  return (
    <div>
      <div style={PAGE_TITLE}>Feedback</div>
      <div style={PAGE_SUB}>Alerts, badges, tags, progress indicators, and steppers</div>

      <div className="ds-grid-2" style={{ gap: 12 }}>
        <div style={EC}>
          <div style={SL}>Alert Variants</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Alert variant="info" title="Sync in progress" message="Data is being synchronized from upstream systems." />
            <Alert variant="success" title="Export complete" message="Your report has been exported successfully." dismissible />
            <Alert variant="warning" title="Inventory low" message="SKU-7829 is below minimum threshold." action="View SKU" onAction={() => {}} />
            <Alert variant="error" title="Connection failed" message="Unable to reach the planning service." action="Retry" onAction={() => {}} secondaryAction="Dismiss" />
            <Alert variant="violet" title="New features available" message="Modern Harmony 2.4 includes improved forecasting tools." action="Learn more" onAction={() => {}} dismissible />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={EC}>
            <div style={SL}>Badges</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success" dot>On Track</Badge>
              <Badge variant="warning" dot>At Risk</Badge>
              <Badge variant="error" dot>Critical</Badge>
              <Badge variant="high-risk">High Risk</Badge>
              <Badge variant="info">In Transit</Badge>
              <Badge variant="dark">Archived</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success" icon="check_circle">Verified</Badge>
            </div>
          </div>

          <div style={EC}>
            <div style={SL}>Tags</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <Tag variant="accent">Supply Chain</Tag>
              <Tag variant="neutral">Q1 2024</Tag>
              <Tag variant="success">Fulfilled</Tag>
              <Tag variant="error">Returned</Tag>
              <Tag variant="warning">Delayed</Tag>
              <Tag variant="info">In Review</Tag>
              <Tag variant="accent" removable onRemove={() => {}}>Removable</Tag>
            </div>
          </div>

          <div style={EC}>
            <div style={SL}>Progress</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Progress variant="linear" value={72} label="Order fulfillment" />
              <Progress variant="linear" value={45} color="warning" label="Inventory utilization" />
              <Progress variant="linear" value={93} color="success" label="On-time delivery rate" />
              <Progress variant="linear" indeterminate label="Processing…" />
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 4 }}>
                <Progress variant="circular" value={72} />
                <Progress variant="circular" value={45} color="warning" size="lg" />
                <Progress variant="circular" indeterminate />
                <Progress variant="circular" value={93} color="success" size="sm" />
              </div>
            </div>
          </div>
        </div>

        <div style={{ ...EC, gridColumn: '1 / -1' }}>
          <div style={SL}>Stepper</div>
          <Stepper
            current={step}
            steps={[
              { label: 'Upload data', sublabel: 'Step 1', description: 'Import your forecast file' },
              { label: 'Map fields', sublabel: 'Step 2', description: 'Match columns to schema' },
              { label: 'Review & validate', sublabel: 'Step 3', description: 'Check for errors' },
              { label: 'Publish', sublabel: 'Step 4', description: 'Go live with new forecast' },
            ]}
          />
          <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
            <Button variant="default" size="sm" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>
            <Button variant="primary" size="sm" disabled={step >= 3} onClick={() => setStep((s) => Math.min(3, s + 1))}>Continue</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section: Navigation ────────────────────────────────────────────────────────

const treeNodes: TreeNode[] = [
  {
    id: 'region-apac', label: 'APAC Region', icon: 'public', iconColor: '#027B44',
    children: [
      { id: 'wh-shanghai', label: 'Shanghai DC', icon: 'warehouse', meta: '1,240 SKUs', badge: 3, badgeVariant: 'default' },
      { id: 'wh-singapore', label: 'Singapore Hub', icon: 'warehouse', meta: '890 SKUs' },
      { id: 'wh-sydney', label: 'Sydney DC', icon: 'warehouse', meta: '420 SKUs', badge: 1, badgeVariant: 'default' },
    ],
  },
  {
    id: 'region-na', label: 'North America', icon: 'public', iconColor: '#8342BB',
    children: [
      { id: 'wh-la', label: 'Los Angeles DC', icon: 'warehouse', meta: '2,100 SKUs' },
      {
        id: 'wh-chicago', label: 'Chicago Hub', icon: 'warehouse', meta: '1,450 SKUs',
        children: [
          { id: 'zone-a', label: 'Zone A — Cold Storage', icon: 'ac_unit', meta: '120 SKUs' },
          { id: 'zone-b', label: 'Zone B — Dry Goods', icon: 'inventory_2', meta: '830 SKUs' },
        ],
      },
    ],
  },
  { id: 'region-emea', label: 'EMEA', icon: 'public', iconColor: '#E89A00' },
]

function NavigationSection() {
  const [tabId, setTabId] = useState('overview')
  const [page, setPage] = useState(3)
  const [segment, setSegment] = useState('week')
  const [treeSelected, setTreeSelected] = useState('wh-shanghai')
  const [megaActiveItem, setMegaActiveItem] = useState('sop')

  return (
    <div>
      <div style={PAGE_TITLE}>Navigation</div>
      <div style={PAGE_SUB}>MegaNav, breadcrumbs, tabs, tree view, pagination, and segment controls</div>

      {/* MegaNav */}
      <div style={{ ...EC, padding: 0, overflow: 'hidden', marginBottom: 12 }}>
        <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid #F0F0F4' }}>
          <div style={SL}>Mega Navigation</div>
        </div>
        <MegaNav
          logo={<span style={{ fontFamily: 'Switzer, var(--font-ui)', fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>leo</span>}
          menus={[
            {
              id: 'planning',
              label: 'Planning',
              featured: {
                label: 'What\'s new',
                title: 'AI-powered demand forecasting',
                body: 'Leverage machine learning to predict demand patterns across your supply chain with 94% accuracy.',
                linkLabel: 'See release notes',
                onLink: () => {},
              },
              columns: [
                {
                  heading: 'Planning',
                  items: [
                    { id: 'sop', label: 'S&OP Planning', description: 'Sales and operations planning cycles', icon: 'assessment', iconBg: 'rgba(131,66,187,0.1)', iconColor: '#8342BB' },
                    { id: 'demand', label: 'Demand Forecast', description: 'AI-powered demand prediction', icon: 'trending_up', iconBg: '#F0F0F4', iconColor: '#5E5C75' },
                    { id: 'capacity', label: 'Capacity Planning', description: 'Resource and capacity management', icon: 'speed', iconBg: '#F0F0F4', iconColor: '#5E5C75' },
                  ],
                },
                {
                  heading: 'Execution',
                  items: [
                    { id: 'orders', label: 'Order Management', description: 'End-to-end order lifecycle', icon: 'receipt_long', iconBg: '#F0F0F4', iconColor: '#5E5C75' },
                    { id: 'inventory', label: 'Inventory Control', description: 'Real-time stock visibility', icon: 'inventory_2', iconBg: '#F0F0F4', iconColor: '#5E5C75' },
                    { id: 'shipments', label: 'Shipments', description: 'Track and manage shipments', icon: 'local_shipping', iconBg: '#DDFAEE', iconColor: '#027B44' },
                  ],
                },
              ],
            },
            {
              id: 'analytics',
              label: 'Analytics',
              columns: [
                {
                  heading: 'Reports',
                  items: [
                    { id: 'kpi', label: 'KPI Dashboard', description: 'Real-time performance metrics', icon: 'dashboard', iconBg: '#F0F0F4', iconColor: '#5E5C75' },
                    { id: 'custom', label: 'Custom Reports', description: 'Build and schedule reports', icon: 'bar_chart', iconBg: '#F0F0F4', iconColor: '#5E5C75' },
                  ],
                },
              ],
            },
          ]}
          activeMenuId={megaActiveItem}
          onNavigate={setMegaActiveItem}
          trailingContent={
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#8342BB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: '#fff', marginLeft: 'auto', cursor: 'pointer', flexShrink: 0 }}>DS</div>
          }
        />
      </div>

      <div style={EC}>
        <div style={SL}>Breadcrumbs</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'S&OP Planning', href: '#' }, { label: 'Demand Forecast' }]} />
          <Breadcrumbs items={[{ label: 'Supply Chain', href: '#' }, { label: 'Inventory', href: '#' }, { label: 'Warehouse A', href: '#' }, { label: 'SKU Detail' }]} />
        </div>
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Tabs — Composite</div>
        <Tabs
          active={tabId}
          onChange={setTabId}
          tabs={[
            { id: 'overview', label: 'Overview', content: (
              <div style={{ padding: '12px 0', color: '#5E5C75', fontSize: 13, fontFamily: 'var(--font-ui)' }}>
                Summary metrics and KPIs for the selected planning horizon.
              </div>
            )},
            { id: 'forecast', label: 'Forecast', badge: 3, content: (
              <div style={{ padding: '12px 0', color: '#5E5C75', fontSize: 13, fontFamily: 'var(--font-ui)' }}>
                Demand forecast data and variance analysis.
              </div>
            )},
            { id: 'history', label: 'History', content: (
              <div style={{ padding: '12px 0', color: '#5E5C75', fontSize: 13, fontFamily: 'var(--font-ui)' }}>
                Historical order data and trend analysis.
              </div>
            )},
            { id: 'settings', label: 'Settings', disabled: true, content: null },
          ]}
        />
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Tabs — Primitives</div>
        <TabList>
          <Tab id="t-a" label="Active tab" active onClick={() => {}} />
          <Tab id="t-b" label="Inactive" onClick={() => {}} />
          <Tab id="t-c" label="With badge" badge={5} onClick={() => {}} />
          <Tab id="t-d" label="Disabled" disabled onClick={() => {}} />
        </TabList>
        <TabPanel id="t-a" active>
          <div style={{ fontSize: 13, color: '#5E5C75', fontFamily: 'var(--font-ui)' }}>
            Tab panel content area.
          </div>
        </TabPanel>
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Segments</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Segments
            options={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
              { value: 'quarter', label: 'Quarter' },
            ]}
            value={segment}
            onChange={setSegment}
          />
          <Segments
            options={[
              { value: 'list', label: <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="material-icons" style={{ fontSize: 14 }}>view_list</span>List</span> },
              { value: 'grid', label: <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="material-icons" style={{ fontSize: 14 }}>grid_view</span>Grid</span> },
              { value: 'chart', label: <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="material-icons" style={{ fontSize: 14 }}>bar_chart</span>Chart</span> },
            ]}
            value="list"
            variant="violet"
            onChange={() => {}}
          />
        </div>
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Pagination</div>
        <Pagination total={248} page={page} pageSize={25} onChange={(p) => setPage(p)} />
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Tree View</div>
        <TreeView
          selected={treeSelected}
          onSelect={setTreeSelected}
          defaultExpanded={['region-apac', 'region-na']}
          nodes={treeNodes}
        />
      </div>
    </div>
  )
}

// ── Section: Overlays ──────────────────────────────────────────────────────────

function OverlaysSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [actionSheetOpen, setActionSheetOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)

  return (
    <div>
      <div style={PAGE_TITLE}>Overlays</div>
      <div style={PAGE_SUB}>Modals, drawers, tooltips, command bar, and action sheets</div>

      <div className="ds-grid-2" style={{ gap: 12 }}>
        <div style={EC}>
          <div style={SL}>Modal</div>
          <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm Export"
            footer={
              <>
                <Button variant="default" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setModalOpen(false)}>Export</Button>
              </>
            }
          >
            <p style={{ margin: 0, fontSize: 13, color: '#5E5C75', fontFamily: 'var(--font-ui)', lineHeight: 1.6 }}>
              You are about to export <strong style={{ color: '#282828' }}>248 records</strong> from the demand planning dataset. The export will be formatted as XLSX and emailed to your registered address.
            </p>
          </Modal>
        </div>

        <div style={EC}>
          <div style={SL}>Drawer</div>
          <Button variant="default" iconLeft="tune" onClick={() => setDrawerOpen(true)}>Open Filters</Button>
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            title="Filter Records"
            width={320}
            footer={
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="default" size="sm" onClick={() => setDrawerOpen(false)}>Clear all</Button>
                <Button variant="primary" size="sm" onClick={() => setDrawerOpen(false)}>Apply filters</Button>
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Select
                label="Status"
                options={[{ value: 'all', label: 'All statuses' }, { value: 'pending', label: 'Pending' }, { value: 'active', label: 'Active' }]}
                value="all"
                onChange={() => {}}
              />
              <Select
                label="Region"
                options={[{ value: 'na', label: 'North America' }, { value: 'eu', label: 'Europe' }]}
                value=""
                onChange={() => {}}
                placeholder="All regions"
              />
              <DatePicker label="Date from" value={null} onChange={() => {}} />
              <Checkbox label="Show only flagged" checked={false} onChange={() => {}} />
              <Checkbox label="Include archived" checked={false} onChange={() => {}} />
            </div>
          </Drawer>
        </div>

        <div style={EC}>
          <div style={SL}>Tooltip</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Tooltip content="Refresh data from source systems" position="top">
              <Button variant="default" iconOnly="refresh" />
            </Tooltip>
            <Tooltip content="Download selected records as CSV" position="bottom">
              <Button variant="default" iconOnly="download" />
            </Tooltip>
            <Tooltip content="Configure columns" position="right">
              <Button variant="default" iconOnly="view_column" />
            </Tooltip>
            <Tooltip content={<span>Rich <strong>tooltip</strong> content</span>} position="top" variant="light">
              <Button variant="borderless" iconLeft="info_outline" size="sm">Hover for info</Button>
            </Tooltip>
          </div>
        </div>

        <div style={EC}>
          <div style={SL}>Action Sheet</div>
          <Button variant="default" iconLeft="more_vert" onClick={() => setActionSheetOpen(true)}>More Actions</Button>
          <ActionSheet
            open={actionSheetOpen}
            onClose={() => setActionSheetOpen(false)}
            title="Record Actions"
            actions={[
              { id: 'edit', label: 'Edit record', icon: 'edit', description: 'Modify this forecast entry' },
              { id: 'duplicate', label: 'Duplicate', icon: 'content_copy', description: 'Create a copy of this record' },
              { id: 'export', label: 'Export data', icon: 'download' },
              { id: 'share', label: 'Share link', icon: 'share' },
              { id: 'delete', label: 'Delete record', icon: 'delete', variant: 'destructive' },
            ]}
            onAction={() => setActionSheetOpen(false)}
          />
        </div>

        <div style={{ ...EC, gridColumn: '1 / -1' }}>
          <div style={SL}>Command Bar</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <Button variant="default" iconLeft="search" onClick={() => setCmdOpen(true)}>Open Command Bar</Button>
            <span style={{ fontSize: 12, color: '#8C8C8C', fontFamily: 'var(--font-ui)' }}>Or press ⌘K</span>
          </div>
          <CommandBar
            open={cmdOpen}
            onClose={() => setCmdOpen(false)}
            onSelect={() => setCmdOpen(false)}
          />
          <div style={{ border: '1px solid #EBEBEB', borderRadius: 10, overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid #F0F0F4', display: 'flex', alignItems: 'center', gap: 8, background: '#fff' }}>
              <span className="material-icons" style={{ fontSize: 20, color: '#8C8C8C', fontFamily: 'Material Icons' }}>search</span>
              <span style={{ flex: 1, fontSize: 15, color: '#8C8C8C', fontFamily: 'var(--font-ui)' }}>Search or type a command…</span>
              <span style={{ fontSize: 10, color: '#8C8C8C', border: '1px solid #DDDDE5', borderRadius: 4, padding: '2px 5px', fontFamily: 'var(--font-ui)' }}>Esc</span>
            </div>
            {[
              { icon: 'assessment', label: 'S&OP Planning — December cycle', hint: 'Opened 2 hours ago', group: 'Recent' },
              { icon: 'local_shipping', label: 'Shipments — APAC region', hint: 'Opened yesterday', group: 'Recent' },
              { icon: 'add', label: 'New planning scenario', shortcut: '⌘N', group: 'Actions' },
              { icon: 'cloud_download', label: 'Export current view', shortcut: '⌘E', group: 'Actions' },
            ].map((item, i, arr) => (
              <div key={item.label}>
                {(i === 0 || arr[i - 1].group !== item.group) && (
                  <div style={{ padding: '8px 14px 4px', fontSize: 9, fontWeight: 500, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-ui)' }}>{item.group}</div>
                )}
                {i === 2 && <div style={{ height: 1, background: '#F0F0F4', margin: '4px 0' }} />}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', background: i === 0 ? 'rgba(131,66,187,0.06)' : 'transparent' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', background: i === 0 ? 'rgba(131,66,187,0.1)' : '#F0F0F4' }}>
                    <span className="material-icons" style={{ fontSize: 15, color: i === 0 ? '#8342BB' : '#5E5C75', fontFamily: 'Material Icons' }}>{item.icon}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: i === 0 ? '#7239A4' : '#282828', fontFamily: 'var(--font-ui)' }}>{item.label}</div>
                    {item.hint && <div style={{ fontSize: 11, color: '#8C8C8C', marginTop: 1, fontFamily: 'var(--font-ui)' }}>{item.hint}</div>}
                  </div>
                  {item.shortcut && <span style={{ fontSize: 9, color: '#8C8C8C', border: '1px solid #DDDDE5', borderRadius: 4, padding: '1px 5px', background: '#FBFBFB', fontFamily: 'var(--font-ui)' }}>{item.shortcut}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section: Data ──────────────────────────────────────────────────────────────

function DataSection() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const columns: Column[] = [
    { key: 'sku', header: 'SKU', width: 120, sortable: true },
    { key: 'product', header: 'Product Name', sortable: true },
    { key: 'region', header: 'Region', width: 130 },
    { key: 'qty', header: 'Qty', width: 80, align: 'right', sortable: true },
    { key: 'status', header: 'Status', width: 120, render: (v) => {
      const map: Record<string, 'success' | 'warning' | 'error' | 'secondary'> = {
        'On Track': 'success', 'At Risk': 'warning', 'Critical': 'error', 'Fulfilled': 'secondary',
      }
      return <Badge variant={map[v as string] ?? 'default'}>{v as string}</Badge>
    }},
  ]

  const rows = [
    { id: '1', sku: 'SKU-7821', product: 'Enterprise Supply Unit A', region: 'North America', qty: 1240, status: 'On Track' },
    { id: '2', sku: 'SKU-3319', product: 'Industrial Component B',   region: 'Europe',        qty: 560,  status: 'At Risk' },
    { id: '3', sku: 'SKU-9104', product: 'Distribution Pack C',      region: 'Asia Pacific',  qty: 3820, status: 'Fulfilled' },
    { id: '4', sku: 'SKU-5557', product: 'Precision Module D',       region: 'North America', qty: 95,   status: 'Critical' },
    { id: '5', sku: 'SKU-0228', product: 'Logistics Container E',    region: 'Latin America', qty: 740,  status: 'On Track' },
  ]

  return (
    <div>
      <div style={PAGE_TITLE}>Data</div>
      <div style={PAGE_SUB}>DataGrid, FieldValuePairs, and data display patterns</div>

      <div style={EC}>
        <div style={SL}>DataGrid</div>
        <div className="ds-scroll-x"><DataGrid
          columns={columns}
          rows={rows}
          selectable
          selectedKeys={selectedRows}
          onSelectionChange={setSelectedRows}
          title="Forecast Records"
          subtitle={`${rows.length} items · ${selectedRows.length} selected`}
          rowVariant={(row) => {
            if (row.status === 'Critical') return 'error'
            if (row.status === 'At Risk') return 'warning'
            return 'default'
          }}
          toolbar={
            <div style={{ display: 'flex', gap: 6 }}>
              <Button variant="borderless" size="sm" iconOnly="filter_list" />
              <Button variant="borderless" size="sm" iconOnly="download" />
              <Button variant="primary" size="sm" iconLeft="add">New Record</Button>
            </div>
          }
        /></div>
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>FieldValuePairs</div>
        <FieldValuePairs
          layout="grid"
          columns={3}
          fields={[
            { label: 'Order ID',     value: 'ORD-2024-00842', type: 'mono' },
            { label: 'Created',      value: '14 May 2024 09:23' },
            { label: 'Status',       value: <Badge variant="success" dot>Fulfilled</Badge> },
            { label: 'Total Value',  value: '$124,680.00', type: 'highlight' },
            { label: 'Ship-to',      value: 'North America' },
            { label: 'Carrier',      value: 'FedEx Ground' },
            { label: 'ETA',          value: '18 May 2024' },
            { label: 'Notes',        value: '', type: 'empty' },
            { label: 'Priority',     value: <Tag variant="error">Critical</Tag> },
          ]}
        />
      </div>
    </div>
  )
}

// ── Section: Layout ────────────────────────────────────────────────────────────

function LayoutSection() {
  const [open1, setOpen1] = useState(true)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  return (
    <div>
      <div style={PAGE_TITLE}>Layout</div>
      <div style={PAGE_SUB}>Cards, Wells, Accordions, and Section Headings</div>

      <div className="ds-grid-2" style={{ gap: 12 }}>
        <div style={EC}>
          <div style={SL}>Card Elevations</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {([0, 1, 2, 3] as const).map((elev) => (
              <Card key={elev} elevation={elev} title={`Elevation ${elev}`} subtitle="Standard card component">
                <div style={{ padding: '2px 0 6px', fontSize: 12, color: '#8C8C8C', fontFamily: 'var(--font-ui)' }}>
                  Card body with elevation level {elev}.
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={EC}>
            <div style={SL}>Well</div>
            <Well>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[['Total Orders', '12,847'], ['On Time', '11,203'], ['Delayed', '1,644']].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3, fontFamily: 'var(--font-ui)' }}>{l}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#282828', fontFamily: 'Switzer, sans-serif' }}>{v}</div>
                  </div>
                ))}
              </div>
            </Well>
          </div>

          <div style={EC}>
            <div style={SL}>Section Heading</div>
            <SectionHeading title="Demand Planning" subtitle="Q1 2024 · 5 SKUs" action="View all" onAction={() => {}} />
            <SectionHeading
              title="Inventory Alerts"
              subtitle="3 items need attention"
              action="Manage"
              onAction={() => {}}
              actionVariant="primary"
              badge={<Badge variant="error">3</Badge>}
              divider={false}
            />
          </div>
        </div>

        <div style={{ ...EC, gridColumn: '1 / -1' }}>
          <div style={SL}>Accordion — Controlled</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <AccordionItem
              title="Forecast Parameters"
              icon="tune"
              open={open1}
              onToggle={() => setOpen1((o) => !o)}
              content={
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Input label="Planning Horizon (days)" value="90" onChange={() => {}} />
                  <Select label="Algorithm" options={[{ value: 'arima', label: 'ARIMA' }, { value: 'es', label: 'Exponential Smoothing' }]} value="arima" onChange={() => {}} />
                </div>
              }
            />
            <AccordionItem
              title="Advanced Settings"
              icon="settings"
              open={open2}
              onToggle={() => setOpen2((o) => !o)}
              content={
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Switch label="Enable seasonal decomposition" checked onChange={() => {}} />
                  <Switch label="Auto-tune parameters" checked={false} onChange={() => {}} />
                </div>
              }
            />
            <AccordionItem
              title="Data Sources"
              icon="storage"
              open={open3}
              onToggle={() => setOpen3((o) => !o)}
              content={
                <div style={{ fontSize: 13, color: '#5E5C75', fontFamily: 'var(--font-ui)' }}>
                  Connected: ERP System, WMS, External Demand Signal
                </div>
              }
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ ...SL, marginBottom: 8 }}>Accordion — Managed (items prop)</div>
            <Accordion
              items={[
                { title: 'Shipment details', icon: 'local_shipping', content: 'Origin, destination, carrier, and tracking information.' },
                { title: 'Financial summary', icon: 'payments', content: 'Invoice amount, payment status, currency, and tax information.' },
                { title: 'Audit trail', icon: 'history', content: 'Full history of changes with timestamps and user attribution.' },
              ]}
              allowMultiple
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section: Composites ────────────────────────────────────────────────────────

function CompositesSection() {
  return (
    <div>
      <div style={PAGE_TITLE}>Composites</div>
      <div style={PAGE_SUB}>KPI widgets, avatars, notifications, and empty states</div>

      <div style={EC}>
        <div style={SL}>KPI Widgets</div>
        <div className="ds-grid-4" style={{ gap: 12 }}>
          <KPIWidget
            variant="simple"
            title="On-Time Delivery"
            value="94.2"
            unit="%"
            change="+1.8%"
            changeDirection="up"
            icon="local_shipping"
            iconBg="var(--core-green-75)"
            iconColor="var(--core-green-500)"
          />
          <KPIWidget
            variant="ratio"
            title="Orders Fulfilled"
            value={1842}
            total={2100}
            percentage={87.7}
            labelLeft="Fulfilled"
            labelRight="Total"
            barColor="var(--core-violet-600)"
            annotation="87.7% fill rate"
          />
          <KPIWidget
            variant="sparkline"
            title="Daily Throughput"
            value="3,240"
            change="-4.2%"
            changeDirection="down"
            data={[
              { value: 3100 }, { value: 3400 }, { value: 3250 }, { value: 3600 },
              { value: 3150 }, { value: 3380 }, { value: 3240 },
            ]}
          />
          <KPIWidget
            variant="multi"
            title="S&OP Metrics"
            metrics={[
              { label: 'On-time delivery', value: '94%' },
              { label: 'Fill rate', value: '98.2%' },
              { label: 'Cycle time', value: '3.2d' },
              { label: 'Back orders', value: '127' },
            ]}
          />
        </div>
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Avatars</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
              <Avatar key={size} name="Burton Guster" size={size} />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {(['violet', 'blue', 'green', 'amber', 'teal', 'red', 'sage', 'dark'] as const).map((color) => (
              <Avatar key={color} name={color} color={color} size="md" />
            ))}
          </div>
        </div>
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Notifications</div>
        <NotificationList
          notifications={[
            {
              id: '1',
              title: 'Forecast updated',
              message: 'Q2 demand forecast has been recalculated with new data.',
              timestamp: '2 min ago',
              read: false,
              icon: <span className="material-icons" style={{ fontSize: 18, color: '#8342BB' }}>insert_chart</span>,
            },
            {
              id: '2',
              title: 'Export ready',
              message: 'Your SKU inventory export is ready to download.',
              timestamp: '15 min ago',
              read: false,
              icon: <span className="material-icons" style={{ fontSize: 18, color: '#027B44' }}>download_done</span>,
            },
            {
              id: '3',
              title: 'System maintenance',
              message: 'Scheduled maintenance window: Sunday 02:00–04:00 UTC.',
              timestamp: '1 hr ago',
              read: true,
              icon: <span className="material-icons" style={{ fontSize: 18, color: '#8C8C8C' }}>info_outline</span>,
            },
          ]}
          onMarkAllRead={() => {}}
          onViewAll={() => {}}
        />
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Empty States</div>
        <div className="ds-grid-2" style={{ gap: 12 }}>
          <EmptyState
            icon={<span className="material-icons" style={{ fontSize: 32, color: '#BFBECE' }}>inbox</span>}
            title="No orders found"
            description="Try adjusting your filters or date range to find matching records."
            action="Clear filters"
            onAction={() => {}}
            actionVariant="default"
          />
          <EmptyState
            icon={<span className="material-icons" style={{ fontSize: 32, color: '#8342BB' }}>add_chart</span>}
            title="Start your first forecast"
            description="Upload demand data to generate your first planning forecast."
            action="Upload data"
            onAction={() => {}}
            actionVariant="primary"
          />
        </div>
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Notification (Single)</div>
        <Notification
          title="Inventory alert"
          message="SKU-7821 has dropped below minimum threshold. Reorder recommended."
          timestamp="Just now"
          read={false}
          icon={<span className="material-icons" style={{ fontSize: 18, color: '#E02F3A' }}>warning</span>}
          onClick={() => {}}
        />
        <Notification
          title="Report generated"
          message="Monthly supply chain report is ready for review."
          timestamp="3 hours ago"
          read
          icon={<span className="material-icons" style={{ fontSize: 18, color: '#027B44' }}>description</span>}
        />
      </div>
    </div>
  )
}

// ── Section: Advanced Components ─────────────────────────────────────────────

function AdvancedSection() {
  const [ppAvail, setPpAvail] = useState<PingPongItem[]>([
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'peach', label: 'Peach' },
    { id: 'apricot', label: 'Apricot' },
    { id: 'plum', label: 'Plum' },
    { id: 'mango', label: 'Mango' },
    { id: 'kiwi', label: 'Kiwi' },
  ])
  const [ppSel, setPpSel] = useState<PingPongItem[]>([
    { id: 'pineapple', label: 'Pineapple' },
    { id: 'grapes', label: 'Grapes' },
    { id: 'orange', label: 'Orange' },
  ])
  const [searchVal, setSearchVal] = useState('')
  const [activeFilters, setActiveFilters] = useState<FilterChip[]>([
    { id: 'region', label: 'Region', value: 'APAC' },
    { id: 'status', label: 'Status', value: 'Delayed, Warning' },
  ])
  const [footerPage, setFooterPage] = useState(3)

  const searchResults: SearchResult[] = searchVal.length > 0 ? [
    { id: 'r1', label: 'APAC shipments — January 2025', meta: '842 records', icon: 'local_shipping', group: 'Shipments' },
    { id: 'r2', label: 'APAC inbound shipments', meta: '290 records', icon: 'local_shipping', group: 'Shipments' },
    { id: 'r3', label: 'ORD-48201 — APAC', meta: 'Shanghai → LA', icon: 'assignment', group: 'Orders' },
  ] : []

  return (
    <div>
      <div style={PAGE_TITLE}>Advanced</div>
      <div style={PAGE_SUB}>Ping-pong transfer, search bar, and page footer</div>

      <div style={EC}>
        <div style={SL}>Ping-Pong — Dual List Transfer</div>
        <PingPong
          availableLabel="Available SKUs"
          selectedLabel="Selected SKUs"
          available={ppAvail}
          selected={ppSel}
          onChange={(avail, sel) => { setPpAvail(avail); setPpSel(sel) }}
          height={340}
        />
        <div style={{ marginTop: 6, fontSize: 10, color: '#8C8C8C', fontFamily: 'var(--font-ui)' }}>
          Click items to highlight · Use arrows to transfer · Drag items between lists
        </div>
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Ping-Pong — Disabled State</div>
        <PingPong
          availableLabel="Available"
          selectedLabel="Selected"
          available={[{ id: 'a', label: 'Option A' }, { id: 'b', label: 'Option B' }, { id: 'c', label: 'Option C' }]}
          selected={[{ id: 'd', label: 'Option D' }, { id: 'e', label: 'Option E' }]}
          onChange={() => {}}
          height={200}
          disabled
        />
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Search Bar — with Results Dropdown</div>
        <SearchBar
          placeholder="Search orders, shipments, SKUs…"
          value={searchVal}
          onChange={setSearchVal}
          results={searchResults}
          onSelect={(r) => { setSearchVal(r.label) }}
        />
        <div style={{ marginTop: 8, fontSize: 10, color: '#8C8C8C', fontFamily: 'var(--font-ui)' }}>
          Type anything to see results dropdown
        </div>
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Search Bar — with Active Filter Chips</div>
        <SearchBar
          placeholder="Search…"
          showFilters
          activeFilters={activeFilters}
          filters={[
            { id: 'date', label: 'Date range', icon: 'calendar_today' },
            { id: 'assignee', label: 'Assigned to', icon: 'person' },
          ]}
          onFilterRemove={(id) => setActiveFilters((f) => f.filter((c) => c.id !== id))}
          onClearAll={() => setActiveFilters([])}
          onAddFilter={() => {}}
        />
      </div>

      <div style={{ ...EC, marginTop: 12, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px 10px' }}>
          <div style={SL}>Page Footer — with Actions and Pagination</div>
          <div style={{ padding: '20px 0', color: '#8C8C8C', fontSize: 12, fontFamily: 'var(--font-ui)', textAlign: 'center' }}>
            Page content area
          </div>
        </div>
        <PageFooter
          actions={[
            { id: 'save', label: 'Save changes', variant: 'primary', icon: 'save', onClick: () => {} },
            { id: 'export', label: 'Export', variant: 'default', icon: 'cloud_download', onClick: () => {} },
            { id: 'discard', label: 'Discard', variant: 'ghost', onClick: () => {} },
          ]}
          recordCount={248}
          recordLabel="records"
          showPagination
          page={footerPage}
          pageSize={25}
          total={248}
          onPageChange={setFooterPage}
        />
      </div>

      <div style={{ ...EC, marginTop: 12, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px 10px' }}>
          <div style={SL}>Page Footer — Danger Action Variant</div>
          <div style={{ padding: '16px 0', color: '#8C8C8C', fontSize: 12, fontFamily: 'var(--font-ui)', textAlign: 'center' }}>
            Review form content
          </div>
        </div>
        <PageFooter
          actions={[
            { id: 'approve', label: 'Approve', variant: 'primary', icon: 'check_circle', onClick: () => {} },
            { id: 'reject', label: 'Reject', variant: 'destructive', icon: 'cancel', onClick: () => {} },
            { id: 'back', label: 'Back', variant: 'default', onClick: () => {} },
          ]}
          recordCount={12}
          recordLabel="items pending review"
        />
      </div>
    </div>
  )
}

// ── Section: Tokens ────────────────────────────────────────────────────────────

function TokensSection() {
  const radii = [
    { name: 'element', val: '4px', use: 'Badges, inner chips, cell fills' },
    { name: 'base-sm', val: '6px', use: 'Inline button variant' },
    { name: 'base', val: '8px', use: 'Buttons, inputs, small components' },
    { name: 'container-sm', val: '10px', use: 'Cards, panels, modals (compact)' },
    { name: 'container', val: '12px', use: 'Standard cards, drawers' },
    { name: 'container-lg', val: '16px', use: 'Featured cards, hero sections' },
    { name: 'pill', val: '9999px', use: 'Tags, badges, pills' },
  ]
  const elevations = [
    { name: 'Elevation 0 — flat', spec: 'border: 1px solid #EBEBEB', shadow: 'none', border: '1px solid #EBEBEB', use: 'Table rows, alt rows' },
    { name: 'Elevation 1 — raised', spec: '0px 1px 2px rgba(55,23,78,.08)\n0px 1px 3px rgba(55,23,78,.12)', shadow: '0px 1px 2px rgba(55,23,78,.08),0px 1px 3px rgba(55,23,78,.12)', use: 'Buttons, chips, inputs' },
    { name: 'Elevation 2 — floating', spec: '0px 2px 4px rgba(55,23,78,.08)\n0px 4px 8px rgba(55,23,78,.1)', shadow: '0px 2px 4px rgba(55,23,78,.08),0px 4px 8px rgba(55,23,78,.1)', use: 'Dropdowns, tooltips, popovers' },
    { name: 'Elevation 3 — overlay', spec: '0px 4px 8px rgba(55,23,78,.1)\n0px 8px 24px rgba(55,23,78,.14)', shadow: '0px 4px 8px rgba(55,23,78,.1),0px 8px 24px rgba(55,23,78,.14)', use: 'Modals, side drawers' },
    { name: 'Elevation 4 — max', spec: '0px 8px 16px rgba(55,23,78,.12)\n0px 16px 48px rgba(55,23,78,.18)', shadow: '0px 8px 16px rgba(55,23,78,.12),0px 16px 48px rgba(55,23,78,.18)', use: 'Command bars, mega menus' },
  ]
  const spacing = [
    [2,2],[4,4],[6,6],[8,8],[10,10],[12,12],[16,16],[20,20],[24,24],[32,32],[40,40],[48,48],[64,64],
  ]
  return (
    <div>
      <div style={PAGE_TITLE}>Design Tokens</div>
      <div style={PAGE_SUB}>Corner radius, elevation & shadows, spacing scale, and scrollbar styles</div>

      {/* Corner Radius */}
      <div style={EC}>
        <div style={SL}>Corner Radius Tokens</div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {radii.map((r) => (
            <div key={r.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 72, height: 72, background: '#ECE4F5', border: '2px solid #8342BB', borderRadius: r.val }} />
              <div style={{ fontSize: 10, fontWeight: 500, color: '#282828', fontFamily: 'var(--font-ui)', textAlign: 'center' }}>{r.name}</div>
              <div style={{ fontSize: 9, color: '#767676', fontFamily: 'Roboto Mono, monospace' }}>{r.val}</div>
              <div style={{ fontSize: 8, color: '#8C8C8C', textAlign: 'center', maxWidth: 90, lineHeight: 1.3, fontFamily: 'var(--font-ui)' }}>{r.use}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Elevation */}
      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Elevation &amp; Shadows</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {elevations.map((e) => (
            <div key={e.name} style={{ flex: 1, minWidth: 120, background: '#fff', borderRadius: 8, padding: 14, border: e.border ?? 'none', boxShadow: e.shadow === 'none' ? 'none' : e.shadow }}>
              <div style={{ fontSize: 10, fontWeight: 500, color: '#8342BB', marginBottom: 4, fontFamily: 'var(--font-ui)' }}>{e.name}</div>
              <div style={{ fontSize: 8, color: '#767676', lineHeight: 1.4, fontFamily: 'Roboto Mono, monospace', whiteSpace: 'pre-line' }}>{e.spec}</div>
              <div style={{ fontSize: 9, color: '#8C8C8C', marginTop: 6, fontFamily: 'var(--font-ui)' }}>{e.use}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 500, color: '#282828', fontFamily: 'var(--font-ui)', marginBottom: 8 }}>Focus ring</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 80, height: 28, borderRadius: 6, background: '#fff', border: '1px solid #DDDDE5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#282828', fontFamily: 'var(--font-ui)', outline: '2px solid #8342BB', outlineOffset: 2, boxShadow: '0 0 0 4px rgba(131,66,187,0.2)' }}>focused</div>
            <div style={{ fontSize: 11, color: '#5E5C75', fontFamily: 'var(--font-ui)' }}>outline: 2px solid #8342BB · offset: 2px · ring: rgba(131,66,187,.2)</div>
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Spacing Scale</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {spacing.map(([token, px]) => (
            <div key={token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 32, background: '#8342BB', borderRadius: 3, height: px }} />
              <div style={{ fontSize: 9, fontWeight: 500, color: '#282828', fontFamily: 'var(--font-ui)' }}>sp-{token}</div>
              <div style={{ fontSize: 8, color: '#767676', fontFamily: 'Roboto Mono, monospace' }}>{px}px</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollbar */}
      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Scrollbar Styles</div>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: '#282828', fontFamily: 'var(--font-ui)', marginBottom: 12 }}>Light (eto-scrollbar__light)</div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 9, color: '#8C8C8C', fontFamily: 'var(--font-ui)' }}>Vertical</div>
                <div style={{ width: 12, height: 120, borderRadius: 8, background: 'rgba(138,138,138,0.16)', position: 'relative', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: 20, left: 2, width: 8, height: 40, borderRadius: 6, background: '#BFBFBF' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 9, color: '#8C8C8C', fontFamily: 'var(--font-ui)' }}>Horizontal</div>
                <div style={{ width: 120, height: 12, borderRadius: 8, background: 'rgba(138,138,138,0.16)', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 20, top: 2, width: 40, height: 8, borderRadius: 6, background: '#BFBFBF' }} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: '#282828', fontFamily: 'var(--font-ui)', marginBottom: 12 }}>Dark (eto-scrollbar__dark)</div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 9, color: '#8C8C8C', fontFamily: 'var(--font-ui)' }}>Vertical</div>
                <div style={{ width: 12, height: 120, borderRadius: 8, background: 'rgba(255,255,255,0.1)', position: 'relative', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: 20, left: 2, width: 8, height: 40, borderRadius: 6, background: 'rgba(255,255,255,0.35)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 9, color: '#8C8C8C', fontFamily: 'var(--font-ui)' }}>Horizontal</div>
                <div style={{ width: 120, height: 12, borderRadius: 8, background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 20, top: 2, width: 40, height: 8, borderRadius: 6, background: 'rgba(255,255,255,0.35)' }} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: '#282828', fontFamily: 'var(--font-ui)', marginBottom: 8 }}>Specs</div>
            {[['Width','12px (3× base)'],['Track radius','8px'],['Thumb radius','6px'],['Light track','rgba(138,138,138,0.16)'],['Light thumb','#BFBFBF'],['Dark track','rgba(255,255,255,0.10)'],['Dark thumb','rgba(255,255,255,0.35)']].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', gap: 8, marginBottom: 3, alignItems: 'center' }}>
                <span style={{ fontSize: 9, color: '#5E5C75', fontFamily: 'var(--font-ui)', width: 80, flexShrink: 0 }}>{k}</span>
                <span style={{ fontSize: 9, color: '#282828', fontFamily: 'Roboto Mono, monospace' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Logo */}
      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Brand Logo — on-dark &amp; on-light</div>
        <div style={{ display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid #EBEBEB' }}>
          <div style={{ flex: 1, padding: '20px 24px', background: '#282828', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-ui)' }}>On dark background</div>
            <div style={{ fontFamily: 'Switzer, var(--font-ui)', fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>leo<sup style={{ fontSize: 10, fontWeight: 400, verticalAlign: 'super' }}>®</sup></div>
            <div style={{ fontFamily: 'Switzer, var(--font-ui)', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>leo</div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#8342BB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700, color: '#fff' }}>L</div>
          </div>
          <div style={{ flex: 1, padding: '20px 24px', background: '#fff', display: 'flex', flexDirection: 'column', gap: 16, borderLeft: '1px solid #EBEBEB' }}>
            <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8C8C8C', fontFamily: 'var(--font-ui)' }}>On light background</div>
            <div style={{ fontFamily: 'Switzer, var(--font-ui)', fontSize: 28, fontWeight: 700, color: '#282828', letterSpacing: '-0.02em', lineHeight: 1 }}>leo<sup style={{ fontSize: 10, fontWeight: 400, verticalAlign: 'super', color: '#8342BB' }}>®</sup></div>
            <div style={{ fontFamily: 'Switzer, var(--font-ui)', fontSize: 16, fontWeight: 700, color: '#282828', letterSpacing: '-0.02em', lineHeight: 1 }}>leo</div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#8342BB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700, color: '#fff' }}>L</div>
          </div>
          <div style={{ flex: 1, padding: '20px 24px', background: '#F0F0F4', display: 'flex', flexDirection: 'column', gap: 16, borderLeft: '1px solid #EBEBEB' }}>
            <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8C8C8C', fontFamily: 'var(--font-ui)' }}>On subtle background</div>
            <div style={{ fontFamily: 'Switzer, var(--font-ui)', fontSize: 28, fontWeight: 700, color: '#282828', letterSpacing: '-0.02em', lineHeight: 1 }}>leo<sup style={{ fontSize: 10, fontWeight: 400, verticalAlign: 'super', color: '#8342BB' }}>®</sup></div>
            <div style={{ fontFamily: 'Switzer, var(--font-ui)', fontSize: 16, fontWeight: 700, color: '#282828', letterSpacing: '-0.02em', lineHeight: 1 }}>leo</div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#8342BB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700, color: '#fff' }}>L</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Section: Charts ────────────────────────────────────────────────────────────

const MONTHS_12 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS_Q = ['Q1 Jan', 'Q1 Feb', 'Q1 Mar', 'Q2 Apr', 'Q2 May', 'Q2 Jun', 'Q3 Jul', 'Q3 Aug', 'Q3 Sep', 'Q4 Oct', 'Q4 Nov', 'Q4 Dec']

function ChartsSection() {
  return (
    <div>
      <div style={PAGE_TITLE}>Charts</div>
      <div style={PAGE_SUB}>Scalable data visualization components — line, bar, donut, area, and horizontal bar</div>

      {/* ── Row 1: Line + Bar ── */}
      <div className="ds-grid-2" style={{ gap: 16, marginBottom: 16 }}>
        <LineChart
          title="Shipment Volume"
          subtitle="Air · Ocean · Ground — last 12 months"
          labels={MONTHS_12}
          series={[
            { name: 'Air', data: [3200, 3600, 3100, 4200, 3900, 4600, 5100, 4800, 5400, 4900, 5600, 6100] },
            { name: 'Ocean', data: [8100, 7800, 8600, 9200, 8700, 9800, 10200, 9600, 10800, 11200, 10600, 12000] },
            { name: 'Ground', data: [5400, 5100, 5800, 6200, 5900, 6600, 7100, 6800, 7400, 7800, 7200, 8200] },
          ]}
          showArea
        />
        <BarChart
          title="Order Fulfillment by Region"
          subtitle="Target vs. actual — this quarter"
          labels={['APAC', 'EMEA', 'LATAM', 'NA', 'MEA']}
          series={[
            { name: 'Target', data: [4200, 3800, 2100, 5600, 1800] },
            { name: 'Actual', data: [3900, 3600, 2400, 5200, 1600] },
          ]}
          grouped
        />
      </div>

      {/* ── Row 2: Donut + Horizontal Bar ── */}
      <div className="ds-grid-2" style={{ gap: 16, marginBottom: 16 }}>
        <DonutChart
          title="Inventory by Category"
          subtitle="Current stock allocation across product lines"
          centerLabel="SKUs"
          centerValue="28.4K"
          slices={[
            { name: 'Electronics',   value: 9200 },
            { name: 'Apparel',       value: 6800 },
            { name: 'Perishables',   value: 4100 },
            { name: 'Industrial',    value: 5300 },
            { name: 'Consumables',   value: 3000 },
          ]}
        />
        <HorizontalBarChart
          title="On-Time Delivery Rate"
          subtitle="Top carriers — trailing 90 days"
          entries={[
            { label: 'FedEx Express',  value: 97.4, annotation: '% OTD' },
            { label: 'DHL Supply',     value: 95.8, annotation: '% OTD' },
            { label: 'UPS Freight',    value: 94.2, annotation: '% OTD' },
            { label: 'XPO Logistics',  value: 92.1, annotation: '% OTD' },
            { label: 'DB Schenker',    value: 91.6, annotation: '% OTD' },
            { label: 'Kuehne+Nagel',   value: 89.3, annotation: '% OTD' },
            { label: 'CEVA Logistics', value: 87.0, annotation: '% OTD' },
          ]}
          formatValue={(v) => `${v.toFixed(1)}%`}
        />
      </div>

      {/* ── Row 3: Area (stacked) + single-series Bar ── */}
      <div className="ds-grid-2" style={{ gap: 16, marginBottom: 16 }}>
        <AreaChart
          title="Revenue by Channel"
          subtitle="Direct · Partner · Marketplace — stacked"
          labels={MONTHS_12}
          stacked
          series={[
            { name: 'Direct',      data: [2100, 2300, 2000, 2700, 2500, 3100, 3400, 3200, 3700, 3500, 4000, 4400] },
            { name: 'Partner',     data: [1400, 1500, 1300, 1800, 1700, 2000, 2200, 2100, 2400, 2300, 2600, 2900] },
            { name: 'Marketplace', data: [600, 700, 650, 900, 800, 1100, 1200, 1100, 1300, 1200, 1400, 1600] },
          ]}
          formatY={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}`}
        />
        <BarChart
          title="Warehouse Throughput"
          subtitle="Units processed per day — last 12 months"
          labels={MONTHS_Q}
          series={[
            { name: 'Units', data: [14200, 13800, 15100, 16400, 15700, 17200, 18600, 17900, 19400, 20100, 19300, 21500] },
          ]}
        />
      </div>

      {/* ── Row 4: Full-width multi-series line (dense) ── */}
      <LineChart
        title="Demand Forecast vs. Actuals"
        subtitle="Weekly units — forecast (violet) · actuals (blue) · baseline (green)"
        labels={['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12','W13','W14','W15','W16']}
        height={200}
        showArea={false}
        showDots={false}
        series={[
          { name: 'Forecast',  data: [4200,4400,4100,4600,4900,5200,5000,5400,5700,5500,5900,6200,6000,6400,6700,7000] },
          { name: 'Actuals',   data: [4100,4350,4250,4500,4800,5100,4950,5300,5600,5450,5800,6100,5950,6350,6650,6900] },
          { name: 'Baseline',  data: [4000,4000,4000,4500,4500,4500,5000,5000,5000,5500,5500,5500,6000,6000,6000,6500] },
        ]}
      />
    </div>
  )
}

// ── Section: Page Layouts ─────────────────────────────────────────────────────

function LayoutFrame({ number, name, description, tags, path, children }: {
  number: string; name: string; description: string; tags: string[]; path: string; children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={SL}>Layout {number}</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#282828', fontFamily: 'Switzer, var(--font-ui)', letterSpacing: '-0.01em' }}>{name}</div>
          <div style={{ fontSize: 12, color: '#5E5C75', fontFamily: 'var(--font-ui)', marginTop: 3, lineHeight: 1.5 }}>{description}</div>
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {tags.map(t => (
            <span key={t} style={{ padding: '2px 8px', borderRadius: 4, background: '#F2ECF8', color: '#4E2975', fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-ui)', border: '1px solid #CABAEF' }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #DDDDE5', boxShadow: 'var(--elevation-2)' }}>
        <div style={{ background: '#1C1C2E', height: 32, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {(['#FF5F57','#FFBD2E','#28CA41'] as const).map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', height: 20, borderRadius: 4, marginLeft: 4, display: 'flex', alignItems: 'center', padding: '0 10px', gap: 5 }}>
            <span className="material-icons" style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: 'Material Icons', lineHeight: 1 }}>lock</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: 'Roboto Mono, monospace' }}>app.modernharmony.io/{path}</span>
          </div>
        </div>
        <div style={{ background: '#F0F0F4' }}>{children}</div>
      </div>
    </div>
  )
}

const LH: React.CSSProperties = {
  background: '#282828', height: 48, display: 'flex', alignItems: 'center',
  padding: '0 20px', gap: 12, flexShrink: 0,
}
const LH_LOGO: React.CSSProperties = {
  width: 26, height: 26, borderRadius: 7, background: '#8342BB',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 11, fontWeight: 700, color: 'white', fontFamily: 'var(--font-ui)',
}
const LH_DIVIDER: React.CSSProperties = { width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }
const LH_TITLE: React.CSSProperties = { color: 'white', fontWeight: 600, fontSize: 13, fontFamily: 'var(--font-ui)' }
const LH_SUB: React.CSSProperties = { color: 'rgba(255,255,255,0.45)', fontSize: 12, fontFamily: 'var(--font-ui)' }

const LP: React.CSSProperties = { padding: '16px 20px' }
const PT: React.CSSProperties = { fontSize: 17, fontWeight: 700, color: '#282828', fontFamily: 'Switzer, var(--font-ui)', letterSpacing: '-0.02em', marginBottom: 2 }
const PS: React.CSSProperties = { fontSize: 11, color: '#5E5C75', fontFamily: 'var(--font-ui)', marginBottom: 14 }

const MONTHS_8 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const WEEKS_6  = ['Wk 44', 'Wk 45', 'Wk 46', 'Wk 47', 'Wk 48', 'Wk 49']

function PageLayoutsSection() {
  const [dashSeg, setDashSeg] = useState('month')
  const [analyticsSeg, setAnalyticsSeg] = useState('quarter')
  const [detailTab, setDetailTab] = useState('shipments')
  const [formStep, setFormStep] = useState(1)
  const [tableSearch, setTableSearch] = useState('')
  const [tablePage, setTablePage] = useState(1)
  const [settingsTab, setSettingsTab] = useState('general')
  const [open1, setOpen1] = useState(true)
  const [open2, setOpen2] = useState(false)
  const [notif, setNotif] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [autoSave, setAutoSave] = useState(true)

  const tableColumns: Column[] = [
    { key: 'id',      header: 'Order ID',   width: 130, sortable: true },
    { key: 'product', header: 'Product',     sortable: true },
    { key: 'region',  header: 'Region',      width: 130 },
    { key: 'qty',     header: 'Qty',         width: 80, align: 'right', sortable: true },
    { key: 'carrier', header: 'Carrier',     width: 120 },
    { key: 'status',  header: 'Status',      width: 110,
      render: (v) => {
        const m: Record<string, 'success'|'warning'|'error'|'secondary'> = { 'On Track': 'success', 'Delayed': 'warning', 'Critical': 'error', 'Fulfilled': 'secondary' }
        return <Badge variant={m[v as string] ?? 'default'}>{v as string}</Badge>
      }
    },
  ]
  const tableRows = [
    { id: 'ORD-48201', product: 'Enterprise Unit A',   region: 'North America', qty: 840,  carrier: 'FedEx',     status: 'On Track'  },
    { id: 'ORD-48202', product: 'Industrial Pack B',   region: 'Europe',        qty: 290,  carrier: 'DHL',       status: 'Delayed'   },
    { id: 'ORD-48203', product: 'Distribution Kit C',  region: 'Asia Pacific',  qty: 1620, carrier: 'Kuehne+N',  status: 'Fulfilled' },
    { id: 'ORD-48204', product: 'Precision Module D',  region: 'North America', qty: 55,   carrier: 'UPS',       status: 'Critical'  },
    { id: 'ORD-48205', product: 'Logistics Container', region: 'LATAM',         qty: 430,  carrier: 'CEVA',      status: 'On Track'  },
    { id: 'ORD-48206', product: 'Smart Sensor Array',  region: 'Middle East',   qty: 180,  carrier: 'Aramex',    status: 'Delayed'   },
    { id: 'ORD-48207', product: 'Cold Chain Unit E',   region: 'Europe',        qty: 720,  carrier: 'DB Schen.', status: 'On Track'  },
  ]

  return (
    <div>
      <div style={PAGE_TITLE}>Page Layouts</div>
      <div style={PAGE_SUB}>Enterprise page templates — composable patterns for real application screens</div>

      {/* ── intro grid ── */}
      <div className="ds-grid-2" style={{ gap: 10, marginBottom: 24 }}>
        {[
          { icon: 'dashboard',     name: 'Operational Dashboard',   desc: 'KPI strip · charts · data grid' },
          { icon: 'analytics',     name: 'Analytics Overview',      desc: 'Segments · area chart · comparison' },
          { icon: 'article',       name: 'Record Detail',           desc: 'Split view · metadata · activity' },
          { icon: 'table_view',    name: 'Data Management',         desc: 'Search · filter · grid · pagination' },
          { icon: 'account_tree',  name: 'Multi-Step Workflow',     desc: 'Stepper · form · footer actions' },
          { icon: 'settings',      name: 'Settings & Config',       desc: 'Sidebar nav · sections · toggles' },
        ].map((l, i) => (
          <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', borderRadius: 10, padding: '12px 14px', border: '1px solid #EBEBEB' }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: '#F2ECF8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span className="material-icons" style={{ fontSize: 18, color: '#8342BB', fontFamily: 'Material Icons', lineHeight: 1 }}>{l.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#282828', fontFamily: 'var(--font-ui)' }}>
                <span style={{ color: '#8342BB', marginRight: 6, fontVariantNumeric: 'tabular-nums' }}>0{i + 1}</span>{l.name}
              </div>
              <div style={{ fontSize: 11, color: '#767676', fontFamily: 'var(--font-ui)', marginTop: 1 }}>{l.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════
          LAYOUT 01 — OPERATIONAL DASHBOARD
      ════════════════════════════════════════════════════════ */}
      <LayoutFrame number="01" name="Operational Dashboard"
        description="Real-time operations view. KPI strip surfaces headline metrics; charts provide trend context; data grid supports action on individual records."
        tags={['KPIWidget', 'LineChart', 'DonutChart', 'DataGrid', 'Segments', 'SectionHeading']}
        path="operations/dashboard"
      >
        {/* simulated app header */}
        <div style={LH}>
          <div style={LH_LOGO}>MH</div>
          <span style={LH_TITLE}>Modern Harmony</span>
          <div style={LH_DIVIDER} />
          <span style={LH_SUB}>Operations</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <Segments options={[{ value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }, { value: 'quarter', label: 'Quarter' }]} value={dashSeg} onChange={setDashSeg} size="sm" />
            <Button variant="default" size="sm" iconLeft="download">Export</Button>
            <Button variant="primary" size="sm" iconLeft="add">New Order</Button>
          </div>
        </div>

        <div style={LP}>
          <div style={PT}>Supply Chain Operations</div>
          <div style={PS}>Live view · Updated just now · Showing {dashSeg === 'week' ? 'this week' : dashSeg === 'month' ? 'this month' : 'this quarter'}</div>

          {/* KPI row */}
          <div className="ds-grid-4" style={{ gap: 10, marginBottom: 14 }}>
            <KPIWidget variant="simple" title="Active Orders" value="2,847"
              change="+12.4% vs last period" changeDirection="up"
              icon="shopping_cart" iconBg="#EAF3FC" iconColor="#3999E4" />
            <KPIWidget variant="simple" title="On-Time Delivery" value="94.2" unit="%"
              change="-1.8% vs target" changeDirection="down"
              icon="local_shipping" iconBg="#FFF4DC" iconColor="#F0A008" />
            <KPIWidget variant="ratio" title="Fulfillment Rate"
              value="11,204" total="12,847" percentage={87}
              barColor="var(--core-green-300)" labelLeft="Fulfilled" labelRight="87%" />
            <KPIWidget variant="sparkline" title="Avg Lead Time (days)" value="4.2"
              change="-0.3d" changeDirection="up"
              data={[{value:5.1},{value:4.8},{value:5.2},{value:4.9},{value:4.6},{value:4.4},{value:4.2}]}
              labelStart="6w ago" labelEnd="Now" />
          </div>

          {/* charts row */}
          <div className="ds-grid-2" style={{ gap: 10, marginBottom: 14 }}>
            <LineChart title="Shipment Volume" subtitle="Air · Ocean · Ground — 8 months"
              labels={MONTHS_8}
              series={[
                { name: 'Air',    data: [3200,3600,3100,4200,3900,4600,5100,4800] },
                { name: 'Ocean',  data: [8100,7800,8600,9200,8700,9800,10200,9600] },
                { name: 'Ground', data: [5400,5100,5800,6200,5900,6600,7100,6800] },
              ]}
              showArea />
            <DonutChart title="Orders by Status" subtitle="Current pipeline distribution"
              centerLabel="Orders" centerValue="2,847"
              slices={[
                { name: 'On Track',  value: 1620 },
                { name: 'Fulfilled', value: 842  },
                { name: 'Delayed',   value: 294  },
                { name: 'Critical',  value: 91   },
              ]} />
          </div>

          {/* data grid */}
          <SectionHeading title="Recent Orders" subtitle="Last 7 · sorted by urgency" action="View all" onAction={() => {}} />
          <div className="ds-scroll-x">
            <DataGrid columns={tableColumns} rows={tableRows.slice(0, 5)}
              rowVariant={(r) => r.status === 'Critical' ? 'error' : r.status === 'Delayed' ? 'warning' : 'default'}
              toolbar={<div style={{ display: 'flex', gap: 6 }}>
                <Button variant="borderless" size="sm" iconOnly="filter_list" />
                <Button variant="borderless" size="sm" iconOnly="refresh" />
              </div>} />
          </div>
        </div>
      </LayoutFrame>

      {/* ════════════════════════════════════════════════════════
          LAYOUT 02 — ANALYTICS OVERVIEW
      ════════════════════════════════════════════════════════ */}
      <LayoutFrame number="02" name="Analytics Overview"
        description="Deep-dive analytics page. Segmented time controls let users shift granularity; stacked area shows cumulative trends; comparison charts reveal regional and category performance."
        tags={['AreaChart', 'BarChart', 'HorizontalBarChart', 'KPIWidget', 'Segments', 'Alert']}
        path="analytics/overview"
      >
        <div style={LH}>
          <div style={LH_LOGO}>MH</div>
          <span style={LH_TITLE}>Modern Harmony</span>
          <div style={LH_DIVIDER} />
          <span style={LH_SUB}>Analytics</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <Button variant="borderless" size="sm" iconLeft="tune">Filters</Button>
            <Button variant="default"    size="sm" iconLeft="share">Share</Button>
          </div>
        </div>

        <div style={LP}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <div style={PT}>Analytics Overview</div>
              <div style={PS}>FY 2024 · All regions · All product lines</div>
            </div>
            <Segments
              options={[{ value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }, { value: 'quarter', label: 'Quarter' }, { value: 'year', label: 'Year' }]}
              value={analyticsSeg} onChange={setAnalyticsSeg} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <Alert variant="info" message="Showing data through end of Q3 · Q4 forecast data available in the Demand Planning module." />
          </div>

          {/* full-width area chart */}
          <div style={{ marginBottom: 14 }}>
            <AreaChart title="Revenue by Channel" subtitle="Direct · Partner · Marketplace — stacked cumulative"
              labels={MONTHS_8}
              series={[
                { name: 'Direct',      data: [4200,4600,4100,5200,4900,5600,6100,5800] },
                { name: 'Partner',     data: [2800,3100,2900,3400,3200,3600,3900,3700] },
                { name: 'Marketplace', data: [1400,1600,1500,1800,1700,2000,2200,2100] },
              ]}
              stacked />
          </div>

          {/* KPI row */}
          <div className="ds-grid-4" style={{ gap: 10, marginBottom: 14 }}>
            <KPIWidget variant="simple" title="Total Revenue" value="$48.2M"
              change="+18.6% YoY" changeDirection="up" icon="attach_money" iconBg="#DDFAEE" iconColor="#027B44" />
            <KPIWidget variant="simple" title="Gross Margin" value="34.7" unit="%"
              change="+2.1pp vs prior year" changeDirection="up" icon="trending_up" iconBg="#F2ECF8" iconColor="#8342BB" />
            <KPIWidget variant="multi" title="Channel Mix"
              metrics={[
                { value: '58%', label: 'Direct',      color: '#8342BB' },
                { value: '29%', label: 'Partner',     color: '#3999E4' },
                { value: '13%', label: 'Marketplace', color: '#02A15A' },
                { value: '3.2×', label: 'ROI avg',   color: '#282828' },
              ]} />
            <KPIWidget variant="status" title="Regional Targets"
              items={[
                { label: 'North America', value: '103%', percentage: 100, color: '#02A15A' },
                { label: 'Europe',        value: '91%',  percentage: 91,  color: '#F0A008' },
                { label: 'Asia Pacific',  value: '78%',  percentage: 78,  color: '#E02F3A' },
              ]} />
          </div>

          {/* 2-col charts */}
          <div className="ds-grid-2" style={{ gap: 10 }}>
            <BarChart title="Orders by Region" subtitle="Target vs actual — current period"
              labels={['APAC', 'EMEA', 'LATAM', 'NA', 'MEA']}
              series={[
                { name: 'Target', data: [4200,3800,2100,5600,1800] },
                { name: 'Actual', data: [3900,3600,2400,5200,1600] },
              ]}
              grouped />
            <HorizontalBarChart title="On-Time Delivery by Carrier"
              subtitle="Trailing 90 days"
              entries={[
                { label: 'FedEx Express', value: 97.4, annotation: '% OTD' },
                { label: 'DHL Supply',    value: 95.8, annotation: '% OTD' },
                { label: 'UPS Freight',   value: 94.2, annotation: '% OTD' },
                { label: 'XPO Logistics', value: 92.1, annotation: '% OTD' },
                { label: 'DB Schenker',   value: 91.6, annotation: '% OTD' },
              ]}
              formatValue={(v) => `${v.toFixed(1)}%`} />
          </div>
        </div>
      </LayoutFrame>

      {/* ════════════════════════════════════════════════════════
          LAYOUT 03 — RECORD DETAIL
      ════════════════════════════════════════════════════════ */}
      <LayoutFrame number="03" name="Record Detail"
        description="Split-panel detail view. Left panel anchors entity metadata; right panel provides tabbed context — related shipments, documents, and history — without leaving the page."
        tags={['FieldValuePairs', 'Accordion', 'Tabs', 'DataGrid', 'Badge', 'Tag', 'Button']}
        path="operations/orders/ORD-48201"
      >
        <div style={LH}>
          <div style={LH_LOGO}>MH</div>
          <span style={LH_TITLE}>Modern Harmony</span>
          <div style={LH_DIVIDER} />
          <span style={LH_SUB}>Operations › Orders</span>
        </div>

        <div style={LP}>
          {/* page header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <div style={PT}>Order ORD-48201</div>
                <Badge variant="success" dot>Fulfilled</Badge>
                <Tag variant="info">Air Freight</Tag>
              </div>
              <div style={PS}>Created 12 May 2024 · Last updated 3 hours ago · North America → Europe</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="borderless" size="sm" iconLeft="share">Share</Button>
              <Button variant="default"    size="sm" iconLeft="edit">Edit</Button>
              <Button variant="primary"    size="sm" iconLeft="check_circle">Approve</Button>
            </div>
          </div>

          {/* split layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 14 }}>
            {/* left: metadata */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
              <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #EBEBEB', padding: '14px 16px' }}>
                <div style={SL}>Order Details</div>
                <FieldValuePairs layout="stack" fields={[
                  { label: 'Order ID',    value: 'ORD-48201',            type: 'mono'      },
                  { label: 'PO Number',   value: 'PO-2024-08912'                            },
                  { label: 'Created',     value: '12 May 2024, 09:23'                       },
                  { label: 'Ship-to',     value: 'Rotterdam, Netherlands'                   },
                  { label: 'Incoterms',   value: 'DAP'                                      },
                  { label: 'Total Value', value: '$124,680.00',           type: 'highlight' },
                  { label: 'Priority',    value: <Tag variant="warning">High</Tag>          },
                  { label: 'Account Mgr', value: 'Alex Mercer'                              },
                ]} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <AccordionItem title="Line Items" icon="inventory_2" open={open1} onToggle={() => setOpen1(o => !o)}
                  content={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {[
                        ['SKU-7821', 'Enterprise Unit A', 240, '$52,800'],
                        ['SKU-3319', 'Industrial Component B', 180, '$39,600'],
                        ['SKU-9104', 'Distribution Pack C', 420, '$32,280'],
                      ].map(([sku, name, qty, val]) => (
                        <div key={sku as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', background: '#F8F8FA', borderRadius: 6 }}>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: '#282828', fontFamily: 'Roboto Mono, monospace' }}>{sku}</div>
                            <div style={{ fontSize: 10, color: '#767676', fontFamily: 'var(--font-ui)' }}>{name} · {qty} units</div>
                          </div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: '#282828', fontFamily: 'Roboto Mono, monospace' }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  } />
                <AccordionItem title="Financial Summary" icon="payments" open={open2} onToggle={() => setOpen2(o => !o)}
                  content={
                    <FieldValuePairs layout="stack" fields={[
                      { label: 'Subtotal',  value: '$118,680.00', type: 'highlight' },
                      { label: 'Freight',   value: '$4,200.00'                      },
                      { label: 'Insurance', value: '$1,800.00'                      },
                      { label: 'Total',     value: '$124,680.00', type: 'highlight' },
                      { label: 'Currency',  value: 'USD'                            },
                      { label: 'Payment',   value: 'Net 30'                         },
                    ]} />
                  } />
              </div>
            </div>

            {/* right: tabbed context */}
            <div style={{ minWidth: 0, background: '#fff', borderRadius: 10, border: '1px solid #EBEBEB', overflow: 'hidden' }}>
              <div style={{ padding: '14px 16px 0' }}>
                <TabList>
                  <Tab id="shipments" label="Shipments" badge={3} active={detailTab === 'shipments'} onClick={() => setDetailTab('shipments')} />
                  <Tab id="documents" label="Documents" badge={5} active={detailTab === 'documents'} onClick={() => setDetailTab('documents')} />
                  <Tab id="history"   label="History"   active={detailTab === 'history'}   onClick={() => setDetailTab('history')} />
                </TabList>
              </div>

              <TabPanel id="shipments" active={detailTab === 'shipments'}>
                <div style={{ padding: '12px 16px' }}>
                  <DataGrid
                    columns={[
                      { key: 'id',      header: 'Shipment ID',  width: 130, sortable: true },
                      { key: 'carrier', header: 'Carrier',      width: 110 },
                      { key: 'origin',  header: 'Origin',       sortable: true },
                      { key: 'eta',     header: 'ETA',          width: 110 },
                      { key: 'status',  header: 'Status',       width: 100,
                        render: (v) => <Badge variant={v === 'In Transit' ? 'info' : v === 'Delivered' ? 'success' : 'warning'}>{v as string}</Badge>
                      },
                    ]}
                    rows={[
                      { id: 'SHP-10291', carrier: 'FedEx',  origin: 'Chicago, IL',   eta: '16 May', status: 'In Transit' },
                      { id: 'SHP-10292', carrier: 'DHL',    origin: 'New York, NY',  eta: '17 May', status: 'In Transit' },
                      { id: 'SHP-10293', carrier: 'UPS',    origin: 'Los Angeles',   eta: '19 May', status: 'Pending'    },
                    ]}
                  />
                </div>
              </TabPanel>

              <TabPanel id="documents" active={detailTab === 'documents'}>
                <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { name: 'Commercial Invoice.pdf',   size: '284 KB', date: '12 May' },
                    { name: 'Packing List.pdf',         size: '108 KB', date: '12 May' },
                    { name: 'Bill of Lading.pdf',       size: '196 KB', date: '13 May' },
                    { name: 'Customs Declaration.pdf',  size: '412 KB', date: '14 May' },
                    { name: 'Insurance Certificate.pdf', size: '88 KB', date: '14 May' },
                  ].map(doc => (
                    <div key={doc.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 7, background: '#F8F8FA', cursor: 'pointer' }}>
                      <span className="material-icons" style={{ fontSize: 18, color: '#E02F3A', fontFamily: 'Material Icons', lineHeight: 1, flexShrink: 0 }}>picture_as_pdf</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: '#282828', fontFamily: 'var(--font-ui)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</div>
                        <div style={{ fontSize: 10, color: '#767676', fontFamily: 'var(--font-ui)' }}>{doc.size} · Added {doc.date}</div>
                      </div>
                      <Button variant="borderless" size="sm" iconOnly="download" />
                    </div>
                  ))}
                </div>
              </TabPanel>

              <TabPanel id="history" active={detailTab === 'history'}>
                <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    { time: 'Today, 10:41', actor: 'System',     action: 'Status updated to Fulfilled',              icon: 'check_circle', color: '#027B44' },
                    { time: 'Today, 09:14', actor: 'Alex Mercer', action: 'Approved financial summary',              icon: 'approval',     color: '#8342BB' },
                    { time: '14 May, 16:22', actor: 'System',    action: 'All 3 shipments confirmed',               icon: 'local_shipping', color: '#3999E4' },
                    { time: '13 May, 11:05', actor: 'Emma Liu',  action: 'Documents uploaded (5 files)',            icon: 'upload_file', color: '#5E5C75' },
                    { time: '12 May, 09:23', actor: 'Alex Mercer', action: 'Order created from PO-2024-08912',      icon: 'add_circle',   color: '#767676' },
                  ].map((ev, i, arr) => (
                    <div key={i} style={{ display: 'flex', gap: 10, paddingBottom: i < arr.length - 1 ? 12 : 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${ev.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span className="material-icons" style={{ fontSize: 14, color: ev.color, fontFamily: 'Material Icons', lineHeight: 1 }}>{ev.icon}</span>
                        </div>
                        {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: '#EBEBEB', marginTop: 4 }} />}
                      </div>
                      <div style={{ paddingBottom: 4 }}>
                        <div style={{ fontSize: 12, fontWeight: 500, color: '#282828', fontFamily: 'var(--font-ui)' }}>{ev.action}</div>
                        <div style={{ fontSize: 10, color: '#767676', fontFamily: 'var(--font-ui)', marginTop: 1 }}>{ev.actor} · {ev.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>
            </div>
          </div>
        </div>
      </LayoutFrame>

      {/* ════════════════════════════════════════════════════════
          LAYOUT 04 — DATA MANAGEMENT
      ════════════════════════════════════════════════════════ */}
      <LayoutFrame number="04" name="Data Management"
        description="Table-first layout for managing large record sets. Toolbar provides search, filter, and bulk actions; the grid supports sorting, row variants, and selection; pagination anchors below."
        tags={['DataGrid', 'SearchBar', 'Select', 'Badge', 'Button', 'Pagination', 'Alert']}
        path="inventory/records"
      >
        <div style={LH}>
          <div style={LH_LOGO}>MH</div>
          <span style={LH_TITLE}>Modern Harmony</span>
          <div style={LH_DIVIDER} />
          <span style={LH_SUB}>Inventory Management</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <Button variant="default" size="sm" iconLeft="upload">Import</Button>
            <Button variant="default" size="sm" iconLeft="download">Export</Button>
            <Button variant="primary" size="sm" iconLeft="add">New Record</Button>
          </div>
        </div>

        <div style={LP}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div style={PT}>Order Records</div>
              <div style={{ fontSize: 11, color: '#5E5C75', fontFamily: 'var(--font-ui)' }}>
                <strong style={{ color: '#282828' }}>7 records</strong> · <span style={{ color: '#E02F3A' }}>1 critical</span> · <span style={{ color: '#F0A008' }}>2 delayed</span>
              </div>
            </div>
          </div>

          {/* toolbar */}
          <div style={{ background: '#fff', borderRadius: '10px 10px 0 0', border: '1px solid #EBEBEB', borderBottom: 'none', padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <SearchBar placeholder="Search orders, SKUs, carriers…" value={tableSearch} onChange={setTableSearch} results={[]} onSelect={() => {}} />
            </div>
            <div style={{ width: 130 }}><Select options={[{ value: '', label: 'All statuses' }, { value: 'on-track', label: 'On Track' }, { value: 'delayed', label: 'Delayed' }, { value: 'critical', label: 'Critical' }, { value: 'fulfilled', label: 'Fulfilled' }]} value="" onChange={() => {}} placeholder="Status" /></div>
            <div style={{ width: 130 }}><Select options={[{ value: '', label: 'All regions' }, { value: 'na', label: 'North America' }, { value: 'eu', label: 'Europe' }, { value: 'apac', label: 'Asia Pacific' }]} value="" onChange={() => {}} placeholder="Region" /></div>
            <Button variant="borderless" size="sm" iconLeft="filter_list">Filters</Button>
            <Button variant="borderless" size="sm" iconLeft="view_column">Columns</Button>
          </div>

          <Alert variant="warning" message="2 orders have missed their delivery window and need immediate attention." />

          <div className="ds-scroll-x" style={{ background: '#fff', borderRadius: '0 0 10px 10px', border: '1px solid #EBEBEB', borderTop: 'none' }}>
            <DataGrid
              columns={tableColumns}
              rows={tableRows}
              selectable
              selectedKeys={[]}
              onSelectionChange={() => {}}
              rowVariant={(r) => r.status === 'Critical' ? 'error' : r.status === 'Delayed' ? 'warning' : 'default'}
            />
          </div>

          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ fontSize: 11, color: '#767676', fontFamily: 'var(--font-ui)' }}>Showing 1–7 of 7 records</div>
            <Pagination total={7} page={tablePage} pageSize={25} onChange={setTablePage} />
          </div>
        </div>
      </LayoutFrame>

      {/* ════════════════════════════════════════════════════════
          LAYOUT 05 — MULTI-STEP WORKFLOW
      ════════════════════════════════════════════════════════ */}
      <LayoutFrame number="05" name="Multi-Step Workflow"
        description="Guided task completion for complex enterprise forms. Vertical stepper provides orientation; summary well reinforces key inputs; footer actions enable safe navigation between steps."
        tags={['Stepper', 'Input', 'Select', 'Textarea', 'Well', 'Progress', 'PageFooter']}
        path="orders/new"
      >
        <div style={LH}>
          <div style={LH_LOGO}>MH</div>
          <span style={LH_TITLE}>Modern Harmony</span>
          <div style={LH_DIVIDER} />
          <span style={LH_SUB}>New Order</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ui)' }}>Step {formStep} of 4</span>
            <Button variant="default" size="sm">Save draft</Button>
          </div>
        </div>

        <div style={{ ...LP, display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16 }}>
          {/* left: stepper nav */}
          <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #EBEBEB', padding: '16px 14px', height: 'fit-content' }}>
            <div style={{ ...SL, marginBottom: 12 }}>Workflow Steps</div>
            <Stepper orientation="vertical" current={formStep - 1}
              steps={[
                { label: 'Shipment Info',    sublabel: 'Origin, destination, incoterms'  },
                { label: 'Product Details',  sublabel: 'SKUs, quantities, packaging'      },
                { label: 'Carrier & Routing',sublabel: 'Service type, transit time'       },
                { label: 'Review & Submit',  sublabel: 'Confirm and place order'          },
              ]} />
            <div style={{ marginTop: 16, padding: '10px 12px', background: '#F2ECF8', borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#4E2975', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'var(--font-ui)' }}>Overall Progress</div>
              <Progress value={((formStep - 1) / 4) * 100} color="violet" size="sm" label={`${Math.round(((formStep - 1) / 4) * 100)}%`} />
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                ['Timeline',  formStep > 1 ? '14–18 days' : '—'],
                ['Priority',  formStep > 1 ? 'Standard'   : '—'],
                ['Est. Cost', formStep > 2 ? '$14,200'    : '—'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-ui)' }}>
                  <span style={{ color: '#767676' }}>{k}</span>
                  <span style={{ color: v === '—' ? '#C6C6C6' : '#282828', fontWeight: v !== '—' ? 600 : 400 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* right: form content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #EBEBEB', padding: '16px 18px' }}>
              <SectionHeading title="Shipment Information" subtitle="Step 1 of 4 — Origin, destination, and trade terms" />
              <div className="ds-grid-2" style={{ gap: 12, marginBottom: 12 }}>
                <Input label="Origin Port / Facility"   value="Chicago, IL — O'Hare Cargo"    onChange={() => {}} />
                <Input label="Destination Port / Facility" value="Rotterdam, Netherlands"     onChange={() => {}} />
                <Select label="Service Type"
                  options={[{ value: 'air', label: 'Air Freight' }, { value: 'ocean', label: 'Ocean FCL' }, { value: 'ground', label: 'Ground' }]}
                  value="air" onChange={() => {}} />
                <Select label="Incoterms"
                  options={[{ value: 'dap', label: 'DAP — Delivered at Place' }, { value: 'fob', label: 'FOB — Free on Board' }, { value: 'exw', label: 'EXW — Ex Works' }]}
                  value="dap" onChange={() => {}} />
                <DatePicker label="Pickup Date"         value={null} onChange={() => {}} />
                <DatePicker label="Required Delivery"   value={null} onChange={() => {}} />
              </div>
              <Textarea label="Special Instructions" value="" onChange={() => {}} placeholder="Fragile items, temperature requirements, customs notes…" rows={3} />
            </div>

            <Well>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                {[
                  ['Route',     'ORD → RTM'],
                  ['Service',   'Air Freight'],
                  ['Incoterms', 'DAP'],
                  ['Transit',   '14–18 days'],
                ].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3, fontFamily: 'var(--font-ui)' }}>{l}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#282828', fontFamily: 'Switzer, sans-serif' }}>{v}</div>
                  </div>
                ))}
              </div>
            </Well>
          </div>
        </div>

        <PageFooter
          actions={[
            { id: 'continue', label: 'Continue', variant: 'primary', icon: 'arrow_forward', onClick: () => setFormStep(s => Math.min(s + 1, 4)) },
            { id: 'back',     label: 'Back',     variant: 'default',                        onClick: () => setFormStep(s => Math.max(s - 1, 1)) },
            { id: 'draft',    label: 'Save draft', variant: 'default',                      onClick: () => {} },
          ]}
          recordCount={formStep}
          recordLabel="of 4 steps completed"
        />
      </LayoutFrame>

      {/* ════════════════════════════════════════════════════════
          LAYOUT 06 — SETTINGS & CONFIGURATION
      ════════════════════════════════════════════════════════ */}
      <LayoutFrame number="06" name="Settings & Configuration"
        description="Left-navigated settings page. Vertical tab list provides quick section switching; the main area renders sectioned forms with clear hierarchy; save/cancel anchor to footer."
        tags={['Tabs', 'Input', 'Switch', 'Select', 'Alert', 'Button', 'SectionHeading']}
        path="settings/general"
      >
        <div style={LH}>
          <div style={LH_LOGO}>MH</div>
          <span style={LH_TITLE}>Modern Harmony</span>
          <div style={LH_DIVIDER} />
          <span style={LH_SUB}>Settings</span>
        </div>

        <div style={{ ...LP, display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16 }}>
          {/* left nav */}
          <div>
            {[
              { id: 'general',       icon: 'tune',           label: 'General'       },
              { id: 'notifications', icon: 'notifications',  label: 'Notifications' },
              { id: 'integrations',  icon: 'electrical_services', label: 'Integrations' },
              { id: 'security',      icon: 'lock',           label: 'Security'      },
              { id: 'team',          icon: 'group',          label: 'Team'          },
            ].map(item => (
              <button key={item.id} onClick={() => setSettingsTab(item.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 9, width: '100%', padding: '8px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', textAlign: 'left', marginBottom: 2, fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: settingsTab === item.id ? 600 : 400, background: settingsTab === item.id ? '#F2ECF8' : 'transparent', color: settingsTab === item.id ? '#8342BB' : '#282828' }}>
                <span className="material-icons" style={{ fontSize: 16, fontFamily: 'Material Icons', lineHeight: 1, color: settingsTab === item.id ? '#8342BB' : '#767676' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* right content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            {settingsTab === 'general' && (<>
              <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #EBEBEB', padding: '16px 18px' }}>
                <SectionHeading title="Workspace" subtitle="Organization name, timezone, and locale preferences" />
                <div className="ds-grid-2" style={{ gap: 12 }}>
                  <Input label="Workspace Name" value="Modern Harmony DS" onChange={() => {}} />
                  <Input label="Primary Domain"  value="modernharmony.io" onChange={() => {}} />
                  <Select label="Timezone"
                    options={[{ value: 'utc', label: 'UTC' }, { value: 'est', label: 'UTC−5 Eastern' }, { value: 'pst', label: 'UTC−8 Pacific' }]}
                    value="utc" onChange={() => {}} />
                  <Select label="Date Format"
                    options={[{ value: 'dmy', label: 'DD/MM/YYYY' }, { value: 'mdy', label: 'MM/DD/YYYY' }]}
                    value="dmy" onChange={() => {}} />
                </div>
              </div>

              <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #EBEBEB', padding: '16px 18px' }}>
                <SectionHeading title="Preferences" subtitle="Display and behaviour settings" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Switch label="Dark mode" checked={darkMode} onChange={setDarkMode} hint="Use dark theme across the application" />
                  <Switch label="Auto-save drafts" checked={autoSave} onChange={setAutoSave} hint="Automatically save form progress every 30 seconds" />
                  <Switch label="Notifications" checked={notif} onChange={setNotif} hint="Receive in-app notifications for critical alerts" />
                  <div style={{ height: 1, background: '#F0F0F4' }} />
                  <Select label="Default landing page"
                    options={[{ value: 'dashboard', label: 'Operations Dashboard' }, { value: 'orders', label: 'Order Records' }, { value: 'analytics', label: 'Analytics' }]}
                    value="dashboard" onChange={() => {}} />
                </div>
              </div>

              <Alert variant="info" message="Changes to workspace settings take effect immediately for all team members." />
            </>)}

            {settingsTab === 'notifications' && (
              <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #EBEBEB', padding: '16px 18px' }}>
                <SectionHeading title="Notification Channels" subtitle="Control how and when you receive alerts" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    ['In-app notifications',   'Show notifications in the sidebar',     true  ],
                    ['Email digest',            'Daily summary of activity',             false ],
                    ['Critical order alerts',   'Immediate alerts for critical status',  true  ],
                    ['System maintenance',      'Planned downtime and updates',          true  ],
                    ['Weekly report',           'Performance summary every Monday',      false ],
                  ].map(([label, desc, checked]) => (
                    <Switch key={label as string} label={label as string} hint={desc as string} checked={checked as boolean} onChange={() => {}} />
                  ))}
                </div>
              </div>
            )}

            {settingsTab !== 'general' && settingsTab !== 'notifications' && (
              <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #EBEBEB', padding: '16px 18px' }}>
                <SectionHeading title={settingsTab.charAt(0).toUpperCase() + settingsTab.slice(1)} subtitle="Configure your preferences for this section" />
                <div style={{ padding: '24px 0', textAlign: 'center' }}>
                  <span className="material-icons" style={{ fontSize: 32, color: '#DDDDE5', fontFamily: 'Material Icons', lineHeight: 1, display: 'block', marginBottom: 8 }}>settings</span>
                  <div style={{ fontSize: 13, color: '#767676', fontFamily: 'var(--font-ui)' }}>Select General or Notifications to see live settings</div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="default" size="sm">Discard changes</Button>
              <Button variant="primary" size="sm" iconLeft="save">Save settings</Button>
            </div>
          </div>
        </div>
      </LayoutFrame>
    </div>
  )
}

// ── Section registry ───────────────────────────────────────────────────────────

type SectionId =
  | 'colors'
  | 'typography'
  | 'buttons'
  | 'forms'
  | 'feedback'
  | 'navigation'
  | 'overlays'
  | 'data'
  | 'layout'
  | 'composites'
  | 'advanced'
  | 'tokens'
  | 'charts'
  | 'page-layouts'

const sectionMeta: Record<SectionId, { label: string; icon: string }> = {
  colors:     { label: 'Colors & Tokens',  icon: 'palette' },
  tokens:     { label: 'Design Tokens',     icon: 'design_services' },
  typography: { label: 'Typography',        icon: 'text_fields' },
  buttons:    { label: 'Buttons',           icon: 'smart_button' },
  forms:      { label: 'Form Controls',     icon: 'edit_note' },
  feedback:   { label: 'Feedback',          icon: 'notifications_active' },
  navigation: { label: 'Navigation',        icon: 'navigation' },
  overlays:   { label: 'Overlays',          icon: 'layers' },
  data:       { label: 'Data',              icon: 'table_chart' },
  layout:     { label: 'Layout',            icon: 'dashboard' },
  composites: { label: 'Composites',        icon: 'widgets' },
  advanced:   { label: 'Advanced',          icon: 'tune' },
  charts:       { label: 'Charts',         icon: 'insert_chart' },
  'page-layouts': { label: 'Page Layouts', icon: 'view_quilt'   },
}

const sectionOrder: SectionId[] = [
  'colors', 'tokens', 'typography', 'buttons', 'forms',
  'feedback', 'navigation', 'overlays', 'data', 'layout', 'composites', 'advanced',
  'charts', 'page-layouts',
]

function SectionContent({ id }: { id: SectionId }) {
  switch (id) {
    case 'colors':     return <ColorsSection />
    case 'tokens':     return <TokensSection />
    case 'typography': return <TypographySection />
    case 'buttons':    return <ButtonsSection />
    case 'forms':      return <FormSection />
    case 'feedback':   return <FeedbackSection />
    case 'navigation': return <NavigationSection />
    case 'overlays':   return <OverlaysSection />
    case 'data':       return <DataSection />
    case 'layout':     return <LayoutSection />
    case 'composites': return <CompositesSection />
    case 'advanced':   return <AdvancedSection />
    case 'charts':        return <ChartsSection />
    case 'page-layouts':  return <PageLayoutsSection />
  }
}

// ── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  const isMobile = useIsMobile()
  const [sidebarExpanded, setSidebarExpanded] = useState(() => window.innerWidth >= 768)
  const [activeSection, setActiveSection] = useState<SectionId>('colors')

  // Auto-collapse sidebar when viewport shrinks to mobile
  useEffect(() => {
    if (isMobile) setSidebarExpanded(false)
  }, [isMobile])

  const navItems: NavItem[] = sectionOrder.map((id) => ({
    id,
    icon: sectionMeta[id].icon,
    label: sectionMeta[id].label,
  }))

  const handleNavigate = (id: string) => {
    if (id === '_source') { window.open('https://github.com/NameisVivek/modern-harmony-ds', '_blank'); return }
    setActiveSection(id as SectionId)
    // Close sidebar after navigating on mobile
    if (isMobile) setSidebarExpanded(false)
  }

  const pad = isMobile ? 12 : 24

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-ui)' }}>
      <AppHeader
        sidebarExpanded={sidebarExpanded}
        onToggleSidebar={() => setSidebarExpanded((e) => !e)}
        envLabel="Design System"
        envVariant="dev"
        userName="Design Team"
        userRole="System Admin"
        userInitials="DS"
        notificationCount={2}
        isMobile={isMobile}
      />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Sidebar
          expanded={sidebarExpanded}
          activeId={activeSection}
          items={navItems}
          bottomItems={[
            { id: '_source', icon: 'code', label: 'Source code' },
          ]}
          onNavigate={handleNavigate}
          userName="Design Team"
          userRole="System Admin"
          userInitials="DS"
          notificationCount={2}
          isMobile={isMobile}
        />
        <main style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: pad,
          background: '#F0F0F4',
          minWidth: 0,
        }}>
          <div style={{ maxWidth: 960, width: '100%' }}>
            <SectionContent id={activeSection} />
          </div>
          <div style={{ height: isMobile ? 16 : 48 }} />
        </main>
      </div>
    </div>
  )
}
