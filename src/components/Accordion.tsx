import React, { useState, useRef, useEffect, useLayoutEffect, ReactNode } from 'react';

export interface AccordionItemData {
  title: string;
  content: ReactNode;
  icon?: string;
}

export interface AccordionItemProps {
  title: string;
  content: ReactNode;
  icon?: string;
  open: boolean;
  onToggle: () => void;
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  item: (open: boolean): React.CSSProperties => ({
    borderRadius: '8px',
    background: open ? 'var(--core-cool-50)' : 'transparent',
    transition: 'background 0.1s',
  }),
  title: (open: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--weight-medium)' as unknown as number,
    lineHeight: 'var(--leading-base)',
    border: `1px solid ${open ? 'var(--core-cool-50)' : 'var(--core-cool-100)'}`,
    borderRadius: open ? '8px 8px 0 0' : '8px',
    padding: '10px 12px',
    cursor: 'pointer',
    userSelect: 'none' as const,
    background: open ? 'var(--core-cool-50)' : 'var(--core-white)',
    color: 'var(--dec-color-text-body)',
    transition: 'background 0.1s, border-color 0.1s',
    outline: 'none',
    fontFamily: 'var(--font-ui)',
    width: '100%',
    textAlign: 'left' as const,
  }),
  icon: {
    color: 'var(--dec-color-neutral-foreground)',
    fontSize: '20px',
    flexShrink: 0 as const,
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Material Icons',
  },
  titleText: {
    flexGrow: 1,
  },
  toggleIcon: (open: boolean): React.CSSProperties => ({
    color: 'var(--dec-color-neutral-foreground)',
    fontSize: '20px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Material Icons',
    transition: 'transform 0.22s ease',
    transform: open ? 'rotate(45deg)' : 'none',
  }),
};

export function AccordionItem({ title, content, icon, open, onToggle }: AccordionItemProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  // Initialise to open so an initially-open accordion doesn't flash height:0
  const [height, setHeight] = useState(0);
  const [fullyOpen, setFullyOpen] = useState(open);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // useLayoutEffect → runs before paint so the initial measurement is ready
  // before the browser draws the first frame, avoiding a height:0 flash.
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    // Initial measurement
    setHeight(el.scrollHeight);
    // Keep height accurate as content changes (inputs grow, selects open, etc.)
    const ro = new ResizeObserver(() => setHeight(el.scrollHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Release overflow:hidden after the open animation so that absolutely-
  // positioned children (Select dropdowns, tooltips) aren't clipped.
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (open) {
      timerRef.current = setTimeout(() => setFullyOpen(true), 280);
    } else {
      // Close: immediately restore overflow:hidden so content clips as it collapses
      setFullyOpen(false);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [open]);

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); }
  };

  return (
    <section style={styles.item(open)}>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        style={styles.title(open)}
        onClick={onToggle}
        onKeyUp={handleKeyUp}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = 'rgba(40,40,40,0.04)';
          el.style.borderColor = open ? 'transparent' : 'var(--core-cool-200)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = open ? 'var(--core-cool-50)' : 'var(--core-white)';
          el.style.borderColor = open ? 'var(--core-cool-50)' : 'var(--core-cool-100)';
        }}
        onFocus={(e) => { e.currentTarget.style.boxShadow = 'var(--focus-ring)'; }}
        onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
      >
        {icon && <span className="material-icons" style={styles.icon}>{icon}</span>}
        <span style={styles.titleText}>{title}</span>
        <span className="material-icons" style={styles.toggleIcon(open)}>add</span>
      </div>

      {/*
        Animated wrapper — no padding here, so height === innerRef.scrollHeight exactly.
        overflow:hidden during animation, overflow:visible once fully open so
        absolutely-positioned children (dropdowns, tooltips) render unclipped.
      */}
      <div
        style={{
          height: open ? `${height}px` : '0',
          overflow: fullyOpen ? 'visible' : 'hidden',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'height 0.25s var(--ease-in-out), opacity 0.2s ease',
          fontSize: '13px',
          lineHeight: 'var(--leading-base)',
        }}
      >
        {/*
          Padding lives here so scrollHeight on innerRef naturally includes it —
          no manual offset arithmetic needed.
        */}
        <div
          ref={innerRef}
          style={{
            padding: '10px 12px 14px',
            paddingLeft: icon ? '40px' : '12px',
          }}
        >
          {content}
        </div>
      </div>
    </section>
  );
}

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpen?: number | number[];
  allowMultiple?: boolean;
}

export function Accordion({ items, defaultOpen, allowMultiple = false }: AccordionProps) {
  const initOpen = (): Set<number> => {
    if (defaultOpen === undefined) return new Set();
    if (Array.isArray(defaultOpen)) return new Set(defaultOpen);
    return new Set([defaultOpen]);
  };

  const [openItems, setOpenItems] = useState<Set<number>>(initOpen);

  const handleToggle = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div style={styles.container}>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          title={item.title}
          content={item.content}
          icon={item.icon}
          open={openItems.has(i)}
          onToggle={() => handleToggle(i)}
        />
      ))}
    </div>
  );
}

export default Accordion;
