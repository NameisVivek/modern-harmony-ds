import React, { useState } from 'react'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'high-risk' | 'violet'

export interface AlertProps {
  variant?: AlertVariant
  title?: string
  message?: string
  dismissible?: boolean
  onDismiss?: () => void
  action?: string
  onAction?: () => void
  secondaryAction?: string
  onSecondaryAction?: () => void
}

interface AlertVariantConfig {
  background: string
  borderColor: string
  color: string
  iconColor: string
  icon: string
  btnBorder: string
}

const variantConfig: Record<AlertVariant, AlertVariantConfig> = {
  error: {
    background: 'var(--alert-error-bg)',
    borderColor: 'var(--core-red-500)',
    color: 'var(--core-red-700)',
    iconColor: 'var(--core-red-500)',
    icon: 'report',
    btnBorder: 'rgba(224,47,58,0.3)',
  },
  warning: {
    background: 'var(--core-amber-25)',
    borderColor: 'var(--core-amber-200)',
    color: 'var(--dec-color-warning-foreground)',
    iconColor: 'var(--core-amber-200)',
    icon: 'warning_amber',
    btnBorder: 'rgba(253,204,80,0.5)',
  },
  'high-risk': {
    background: 'var(--core-amber-50)',
    borderColor: 'var(--core-amber-300)',
    color: 'var(--core-amber-900)',
    iconColor: 'var(--core-amber-300)',
    icon: 'warning_amber',
    btnBorder: 'rgba(253,191,20,0.5)',
  },
  success: {
    background: 'var(--core-green-25)',
    borderColor: 'var(--core-green-400)',
    color: 'var(--core-green-500)',
    iconColor: 'var(--core-green-400)',
    icon: 'check_circle',
    btnBorder: 'rgba(2,123,68,0.3)',
  },
  info: {
    background: '#F2F8FF',
    borderColor: 'var(--core-blue-500)',
    color: 'var(--core-blue-700)',
    iconColor: 'var(--core-blue-500)',
    icon: 'info',
    btnBorder: 'rgba(19,118,216,0.3)',
  },
  violet: {
    background: 'var(--core-violet-25)',
    borderColor: 'var(--core-violet-600)',
    color: 'var(--core-violet-775)',
    iconColor: 'var(--core-violet-600)',
    icon: 'notifications',
    btnBorder: 'rgba(131,66,187,0.3)',
  },
}

export function Alert({
  variant = 'info',
  title,
  message,
  dismissible = false,
  onDismiss,
  action,
  onAction,
  secondaryAction,
  onSecondaryAction,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false)
  const [closeHovered, setCloseHovered] = useState(false)
  const [actionHovered, setActionHovered] = useState(false)
  const [secActionHovered, setSecActionHovered] = useState(false)

  if (dismissed) return null

  const config = variantConfig[variant]
  const hasActions = !!action || !!secondaryAction

  const alertStyle: React.CSSProperties = {
    padding: '12px 14px',
    borderRadius: 8,
    border: `1px solid ${config.borderColor}`,
    background: config.background,
    color: config.color,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    fontFamily: 'var(--font-ui)',
  }

  const titleRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
  }

  const iconOutlinedStyle: React.CSSProperties = {
    fontFamily: 'Material Icons Outlined',
    fontSize: 18,
    lineHeight: 1,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    display: 'inline-block',
    flexShrink: 0,
    userSelect: 'none',
    color: config.iconColor,
  }

  const titleStyle: React.CSSProperties = {
    flex: 1,
    fontSize: 13,
    fontWeight: 600,
    color: 'inherit',
    lineHeight: 1.4,
  }

  const closeBtnStyle: React.CSSProperties = {
    width: 24,
    height: 24,
    flexShrink: 0,
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: closeHovered ? 'rgba(0,0,0,0.07)' : 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 4,
    opacity: closeHovered ? 1 : 0.6,
    transition: 'opacity 0.1s, background 0.1s',
    color: 'inherit',
    fontFamily: 'Material Icons Outlined',
    fontSize: 16,
    lineHeight: 1,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
  }

  const bodyStyle: React.CSSProperties = {
    fontSize: 13,
    color: 'inherit',
    lineHeight: 1.5,
    opacity: 0.85,
    paddingLeft: 25, // 18px icon + 7px gap
  }

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: 6,
    marginTop: 4,
    paddingLeft: 25,
  }

  const actionBtnStyle = (hovered: boolean): React.CSSProperties => ({
    height: 26,
    padding: '0 10px',
    borderRadius: 6,
    fontFamily: 'var(--font-ui)',
    fontSize: 11,
    fontWeight: 500,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    border: `1px solid ${config.btnBorder}`,
    background: hovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.5)',
    color: 'inherit',
    transition: 'background 0.1s',
  })

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <div style={alertStyle} role="alert">
      <div style={titleRowStyle}>
        <span style={iconOutlinedStyle}>{config.icon}</span>
        {title && <div style={titleStyle}>{title}</div>}
        {dismissible && (
          <button
            style={closeBtnStyle}
            onClick={handleDismiss}
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
            aria-label="Dismiss"
          >
            close
          </button>
        )}
      </div>
      {message && <div style={bodyStyle}>{message}</div>}
      {hasActions && (
        <div style={actionsStyle}>
          {action && (
            <button
              style={actionBtnStyle(actionHovered)}
              onClick={onAction}
              onMouseEnter={() => setActionHovered(true)}
              onMouseLeave={() => setActionHovered(false)}
            >
              {action}
            </button>
          )}
          {secondaryAction && (
            <button
              style={actionBtnStyle(secActionHovered)}
              onClick={onSecondaryAction}
              onMouseEnter={() => setSecActionHovered(true)}
              onMouseLeave={() => setSecActionHovered(false)}
            >
              {secondaryAction}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
