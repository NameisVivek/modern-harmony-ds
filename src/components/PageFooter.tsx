import React from 'react'

export interface FooterAction {
  id: string
  label: string
  icon?: string
  variant?: 'primary' | 'default' | 'destructive' | 'ghost'
  disabled?: boolean
  onClick?: () => void
}

export interface PageFooterProps {
  actions?: FooterAction[]
  recordCount?: number
  recordLabel?: string
  showPagination?: boolean
  page?: number
  pageSize?: number
  total?: number
  onPageChange?: (page: number) => void
}

const variantStyle = (variant: FooterAction['variant'] = 'default', disabled: boolean): React.CSSProperties => {
  const base: React.CSSProperties = {
    height: 32, padding: '0 14px', borderRadius: 8,
    fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 5,
    opacity: disabled ? 0.4 : 1,
    transition: 'all 0.1s', border: 'none',
  }
  if (variant === 'primary') return { ...base, background: 'var(--th-brand)', color: '#fff', boxShadow: '0 1px 2px rgba(55,23,78,0.25)' }
  if (variant === 'destructive') return { ...base, background: '#E02F3A', color: '#fff', boxShadow: '0 1px 2px rgba(176,37,48,0.3)' }
  if (variant === 'ghost') return { ...base, background: 'transparent', color: 'var(--th-brand-medium)', boxShadow: 'none', fontWeight: 400 }
  return { ...base, background: 'var(--th-bg-surface)', color: 'var(--th-text-primary)', border: '1px solid var(--th-border-strong)', boxShadow: '0 1px 2px rgba(55,23,78,0.06)' }
}

const hoverColors: Record<string, string> = {
  primary: '#7239A4',
  destructive: '#C0172D',
  default: '#F0F0F4',
  ghost: 'rgba(131,66,187,0.06)',
}

function PgBtn({ label, icon, disabled, onClick }: { label?: string; icon?: string; disabled?: boolean; onClick?: () => void }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        width: icon && !label ? 30 : undefined,
        height: 30, minWidth: label ? 30 : undefined,
        padding: label && !icon ? '0 8px' : 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'transparent', border: '1px solid var(--th-border-strong)', borderRadius: 6,
        fontFamily: 'var(--font-ui)', fontSize: 12, color: disabled ? '#C4C4CF' : '#282828',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.1s',
      }}
      onMouseEnter={(e) => { if (!disabled) { const b = e.currentTarget as HTMLElement; b.style.borderColor = '#8342BB'; b.style.color = '#8342BB' }}}
      onMouseLeave={(e) => { const b = e.currentTarget as HTMLElement; b.style.borderColor = '#DDDDE5'; b.style.color = disabled ? '#C4C4CF' : '#282828' }}
    >
      {icon && <span className="material-icons" style={{ fontSize: 16 }}>{icon}</span>}
      {label}
    </button>
  )
}

export function PageFooter({
  actions = [],
  recordCount,
  recordLabel = 'records',
  showPagination = false,
  page = 1,
  pageSize = 25,
  total = 0,
  onPageChange,
}: PageFooterProps) {
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  const pageWindow = () => {
    const pages: (number | '...')[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (page > 3) pages.push('...')
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i)
      if (page < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div style={{
      background: 'var(--th-bg-surface)',
      borderTop: '2px solid #8342BB',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        height: 2,
        background: 'linear-gradient(90deg, #8342BB 0%, #B49AD6 100%)',
        marginTop: -2,
      }} />
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 14px', gap: 12, minHeight: 48,
        overflowX: 'auto', scrollbarWidth: 'none',
      } as React.CSSProperties}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          {actions.map((action) => (
            <button
              key={action.id}
              disabled={action.disabled}
              onClick={action.onClick}
              style={variantStyle(action.variant, !!action.disabled)}
              onMouseEnter={(e) => {
                if (!action.disabled) {
                  const hc = hoverColors[action.variant ?? 'default']
                  ;(e.currentTarget as HTMLElement).style.background = hc
                }
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget as HTMLElement
                const base = variantStyle(action.variant, !!action.disabled)
                b.style.background = base.background as string
              }}
            >
              {action.icon && <span className="material-icons" style={{ fontSize: 15 }}>{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          {recordCount !== undefined && (
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--th-text-secondary)', whiteSpace: 'nowrap' }}>
              {showPagination ? <>{start}–{end} of </> : null}
              <strong style={{ color: 'var(--th-text-primary)', fontWeight: 500 }}>{total || recordCount}</strong>{' '}
              {recordLabel}
            </span>
          )}

          {showPagination && totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PgBtn icon="first_page" disabled={page === 1} onClick={() => onPageChange?.(1)} />
              <PgBtn icon="chevron_left" disabled={page === 1} onClick={() => onPageChange?.(page - 1)} />
              {pageWindow().map((p, i) =>
                p === '...'
                  ? <span key={`e${i}`} style={{ width: 30, textAlign: 'center', fontSize: 12, color: 'var(--th-text-hint)' }}>…</span>
                  : (
                    <button
                      key={p}
                      onClick={() => onPageChange?.(p as number)}
                      style={{
                        width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: p === page ? '#8342BB' : 'transparent',
                        color: p === page ? '#fff' : '#282828',
                        border: p === page ? '1px solid #8342BB' : '1px solid transparent',
                        borderRadius: 6, fontFamily: 'var(--font-ui)', fontSize: 12,
                        cursor: 'pointer', transition: 'all 0.1s',
                      }}
                      onMouseEnter={(e) => { if (p !== page) { const b = e.currentTarget as HTMLElement; b.style.background = '#F0F0F4'; b.style.borderColor = '#DDDDE5' }}}
                      onMouseLeave={(e) => { if (p !== page) { const b = e.currentTarget as HTMLElement; b.style.background = 'transparent'; b.style.borderColor = 'transparent' }}}
                    >
                      {p}
                    </button>
                  )
              )}
              <PgBtn icon="chevron_right" disabled={page === totalPages} onClick={() => onPageChange?.(page + 1)} />
              <PgBtn icon="last_page" disabled={page === totalPages} onClick={() => onPageChange?.(totalPages)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageFooter
