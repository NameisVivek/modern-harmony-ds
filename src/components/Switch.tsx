import React from 'react';

export interface SwitchProps {
  label?: string;
  hint?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md';
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  hint,
  checked = false,
  disabled = false,
  onChange,
  size = 'md',
  id,
}) => {
  const inputId = id ?? (label ? `switch-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  // Size tokens
  const trackW = size === 'sm' ? '28px' : '36px';
  const trackH = size === 'sm' ? '16px' : '20px';
  const thumbSize = size === 'sm' ? '12px' : '16px';
  const thumbOffset = '2px';
  const thumbTravel = size === 'sm' ? '12px' : '16px';

  const trackStyle: React.CSSProperties = {
    width: trackW,
    height: trackH,
    borderRadius: '9999px',
    background: checked ? 'var(--dec-color-brand-base)' : 'var(--core-cool-100)',
    position: 'relative',
    flexShrink: 0,
    transition: 'background var(--motion-fast) var(--ease-in-out)',
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    top: thumbOffset,
    left: thumbOffset,
    width: thumbSize,
    height: thumbSize,
    borderRadius: '50%',
    background: 'var(--core-white)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    transition: 'transform var(--motion-fast) var(--ease-in-out)',
    transform: checked ? `translateX(${thumbTravel})` : 'translateX(0)',
  };

  const handleToggle = () => {
    if (!disabled) onChange?.(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        opacity: disabled ? 0.45 : 1,
        fontFamily: 'var(--font-ui)',
      }}
      onClick={handleToggle}
    >
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        aria-checked={checked}
        checked={checked}
        disabled={disabled}
        onChange={() => {}}
        onKeyDown={handleKeyDown}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
        aria-hidden="true"
        tabIndex={-1}
      />

      <div
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        style={trackStyle}
        onKeyDown={handleKeyDown}
        onFocus={(e) => {
          if (!disabled) {
            e.currentTarget.style.boxShadow = '0 0 0 2px var(--core-white), 0 0 0 4px var(--core-violet-600)';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = '';
        }}
      >
        <div style={thumbStyle} />
      </div>

      {(label || hint) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {label && (
            <label
              htmlFor={inputId}
              style={{
                fontSize: size === 'sm' ? '13px' : '14px',
                color: 'var(--dec-color-text-body)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                lineHeight: 1.4,
                fontFamily: 'var(--font-ui)',
              }}
              onClick={(e) => e.preventDefault()}
            >
              {label}
            </label>
          )}
          {hint && (
            <div
              style={{
                fontSize: '11px',
                color: 'var(--dec-color-text-label)',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {hint}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Switch;
