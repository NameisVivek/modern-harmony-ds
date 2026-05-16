import React from 'react';

export interface WellProps {
  children?: React.ReactNode;
  padding?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

export function Well({ children, padding, style, className }: WellProps) {
  const resolvedPadding =
    padding !== undefined
      ? typeof padding === 'number'
        ? `${padding}px`
        : padding
      : '14px 16px';

  return (
    <div
      className={className}
      style={{
        background: 'var(--th-bg-muted)',
        borderRadius: 'var(--dec-crn-panel)',
        border: '1px solid var(--dec-color-neutral-base)',
        padding: resolvedPadding,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
