import React, { useState, useRef, useEffect, useId } from 'react';

// ─── Chart color palette (design-system aligned) ─────────────────────────────
export const CHART_PALETTE: readonly string[] = [
  '#8342BB', // violet-600  — brand primary
  '#3999E4', // blue-400    — info / secondary
  '#02A15A', // green-300   — success
  '#F0A008', // amber-400   — warning
  '#E02F3A', // red-500     — danger
  'var(--th-text-secondary)', // cool-600 — neutral
  '#B49AD6', // violet-300  — soft purple
  '#68ACEB', // blue-300    — soft blue
] as const;

// ─── Public types ─────────────────────────────────────────────────────────────

export interface ChartSeries {
  name: string;
  data: number[];
  color?: string;
}

export interface DonutSlice {
  name: string;
  value: number;
  color?: string;
}

export interface BarEntry {
  label: string;
  value: number;
  color?: string;
  annotation?: string;
}

// ─── Internal utilities ───────────────────────────────────────────────────────

function niceMax(rawMax: number, numTicks = 4): number {
  if (rawMax <= 0) return numTicks;
  const roughStep = (rawMax * 1.1) / numTicks;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const norm = roughStep / magnitude;
  const niceStep = norm <= 1.5 ? 1 : norm <= 3 ? 2 : norm <= 7 ? 5 : 10;
  const stepVal = niceStep * magnitude;
  return Math.ceil((rawMax * 1.05) / stepVal) * stepVal;
}

function fmt(v: number): string {
  if (v >= 1_000_000) return `${+(v / 1_000_000).toFixed(1)}M`;
  if (v >= 10_000) return `${Math.round(v / 1_000)}K`;
  if (v >= 1_000) return `${+(v / 1_000).toFixed(1)}K`;
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
}

function useElementWidth(ref: React.RefObject<HTMLDivElement | null>): number {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    setW(ref.current.clientWidth);
    const ro = new ResizeObserver(([entry]) => setW(entry.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return w;
}

// Catmull-Rom → cubic Bézier smooth line through data points
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

// Rectangle with rounded top-only corners
function topRect(x: number, y: number, w: number, h: number, r: number): string {
  const s = Math.min(r, w / 2, Math.max(h, 0));
  return `M${x},${y + h} L${x},${y + s} Q${x},${y} ${x + s},${y} L${x + w - s},${y} Q${x + w},${y} ${x + w},${y + s} L${x + w},${y + h} Z`;
}

// SVG arc path for a donut segment
function donutArc(
  cx: number, cy: number,
  outerR: number, innerR: number,
  startDeg: number, endDeg: number,
): string {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const a1 = toRad(startDeg);
  const a2 = toRad(endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  const x1 = cx + outerR * Math.cos(a1), y1 = cy + outerR * Math.sin(a1);
  const x2 = cx + outerR * Math.cos(a2), y2 = cy + outerR * Math.sin(a2);
  const x3 = cx + innerR * Math.cos(a2), y3 = cy + innerR * Math.sin(a2);
  const x4 = cx + innerR * Math.cos(a1), y4 = cy + innerR * Math.sin(a1);
  return `M${x1.toFixed(2)},${y1.toFixed(2)} A${outerR},${outerR} 0 ${large} 1 ${x2.toFixed(2)},${y2.toFixed(2)} L${x3.toFixed(2)},${y3.toFixed(2)} A${innerR},${innerR} 0 ${large} 0 ${x4.toFixed(2)},${y4.toFixed(2)} Z`;
}

// ─── Shared card + sub-components ────────────────────────────────────────────

const CARD: React.CSSProperties = {
  background: 'var(--dec-color-surface)',
  borderRadius: '14px',
  border: '1px solid var(--core-gray-75)',
  boxShadow: 'var(--elevation-2)',
  fontFamily: 'var(--font-ui)',
};

function ChartHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: 'calc(14px + var(--th-density-offset, 0px)) 16px calc(10px + var(--th-density-offset, 0px))',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--dec-color-text-body)',
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: 11,
              color: 'var(--dec-color-text-label)',
              marginTop: 2,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
      {action}
    </div>
  );
}

function ChartLegend({
  items,
  palette,
}: {
  items: Array<{ name: string; color?: string }>;
  palette: readonly string[];
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px 14px',
        padding: '4px 16px 12px',
      }}
    >
      {items.map((item, i) => (
        <div
          key={item.name}
          style={{ display: 'flex', alignItems: 'center', gap: 5 }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: item.color ?? palette[i % palette.length],
              flexShrink: 0,
            }}
          />
          <span
            style={{ fontSize: 11, color: 'var(--dec-color-text-label)' }}
          >
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}

interface TT {
  x: number;
  y: number;
  label: string;
  items: Array<{ name: string; value: number; color: string; suffix?: string }>;
}

function ChartTooltip({ tt, containerW }: { tt: TT; containerW: number }) {
  const clampedX = Math.max(60, Math.min(tt.x, containerW - 60));
  return (
    <div
      style={{
        position: 'absolute',
        left: clampedX,
        top: Math.max(tt.y - 10, 70),
        transform: tt.y < 90 ? 'translate(-50%, 10px)' : 'translate(-50%, -100%)',
        background: 'var(--th-bg-surface)',
        color: 'var(--th-text-primary)',
        borderRadius: 8,
        padding: '7px 10px',
        fontSize: 11,
        fontFamily: 'var(--font-ui)',
        pointerEvents: 'none',
        zIndex: 60,
        boxShadow: '0 6px 20px rgba(0,0,0,0.28)',
        whiteSpace: 'nowrap',
        minWidth: 110,
      }}
    >
      <div
        style={{
          fontSize: 9.5,
          color: 'rgba(255,255,255,0.5)',
          marginBottom: 4,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {tt.label}
      </div>
      {tt.items.map((it) => (
        <div
          key={it.name}
          style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 2 }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: it.color,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              flex: 1,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 10,
              marginRight: 4,
            }}
          >
            {it.name}
          </span>
          <span
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            {fmt(it.value)}
            {it.suffix ?? ''}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── LineChart ────────────────────────────────────────────────────────────────

export interface LineChartProps {
  title: string;
  subtitle?: string;
  labels: string[];
  series: ChartSeries[];
  height?: number;
  showArea?: boolean;
  showDots?: boolean;
  formatY?: (v: number) => string;
  action?: React.ReactNode;
}

export function LineChart({
  title,
  subtitle,
  labels,
  series,
  height = 228,
  showArea = true,
  showDots = true,
  formatY = fmt,
  action,
}: LineChartProps) {
  const [tt, setTt] = useState<TT | null>(null);
  const [hIdx, setHIdx] = useState<number | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const svgW = useElementWidth(bodyRef);
  const uid = useId().replace(/:/g, '_');

  const PAD = { top: 18, right: 18, bottom: 36, left: 50 };
  const H = height;
  const iW = svgW - PAD.left - PAD.right;
  const iH = H - PAD.top - PAD.bottom;

  const allVals = series.flatMap((s) => s.data);
  const maxVal = niceMax(Math.max(...allVals, 0));
  const NUM_TICKS = 4;
  const yTicks = Array.from({ length: NUM_TICKS + 1 }, (_, i) => (i / NUM_TICKS) * maxVal);

  const xOf = (i: number) =>
    PAD.left + (labels.length > 1 ? (i / (labels.length - 1)) * iW : iW / 2);
  const yOf = (v: number) => PAD.top + iH - (v / maxVal) * iH;

  const tickStep = Math.max(1, Math.ceil(labels.length / 7));

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = Math.max(0, Math.min(1, (e.clientX - rect.left - PAD.left) / iW));
    const idx = Math.round(frac * (labels.length - 1));
    setHIdx(idx);
    const cRect = bodyRef.current?.getBoundingClientRect();
    if (!cRect) return;
    setTt({
      x: e.clientX - cRect.left,
      y: e.clientY - cRect.top,
      label: labels[idx] ?? '',
      items: series.map((s, si) => ({
        name: s.name,
        value: s.data[idx] ?? 0,
        color: s.color ?? CHART_PALETTE[si % CHART_PALETTE.length],
      })),
    });
  };

  return (
    <div style={CARD}>
      <ChartHeader title={title} subtitle={subtitle} action={action} />
      <div ref={bodyRef} style={{ position: 'relative', userSelect: 'none' }}>
        {svgW > 0 && (
          <svg
            width={svgW}
            height={H}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setTt(null); setHIdx(null); }}
            style={{ display: 'block', cursor: 'crosshair' }}
          >
            <defs>
              {series.map((s, si) => {
                const c = s.color ?? CHART_PALETTE[si % CHART_PALETTE.length];
                return (
                  <linearGradient key={si} id={`${uid}lg${si}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c} stopOpacity={0.18} />
                    <stop offset="100%" stopColor={c} stopOpacity={0} />
                  </linearGradient>
                );
              })}
            </defs>

            {/* Horizontal grid lines */}
            {yTicks.map((v, i) => (
              <line
                key={i}
                x1={PAD.left} x2={svgW - PAD.right}
                y1={yOf(v)} y2={yOf(v)}
                stroke={i === 0 ? 'var(--core-cool-100)' : 'var(--core-cool-50)'}
                strokeWidth={i === 0 ? 1 : 0.5}
              />
            ))}

            {/* Y-axis labels */}
            {yTicks.map((v, i) => (
              <text
                key={i}
                x={PAD.left - 7} y={yOf(v)}
                textAnchor="end" dominantBaseline="middle"
                fontSize={9} fill="var(--th-text-hint)" fontFamily="var(--font-ui)"
              >
                {formatY(v)}
              </text>
            ))}

            {/* X-axis labels */}
            {labels.map((lbl, i) => {
              if (i % tickStep !== 0 && i !== labels.length - 1) return null;
              const anchor = i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle';
              return (
                <text
                  key={i}
                  x={xOf(i)} y={H - PAD.bottom + 14}
                  textAnchor={anchor}
                  fontSize={9} fill="var(--th-text-hint)" fontFamily="var(--font-ui)"
                >
                  {lbl}
                </text>
              );
            })}

            {/* Hover vertical guide */}
            {hIdx !== null && (
              <line
                x1={xOf(hIdx)} x2={xOf(hIdx)}
                y1={PAD.top} y2={yOf(0)}
                stroke="var(--core-cool-200)" strokeWidth={1} strokeDasharray="3 3"
              />
            )}

            {/* Series: area fill → line → dots */}
            {series.map((s, si) => {
              const c = s.color ?? CHART_PALETTE[si % CHART_PALETTE.length];
              const pts = s.data.map((v, i) => ({ x: xOf(i), y: yOf(v) }));
              const line = smoothPath(pts);
              const area = `${line} L${xOf(s.data.length - 1)},${yOf(0)} L${xOf(0)},${yOf(0)} Z`;
              return (
                <g key={si}>
                  {showArea && <path d={area} fill={`url(#${uid}lg${si})`} />}
                  <path
                    d={line}
                    stroke={c}
                    strokeWidth={1.8}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {showDots &&
                    s.data.map((v, i) => {
                      const isH = hIdx === i;
                      return (
                        <circle
                          key={i}
                          cx={xOf(i)} cy={yOf(v)}
                          r={isH ? 4.5 : 2.5}
                          fill={isH ? c : 'var(--dec-color-surface)'}
                          stroke={c}
                          strokeWidth={1.5}
                          style={{ transition: 'r 0.1s' }}
                        />
                      );
                    })}
                </g>
              );
            })}
          </svg>
        )}
        {tt && <ChartTooltip tt={tt} containerW={svgW} />}
      </div>
      {series.length > 1 && <ChartLegend items={series} palette={CHART_PALETTE} />}
    </div>
  );
}

// ─── BarChart ─────────────────────────────────────────────────────────────────

export interface BarChartProps {
  title: string;
  subtitle?: string;
  labels: string[];
  series: ChartSeries[];
  height?: number;
  grouped?: boolean;
  formatY?: (v: number) => string;
  action?: React.ReactNode;
}

export function BarChart({
  title,
  subtitle,
  labels,
  series,
  height = 228,
  grouped = true,
  formatY = fmt,
  action,
}: BarChartProps) {
  const [tt, setTt] = useState<TT | null>(null);
  const [hGroup, setHGroup] = useState<number | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const svgW = useElementWidth(bodyRef);

  const PAD = { top: 18, right: 18, bottom: 36, left: 50 };
  const H = height;
  const iW = svgW - PAD.left - PAD.right;
  const iH = H - PAD.top - PAD.bottom;

  const allVals = series.flatMap((s) => s.data);
  const maxVal = niceMax(Math.max(...allVals, 0));
  const NUM_TICKS = 4;
  const yTicks = Array.from({ length: NUM_TICKS + 1 }, (_, i) => (i / NUM_TICKS) * maxVal);

  const yOf = (v: number) => PAD.top + iH - (v / maxVal) * iH;

  const nSeries = series.length;
  const groupW = iW / labels.length;
  const groupInner = groupW * 0.72;
  const barW = grouped ? groupInner / nSeries - 1 : groupInner;
  const groupCx = (gi: number) => PAD.left + gi * groupW + groupW / 2;
  const barX = (gi: number, si: number) =>
    grouped
      ? groupCx(gi) - groupInner / 2 + si * (barW + 1)
      : groupCx(gi) - barW / 2;

  const tickStep = Math.max(1, Math.ceil(labels.length / 8));

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const gi = Math.floor((e.clientX - rect.left - PAD.left) / groupW);
    if (gi < 0 || gi >= labels.length) { setTt(null); setHGroup(null); return; }
    setHGroup(gi);
    const cRect = bodyRef.current?.getBoundingClientRect();
    if (!cRect) return;
    setTt({
      x: e.clientX - cRect.left,
      y: e.clientY - cRect.top,
      label: labels[gi],
      items: series.map((s, si) => ({
        name: s.name,
        value: s.data[gi] ?? 0,
        color: s.color ?? CHART_PALETTE[si % CHART_PALETTE.length],
      })),
    });
  };

  return (
    <div style={CARD}>
      <ChartHeader title={title} subtitle={subtitle} action={action} />
      <div ref={bodyRef} style={{ position: 'relative', userSelect: 'none' }}>
        {svgW > 0 && (
          <svg
            width={svgW}
            height={H}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setTt(null); setHGroup(null); }}
            style={{ display: 'block', cursor: 'default' }}
          >
            {/* Grid */}
            {yTicks.map((v, i) => (
              <line
                key={i}
                x1={PAD.left} x2={svgW - PAD.right}
                y1={yOf(v)} y2={yOf(v)}
                stroke={i === 0 ? 'var(--core-cool-100)' : 'var(--core-cool-50)'}
                strokeWidth={i === 0 ? 1 : 0.5}
              />
            ))}

            {/* Y labels */}
            {yTicks.map((v, i) => (
              <text
                key={i}
                x={PAD.left - 7} y={yOf(v)}
                textAnchor="end" dominantBaseline="middle"
                fontSize={9} fill="var(--th-text-hint)" fontFamily="var(--font-ui)"
              >
                {formatY(v)}
              </text>
            ))}

            {/* X labels */}
            {labels.map((lbl, i) => {
              if (i % tickStep !== 0) return null;
              return (
                <text
                  key={i}
                  x={groupCx(i)} y={H - PAD.bottom + 14}
                  textAnchor="middle"
                  fontSize={9} fill="var(--th-text-hint)" fontFamily="var(--font-ui)"
                >
                  {lbl}
                </text>
              );
            })}

            {/* Hover column highlight */}
            {hGroup !== null && (
              <rect
                x={PAD.left + hGroup * groupW + groupW * 0.05}
                y={PAD.top}
                width={groupW * 0.9}
                height={iH}
                fill="rgba(131,66,187,0.04)"
                rx={3}
              />
            )}

            {/* Bars */}
            {series.map((s, si) => {
              const c = s.color ?? CHART_PALETTE[si % CHART_PALETTE.length];
              return s.data.map((v, gi) => {
                const by = yOf(v);
                const bh = Math.max(1, iH - (by - PAD.top));
                return (
                  <path
                    key={`${si}-${gi}`}
                    d={topRect(barX(gi, si), by, Math.max(barW - 0.5, 2), bh, 3)}
                    fill={c}
                    opacity={hGroup !== null && hGroup !== gi ? 0.45 : 1}
                    style={{ transition: 'opacity 0.15s' }}
                  />
                );
              });
            })}
          </svg>
        )}
        {tt && <ChartTooltip tt={tt} containerW={svgW} />}
      </div>
      {series.length > 1 && <ChartLegend items={series} palette={CHART_PALETTE} />}
    </div>
  );
}

// ─── DonutChart ───────────────────────────────────────────────────────────────

export interface DonutChartProps {
  title: string;
  subtitle?: string;
  slices: DonutSlice[];
  centerLabel?: string;
  centerValue?: string | number;
  size?: number;
  action?: React.ReactNode;
}

export function DonutChart({
  title,
  subtitle,
  slices,
  centerLabel = 'Total',
  centerValue,
  size = 180,
  action,
}: DonutChartProps) {
  const [hIdx, setHIdx] = useState<number | null>(null);

  const total = slices.reduce((s, sl) => s + sl.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 6;
  const innerR = outerR * 0.62;

  let cum = 0;
  const arcs = slices.map((sl, i) => {
    const startDeg = (cum / total) * 360;
    cum += sl.value;
    const endDeg = (cum / total) * 360;
    return { ...sl, startDeg, endDeg, color: sl.color ?? CHART_PALETTE[i % CHART_PALETTE.length] };
  });

  const hovered = hIdx !== null ? arcs[hIdx] : null;
  const displayVal = centerValue !== undefined ? centerValue : fmt(total);

  return (
    <div style={CARD}>
      <ChartHeader title={title} subtitle={subtitle} action={action} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '4px 16px 16px',
          flexWrap: 'wrap',
        }}
      >
        {/* Donut SVG */}
        <div style={{ flexShrink: 0 }}>
          <svg width={size} height={size} style={{ display: 'block', overflow: 'visible' }}>
            {arcs.map((arc, i) => {
              const isH = hIdx === i;
              const spread = isH ? 5 : 0;
              const midRad = ((arc.startDeg + arc.endDeg) / 2 - 90) * (Math.PI / 180);
              const dx = Math.cos(midRad) * spread;
              const dy = Math.sin(midRad) * spread;
              const span = Math.min(arc.endDeg - arc.startDeg, 359.99);
              return (
                <path
                  key={i}
                  d={donutArc(cx + dx, cy + dy, outerR, innerR, arc.startDeg, arc.startDeg + span)}
                  fill={arc.color}
                  opacity={hIdx !== null && !isH ? 0.55 : 1}
                  style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
                  onMouseEnter={() => setHIdx(i)}
                  onMouseLeave={() => setHIdx(null)}
                />
              );
            })}

            {/* Center value */}
            <text
              x={cx} y={cy - 9}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={hovered ? 19 : 22}
              fontWeight={500}
              fontFamily="var(--font-display)"
              fill={hovered ? hovered.color : 'var(--dec-color-text-body)'}
              style={{ transition: 'font-size 0.1s, fill 0.1s' }}
            >
              {hovered ? fmt(hovered.value) : displayVal}
            </text>
            <text
              x={cx} y={cy + 12}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={10}
              fontFamily="var(--font-ui)"
              fill="var(--dec-color-text-label)"
            >
              {hovered ? hovered.name : centerLabel}
            </text>
          </svg>
        </div>

        {/* Legend with percentages */}
        <div style={{ flex: 1, minWidth: 110, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {arcs.map((arc, i) => {
            const pct = total > 0 ? ((arc.value / total) * 100).toFixed(1) : '0';
            const isH = hIdx === i;
            return (
              <div
                key={arc.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '4px 7px',
                  borderRadius: 6,
                  cursor: 'default',
                  background: isH ? 'var(--core-cool-50)' : 'transparent',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={() => setHIdx(i)}
                onMouseLeave={() => setHIdx(null)}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: arc.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    flex: 1,
                    fontSize: 12,
                    color: 'var(--dec-color-text-body)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {arc.name}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-display)',
                    color: 'var(--dec-color-text-label)',
                    marginRight: 6,
                  }}
                >
                  {fmt(arc.value)}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    padding: '1px 5px',
                    borderRadius: 4,
                    background: `${arc.color}22`,
                    color: arc.color,
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    flexShrink: 0,
                  }}
                >
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── HorizontalBarChart ───────────────────────────────────────────────────────

export interface HorizontalBarChartProps {
  title: string;
  subtitle?: string;
  entries: BarEntry[];
  formatValue?: (v: number) => string;
  showValues?: boolean;
  action?: React.ReactNode;
}

export function HorizontalBarChart({
  title,
  subtitle,
  entries,
  formatValue: fmtVal = fmt,
  showValues = true,
  action,
}: HorizontalBarChartProps) {
  const [hIdx, setHIdx] = useState<number | null>(null);

  const maxVal = niceMax(Math.max(...entries.map((e) => e.value), 0));

  return (
    <div style={CARD}>
      <ChartHeader title={title} subtitle={subtitle} action={action} />
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {entries.map((entry, i) => {
          const isH = hIdx === i;
          const pct = maxVal > 0 ? (entry.value / maxVal) * 100 : 0;
          const color = entry.color ?? CHART_PALETTE[i % CHART_PALETTE.length];
          return (
            <div
              key={entry.label}
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              onMouseEnter={() => setHIdx(i)}
              onMouseLeave={() => setHIdx(null)}
            >
              {/* Category label */}
              <div
                style={{
                  width: 110,
                  flexShrink: 0,
                  fontSize: 12,
                  color: 'var(--dec-color-text-body)',
                  textAlign: 'right',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.3,
                }}
              >
                {entry.label}
              </div>

              {/* Bar track */}
              <div
                style={{
                  flex: 1,
                  height: 22,
                  background: 'var(--core-cool-50)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    right: `${100 - pct}%`,
                    background: color,
                    borderRadius: 4,
                    opacity: isH ? 1 : 0.82,
                    transition: 'right 0.5s var(--ease-out), opacity 0.15s',
                  }}
                />
              </div>

              {/* Value */}
              {showValues && (
                <div
                  style={{
                    width: 54,
                    flexShrink: 0,
                    fontSize: 12,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    color: isH ? color : 'var(--dec-color-text-body)',
                    transition: 'color 0.15s',
                    lineHeight: 1.3,
                  }}
                >
                  {fmtVal(entry.value)}
                  {entry.annotation && (
                    <span
                      style={{
                        display: 'block',
                        fontSize: 10,
                        color: 'var(--dec-color-text-label)',
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 400,
                      }}
                    >
                      {entry.annotation}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── AreaChart ────────────────────────────────────────────────────────────────

export interface AreaChartProps {
  title: string;
  subtitle?: string;
  labels: string[];
  series: ChartSeries[];
  height?: number;
  stacked?: boolean;
  formatY?: (v: number) => string;
  action?: React.ReactNode;
}

export function AreaChart({
  title,
  subtitle,
  labels,
  series,
  height = 228,
  stacked = false,
  formatY = fmt,
  action,
}: AreaChartProps) {
  const [tt, setTt] = useState<TT | null>(null);
  const [hIdx, setHIdx] = useState<number | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const svgW = useElementWidth(bodyRef);
  const uid = useId().replace(/:/g, '_');

  const PAD = { top: 18, right: 18, bottom: 36, left: 50 };
  const H = height;
  const iW = svgW - PAD.left - PAD.right;
  const iH = H - PAD.top - PAD.bottom;

  // Stack data if required
  const stackedData: number[][] = stacked
    ? series.map((_, si) =>
        series
          .slice(0, si + 1)
          .reduce<number[]>((acc, s) => s.data.map((v, i) => (acc[i] ?? 0) + v), [])
      )
    : series.map((s) => s.data);

  const maxVal = niceMax(Math.max(...stackedData.flat(), 0));
  const NUM_TICKS = 4;
  const yTicks = Array.from({ length: NUM_TICKS + 1 }, (_, i) => (i / NUM_TICKS) * maxVal);

  const xOf = (i: number) =>
    PAD.left + (labels.length > 1 ? (i / (labels.length - 1)) * iW : iW / 2);
  const yOf = (v: number) => PAD.top + iH - (v / maxVal) * iH;

  const tickStep = Math.max(1, Math.ceil(labels.length / 7));

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = Math.max(0, Math.min(1, (e.clientX - rect.left - PAD.left) / iW));
    const idx = Math.round(frac * (labels.length - 1));
    setHIdx(idx);
    const cRect = bodyRef.current?.getBoundingClientRect();
    if (!cRect) return;
    setTt({
      x: e.clientX - cRect.left,
      y: e.clientY - cRect.top,
      label: labels[idx] ?? '',
      items: series.map((s, si) => ({
        name: s.name,
        value: s.data[idx] ?? 0,
        color: s.color ?? CHART_PALETTE[si % CHART_PALETTE.length],
      })),
    });
  };

  return (
    <div style={CARD}>
      <ChartHeader title={title} subtitle={subtitle} action={action} />
      <div ref={bodyRef} style={{ position: 'relative', userSelect: 'none' }}>
        {svgW > 0 && (
          <svg
            width={svgW}
            height={H}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setTt(null); setHIdx(null); }}
            style={{ display: 'block', cursor: 'crosshair' }}
          >
            <defs>
              {series.map((s, si) => {
                const c = s.color ?? CHART_PALETTE[si % CHART_PALETTE.length];
                return (
                  <linearGradient key={si} id={`${uid}ag${si}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c} stopOpacity={stacked ? 0.65 : 0.22} />
                    <stop offset="100%" stopColor={c} stopOpacity={stacked ? 0.35 : 0} />
                  </linearGradient>
                );
              })}
            </defs>

            {/* Grid */}
            {yTicks.map((v, i) => (
              <line
                key={i}
                x1={PAD.left} x2={svgW - PAD.right}
                y1={yOf(v)} y2={yOf(v)}
                stroke={i === 0 ? 'var(--core-cool-100)' : 'var(--core-cool-50)'}
                strokeWidth={i === 0 ? 1 : 0.5}
              />
            ))}

            {/* Y labels */}
            {yTicks.map((v, i) => (
              <text
                key={i}
                x={PAD.left - 7} y={yOf(v)}
                textAnchor="end" dominantBaseline="middle"
                fontSize={9} fill="var(--th-text-hint)" fontFamily="var(--font-ui)"
              >
                {formatY(v)}
              </text>
            ))}

            {/* X labels */}
            {labels.map((lbl, i) => {
              if (i % tickStep !== 0 && i !== labels.length - 1) return null;
              const anchor = i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle';
              return (
                <text
                  key={i}
                  x={xOf(i)} y={H - PAD.bottom + 14}
                  textAnchor={anchor}
                  fontSize={9} fill="var(--th-text-hint)" fontFamily="var(--font-ui)"
                >
                  {lbl}
                </text>
              );
            })}

            {/* Hover guideline */}
            {hIdx !== null && (
              <line
                x1={xOf(hIdx)} x2={xOf(hIdx)}
                y1={PAD.top} y2={yOf(0)}
                stroke="var(--core-cool-200)" strokeWidth={1} strokeDasharray="3 3"
              />
            )}

            {/* Areas (render bottom-to-top for correct stacked layering) */}
            {[...series].reverse().map((s, rsi) => {
              const si = series.length - 1 - rsi;
              const c = s.color ?? CHART_PALETTE[si % CHART_PALETTE.length];
              const topData = stackedData[si];
              const baseData = si > 0 && stacked ? stackedData[si - 1] : null;

              const topPts = topData.map((v, i) => ({ x: xOf(i), y: yOf(v) }));
              const linePath = smoothPath(topPts);

              let areaPath: string;
              if (baseData) {
                const basePtsRev = [...baseData]
                  .reverse()
                  .map((v, i) => ({ x: xOf(baseData.length - 1 - i), y: yOf(v) }));
                const baseSegment = basePtsRev
                  .map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`)
                  .join(' ');
                areaPath = `${linePath} ${baseSegment} Z`;
              } else {
                areaPath = `${linePath} L${xOf(topData.length - 1)},${yOf(0)} L${xOf(0)},${yOf(0)} Z`;
              }

              return (
                <g key={si}>
                  <path d={areaPath} fill={`url(#${uid}ag${si})`} />
                  <path
                    d={linePath}
                    stroke={c}
                    strokeWidth={1.6}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {hIdx !== null && (
                    <circle
                      cx={xOf(hIdx)}
                      cy={yOf(topData[hIdx] ?? 0)}
                      r={4}
                      fill={c}
                      stroke="var(--dec-color-surface)"
                      strokeWidth={1.5}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        )}
        {tt && <ChartTooltip tt={tt} containerW={svgW} />}
      </div>
      {series.length > 1 && <ChartLegend items={series} palette={CHART_PALETTE} />}
    </div>
  );
}
