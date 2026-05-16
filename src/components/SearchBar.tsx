import React, { useState, useRef, useEffect } from 'react'

export interface SearchResult {
  id: string
  label: string
  meta?: string
  icon?: string
  group?: string
}

export interface FilterChip {
  id: string
  label: string
  icon?: string
  value?: string
}

export interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
  results?: SearchResult[]
  onSelect?: (result: SearchResult) => void
  filters?: FilterChip[]
  activeFilters?: FilterChip[]
  onFilterToggle?: (filter: FilterChip) => void
  onFilterRemove?: (id: string) => void
  onAddFilter?: () => void
  onClearAll?: () => void
  size?: 'sm' | 'md'
  showFilters?: boolean
}

const s = {
  bar: (focused: boolean, size: 'sm' | 'md'): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 0,
    height: size === 'sm' ? 'calc(28px + var(--th-density-offset, 0px))' : 'calc(34px + var(--th-density-offset, 0px))',
    border: `1px solid ${focused ? 'var(--th-brand)' : 'var(--th-border-strong)'}`,
    borderRadius: 8, background: 'var(--th-bg-surface)', overflow: 'hidden',
    boxShadow: focused ? '0 0 0 2px #fff, 0 0 0 4px rgba(131,66,187,0.25)' : undefined,
    transition: 'border-color 0.15s, box-shadow 0.15s',
  }),
  iconWrap: (size: 'sm' | 'md'): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', padding: size === 'sm' ? '0 8px' : '0 10px', flexShrink: 0,
  }),
  input: (size: 'sm' | 'md'): React.CSSProperties => ({
    flex: 1, border: 'none', outline: 'none',
    fontFamily: 'var(--font-ui)', fontSize: size === 'sm' ? 12 : 13,
    color: 'var(--th-text-primary)', background: 'transparent',
  }),
  clearBtn: {
    display: 'flex', alignItems: 'center', padding: '0 8px',
    flexShrink: 0, cursor: 'pointer', color: 'var(--th-text-hint)', background: 'transparent', border: 'none',
  } as React.CSSProperties,
  dropdown: {
    border: '1px solid var(--th-border-strong)', borderRadius: 8, background: 'var(--th-bg-surface)',
    boxShadow: '0 4px 12px rgba(55,23,78,0.1)', overflow: 'hidden',
    marginTop: 4, position: 'absolute' as const, left: 0, right: 0, zIndex: 200,
  } as React.CSSProperties,
  section: {
    fontSize: 9, fontWeight: 500, color: 'var(--th-text-hint)',
    letterSpacing: '0.07em', textTransform: 'uppercase' as const,
    padding: '8px 12px 3px', fontFamily: 'var(--font-ui)',
  } as React.CSSProperties,
  resultItem: (focused: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
    cursor: 'pointer', background: focused ? 'rgba(131,66,187,0.06)' : 'transparent',
    transition: 'background 0.1s',
  }),
  resultIcon: {
    width: 24, height: 24, borderRadius: 6, background: 'var(--th-bg-muted)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  } as React.CSSProperties,
  resultLabel: { fontSize: 13, color: 'var(--th-text-primary)', flex: 1, fontFamily: 'var(--font-ui)' } as React.CSSProperties,
  resultMeta: { fontSize: 10, color: 'var(--th-text-hint)', fontFamily: 'var(--font-ui)' } as React.CSSProperties,
  divider: { height: 1, background: 'var(--th-bg-muted)' } as React.CSSProperties,
  filterBar: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' as const, marginTop: 8 } as React.CSSProperties,
  chip: (active: boolean): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', gap: 4, height: 'calc(28px + var(--th-density-offset, 0px))', padding: '0 10px',
    border: `1px solid ${active ? 'var(--th-brand)' : 'var(--th-border-strong)'}`,
    borderRadius: 6,
    background: active ? 'rgba(131,66,187,0.08)' : 'var(--th-bg-surface)',
    fontSize: 12, color: active ? '#7239A4' : '#282828',
    cursor: 'pointer', whiteSpace: 'nowrap' as const,
    fontFamily: 'var(--font-ui)', fontWeight: 500,
    transition: 'all 0.1s',
  }),
  chipVal: {
    display: 'inline-flex', alignItems: 'center', height: 'calc(28px + var(--th-density-offset, 0px))',
    border: '1px solid #8342BB', borderRadius: 6, overflow: 'hidden',
    background: 'rgba(131,66,187,0.06)', fontFamily: 'var(--font-ui)', fontSize: 12,
  } as React.CSSProperties,
  chipLabel: { padding: '0 8px', color: 'var(--th-text-secondary)', fontWeight: 400, borderRight: '1px solid #B4A4E0' } as React.CSSProperties,
  chipValue: { padding: '0 8px', color: 'var(--th-brand-medium)', fontWeight: 500 } as React.CSSProperties,
  chipRemove: { display: 'flex', alignItems: 'center', padding: '0 6px', cursor: 'pointer', color: 'var(--th-brand-medium)' } as React.CSSProperties,
  chipDivider: { width: 1, height: 20, background: 'var(--th-border-strong)', flexShrink: 0 } as React.CSSProperties,
  addFilter: {
    display: 'inline-flex', alignItems: 'center', gap: 4, height: 'calc(28px + var(--th-density-offset, 0px))', padding: '0 10px',
    border: '1px dashed #DDDDE5', borderRadius: 6, background: 'transparent',
    fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--th-text-secondary)', cursor: 'pointer',
  } as React.CSSProperties,
  clearAll: {
    height: 26, padding: '0 8px', background: 'transparent', border: 'none',
    color: 'var(--th-brand-medium)', fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 500, cursor: 'pointer',
  } as React.CSSProperties,
}

function groupResults(results: SearchResult[]): Record<string, SearchResult[]> {
  return results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    const group = r.group ?? 'Results'
    if (!acc[group]) acc[group] = []
    acc[group].push(r)
    return acc
  }, {})
}

export function SearchBar({
  placeholder = 'Search…',
  value: controlledValue,
  onChange,
  onClear,
  results,
  onSelect,
  filters,
  activeFilters,
  onFilterToggle,
  onFilterRemove,
  onAddFilter,
  onClearAll,
  size = 'md',
  showFilters = false,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false)
  const [internalValue, setInternalValue] = useState('')
  const [focusedResult, setFocusedResult] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)

  const value = controlledValue !== undefined ? controlledValue : internalValue
  const showDropdown = focused && results && results.length > 0 && value.length > 0

  const grouped = showDropdown ? groupResults(results!) : {}
  const groupEntries = Object.entries(grouped)

  const handleChange = (v: string) => {
    if (controlledValue === undefined) setInternalValue(v)
    onChange?.(v)
  }

  const handleClear = () => {
    if (controlledValue === undefined) setInternalValue('')
    onChange?.('')
    onClear?.()
  }

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setFocused(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const allResults = groupEntries.flatMap(([, items]) => items)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocusedResult((i) => Math.min(i + 1, allResults.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setFocusedResult((i) => Math.max(i - 1, 0)) }
    if (e.key === 'Enter') { onSelect?.(allResults[focusedResult]); setFocused(false) }
    if (e.key === 'Escape') setFocused(false)
  }

  let flatIdx = 0

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <div style={s.bar(focused, size)}>
        <div style={s.iconWrap(size)}>
          <span className="material-icons" style={{ fontSize: size === 'sm' ? 14 : 17, color: 'var(--th-text-hint)' }}>search</span>
        </div>
        <input
          style={s.input(size)}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
        />
        {value && (
          <button style={s.clearBtn} onClick={handleClear} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--th-text-primary)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--th-text-hint)' }}>
            <span className="material-icons" style={{ fontSize: 16 }}>close</span>
          </button>
        )}
      </div>

      {showDropdown && (
        <div style={s.dropdown}>
          {groupEntries.map(([group, items], gi) => (
            <div key={group}>
              {gi > 0 && <div style={s.divider} />}
              <div style={s.section}>{group}</div>
              {items.map((r) => {
                const idx = flatIdx++
                const isFocused = focusedResult === idx
                return (
                  <div
                    key={r.id}
                    style={s.resultItem(isFocused)}
                    onMouseEnter={() => setFocusedResult(idx)}
                    onClick={() => { onSelect?.(r); setFocused(false) }}
                  >
                    {r.icon && (
                      <div style={s.resultIcon}>
                        <span className="material-icons" style={{ fontSize: 14, color: 'var(--th-text-secondary)' }}>{r.icon}</span>
                      </div>
                    )}
                    <span style={s.resultLabel}>{r.label}</span>
                    {r.meta && <span style={s.resultMeta}>{r.meta}</span>}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}

      {showFilters && (
        <div style={s.filterBar}>
          {activeFilters?.map((f) => (
            <div key={f.id} style={s.chipVal}>
              <div style={s.chipLabel}>{f.label}</div>
              <div style={s.chipValue}>{f.value}</div>
              <div style={s.chipRemove} onClick={() => onFilterRemove?.(f.id)}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(131,66,187,0.15)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <span className="material-icons" style={{ fontSize: 13 }}>close</span>
              </div>
            </div>
          ))}
          {filters?.map((f) => (
            <div
              key={f.id}
              style={s.chip(false)}
              onClick={() => onFilterToggle?.(f)}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--th-icon-muted)'; (e.currentTarget as HTMLElement).style.background = 'var(--th-bg-surface-subtle)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--th-border-strong)'; (e.currentTarget as HTMLElement).style.background = 'var(--th-bg-surface)' }}
            >
              {f.icon && <span className="material-icons" style={{ fontSize: 14, color: 'var(--th-text-hint)' }}>{f.icon}</span>}
              {f.label}
            </div>
          ))}
          {((filters?.length ?? 0) > 0 || (activeFilters?.length ?? 0) > 0) && <div style={s.chipDivider} />}
          <button style={s.addFilter} onClick={onAddFilter}
            onMouseEnter={(e) => { const b = e.currentTarget as HTMLElement; b.style.borderColor = 'var(--th-brand)'; b.style.color = 'var(--th-brand-medium)' }}
            onMouseLeave={(e) => { const b = e.currentTarget as HTMLElement; b.style.borderColor = 'var(--th-border-strong)'; b.style.color = 'var(--th-text-secondary)' }}
          >
            <span className="material-icons" style={{ fontSize: 14 }}>add</span>
            {activeFilters?.length ? 'Add filter' : 'More filters'}
          </button>
          {(activeFilters?.length ?? 0) > 0 && (
            <>
              <div style={{ flex: 1 }} />
              <button style={s.clearAll} onClick={onClearAll}>Clear all</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
