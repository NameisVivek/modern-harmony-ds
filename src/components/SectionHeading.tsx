import React from 'react';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
  actionVariant?: 'primary' | 'default' | 'text';
  divider?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  action,
  onAction,
  actionVariant = 'default',
  divider = true,
  icon,
  badge,
  style,
  className,
}: SectionHeadingProps) {
  const getActionStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      height: '26px',
      padding: '0 10px',
      borderRadius: 'var(--dec-crn-base-sm)',
      fontFamily: 'var(--font-ui)',
      fontSize: '11px',
      fontWeight: 'var(--weight-medium)' as unknown as number,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3px',
      transition: 'opacity var(--motion-fast)',
    };

    switch (actionVariant) {
      case 'primary':
        return {
          ...base,
          background: 'var(--dec-color-brand-base)',
          color: 'var(--dec-color-on-dark)',
          border: 'none',
        };
      case 'text':
        return {
          ...base,
          background: 'transparent',
          color: 'var(--dec-color-secondary-foreground)',
          border: 'none',
          fontWeight: 'var(--weight-regular)' as unknown as number,
        };
      default:
        return {
          ...base,
          background: 'var(--dec-color-surface)',
          color: 'var(--dec-color-text-body)',
          border: '1px solid var(--dec-color-neutral-base)',
        };
    }
  };

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 0',
        borderBottom: divider ? '1px solid var(--core-gray-75)' : 'none',
        ...style,
      }}
    >
      {/* Optional icon */}
      {icon && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'var(--dec-color-brand-base)',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      )}

      {/* Title + subtitle */}
      <div style={{ flex: 1, minWidth: 0 }}>
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
        {subtitle && (
          <div
            style={{
              fontSize: '12px',
              color: 'var(--dec-color-text-label)',
              fontFamily: 'var(--font-ui)',
              lineHeight: 'var(--leading-base)',
              marginTop: '2px',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Optional badge */}
      {badge && badge}

      {/* Action button */}
      {action && onAction && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          <button
            onClick={onAction}
            style={getActionStyles()}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '1';
            }}
          >
            {action}
          </button>
        </div>
      )}
    </div>
  );
}
