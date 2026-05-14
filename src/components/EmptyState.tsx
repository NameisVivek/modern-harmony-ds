import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: string;
  onAction?: () => void;
  actionVariant?: 'primary' | 'default';
  minHeight?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  onAction,
  actionVariant = 'primary',
  minHeight = 180,
  style,
  className,
}: EmptyStateProps) {
  const resolvedMinHeight =
    typeof minHeight === 'number' ? `${minHeight}px` : minHeight;

  const isPrimary = actionVariant === 'primary';

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '28px 20px',
        textAlign: 'center' as const,
        border: '1px solid var(--core-gray-75)',
        borderRadius: 'var(--dec-crn-panel)',
        background: 'var(--dec-color-panel-alt)',
        minHeight: resolvedMinHeight,
        ...style,
      }}
    >
      {/* Icon area */}
      {icon && (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      )}

      {/* Title */}
      <div
        style={{
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--weight-medium)' as unknown as number,
          color: 'var(--dec-color-text-body)',
          fontFamily: 'var(--font-ui)',
          lineHeight: 'var(--leading-snug)',
        }}
      >
        {title}
      </div>

      {/* Description */}
      {description && (
        <div
          style={{
            fontSize: '12px',
            color: 'var(--dec-color-text-label)',
            lineHeight: 'var(--leading-base)',
            fontFamily: 'var(--font-ui)',
            maxWidth: '200px',
          }}
        >
          {description}
        </div>
      )}

      {/* Action button */}
      {action && onAction && (
        <button
          onClick={onAction}
          style={{
            height: '28px',
            padding: '0 12px',
            borderRadius: 'var(--dec-crn-base-sm)',
            fontFamily: 'var(--font-ui)',
            fontSize: '12px',
            fontWeight: 'var(--weight-medium)' as unknown as number,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            border: isPrimary ? 'none' : '1px solid var(--dec-color-neutral-base)',
            background: isPrimary
              ? 'var(--dec-color-brand-base)'
              : 'var(--dec-color-surface)',
            color: isPrimary
              ? 'var(--dec-color-on-dark)'
              : 'var(--dec-color-text-body)',
            boxShadow: isPrimary ? 'var(--elevation-1)' : 'none',
            transition: 'opacity var(--motion-fast)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '0.88';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '1';
          }}
        >
          {action}
        </button>
      )}
    </div>
  );
}
