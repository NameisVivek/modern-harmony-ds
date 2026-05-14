import React from 'react';

export interface SegmentOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentsProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  block?: boolean;
  size?: 'default' | 'sm';
  variant?: 'default' | 'violet';
  style?: React.CSSProperties;
  className?: string;
}

export function Segments({
  options,
  value,
  onChange,
  block = false,
  size = 'default',
  variant = 'default',
  style,
  className,
}: SegmentsProps) {
  const isSmall = size === 'sm';
  const isViolet = variant === 'violet';

  const groupStyle: React.CSSProperties = {
    display: block ? 'flex' : 'inline-flex',
    background: 'var(--dec-color-surface-subtle)',
    borderRadius: 'var(--dec-crn-base)',
    padding: '3px',
    gap: '2px',
    width: block ? '100%' : undefined,
    ...style,
  };

  const getItemStyle = (isActive: boolean, isDisabled: boolean): React.CSSProperties => {
    const height = isSmall ? '24px' : '28px';
    const padding = isSmall ? '0 10px' : '0 12px';
    const fontSize = isSmall ? '12px' : '13px';

    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      height,
      padding,
      borderRadius: 'var(--dec-crn-base-sm)',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-ui)',
      fontSize,
      fontWeight: isActive ? 'var(--weight-medium)' as unknown as number : 'var(--weight-regular)' as unknown as number,
      color: isDisabled
        ? 'var(--dec-color-neutral-foreground)'
        : isActive
          ? isViolet
            ? 'var(--dec-color-on-dark)'
            : 'var(--dec-color-text-body)'
          : 'var(--dec-color-neutral-foreground)',
      userSelect: 'none' as const,
      transition: 'all var(--motion-fast)',
      opacity: isDisabled ? 0.4 : 1,
      whiteSpace: 'nowrap' as const,
      flex: block ? 1 : undefined,
      justifyContent: block ? 'center' : undefined,
      background: isActive
        ? isViolet
          ? 'var(--dec-color-brand-base)'
          : 'var(--dec-color-surface)'
        : 'transparent',
      boxShadow: isActive && !isViolet
        ? '0 1px 3px rgba(55,23,78,0.12), 0 0 0 1px rgba(55,23,78,0.06)'
        : 'none',
      border: 'none',
      outline: 'none',
    };

    return base;
  };

  return (
    <div
      role="group"
      className={className}
      style={groupStyle}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        const isDisabled = Boolean(option.disabled);

        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isActive}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            style={getItemStyle(isActive, isDisabled)}
            onClick={() => {
              if (!isDisabled) onChange(option.value);
            }}
            onMouseEnter={(e) => {
              if (!isDisabled && !isActive) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'rgba(40,40,40,0.06)';
                (e.currentTarget as HTMLButtonElement).style.color =
                  'var(--dec-color-text-body)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isDisabled && !isActive) {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color =
                  'var(--dec-color-neutral-foreground)';
              }
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
