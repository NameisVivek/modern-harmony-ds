import React, { useState, useRef, useEffect, useCallback } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const DRUM_ITEM_H = 32;
const DRUM_VISIBLE = 6;
const DRUM_CENTER_PX = 0; // selected item pinned at top

type CalView = 'days' | 'years';

// ─── Props ────────────────────────────────────────────────────────────────────
export interface DatePickerProps {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  range?: boolean;
  rangeValue?: [Date | null, Date | null];
  onRangeChange?: (range: [Date | null, Date | null]) => void;
  showTime?: boolean;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(d: Date | null | undefined): string {
  if (!d) return '';
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDateTime(d: Date | null | undefined): string {
  if (!d) return '';
  const h = d.getHours() % 12 || 12;
  const m = String(Math.floor(d.getMinutes() / 5) * 5).padStart(2, '0');
  const ampm = d.getHours() < 12 ? 'AM' : 'PM';
  return `${formatDate(d)}, ${h}:${m} ${ampm}`;
}

function formatRange(r: [Date | null, Date | null]): string {
  const [s, e] = r;
  if (!s && !e) return '';
  if (s && !e) return `${formatDate(s)} →`;
  if (s && e) {
    if (s.getFullYear() === e.getFullYear()) {
      return `${String(s.getDate()).padStart(2, '0')} ${MONTHS_SHORT[s.getMonth()]} – ${formatDate(e)}`;
    }
    return `${formatDate(s)} – ${formatDate(e)}`;
  }
  return '';
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// Stable item arrays defined at module level to avoid effect re-runs
const HOUR_ITEMS   = ['1','2','3','4','5','6','7','8','9','10','11','12'];
const MINUTE_ITEMS = ['00','05','10','15','20','25','30','35','40','45','50','55'];
const AMPM_ITEMS   = ['AM','PM'];

// ─── Drum Wheel ───────────────────────────────────────────────────────────────
interface DrumWheelProps {
  items: string[];
  initialValue: string;
  width: number;
  fillHeight?: boolean; // true → stretch to parent height (hours/minutes)
  onSelect?: (value: string) => void;
}

function DrumWheelColumn({ items, initialValue, width, fillHeight = false, onSelect }: DrumWheelProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const drumRef = useRef<HTMLDivElement>(null);
  // Always-current ref for onSelect so the effect closure never goes stale
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  // When fillHeight=true the CSS height is 100%; otherwise clamp to items.length rows
  const naturalRows = Math.min(DRUM_VISIBLE, items.length);
  const drumHeight = naturalRows * DRUM_ITEM_H;

  const stateRef = useRef({
    offset: 0,
    snapAnim: 0,
    wheelTimer: 0,
    drag: false,
    startY: 0,
    startOff: 0,
    lastY: 0,
    lastT: 0,
    vel: 0,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const wrap = wrapRef.current;
    const drumEl = drumRef.current;
    if (!wrap || !drumEl) return;
    const drum = drumEl;

    const n = items.length;
    const copies = Math.max(7, Math.ceil(DRUM_VISIBLE * 4 / n));
    const midCopy = Math.floor(copies / 2);

    // Build DOM items
    drum.innerHTML = '';
    for (let c = 0; c < copies; c++) {
      for (let i = 0; i < n; i++) {
        const el = document.createElement('div');
        el.className = 'tw-item';
        el.style.cssText = `height:${DRUM_ITEM_H}px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:400;color:#8C8C8C;user-select:none;pointer-events:none;`;
        el.textContent = items[i];
        drum.appendChild(el);
      }
    }

    const initLogical = Math.max(0, items.indexOf(String(initialValue)));
    const s = stateRef.current;
    s.offset = midCopy * n + initLogical;

    function ty(o: number) { return DRUM_CENTER_PX - o * DRUM_ITEM_H; }

    function applyRaw(o: number) {
      drum.style.transform = `translateY(${ty(o)}px)`;
    }

    function logicalIdx(o: number) {
      return ((Math.round(o) % n) + n) % n;
    }

    // Only updates visual styling — never triggers React state changes
    function updateHighlight(o: number) {
      const li = logicalIdx(o);
      const els = drum.querySelectorAll('.tw-item');
      els.forEach((el, k) => {
        const isSelected = (k % n) === li;
        (el as HTMLElement).style.color = isSelected ? '#fff' : '#8C8C8C';
        (el as HTMLElement).style.fontWeight = isSelected ? '600' : '400';
        (el as HTMLElement).style.fontSize = isSelected ? '13px' : '12px';
        (el as HTMLElement).style.letterSpacing = isSelected ? '-0.01em' : '0';
      });
      return li;
    }

    function normalize(o: number) {
      const rounded = Math.round(o);
      const li = logicalIdx(rounded);
      const ideal = midCopy * n + li;
      const dist = rounded - ideal;
      const jumps = Math.round(dist / n);
      return o - jumps * n;
    }

    function updateHover(mouseY: number) {
      if (s.drag) return;
      const hoveredK = Math.floor(mouseY / DRUM_ITEM_H + Math.round(s.offset));
      const hovLi = logicalIdx(hoveredK);
      const selLi = logicalIdx(Math.round(s.offset));
      drum.querySelectorAll<HTMLElement>('.tw-item').forEach((el, k) => {
        const logK = k % n;
        const isSelected = logK === selLi;
        const isHov = logK === hovLi && !isSelected;
        el.style.background = isHov ? 'rgba(131,66,187,0.10)' : '';
        el.style.borderRadius = isHov ? '6px' : '';
      });
    }

    function clearHover() {
      drum.querySelectorAll<HTMLElement>('.tw-item').forEach(el => {
        el.style.background = '';
        el.style.borderRadius = '';
      });
    }

    function snapTo(targetRaw: number) {
      if (s.snapAnim) cancelAnimationFrame(s.snapAnim);
      const target = Math.round(targetRaw);

      function step() {
        const diff = target - s.offset;
        if (Math.abs(diff) < 0.012) {
          s.offset = normalize(target);
          applyRaw(s.offset);
          const li = updateHighlight(s.offset);
          // Fire onSelect only once when the drum settles — avoids re-render loops
          onSelectRef.current?.(items[li]);
          return;
        }
        s.offset += diff * 0.24;
        applyRaw(s.offset);
        updateHighlight(s.offset);
        s.snapAnim = requestAnimationFrame(step);
      }
      s.snapAnim = requestAnimationFrame(step);
    }

    applyRaw(s.offset);
    updateHighlight(s.offset);

    // Mouse wheel
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (s.snapAnim) { cancelAnimationFrame(s.snapAnim); s.snapAnim = 0; }
      clearTimeout(s.wheelTimer);
      s.offset += Math.sign(e.deltaY);
      applyRaw(s.offset);
      updateHighlight(s.offset);
      s.wheelTimer = window.setTimeout(() => snapTo(s.offset), 120);
    };

    // Pointer drag
    const onPointerDown = (e: PointerEvent) => {
      if (s.snapAnim) { cancelAnimationFrame(s.snapAnim); s.snapAnim = 0; }
      s.drag = true;
      s.startY = e.clientY;
      s.startOff = s.offset;
      s.lastY = e.clientY;
      s.lastT = Date.now();
      s.vel = 0;
      wrap.setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!s.drag) return;
      const dy = e.clientY - s.startY;
      s.offset = s.startOff - dy / DRUM_ITEM_H;
      const now = Date.now();
      const dt = now - s.lastT;
      if (dt > 0) s.vel = -(e.clientY - s.lastY) / dt / DRUM_ITEM_H;
      s.lastY = e.clientY;
      s.lastT = now;
      applyRaw(s.offset);
      updateHighlight(s.offset);
    };

    const endDrag = (e: PointerEvent) => {
      if (!s.drag) return;
      s.drag = false;
      const totalDy = Math.abs(e.clientY - s.startY);
      if (totalDy < 5) {
        // Tap — snap the tapped item to the top (selected) position
        const rect = wrap.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        snapTo(s.offset + clickY / DRUM_ITEM_H);
      } else {
        // Drag — apply momentum
        const momentum = Math.max(-6, Math.min(6, s.vel * 160));
        snapTo(s.offset + momentum);
      }
    };

    const onPointerCancel = () => {
      s.drag = false;
      snapTo(s.offset);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      updateHover(e.clientY - rect.top);
    };
    const onMouseLeave = () => clearHover();

    wrap.addEventListener('wheel', onWheel, { passive: false });
    wrap.addEventListener('pointerdown', onPointerDown);
    wrap.addEventListener('pointermove', onPointerMove);
    wrap.addEventListener('pointerup', endDrag);
    wrap.addEventListener('pointercancel', onPointerCancel);
    wrap.addEventListener('mousemove', onMouseMove);
    wrap.addEventListener('mouseleave', onMouseLeave);

    return () => {
      wrap.removeEventListener('wheel', onWheel);
      wrap.removeEventListener('pointerdown', onPointerDown);
      wrap.removeEventListener('pointermove', onPointerMove);
      wrap.removeEventListener('pointerup', endDrag);
      wrap.removeEventListener('pointercancel', onPointerCancel);
      wrap.removeEventListener('mousemove', onMouseMove);
      wrap.removeEventListener('mouseleave', onMouseLeave);
      if (s.snapAnim) cancelAnimationFrame(s.snapAnim);
      clearTimeout(s.wheelTimer);
    };
  // Run only on mount — items and initialValue are stable at construction time
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: fillHeight ? '100%' : `${drumHeight}px`,
        overflow: 'hidden',
        cursor: 'pointer',
        touchAction: 'none',
        flexShrink: 0,
      }}
    >
      {/* Violet highlight band at top — selected item */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0, right: 0,
        height: `${DRUM_ITEM_H}px`,
        background: '#8342BB',
        borderRadius: '7px',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      {/* Drum strip */}
      <div
        ref={drumRef}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          willChange: 'transform',
          zIndex: 2,
        }}
      />
      {/* Bottom fade — for tall drums only */}
      {(fillHeight || naturalRows > 2) && (
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '80px',
          background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }} />
      )}
    </div>
  );
}

// ─── Calendar View ────────────────────────────────────────────────────────────
interface CalendarPanelProps {
  year: number;
  month: number;
  view: CalView;
  yearPage: number;
  selectedDate?: Date | null;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  isRange?: boolean;
  showTime?: boolean;
  timeHour?: string;
  timeMinute?: string;
  timeAmpm?: string;
  onDaySelect: (day: number) => void;
  onYearSelect: (year: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onTitleClick: () => void;
  onClear: () => void;
  onApply: () => void;
  onTimeHourChange?: (v: string) => void;
  onTimeMinuteChange?: (v: string) => void;
  onTimeAmpmChange?: (v: string) => void;
  animDir: 'forward' | 'back' | 'none';
}

function CalendarPanel({
  year, month, view, yearPage,
  selectedDate, rangeStart, rangeEnd, isRange,
  showTime, timeHour, timeMinute, timeAmpm,
  onDaySelect, onYearSelect,
  onPrev, onNext, onTitleClick,
  onClear, onApply,
  onTimeHourChange, onTimeMinuteChange, onTimeAmpmChange,
  animDir,
}: CalendarPanelProps) {
  const today = new Date();
  const viewRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const animKeyRef = useRef(0);

  // Animate on view change
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    animKeyRef.current++;
    if (animDir === 'none') {
      inner.style.opacity = '1';
      inner.style.transform = 'translateX(0)';
      return;
    }
    const tx = animDir === 'forward' ? '10px' : '-10px';
    inner.style.transition = 'none';
    inner.style.opacity = '0';
    inner.style.transform = `translateX(${tx})`;
    requestAnimationFrame(() => {
      inner.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
      inner.style.opacity = '1';
      inner.style.transform = 'translateX(0)';
    });
  }, [year, month, view, yearPage, animDir]);

  // Title text
  let titleText: React.ReactNode;
  if (view === 'days') {
    titleText = <>{MONTHS_LONG[month]} {year} <span style={{ fontFamily: 'Material Icons', fontSize: '15px', color: '#8C8C8C', verticalAlign: 'middle' }}>expand_more</span></>;
  } else {
    titleText = <>{yearPage} – {yearPage + 11}</>;
  }

  // Build days grid
  const buildDays = () => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const todayD = (today.getFullYear() === year && today.getMonth() === month) ? today.getDate() : -1;

    const cells: React.ReactNode[] = [];

    // Prev month overflow
    for (let i = startOffset - 1; i >= 0; i--) {
      cells.push(
        <div key={`prev-${i}`} style={{ ...dayStyle, color: '#BFBECE' }}>
          {prevDays - i}
        </div>
      );
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === todayD;
      const dateObj = new Date(year, month, d);

      let bg = 'transparent';
      let color = '#282828';
      let fontWeight: number | string = 400;
      let borderRadius = '6px';
      let showDot = false;
      let isSelected = false;

      if (!isRange) {
        isSelected = selectedDate ? isSameDay(selectedDate, dateObj) : false;
        if (isSelected) { bg = '#8342BB'; color = '#fff'; fontWeight = 600; }
        else if (isToday) { showDot = true; fontWeight = 600; }
      } else {
        const rs = rangeStart ? startOfDay(rangeStart) : null;
        const re = rangeEnd ? startOfDay(rangeEnd) : null;
        const cur = startOfDay(dateObj);
        const isStart = rs && isSameDay(rs, cur);
        const isEnd = re && isSameDay(re, cur);
        const inRange = rs && re && cur > rs && cur < re;

        if (isStart && isEnd) {
          bg = '#8342BB'; color = '#fff'; fontWeight = 600; borderRadius = '6px';
        } else if (isStart) {
          bg = '#8342BB'; color = '#fff'; fontWeight = 600; borderRadius = '6px 0 0 6px';
        } else if (isEnd) {
          bg = '#8342BB'; color = '#fff'; fontWeight = 600; borderRadius = '0 6px 6px 0';
        } else if (inRange) {
          bg = 'rgba(131,66,187,0.1)'; borderRadius = '0';
        } else if (isToday) {
          showDot = true; fontWeight = 600;
        }
        isSelected = !!(isStart || isEnd);
      }

      const style: React.CSSProperties = {
        ...dayStyle,
        background: bg,
        color,
        fontWeight,
        borderRadius,
        position: 'relative',
      };

      cells.push(
        <div
          key={`d-${d}`}
          style={style}
          onClick={() => onDaySelect(d)}
          onMouseEnter={e => {
            if (!isSelected && bg === 'transparent') {
              (e.currentTarget as HTMLElement).style.background = '#F0F0F4';
            }
          }}
          onMouseLeave={e => {
            if (!isSelected && bg === 'transparent') {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
            }
          }}
        >
          {d}
          {showDot && (
            <span style={{
              position: 'absolute', bottom: '4px', left: '50%',
              transform: 'translateX(-50%)',
              width: '4px', height: '4px', borderRadius: '50%',
              background: '#8342BB', display: 'block',
            }} />
          )}
        </div>
      );
    }

    // Next month overflow
    const total = startOffset + daysInMonth;
    const rem = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let d = 1; d <= rem; d++) {
      cells.push(
        <div key={`next-${d}`} style={{ ...dayStyle, color: '#BFBECE' }}>
          {d}
        </div>
      );
    }

    return (
      <div style={{ padding: '0 8px 8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '2px' }}>
          {WEEKDAYS.map(wd => (
            <div key={wd} style={{ textAlign: 'center', fontSize: '10px', fontWeight: 600, color: '#8C8C8C', padding: '4px 0', letterSpacing: '0.04em' }}>
              {wd}
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
          {cells}
        </div>
      </div>
    );
  };

  // Build years grid
  const buildYears = () => {
    const cells: React.ReactNode[] = [];
    for (let y = yearPage; y < yearPage + 12; y++) {
      const isSelected = y === year;
      const isCurrent = y === today.getFullYear();
      cells.push(
        <div
          key={y}
          style={{
            height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px',
            color: isSelected ? '#fff' : isCurrent ? '#8342BB' : '#282828',
            fontWeight: isSelected || isCurrent ? 600 : 400,
            background: isSelected ? '#8342BB' : 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background 0.1s',
          }}
          onClick={() => onYearSelect(y)}
          onMouseEnter={e => {
            if (!isSelected) (e.currentTarget as HTMLElement).style.background = '#F0F0F4';
          }}
          onMouseLeave={e => {
            if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent';
          }}
        >
          {y}
        </div>
      );
    }
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', padding: '8px' }}>
        {cells}
      </div>
    );
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid #E5E5EC',
      boxShadow: '0 4px 20px rgba(55,23,78,0.12), 0 1px 4px rgba(55,23,78,0.06)',
      overflow: 'hidden',
      width: showTime ? undefined : '280px',
      flexShrink: 0,
      display: showTime ? 'flex' : undefined,
      alignItems: showTime ? 'stretch' : undefined,
    }}>
      {/* Left side: calendar */}
      <div style={{ width: showTime ? '280px' : '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 10px 8px', gap: '2px' }}>
          <button
            onClick={onPrev}
            style={{
              width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer',
              color: '#5E5C75', transition: 'background 0.1s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#F0F0F4')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontFamily: 'Material Icons', fontSize: '18px' }}>chevron_left</span>
          </button>

          <div
            onClick={view === 'days' ? onTitleClick : undefined}
            style={{
              flex: 1, textAlign: 'center', fontSize: '14px', fontWeight: 600, color: '#282828',
              cursor: view === 'days' ? 'pointer' : 'default',
              borderRadius: '6px', padding: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px',
            }}
            onMouseEnter={e => { if (view === 'days') (e.currentTarget as HTMLElement).style.background = '#F0F0F4'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            {titleText}
          </div>

          <button
            onClick={onNext}
            style={{
              width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer',
              color: '#5E5C75', transition: 'background 0.1s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#F0F0F4')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontFamily: 'Material Icons', fontSize: '18px' }}>chevron_right</span>
          </button>
        </div>

        {/* View */}
        <div ref={viewRef} style={{ overflow: 'hidden' }}>
          <div ref={innerRef}>
            {view === 'days' ? buildDays() : buildYears()}
          </div>
        </div>

        {/* Footer — only on days view */}
        {view === 'days' && (
          <div style={{
            padding: '8px 12px', borderTop: '1px solid #F0F0F4',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            {isRange && (
              <span style={{ flex: 1, fontSize: '11px', color: '#5E5C75' }}>
                {rangeStart && rangeEnd
                  ? `${formatDate(rangeStart)} – ${formatDate(rangeEnd)}`
                  : rangeStart
                    ? `${formatDate(rangeStart)} → pick end`
                    : 'Click to pick start date'}
              </span>
            )}
            {!isRange && <div style={{ flex: 1 }} />}
            <button
              onClick={onClear}
              style={btnDefaultStyle}
              onMouseEnter={e => (e.currentTarget.style.background = '#F0F0F4')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
            >
              Clear
            </button>
            <button
              onClick={onApply}
              style={btnPrimaryStyle}
              onMouseEnter={e => (e.currentTarget.style.background = '#7239A4')}
              onMouseLeave={e => (e.currentTarget.style.background = '#8342BB')}
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Right side: time wheels */}
      {showTime && (
        <div style={{
          borderLeft: '1px solid #F0F0F4',
          display: 'flex', flexDirection: 'row', alignItems: 'stretch',
          padding: '10px 8px', gap: '4px',
        }}>
          <DrumWheelColumn
            items={HOUR_ITEMS}
            initialValue={timeHour || '10'}
            width={48}
            fillHeight
            onSelect={onTimeHourChange}
          />
          <DrumWheelColumn
            items={MINUTE_ITEMS}
            initialValue={timeMinute || '00'}
            width={48}
            fillHeight
            onSelect={onTimeMinuteChange}
          />
          {/* AM/PM stays natural height (2 rows) — wrap keeps it top-aligned */}
          <div style={{ alignSelf: 'flex-start' }}>
            <DrumWheelColumn
              items={AMPM_ITEMS}
              initialValue={timeAmpm || 'AM'}
              width={44}
              onSelect={onTimeAmpmChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const dayStyle: React.CSSProperties = {
  height: '34px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  color: '#282828',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background 0.1s',
  fontWeight: 400,
};

const btnDefaultStyle: React.CSSProperties = {
  height: '26px', padding: '0 12px', borderRadius: '6px',
  fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 500, cursor: 'pointer',
  background: '#fff', color: '#282828', border: '1px solid #DDDDE5',
  transition: 'background 0.1s',
};

const btnPrimaryStyle: React.CSSProperties = {
  height: '26px', padding: '0 12px', borderRadius: '6px',
  fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 500, cursor: 'pointer',
  background: '#8342BB', color: '#fff', border: 'none',
  boxShadow: '0 1px 2px rgba(55,23,78,0.2)',
  transition: 'background 0.1s',
};

// ─── Main DatePicker ──────────────────────────────────────────────────────────
export function DatePicker({
  label,
  value,
  onChange,
  range = false,
  rangeValue,
  onRangeChange,
  showTime = false,
  placeholder,
  disabled = false,
  error,
  required = false,
}: DatePickerProps) {
  const today = new Date();

  // Calendar state
  const [open, setOpen] = useState(false);
  const [calYear, setCalYear] = useState(value?.getFullYear() ?? today.getFullYear());
  const [calMonth, setCalMonth] = useState(value?.getMonth() ?? today.getMonth());
  const [calView, setCalView] = useState<CalView>('days');
  const [yearPage, setYearPage] = useState(Math.floor((value?.getFullYear() ?? today.getFullYear()) / 12) * 12);
  const [animDir, setAnimDir] = useState<'forward' | 'back' | 'none'>('none');

  // Range picking state
  const [pickingRange, setPickingRange] = useState<[Date | null, Date | null]>(rangeValue ?? [null, null]);

  // Time state
  const [timeHour, setTimeHour] = useState('10');
  const [timeMinute, setTimeMinute] = useState('00');
  const [timeAmpm, setTimeAmpm] = useState('AM');

  // Local selected value (before Apply)
  const [pendingDate, setPendingDate] = useState<Date | null>(value ?? null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync external value changes
  useEffect(() => {
    if (value !== undefined) setPendingDate(value ?? null);
  }, [value]);

  useEffect(() => {
    if (rangeValue) setPickingRange(rangeValue);
  }, [rangeValue]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setCalView('days');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setAnimDir('back');
    if (calView === 'days') {
      if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
      else setCalMonth(m => m - 1);
    } else {
      setYearPage(p => p - 12);
    }
  }, [calView, calMonth]);

  const handleNext = useCallback(() => {
    setAnimDir('forward');
    if (calView === 'days') {
      if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
      else setCalMonth(m => m + 1);
    } else {
      setYearPage(p => p + 12);
    }
  }, [calView, calMonth]);

  const handleTitleClick = useCallback(() => {
    if (calView === 'days') {
      setAnimDir('forward');
      setCalView('years');
    }
  }, [calView]);

  const handleYearSelect = useCallback((y: number) => {
    setAnimDir('back');
    setCalYear(y);
    setYearPage(Math.floor(y / 12) * 12);
    setCalView('days');
  }, []);

  const handleDaySelect = useCallback((day: number) => {
    const selected = new Date(calYear, calMonth, day);
    setAnimDir('none');

    if (range) {
      const [rs, re] = pickingRange;
      if (!rs || (rs && re)) {
        // Start new range
        setPickingRange([selected, null]);
      } else {
        // Complete range
        if (selected < rs) {
          setPickingRange([selected, rs]);
        } else {
          setPickingRange([rs, selected]);
        }
      }
    } else {
      setPendingDate(selected);
    }
  }, [calYear, calMonth, range, pickingRange]);

  const handleClear = useCallback(() => {
    if (range) {
      setPickingRange([null, null]);
      onRangeChange?.([null, null]);
    } else {
      setPendingDate(null);
      onChange?.(null);
    }
    setCalView('days');
    setOpen(false);
  }, [range, onChange, onRangeChange]);

  const handleApply = useCallback(() => {
    if (range) {
      onRangeChange?.(pickingRange);
    } else if (pendingDate) {
      let finalDate = pendingDate;
      if (showTime) {
        const h12 = parseInt(timeHour, 10);
        const m = parseInt(timeMinute, 10);
        let h24 = h12 % 12 + (timeAmpm === 'PM' ? 12 : 0);
        finalDate = new Date(pendingDate.getFullYear(), pendingDate.getMonth(), pendingDate.getDate(), h24, m, 0);
      }
      onChange?.(finalDate);
    }
    setOpen(false);
    setCalView('days');
  }, [range, pendingDate, pickingRange, showTime, timeHour, timeMinute, timeAmpm, onChange, onRangeChange]);

  // Compute display text for input
  let displayValue = '';
  if (range) {
    displayValue = formatRange(rangeValue ?? pickingRange);
  } else if (showTime) {
    displayValue = formatDateTime(value);
  } else {
    displayValue = formatDate(value);
  }

  const defaultPlaceholder = range ? 'DD / MM / YYYY – DD / MM / YYYY' : showTime ? 'MM / DD / YYYY, --:-- --' : 'DD / MM / YYYY';

  return (
    <div ref={containerRef} style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--font-ui)', position: 'relative' }}>
      {/* Label */}
      {label && (
        <label style={{ fontSize: '12px', fontWeight: 500, color: disabled ? '#8C8C8C' : '#282828', fontFamily: 'var(--font-ui)' }}>
          {label}
          {required && <span style={{ color: '#E02F3A', marginLeft: '2px' }}>*</span>}
        </label>
      )}

      {/* Input field */}
      <div
        onClick={() => { if (!disabled) { setOpen(o => !o); } }}
        style={{
          display: 'flex', alignItems: 'center',
          height: '32px',
          border: `1px solid ${error ? '#E02F3A' : '#DDDDE5'}`,
          borderRadius: '8px',
          padding: '0 0 0 10px',
          background: disabled ? '#F0F0F4' : '#fff',
          cursor: disabled ? 'not-allowed' : 'pointer',
          gap: 0,
          minWidth: '180px',
          transition: 'border-color 0.1s, box-shadow 0.1s',
          boxShadow: open ? (error ? '0 0 0 2px #fff, 0 0 0 4px rgba(224,47,58,0.25)' : '0 0 0 2px #fff, 0 0 0 4px rgba(131,66,187,0.25)') : 'none',
          borderColor: open ? (error ? '#E02F3A' : '#8342BB') : (error ? '#E02F3A' : '#DDDDE5'),
          pointerEvents: disabled ? 'none' : undefined,
        }}
      >
        <input
          type="text"
          readOnly
          value={displayValue}
          placeholder={placeholder ?? defaultPlaceholder}
          disabled={disabled}
          style={{
            flex: 1, border: 'none', outline: 'none',
            fontFamily: 'var(--font-ui)', fontSize: '13px',
            color: disabled ? '#8C8C8C' : '#282828',
            background: 'transparent', minWidth: 0,
            cursor: 'pointer',
          }}
        />
        <div style={{
          width: '32px', height: '30px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, cursor: 'pointer',
          borderLeft: '1px solid #EBEBEB',
          marginLeft: '6px',
        }}>
          <span style={{
            fontFamily: 'Material Icons Outlined',
            fontSize: '16px',
            color: disabled ? '#8C8C8C' : '#8C8C8C',
            fontStyle: 'normal',
            fontWeight: 'normal',
            lineHeight: 1,
          }}>
            {showTime ? 'schedule' : 'date_range'}
          </span>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div style={{ fontSize: '10px', color: '#E02F3A', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ fontFamily: 'Material Icons Outlined', fontSize: '12px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: 1 }}>error_outline</span>
          {error}
        </div>
      )}

      {/* Calendar popup */}
      {open && !disabled && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          marginTop: '4px',
          zIndex: 1000,
        }}>
          <CalendarPanel
            year={calYear}
            month={calMonth}
            view={calView}
            yearPage={yearPage}
            selectedDate={pendingDate}
            rangeStart={pickingRange[0]}
            rangeEnd={pickingRange[1]}
            isRange={range}
            showTime={showTime}
            timeHour={timeHour}
            timeMinute={timeMinute}
            timeAmpm={timeAmpm}
            onDaySelect={handleDaySelect}
            onYearSelect={handleYearSelect}
            onPrev={handlePrev}
            onNext={handleNext}
            onTitleClick={handleTitleClick}
            onClear={handleClear}
            onApply={handleApply}
            onTimeHourChange={setTimeHour}
            onTimeMinuteChange={setTimeMinute}
            onTimeAmpmChange={setTimeAmpm}
            animDir={animDir}
          />
        </div>
      )}
    </div>
  );
}

export default DatePicker;
