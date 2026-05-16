import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  width?: string | number;
  children?: ReactNode;
  footer?: ReactNode;
}

export function Drawer({ open, onClose, title, width = '280px', children, footer }: DrawerProps) {
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!mounted) return null;

  const resolvedWidth = typeof width === 'number' ? `${width}px` : width;

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(20, 16, 41, 0.4)',
    zIndex: 1000,
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.3s var(--ease-out)',
  };

  const drawerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: resolvedWidth,
    background: 'var(--dec-color-surface)',
    borderLeft: '1px solid var(--core-gray-75)',
    boxShadow: '-2px 0 8px rgba(55,23,78,0.08)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1001,
    transform: visible ? 'translateX(0)' : `translateX(${resolvedWidth})`,
    transition: 'transform 0.3s var(--ease-in-out)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 14px',
    borderBottom: '1px solid var(--core-gray-75)',
    gap: '8px',
    flexShrink: 0,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--weight-medium)' as unknown as number,
    color: 'var(--dec-color-text-body)',
    flex: 1,
    fontFamily: 'var(--font-ui)',
  };

  const closeButtonStyle: React.CSSProperties = {
    width: '26px',
    height: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    color: 'var(--dec-color-text-hint)',
    outline: 'none',
  };

  const bodyStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const footerStyle: React.CSSProperties = {
    padding: '10px 14px',
    borderTop: '1px solid var(--core-gray-75)',
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    flexShrink: 0,
  };

  return createPortal(
    <>
      <div
        style={backdropStyle}
        onClick={onClose}
        role="presentation"
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        style={drawerStyle}
      >
        {title !== undefined && (
          <div style={headerStyle}>
            <div id="drawer-title" style={titleStyle}>{title}</div>
            <button
              style={closeButtonStyle}
              onClick={onClose}
              aria-label="Close drawer"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--th-bg-muted)';
                e.currentTarget.style.color = 'var(--dec-color-text-body)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--dec-color-text-hint)';
              }}
              onFocus={(e) => { e.currentTarget.style.boxShadow = 'var(--focus-ring)'; }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              <span className="material-icons" style={{ fontSize: '18px' }}>close</span>
            </button>
          </div>
        )}
        {children && <div style={bodyStyle}>{children}</div>}
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </>,
    document.body
  );
}

export default Drawer;
