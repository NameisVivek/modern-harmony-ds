import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  icon?: string;
  shortcut?: string[];
  group: string;
}

export interface CommandBarProps {
  open: boolean;
  onClose: () => void;
  onSelect: (item: CommandItem) => void;
  placeholder?: string;
  items?: CommandItem[];
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(20,16,41,0.32)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '12vh',
    zIndex: 9999,
  },

  shell: {
    background: 'var(--dec-color-surface)',
    borderRadius: '14px',
    border: '1px solid var(--dec-color-neutral-base)',
    boxShadow: '0 8px 32px rgba(20,16,41,0.16), 0 0 0 1px rgba(55,23,78,0.06)',
    overflow: 'hidden',
    width: '560px',
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: '70vh',
    display: 'flex',
    flexDirection: 'column' as const,
  },

  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    padding: '10px 14px',
    borderBottom: '1px solid var(--core-cool-50)',
    flexShrink: 0,
  } as React.CSSProperties,

  searchIcon: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    fontSize: '20px',
    color: 'var(--core-gray-400)',
    fontFamily: 'Material Icons',
    lineHeight: 1,
  } as React.CSSProperties,

  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '0 10px',
    fontFamily: 'var(--font-ui)',
    fontSize: '15px',
    color: 'var(--dec-color-text-body)',
    background: 'transparent',
  } as React.CSSProperties,

  kbdBadge: {
    fontSize: '10px',
    color: 'var(--core-gray-400)',
    border: '1px solid var(--dec-color-neutral-base)',
    borderRadius: '4px',
    padding: '2px 5px',
    flexShrink: 0,
    fontFamily: 'var(--font-ui)',
    background: 'var(--core-white)',
  } as React.CSSProperties,

  results: {
    overflowY: 'auto' as const,
    flex: 1,
  } as React.CSSProperties,

  section: {
    padding: '8px 14px 4px',
    fontSize: '9px',
    fontWeight: 500,
    color: 'var(--core-gray-400)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    fontFamily: 'var(--font-ui)',
  } as React.CSSProperties,

  separator: {
    height: '1px',
    background: 'var(--core-cool-50)',
    margin: '4px 0',
  } as React.CSSProperties,

  item: (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 14px',
    cursor: 'pointer',
    background: active ? 'rgba(131,66,187,0.06)' : 'transparent',
    transition: 'background 0.1s',
  }),

  itemIcon: (active: boolean): React.CSSProperties => ({
    width: '28px',
    height: '28px',
    borderRadius: '7px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    background: active ? 'rgba(131,66,187,0.1)' : 'var(--core-cool-50)',
  }),

  itemIconEl: (active: boolean): React.CSSProperties => ({
    fontSize: '15px',
    color: active ? 'var(--core-violet-600)' : 'var(--dec-color-neutral-foreground)',
    fontFamily: 'Material Icons',
    lineHeight: 1,
  }),

  itemContent: {
    flex: 1,
    minWidth: 0,
  } as React.CSSProperties,

  itemLabel: (active: boolean): React.CSSProperties => ({
    fontSize: '13px',
    color: active ? 'var(--dec-color-secondary-foreground)' : 'var(--dec-color-text-body)',
    fontWeight: 400,
    lineHeight: 1.4,
  }),

  itemHint: {
    fontSize: '11px',
    color: 'var(--core-gray-400)',
    marginTop: '1px',
  } as React.CSSProperties,

  shortcutWrap: {
    display: 'flex',
    gap: '3px',
    flexShrink: 0,
  } as React.CSSProperties,

  shortcutKey: {
    fontSize: '9px',
    color: 'var(--core-gray-400)',
    border: '1px solid var(--dec-color-neutral-base)',
    borderRadius: '4px',
    padding: '1px 5px',
    background: 'var(--core-gray-25)',
    fontFamily: 'var(--font-ui)',
  } as React.CSSProperties,
};

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: 'rgba(131,66,187,0.15)', color: 'var(--dec-color-secondary-foreground)', borderRadius: '2px', fontWeight: 500 }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

const DEFAULT_ITEMS: CommandItem[] = [
  { id: 'sop', label: 'S&OP Planning — December cycle', hint: 'Opened 2 hours ago', icon: 'assessment', group: 'Recent' },
  { id: 'shipments', label: 'Shipments — APAC region', hint: 'Opened yesterday', icon: 'local_shipping', group: 'Recent' },
  { id: 'new-scenario', label: 'New planning scenario', icon: 'add', shortcut: ['⌘', 'N'], group: 'Actions' },
  { id: 'export', label: 'Export current view', icon: 'cloud_download', shortcut: ['⌘', 'E'], group: 'Actions' },
  { id: 'settings', label: 'Open settings', icon: 'settings', shortcut: ['⌘', ','], group: 'Actions' },
];

export function CommandBar({
  open,
  onClose,
  onSelect,
  placeholder = 'Search or type a command…',
  items = DEFAULT_ITEMS,
}: CommandBarProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const filtered = query
    ? items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : items;

  const groups = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  const flatFiltered = Object.values(groups).flat();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const active = flatFiltered[activeIndex];
        if (active) onSelect(active);
      }
    },
    [flatFiltered, activeIndex, onClose, onSelect]
  );

  if (!open) return null;

  let flatIndex = 0;
  const groupEntries = Object.entries(groups);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command bar"
        style={styles.shell}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div style={styles.inputRow}>
          <span className="material-icons" style={styles.searchIcon}>search</span>
          <input
            ref={inputRef}
            style={styles.input}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
            onKeyDown={handleKeyDown}
            aria-label="Search"
            role="combobox"
            aria-expanded={true}
            aria-autocomplete="list"
          />
          <span style={styles.kbdBadge}>Esc</span>
        </div>

        {/* Results */}
        <div style={styles.results} role="listbox">
          {groupEntries.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--dec-color-text-hint)' }}>
              No results found
            </div>
          )}
          {groupEntries.map(([group, groupItems], gi) => (
            <div key={group}>
              {gi > 0 && <div style={styles.separator} />}
              <div style={styles.section}>{group}</div>
              {groupItems.map((item) => {
                const idx = flatIndex++;
                const active = activeIndex === idx;
                return (
                  <div
                    key={item.id}
                    role="option"
                    aria-selected={active}
                    style={styles.item(active)}
                    onClick={() => onSelect(item)}
                    onMouseEnter={() => setActiveIndex(idx)}
                  >
                    {item.icon && (
                      <div style={styles.itemIcon(active)}>
                        <span className="material-icons" style={styles.itemIconEl(active)}>
                          {item.icon}
                        </span>
                      </div>
                    )}
                    <div style={styles.itemContent}>
                      <div style={styles.itemLabel(active)}>
                        {highlightMatch(item.label, query)}
                      </div>
                      {item.hint && <div style={styles.itemHint}>{item.hint}</div>}
                    </div>
                    {item.shortcut && (
                      <div style={styles.shortcutWrap}>
                        {item.shortcut.map((key, ki) => (
                          <span key={ki} style={styles.shortcutKey}>{key}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommandBar;
