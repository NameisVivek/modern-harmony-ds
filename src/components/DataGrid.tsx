import { useState } from 'react'

export interface Column<T = Record<string, unknown>> {
  key: string
  header: string
  width?: number
  align?: 'left' | 'right' | 'center'
  sortable?: boolean
  render?: (value: unknown, row: T) => React.ReactNode
}

export type RowVariant = 'default' | 'error' | 'warning' | 'success' | 'selected'

export interface DataGridProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: Column<T>[]
  rows: T[]
  rowKey?: string
  selectable?: boolean
  selectedKeys?: string[]
  onSelectionChange?: (keys: string[]) => void
  rowVariant?: (row: T) => RowVariant
  title?: string
  subtitle?: string
  toolbar?: React.ReactNode
  loading?: boolean
  emptyMessage?: string
}

const rowBg: Record<RowVariant, string> = {
  default: 'var(--th-bg-surface)',
  error: 'var(--th-row-error-bg)',
  warning: 'var(--th-row-warning-bg)',
  success: 'var(--th-row-success-bg)',
  selected: 'var(--th-row-selected-bg)',
}

const rowIndicator: Record<RowVariant, string> = {
  default: 'transparent',
  error: 'var(--th-error)',
  warning: 'var(--th-warning)',
  success: 'var(--th-success)',
  selected: 'var(--th-brand)',
}

export function DataGrid<T extends Record<string, unknown>>({
  columns,
  rows,
  rowKey = 'id',
  selectable = true,
  selectedKeys = [],
  onSelectionChange,
  rowVariant,
  title,
  subtitle,
  toolbar,
  loading = false,
  emptyMessage = 'No records found',
}: DataGridProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const [hoveredIconBtn, setHoveredIconBtn] = useState<string | null>(null)

  const allKeys = rows.map((r) => String(r[rowKey] ?? ''))
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selectedKeys.includes(k))
  const someSelected = allKeys.some((k) => selectedKeys.includes(k)) && !allSelected

  function toggleAll() {
    if (allSelected) onSelectionChange?.([])
    else onSelectionChange?.(allKeys)
  }

  function toggleRow(key: string) {
    if (selectedKeys.includes(key)) onSelectionChange?.(selectedKeys.filter((k) => k !== key))
    else onSelectionChange?.([...selectedKeys, key])
  }

  function handleSort(col: Column<T>) {
    if (!col.sortable) return
    if (sortKey === col.key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(col.key); setSortDir('asc') }
  }

  const sortedRows = sortKey
    ? [...rows].sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        const cmp = String(av ?? '') < String(bv ?? '') ? -1 : String(av ?? '') > String(bv ?? '') ? 1 : 0
        return sortDir === 'asc' ? cmp : -cmp
      })
    : rows

  function getVariant(row: T): RowVariant {
    const key = String(row[rowKey] ?? '')
    if (selectedKeys.includes(key)) return 'selected'
    return rowVariant?.(row) ?? 'default'
  }

  const iconBtnStyle = (id: string): React.CSSProperties => ({
    width: 26,
    height: 26,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${hoveredIconBtn === id ? 'var(--th-icon-muted)' : 'var(--th-border-strong)'}`,
    borderRadius: 5,
    background: hoveredIconBtn === id ? 'var(--th-bg-surface-subtle)' : 'var(--th-bg-surface)',
    cursor: 'pointer',
    transition: 'background 0.1s, border-color 0.1s',
  })

  return (
    <div style={{
      background: 'var(--th-bg-surface)',
      borderRadius: 12,
      border: '1px solid var(--th-border)',
      overflow: 'hidden',
      boxShadow: 'var(--th-shadow-card)',
      fontFamily: 'var(--font-ui)',
    }}>
      {/* Toolbar */}
      {(title || toolbar) && (
        <div style={{
          padding: '8px 12px',
          borderBottom: '1px solid var(--th-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--th-bg-surface)',
        }}>
          {title && (
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--th-text-primary)' }}>{title}</span>
          )}
          {subtitle && (
            <span style={{ fontSize: 11, color: 'var(--th-text-hint)' }}>{subtitle}</span>
          )}
          {toolbar && <>{toolbar}</>}
          <div style={{ flex: 1 }} />
          {[
            { id: 'search', icon: 'search' },
            { id: 'filter', icon: 'filter_list' },
            { id: 'download', icon: 'cloud_download' },
            { id: 'more', icon: 'more_vert' },
          ].map((btn) => (
            <button
              key={btn.id}
              style={iconBtnStyle(btn.id)}
              onMouseEnter={() => setHoveredIconBtn(btn.id)}
              onMouseLeave={() => setHoveredIconBtn(null)}
            >
              <span className="material-icons" style={{ fontSize: 14, color: 'var(--th-icon-neutral)' }}>{btn.icon}</span>
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: 'max-content', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {selectable && (
                <th style={{
                  width: 32,
                  height: 28,
                  padding: '0 8px',
                  background: 'var(--th-bg-grid-header)',
                  borderBottom: '1px solid var(--th-border-strong)',
                  textAlign: 'left',
                }}>
                  <Checkbox3
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    height: 28,
                    padding: '0 10px',
                    fontFamily: 'var(--font-data)',
                    fontSize: 10,
                    fontWeight: 500,
                    color: 'var(--th-text-secondary)',
                    letterSpacing: '0.04em',
                    textAlign: col.align ?? 'left',
                    background: 'var(--th-bg-grid-header)',
                    borderBottom: '1px solid var(--th-border-strong)',
                    whiteSpace: 'nowrap',
                    userSelect: 'none',
                    cursor: col.sortable ? 'pointer' : 'default',
                    width: col.width,
                  }}
                  onClick={() => handleSort(col)}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                    {col.header}
                    {col.sortable && (
                      <span className="material-icons" style={{ fontSize: 12, color: 'var(--th-text-hint)', verticalAlign: 'middle' }}>
                        {sortKey === col.key ? (sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward') : 'unfold_more'}
                      </span>
                    )}
                  </span>
                </th>
              ))}
              <th style={{ width: 32, background: 'var(--th-bg-grid-header)', borderBottom: '1px solid var(--th-border-strong)' }} />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 2 : 1)} style={{ padding: '24px', textAlign: 'center', color: 'var(--th-text-hint)', fontSize: 12 }}>
                  Loading…
                </td>
              </tr>
            ) : sortedRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 2 : 1)} style={{ padding: '24px', textAlign: 'center', color: 'var(--th-text-hint)', fontSize: 12 }}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedRows.map((row, ri) => {
                const key = String(row[rowKey] ?? ri)
                const variant = getVariant(row)
                const isHovered = hoveredRow === key
                const bg = isHovered && variant === 'default' ? 'var(--th-row-hover-bg)' : rowBg[variant]

                return (
                  <tr
                    key={key}
                    style={{
                      background: bg,
                      outline: variant === 'selected' ? '1px solid var(--th-brand)' : 'none',
                      outlineOffset: -1,
                      cursor: selectable ? 'pointer' : 'default',
                    }}
                    onMouseEnter={() => setHoveredRow(key)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => selectable && toggleRow(key)}
                  >
                    {selectable && (
                      <td style={{ height: 'var(--th-row-height)', padding: '0 8px', borderBottom: '1px solid var(--th-border-subtle)', verticalAlign: 'middle' }}
                        onClick={(e) => { e.stopPropagation(); toggleRow(key) }}
                      >
                        <Checkbox3
                          checked={selectedKeys.includes(key)}
                          onChange={() => toggleRow(key)}
                        />
                      </td>
                    )}
                    {columns.map((col, ci) => (
                      <td
                        key={col.key}
                        style={{
                          height: 'var(--th-row-height)',
                          padding: '0 10px',
                          fontSize: 12,
                          color: 'var(--th-text-primary)',
                          borderBottom: '1px solid var(--th-border-subtle)',
                          verticalAlign: 'middle',
                          textAlign: col.align ?? 'left',
                          whiteSpace: 'nowrap',
                          borderLeft: ci === 0 ? `3px solid ${rowIndicator[variant]}` : undefined,
                          paddingLeft: ci === 0 ? (rowIndicator[variant] !== 'transparent' ? 7 : 10) : undefined,
                        }}
                      >
                        {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                      </td>
                    ))}
                    <td style={{ height: 'var(--th-row-height)', width: 32, borderBottom: '1px solid var(--th-border-subtle)', verticalAlign: 'middle', textAlign: 'center' }}>
                      <span className="material-icons" style={{ fontSize: 15, color: 'var(--th-icon-muted)', display: 'none' }}>more_vert</span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Inline mini checkbox (avoid circular dep)
function Checkbox3({ checked, indeterminate, onChange }: { checked: boolean; indeterminate?: boolean; onChange: () => void }) {
  return (
    <div
      onClick={(e) => { e.stopPropagation(); onChange() }}
      style={{
        width: 14,
        height: 14,
        borderRadius: 3,
        border: `1.5px solid ${checked || indeterminate ? 'var(--th-brand)' : 'var(--th-icon-muted)'}`,
        background: checked || indeterminate ? 'var(--th-brand)' : 'var(--th-bg-surface)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        verticalAlign: 'middle',
      }}
    >
      {checked && (
        <span className="material-icons" style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>check</span>
      )}
      {!checked && indeterminate && (
        <span style={{ width: 8, height: 2, background: '#fff', borderRadius: 1 }} />
      )}
    </div>
  )
}
