import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  children?: ReactNode;
}

const sizeWidths: Record<ModalSize, string> = {
  sm: '360px',
  md: '480px',
  lg: '640px',
};

const backdropStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(20, 16, 41, 0.5)',
  backdropFilter: 'blur(2px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '16px',
};

function getModalStyle(size: ModalSize): React.CSSProperties {
  return {
    background: 'var(--dec-color-surface)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(20,16,41,0.2), 0 0 0 1px rgba(55,23,78,0.06)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '100%',
    maxWidth: sizeWidths[size],
    maxHeight: 'calc(100vh - 64px)',
  };
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: 'calc(16px + var(--th-density-offset, 0px)) 20px calc(14px + var(--th-density-offset, 0px))',
  borderBottom: '1px solid var(--core-gray-75)',
  flexShrink: 0,
};

const titleStyle: React.CSSProperties = {
  fontSize: 'var(--text-md)',
  fontWeight: 'var(--weight-medium)' as unknown as number,
  color: 'var(--dec-color-text-body)',
  flex: 1,
  fontFamily: 'var(--font-ui)',
};

const closeButtonStyle: React.CSSProperties = {
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  color: 'var(--dec-color-text-hint)',
  outline: 'none',
  flexShrink: 0,
};

const bodyStyle: React.CSSProperties = {
  padding: 'calc(16px + var(--th-density-offset, 0px)) 20px',
  fontSize: '13px',
  color: 'var(--dec-color-neutral-foreground)',
  lineHeight: '1.5',
  flex: 1,
  overflowY: 'auto',
};

const footerStyle: React.CSSProperties = {
  padding: 'calc(12px + var(--th-density-offset, 0px)) 20px',
  borderTop: '1px solid var(--core-gray-75)',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
  alignItems: 'center',
  flexShrink: 0,
};

export function Modal({ open, onClose, title, footer, size = 'md', children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Trigger animation on next frame
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!mounted) return null;

  const animatedBackdrop: React.CSSProperties = {
    ...backdropStyle,
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.2s var(--ease-out)',
  };

  const animatedModal: React.CSSProperties = {
    ...getModalStyle(size),
    transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(8px)',
    opacity: visible ? 1 : 0,
    transition: 'transform 0.2s var(--ease-spring), opacity 0.2s var(--ease-out)',
  };

  return createPortal(
    <div style={animatedBackdrop} onClick={handleBackdropClick} role="presentation">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        style={animatedModal}
      >
        {title !== undefined && (
          <div style={headerStyle}>
            <div id="modal-title" style={titleStyle}>{title}</div>
            <button
              style={closeButtonStyle}
              onClick={onClose}
              aria-label="Close"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--core-cool-50)';
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
    </div>,
    document.body
  );
}

export default Modal;
