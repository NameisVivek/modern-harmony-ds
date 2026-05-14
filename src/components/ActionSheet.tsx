import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export interface ActionSheetAction {
  id: string
  label: string
  description?: string
  icon?: string
  variant?: 'default' | 'destructive' | 'disabled'
}

export interface ActionSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  actions: ActionSheetAction[]
  onAction?: (id: string) => void
}

export function ActionSheet({ open, onClose, title, actions, onAction }: ActionSheetProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) { setVisible(true) }
    else {
      const t = setTimeout(() => setVisible(false), 220)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!visible && !open) return null

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(40,40,40,0.3)',
          zIndex: 400,
          opacity: open ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
        onClick={onClose}
      />
      {/* Sheet */}
      <div
        ref={ref}
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: open ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(100%)',
          width: '100%',
          maxWidth: 480,
          background: '#fff',
          borderRadius: '16px 16px 0 0',
          boxShadow: '0 -8px 32px rgba(55,23,78,0.16)',
          zIndex: 401,
          transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
          fontFamily: 'var(--font-ui)',
          overflow: 'hidden',
          paddingBottom: 20,
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 6 }}>
          <div style={{ width: 32, height: 4, borderRadius: 2, background: '#DDDDE5' }} />
        </div>

        {/* Header */}
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px 10px', borderBottom: '1px solid #F0F0F4' }}>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#282828' }}>{title}</span>
            <button
              style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6, color: '#5E5C75' }}
              onClick={onClose}
            >
              <span className="material-icons" style={{ fontSize: 18 }}>close</span>
            </button>
          </div>
        )}

        {/* Actions */}
        <div style={{ padding: '6px 0' }}>
          {actions.map((action) => {
            const isDestructive = action.variant === 'destructive'
            const isDisabled = action.variant === 'disabled'
            const isHovered = hoveredId === action.id

            return (
              <button
                key={action.id}
                disabled={isDisabled}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  padding: '10px 16px',
                  background: isHovered && !isDisabled ? (isDestructive ? 'rgba(224,47,58,0.04)' : 'rgba(40,40,40,0.04)') : 'transparent',
                  border: 'none',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-ui)',
                  textAlign: 'left',
                  transition: 'background 0.1s',
                  opacity: isDisabled ? 0.4 : 1,
                }}
                onMouseEnter={() => !isDisabled && setHoveredId(action.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => { if (!isDisabled) { onAction?.(action.id); onClose() } }}
              >
                {action.icon && (
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: isDestructive ? '#FEF7F4' : '#F8F8FB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span className="material-icons" style={{ fontSize: 20, color: isDestructive ? '#E02F3A' : '#5E5C75' }}>
                      {action.icon}
                    </span>
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: isDestructive ? '#E02F3A' : '#282828' }}>
                    {action.label}
                  </span>
                  {action.description && (
                    <span style={{ fontSize: 12, color: '#8C8C8C', lineHeight: 1.4 }}>
                      {action.description}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </>,
    document.body
  )
}
