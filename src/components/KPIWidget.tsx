import React, { ReactNode } from 'react';

/* ─── Shared types ─────────────────────────────────────────────── */

export type ChangeDirection = 'up' | 'down' | 'flat';

export interface SparklinePoint {
  value: number;
}

export interface MultiMetricItem {
  value: string | number;
  label: string;
  color?: string;
}

export interface StatusBarItem {
  label: string;
  value: string | number;
  percentage: number;
  color?: string;
}

/* ─── Props variants ────────────────────────────────────────────── */

interface BaseWidgetProps {
  title: string;
  onRefresh?: () => void;
}

export interface SimpleKPIProps extends BaseWidgetProps {
  variant: 'simple';
  value: string | number;
  unit?: string;
  change?: string;
  changeDirection?: ChangeDirection;
  icon?: string;
  iconBg?: string;
  iconColor?: string;
}

export interface RatioKPIProps extends BaseWidgetProps {
  variant: 'ratio';
  value: string | number;
  total?: string | number;
  unit?: string;
  percentage: number;
  barColor?: string;
  labelLeft?: string;
  labelRight?: string;
  valueColor?: string;
  annotation?: string;
  annotationColor?: string;
}

export interface SparklineKPIProps extends BaseWidgetProps {
  variant: 'sparkline';
  value: string | number;
  change?: string;
  changeDirection?: ChangeDirection;
  data: SparklinePoint[];
  labelStart?: string;
  labelEnd?: string;
}

export interface MultiMetricKPIProps extends BaseWidgetProps {
  variant: 'multi';
  metrics: MultiMetricItem[];
}

export interface StatusBarsKPIProps extends BaseWidgetProps {
  variant: 'status';
  items: StatusBarItem[];
}

export type KPIWidgetProps =
  | SimpleKPIProps
  | RatioKPIProps
  | SparklineKPIProps
  | MultiMetricKPIProps
  | StatusBarsKPIProps;

/* ─── Shared styles ─────────────────────────────────────────────── */

const card: React.CSSProperties = {
  background: 'var(--dec-color-surface)',
  borderRadius: '14px',
  border: '1px solid var(--core-gray-75)',
  boxShadow: 'var(--elevation-2)',
};

const widgetAction: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '10px',
};

const widgetTitle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 500,
  color: 'var(--dec-color-text-body)',
  fontFamily: 'var(--font-ui)',
};

const refreshBtn: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
  fontSize: '10px',
  color: 'var(--th-text-hint)',
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',
  fontFamily: 'var(--font-ui)',
  padding: 0,
};

const monoValue: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 500,
  color: 'var(--dec-color-text-body)',
  lineHeight: 1,
};

function trendColor(dir?: ChangeDirection) {
  if (dir === 'up') return 'var(--dec-color-success-foreground)';
  if (dir === 'down') return 'var(--dec-color-error-foreground)';
  return 'var(--dec-color-text-label)';
}

function trendIcon(dir?: ChangeDirection) {
  if (dir === 'up') return 'trending_up';
  if (dir === 'down') return 'trending_down';
  return 'trending_flat';
}

interface WidgetHeaderProps {
  title: string;
  onRefresh?: () => void;
  action?: ReactNode;
}

function WidgetHeader({ title, onRefresh, action }: WidgetHeaderProps) {
  return (
    <div style={widgetAction}>
      <span style={widgetTitle}>{title}</span>
      {action ?? (onRefresh && (
        <button
          style={refreshBtn}
          onClick={onRefresh}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--dec-color-secondary-foreground)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--th-text-hint)'; }}
        >
          <span className="material-icons" style={{ fontSize: '13px', fontFamily: 'Material Icons', lineHeight: 1 }}>refresh</span>
          Refresh
        </button>
      ))}
    </div>
  );
}

/* ─── Simple KPI ────────────────────────────────────────────────── */

function SimpleWidget({ title, value, unit, change, changeDirection, icon, iconBg, iconColor, onRefresh }: SimpleKPIProps) {
  return (
    <div style={{ ...card, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '11px', color: 'var(--dec-color-text-label)' }}>{title}</span>
        {icon && (
          <div style={{ width: '26px', height: '26px', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: iconBg ?? 'var(--core-cool-50)' }}>
            <span className="material-icons" style={{ fontSize: '15px', color: iconColor ?? 'var(--dec-color-neutral-foreground)', fontFamily: 'Material Icons', lineHeight: 1 }}>{icon}</span>
          </div>
        )}
      </div>
      <div>
        <span style={{ ...monoValue, fontSize: '26px' }}>{value}</span>
        {unit && <span style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: 'var(--dec-color-text-label)', fontWeight: 400 }}> {unit}</span>}
      </div>
      {change && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: 500, color: trendColor(changeDirection) }}>
          <span className="material-icons" style={{ fontSize: '13px', fontFamily: 'Material Icons', lineHeight: 1 }}>{trendIcon(changeDirection)}</span>
          {change}
        </div>
      )}
    </div>
  );
}

/* ─── Ratio KPI ─────────────────────────────────────────────────── */

function RatioWidget({ title, value, total, unit, percentage, barColor, labelLeft, labelRight, valueColor, annotation, annotationColor, onRefresh }: RatioKPIProps) {
  return (
    <div style={{ ...card, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <WidgetHeader title={title} onRefresh={onRefresh} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
        <span style={{ ...monoValue, fontSize: '24px', color: valueColor ?? 'var(--dec-color-text-body)' }}>{value}</span>
        {(total || unit) && (
          <span style={{ fontSize: '13px', color: 'var(--dec-color-text-label)' }}>
            {total ? `/ ${total}` : ''}{unit ? ` ${unit}` : ''}
          </span>
        )}
        {annotation && (
          <span style={{ fontSize: '10px', color: annotationColor ?? 'var(--dec-color-success-foreground)', fontWeight: 500, marginLeft: 'auto' }}>
            {annotation}
          </span>
        )}
      </div>
      <div style={{ height: '6px', borderRadius: '3px', background: 'var(--core-cool-50)', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: '3px', width: `${Math.min(percentage, 100)}%`, background: barColor ?? 'var(--dec-color-brand-base)' }} />
      </div>
      {(labelLeft || labelRight) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--th-text-secondary)' }}>
          <span>{labelLeft}</span>
          <span>{labelRight}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Sparkline KPI ─────────────────────────────────────────────── */

function SparklineWidget({ title, value, change, changeDirection, data, labelStart, labelEnd, onRefresh }: SparklineKPIProps) {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const w = 200;
  const h = 44;
  const pad = 4;

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p}`).join(' ');
  const areaD = `${pathD} L${w},${h} L0,${h} Z`;

  const lastPt = points[points.length - 1]?.split(',');
  const lastX = lastPt?.[0] ?? w;
  const lastY = lastPt?.[1] ?? 0;

  return (
    <div style={{ ...card, padding: '12px 14px' }}>
      <WidgetHeader title={title} onRefresh={onRefresh} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
        <span style={{ ...monoValue, fontSize: '22px' }}>{value}</span>
        {change && (
          <span style={{ fontSize: '11px', color: trendColor(changeDirection), fontWeight: 500 }}>{change}</span>
        )}
      </div>
      <svg width="100%" height="44" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="kpi-sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--core-violet-600)" stopOpacity={0.18} />
            <stop offset="100%" stopColor="var(--core-violet-600)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#kpi-sg)" />
        <path d={pathD} stroke="var(--core-violet-600)" strokeWidth="1.8" fill="none" />
        <circle cx={lastX} cy={lastY} r="3" fill="var(--core-violet-600)" />
      </svg>
      {(labelStart || labelEnd) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--th-text-secondary)', marginTop: '2px' }}>
          <span>{labelStart}</span>
          <span>{labelEnd}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Multi-metric KPI ──────────────────────────────────────────── */

function MultiMetricWidget({ title, metrics, onRefresh }: MultiMetricKPIProps) {
  return (
    <div style={{ ...card, padding: '14px 16px' }}>
      <WidgetHeader title={title} onRefresh={onRefresh} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px' }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ ...monoValue, fontSize: '18px', color: m.color ?? 'var(--dec-color-text-body)' }}>{m.value}</span>
            <span style={{ fontSize: '10px', color: 'var(--th-text-secondary)', fontFamily: 'var(--font-ui)' }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Status bars KPI ───────────────────────────────────────────── */

function StatusBarsWidget({ title, items, onRefresh }: StatusBarsKPIProps) {
  return (
    <div style={{ ...card, padding: '12px 14px' }}>
      <WidgetHeader title={title} onRefresh={onRefresh} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {items.map((item, i) => (
          <div key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: item.color ?? 'var(--dec-color-brand-base)', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', color: 'var(--dec-color-text-body)', flex: 1, fontFamily: 'var(--font-ui)' }}>{item.label}</span>
              <span style={{ ...monoValue, fontSize: '12px' }}>{item.value}</span>
            </div>
            <div style={{ height: '4px', borderRadius: '2px', background: 'var(--core-cool-50)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: '2px', width: `${Math.min(item.percentage, 100)}%`, background: item.color ?? 'var(--dec-color-brand-base)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ───────────────────────────────────────────────── */

export function KPIWidget(props: KPIWidgetProps) {
  switch (props.variant) {
    case 'simple':    return <SimpleWidget {...props} />;
    case 'ratio':     return <RatioWidget {...props} />;
    case 'sparkline': return <SparklineWidget {...props} />;
    case 'multi':     return <MultiMetricWidget {...props} />;
    case 'status':    return <StatusBarsWidget {...props} />;
  }
}

export default KPIWidget;
