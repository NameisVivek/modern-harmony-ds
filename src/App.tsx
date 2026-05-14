import { useState } from 'react'
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

function ColorsSection() {
  const brandRamp = ['#F2ECF8','#CDB2F4','#B47FE8','#9B5CCF','#8342BB','#7239A4','#5C2B84','#3E1C5A']
  const greenRamp = ['#DDFAEE','#AAEECF','#5BD6A0','#1A9E5E','#027B44','#016235','#014B28']
  const redRamp   = ['#FFE8EA','#FFCDD0','#FFA0A7','#F5606A','#E02F3A','#B02530','#7A1820']
  const amberRamp = ['#FFF9EB','#FFEDC0','#FFD878','#FDBF14','#E89A00','#C47A00','#915800']

  return (
    <div>
      <div style={PAGE_TITLE}>Colors & Tokens</div>
      <div style={PAGE_SUB}>Brand palette, semantic colors, and decision tokens</div>

      <div style={EC}>
        <div style={SL}>Violet — Brand Primary</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {brandRamp.map((c) => <div key={c} style={{ flex: 1, height: 36, borderRadius: 6, background: c }} />)}
        </div>
        <div style={{ ...DIVIDER, marginTop: 14 }} />
        <div style={{ ...SL, marginTop: 12 }}>Semantic Ramps</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[greenRamp, redRamp, amberRamp].map((ramp, i) => (
            <div key={i} style={{ display: 'flex', gap: 4 }}>
              {ramp.map((c) => <div key={c} style={{ flex: 1, height: 28, borderRadius: 5, background: c }} />)}
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...EC, marginTop: 12 }}>
        <div style={SL}>Decision Tokens</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { token: '--dec-color-brand-base',       hex: '#8342BB', label: 'Brand Base' },
            { token: '--dec-color-text-body',         hex: '#282828', label: 'Text Body' },
            { token: '--dec-color-text-label',        hex: '#5E5C75', label: 'Text Label' },
            { token: '--dec-color-text-hint',         hex: '#8C8C8C', label: 'Text Hint' },
            { token: '--dec-color-surface',           hex: '#FFFFFF', label: 'Surface' },
            { token: '--dec-color-surface-subtle',    hex: '#F5F5F9', label: 'Surface Subtle' },
            { token: '--dec-color-success-strong',    hex: '#027B44', label: 'Success Strong' },
            { token: '--dec-color-error-strong',      hex: '#E02F3A', label: 'Error Strong' },
            { token: '--dec-color-warning-strong',    hex: '#C47A00', label: 'Warning Strong' },
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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

  return (
    <div>
      <div style={PAGE_TITLE}>Navigation</div>
      <div style={PAGE_SUB}>Breadcrumbs, tabs, pagination, and segment controls</div>

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
        <DataGrid
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
        />
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
              <div style={{ display: 'flex', gap: 24 }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
              <Avatar key={size} name="Burton Guster" size={size} />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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

const sectionMeta: Record<SectionId, { label: string; icon: string }> = {
  colors:     { label: 'Colors & Tokens',  icon: 'palette' },
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
}

const sectionOrder: SectionId[] = [
  'colors', 'typography', 'buttons', 'forms',
  'feedback', 'navigation', 'overlays', 'data', 'layout', 'composites', 'advanced',
]

function SectionContent({ id }: { id: SectionId }) {
  switch (id) {
    case 'colors':     return <ColorsSection />
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
  }
}

// ── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [activeSection, setActiveSection] = useState<SectionId>('colors')

  const navItems: NavItem[] = sectionOrder.map((id) => ({
    id,
    icon: sectionMeta[id].icon,
    label: sectionMeta[id].label,
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'var(--font-ui)' }}>
      <AppHeader
        sidebarExpanded={sidebarExpanded}
        onToggleSidebar={() => setSidebarExpanded((e) => !e)}
        breadcrumbs={[
          { label: 'Modern Harmony' },
          { label: sectionMeta[activeSection].label },
        ]}
        envLabel="Design System"
        envVariant="dev"
        userName="Design Team"
        userRole="System Admin"
        userInitials="DS"
        notificationCount={2}
      />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          expanded={sidebarExpanded}
          activeId={activeSection}
          items={navItems}
          bottomItems={[
            { id: '_source', icon: 'code', label: 'Source code' },
            { id: '_figma', icon: 'design_services', label: 'Figma file' },
          ]}
          onNavigate={(id) => setActiveSection(id as SectionId)}
          userName="Design Team"
          userRole="System Admin"
          userInitials="DS"
        />
        <main style={{ flex: 1, overflowY: 'auto', padding: 24, background: '#F0F0F4' }}>
          <div style={{ maxWidth: 960 }}>
            <SectionContent id={activeSection} />
          </div>
          <div style={{ height: 48 }} />
        </main>
      </div>
    </div>
  )
}
