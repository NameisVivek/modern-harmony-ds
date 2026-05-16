import React, { useState, useRef } from 'react'

export interface PingPongItem {
  id: string
  label: string
}

export interface PingPongProps {
  availableLabel?: string
  selectedLabel?: string
  available: PingPongItem[]
  selected: PingPongItem[]
  onChange: (available: PingPongItem[], selected: PingPongItem[]) => void
  height?: number
  disabled?: boolean
}

const s = {
  shell: (disabled: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'stretch',
    background: 'var(--th-bg-surface)',
    borderRadius: 10,
    border: '1px solid var(--th-border)',
    boxShadow: '0 1px 3px rgba(55,23,78,0.06)',
    overflow: 'hidden',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : undefined,
  }),
  panel: { flex: 1, display: 'flex', flexDirection: 'column' as const, minWidth: 0 },
  header: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '10px 12px', borderBottom: '1px solid var(--th-border)',
    background: 'var(--th-bg-surface-subtle)', flexShrink: 0,
  } as React.CSSProperties,
  title: { fontSize: 12, fontWeight: 500, color: 'var(--th-text-primary)', flex: 1, fontFamily: 'var(--font-ui)' } as React.CSSProperties,
  count: {
    fontSize: 11, color: 'var(--th-text-hint)', background: 'var(--th-border)',
    borderRadius: 4, padding: '1px 6px', fontFamily: 'var(--font-ui)',
  } as React.CSSProperties,
  searchWrap: {
    display: 'flex', alignItems: 'center', gap: 6,
    height: 30, padding: '0 10px', margin: 8,
    borderRadius: 6, background: 'var(--th-bg-surface)', border: '1px solid var(--th-border-strong)', flexShrink: 0,
  } as React.CSSProperties,
  searchInput: {
    flex: 1, background: 'transparent', border: 'none', outline: 'none',
    fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--th-text-primary)',
  } as React.CSSProperties,
  list: { flex: 1, overflowY: 'auto' as const, padding: '2px 0' },
  item: (selected: boolean, alt: boolean, dragOver: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '7px 10px', cursor: 'pointer', userSelect: 'none',
    borderLeft: selected ? '3px solid #8342BB' : '3px solid transparent',
    background: dragOver ? 'rgba(131,66,187,0.1)' : selected ? 'rgba(131,66,187,0.06)' : alt ? '#F8F8FB' : '#fff',
    transition: 'background 0.1s',
  }),
  dragHandle: { color: 'var(--th-icon-muted)', display: 'flex', alignItems: 'center', flexShrink: 0, cursor: 'grab' } as React.CSSProperties,
  itemLabel: { flex: 1, fontSize: 13, color: 'var(--th-text-primary)', fontFamily: 'var(--font-ui)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const },
  checkIcon: (visible: boolean): React.CSSProperties => ({
    color: 'var(--th-brand)', display: 'flex', alignItems: 'center', flexShrink: 0,
    opacity: visible ? 1 : 0, transition: 'opacity 0.1s',
  }),
  controls: {
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center',
    gap: 6, padding: '0 6px', flexShrink: 0,
    background: 'var(--th-bg-surface-subtle)', borderLeft: '1px solid var(--th-border)', borderRight: '1px solid var(--th-border)',
  } as React.CSSProperties,
  ctrlBtn: (enabled: boolean): React.CSSProperties => ({
    width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--th-bg-surface)', border: '1px solid var(--th-border-strong)', borderRadius: 6,
    cursor: enabled ? 'pointer' : 'not-allowed',
    color: enabled ? '#5E5C75' : '#C4C4CF',
    boxShadow: '0 1px 2px rgba(55,23,78,0.06)',
    opacity: enabled ? 1 : 0.45,
    transition: 'all 0.1s',
  }),
}

export function PingPong({
  availableLabel = 'Available',
  selectedLabel = 'Selected',
  available,
  selected,
  onChange,
  height = 360,
  disabled = false,
}: PingPongProps) {
  const [availHighlighted, setAvailHighlighted] = useState<Set<string>>(new Set())
  const [selHighlighted, setSelHighlighted] = useState<Set<string>>(new Set())
  const [availFilter, setAvailFilter] = useState('')
  const [selFilter, setSelFilter] = useState('')
  const [dragOverList, setDragOverList] = useState<'avail' | 'sel' | null>(null)
  const dragItem = useRef<{ id: string; from: 'avail' | 'sel' } | null>(null)

  const toggleHighlight = (id: string, side: 'avail' | 'sel') => {
    const set = side === 'avail' ? availHighlighted : selHighlighted
    const setter = side === 'avail' ? setAvailHighlighted : setSelHighlighted
    const next = new Set(set)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setter(next)
  }

  const moveSelected = (dir: 'add' | 'remove') => {
    if (dir === 'add') {
      const toMove = available.filter((i) => availHighlighted.has(i.id))
      onChange(available.filter((i) => !availHighlighted.has(i.id)), [...selected, ...toMove])
      setAvailHighlighted(new Set())
    } else {
      const toMove = selected.filter((i) => selHighlighted.has(i.id))
      onChange([...available, ...toMove], selected.filter((i) => !selHighlighted.has(i.id)))
      setSelHighlighted(new Set())
    }
  }

  const moveAll = (dir: 'add' | 'remove') => {
    if (dir === 'add') {
      onChange([], [...selected, ...available])
    } else {
      onChange([...available, ...selected], [])
    }
    setAvailHighlighted(new Set())
    setSelHighlighted(new Set())
  }

  const handleDrop = (to: 'avail' | 'sel') => {
    if (!dragItem.current || dragItem.current.from === to) return
    const { id, from } = dragItem.current
    if (from === 'avail' && to === 'sel') {
      const item = available.find((i) => i.id === id)
      if (item) onChange(available.filter((i) => i.id !== id), [...selected, item])
    } else {
      const item = selected.find((i) => i.id === id)
      if (item) onChange([...available, item], selected.filter((i) => i.id !== id))
    }
    setDragOverList(null)
    dragItem.current = null
  }

  const filteredAvail = available.filter((i) => i.label.toLowerCase().includes(availFilter.toLowerCase()))
  const filteredSel = selected.filter((i) => i.label.toLowerCase().includes(selFilter.toLowerCase()))

  const renderList = (items: PingPongItem[], allItems: PingPongItem[], highlighted: Set<string>, side: 'avail' | 'sel', filter: string, setFilter: (v: string) => void) => (
    <div style={s.panel}>
      <div style={s.header}>
        <span style={s.title}>{side === 'avail' ? availableLabel : selectedLabel}</span>
        <span style={s.count}>{allItems.length}</span>
      </div>
      <div style={s.searchWrap}>
        <span className="material-icons" style={{ fontSize: 14, color: 'var(--th-text-hint)', flexShrink: 0 }}>search</span>
        <input style={s.searchInput} placeholder="Type to filter…" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <div
        style={s.list}
        onDragOver={(e) => { e.preventDefault(); setDragOverList(side) }}
        onDragLeave={() => setDragOverList(null)}
        onDrop={() => handleDrop(side)}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            style={s.item(highlighted.has(item.id), i % 2 === 1, dragOverList === side)}
            onClick={() => toggleHighlight(item.id, side)}
            draggable
            onDragStart={() => { dragItem.current = { id: item.id, from: side } }}
            onMouseEnter={(e) => {
              if (!highlighted.has(item.id)) (e.currentTarget as HTMLElement).style.background = '#F0F0F4'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = highlighted.has(item.id) ? 'rgba(131,66,187,0.06)' : i % 2 === 1 ? '#F8F8FB' : '#fff'
            }}
          >
            <span style={s.dragHandle}>
              <span className="material-icons" style={{ fontSize: 18 }}>drag_indicator</span>
            </span>
            <span style={s.itemLabel}>{item.label}</span>
            <span style={s.checkIcon(highlighted.has(item.id))}>
              <span className="material-icons" style={{ fontSize: 16 }}>{side === 'avail' ? 'arrow_forward' : 'check'}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ ...s.shell(disabled), height }}>
      {renderList(filteredAvail, available, availHighlighted, 'avail', availFilter, setAvailFilter)}
      <div style={s.controls}>
        {[
          { icon: 'keyboard_double_arrow_right', action: () => moveAll('add'), enabled: available.length > 0, title: 'Move all' },
          { icon: 'keyboard_arrow_right', action: () => moveSelected('add'), enabled: availHighlighted.size > 0, title: 'Move selected' },
          { icon: 'keyboard_arrow_left', action: () => moveSelected('remove'), enabled: selHighlighted.size > 0, title: 'Remove selected' },
          { icon: 'keyboard_double_arrow_left', action: () => moveAll('remove'), enabled: selected.length > 0, title: 'Remove all' },
        ].map(({ icon, action, enabled, title }) => (
          <button
            key={icon}
            title={title}
            style={s.ctrlBtn(enabled)}
            disabled={!enabled}
            onClick={action}
            onMouseEnter={(e) => { if (enabled) { const b = e.currentTarget as HTMLElement; b.style.background = '#8342BB'; b.style.color = '#fff'; b.style.borderColor = '#8342BB' }}}
            onMouseLeave={(e) => { const b = e.currentTarget as HTMLElement; b.style.background = '#fff'; b.style.color = enabled ? '#5E5C75' : '#C4C4CF'; b.style.borderColor = '#DDDDE5' }}
          >
            <span className="material-icons" style={{ fontSize: 18 }}>{icon}</span>
          </button>
        ))}
      </div>
      {renderList(filteredSel, selected, selHighlighted, 'sel', selFilter, setSelFilter)}
    </div>
  )
}

export default PingPong
