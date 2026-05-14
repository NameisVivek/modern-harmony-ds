import React from 'react';

export interface CardProps {
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4;
  padding?: string | number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const elevationMap: Record<number, string> = {
  0: 'var(--elevation-0)',
  1: 'var(--elevation-1)',
  2: 'var(--elevation-2)',
  3: 'var(--elevation-3)',
  4: 'var(--elevation-4)',
};

export function Card({
  title,
  subtitle,
  footer,
  elevation = 2,
  padding,
  children,
  style,
  className,
}: CardProps) {
  const hasHeader = Boolean(title || subtitle);

  return (
    <div
      className={className}
      style={{
        background: 'var(--dec-color-surface)',
        borderRadius: 'var(--dec-crn-container)',
        border: '1px solid var(--core-gray-75)',
        boxShadow: elevationMap[elevation],
        overflow: 'hidden',
        ...style,
      }}
    >
      {hasHeader && (
        <div
          style={{
            padding: '14px 16px 10px',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '2px',
            borderBottom: '1px solid var(--dec-color-surface-subtle)',
          }}
        >
          {title && (
            <div
              style={{
                fontSize: '13px',
                fontWeight: 'var(--weight-medium)' as unknown as number,
                color: 'var(--dec-color-text-body)',
                fontFamily: 'var(--font-ui)',
                lineHeight: 'var(--leading-snug)',
              }}
            >
              {title}
            </div>
          )}
          {subtitle && (
            <div
              style={{
                fontSize: '12px',
                color: 'var(--dec-color-text-label)',
                fontFamily: 'var(--font-ui)',
                lineHeight: 'var(--leading-base)',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      )}

      {children && (
        <div
          style={{
            padding:
              padding !== undefined
                ? typeof padding === 'number'
                  ? `${padding}px`
                  : padding
                : '12px 16px',
          }}
        >
          {children}
        </div>
      )}

      {footer && (
        <div
          style={{
            padding: '10px 16px',
            borderTop: '1px solid var(--dec-color-surface-subtle)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 'var(--core-sp-8)',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
