import React, { useState, useRef, useEffect, ReactNode } from 'react';

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
  content: (open: boolean, height: number): React.CSSProperties => ({
    height: open ? `${height}px` : '0',
    visibility: open ? 'visible' as const : 'hidden' as const,
    opacity: open ? 1 : 0,
    overflow: 'hidden',
    fontSize: '13px',
    lineHeight: 'var(--leading-base)',
    transition: 'opacity 0.2s ease, height 0.25s var(--ease-in-out)',
    padding: open ? '10px 12px 14px' : '0 12px',
  }),
};

export function AccordionItem({ title, content, icon, open, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight + 4);
    }
  }, [content, open]);

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
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
          el.style.background = open ? 'rgba(40,40,40,0.04)' : 'rgba(40,40,40,0.04)';
          el.style.borderColor = open ? 'transparent' : 'var(--core-cool-200)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = open ? 'var(--core-cool-50)' : 'var(--core-white)';
          el.style.borderColor = open ? 'var(--core-cool-50)' : 'var(--core-cool-100)';
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = 'var(--focus-ring)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {icon && (
          <span className="material-icons" style={styles.icon}>
            {icon}
          </span>
        )}
        <span style={styles.titleText}>{title}</span>
        <span className="material-icons" style={styles.toggleIcon(open)}>
          add
        </span>
      </div>
      <div style={styles.content(open, contentHeight)}>
        <div ref={contentRef} style={{ paddingLeft: icon ? '28px' : '0' }}>
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
