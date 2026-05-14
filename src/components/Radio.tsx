import React, { createContext, useContext } from 'react';

// ── Context ──────────────────────────────────────────────────────────────────

interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// ── RadioGroup ────────────────────────────────────────────────────────────────

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  errorMessage?: string;
  direction?: 'vertical' | 'horizontal';
  name?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  children,
  disabled = false,
  error = false,
  label,
  errorMessage,
  direction = 'vertical',
  name,
}) => {
  return (
    <RadioGroupContext.Provider value={{ value, onChange, disabled, error, name }}>
      <div
        role="radiogroup"
        style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-ui)' }}
      >
        {label && (
          <div
            style={{
              fontSize: '11px',
              fontWeight: 500,
              color: error ? 'var(--core-red-700)' : 'var(--dec-color-text-body)',
              marginBottom: '2px',
              fontFamily: 'var(--font-ui)',
            }}
          >
            {label}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
            gap: direction === 'horizontal' ? '20px' : '8px',
            flexWrap: 'wrap',
          }}
        >
          {children}
        </div>
        {error && errorMessage && (
          <div
            style={{
              fontSize: '11px',
              color: 'var(--dec-color-error-strong)',
              marginTop: '4px',
              fontFamily: 'var(--font-ui)',
            }}
          >
            {errorMessage}
          </div>
        )}
      </div>
    </RadioGroupContext.Provider>
  );
};

// ── Radio ─────────────────────────────────────────────────────────────────────

export interface RadioProps {
  label?: string;
  hint?: string;
  value: string;
  disabled?: boolean;
}

export const Radio: React.FC<RadioProps> = ({ label, hint, value, disabled: ownDisabled }) => {
  const ctx = useContext(RadioGroupContext);
  const disabled = ownDisabled || ctx?.disabled || false;
  const isSelected = ctx?.value === value;
  const hasError = ctx?.error || false;

  const handleSelect = () => {
    if (disabled) return;
    ctx?.onChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      ctx?.onChange(value);
    }
  };

  const circleBase: React.CSSProperties = {
    width: '16px',
    height: '16px',
    flexShrink: 0,
    marginTop: '1px',
    borderRadius: '50%',
    border: isSelected
      ? `2px solid ${hasError ? 'var(--dec-color-error-strong)' : 'var(--dec-color-brand-base)'}`
      : `1.5px solid ${hasError ? 'var(--dec-color-error-strong)' : 'var(--core-cool-200)'}`,
    background: 'var(--dec-color-surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all var(--motion-fast) var(--ease-in-out)',
    boxSizing: 'border-box',
  };

  const dotStyle: React.CSSProperties = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: hasError ? 'var(--dec-color-error-strong)' : 'var(--dec-color-brand-base)',
    display: 'block',
  };

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'var(--font-ui)',
      }}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      onMouseEnter={(e) => {
        if (disabled) return;
        const circle = e.currentTarget.querySelector('[data-circle]') as HTMLElement;
        if (circle) {
          circle.style.borderColor = 'var(--dec-color-brand-base)';
          circle.style.background = 'rgba(131,66,187,0.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        const circle = e.currentTarget.querySelector('[data-circle]') as HTMLElement;
        if (circle) {
          circle.style.borderColor = isSelected
            ? (hasError ? 'var(--dec-color-error-strong)' : 'var(--dec-color-brand-base)')
            : (hasError ? 'var(--dec-color-error-strong)' : 'var(--core-cool-200)');
          circle.style.background = 'var(--dec-color-surface)';
        }
      }}
      onFocus={(e) => {
        const circle = e.currentTarget.querySelector('[data-circle]') as HTMLElement;
        if (circle && !disabled) {
          circle.style.boxShadow = '0 0 0 2px var(--core-white), 0 0 0 4px var(--core-violet-600)';
          circle.style.borderColor = 'var(--dec-color-brand-base)';
        }
      }}
      onBlur={(e) => {
        const circle = e.currentTarget.querySelector('[data-circle]') as HTMLElement;
        if (circle) {
          circle.style.boxShadow = '';
          circle.style.borderColor = isSelected
            ? (hasError ? 'var(--dec-color-error-strong)' : 'var(--dec-color-brand-base)')
            : (hasError ? 'var(--dec-color-error-strong)' : 'var(--core-cool-200)');
        }
      }}
    >
      <input
        type="radio"
        name={ctx?.name}
        value={value}
        checked={isSelected}
        disabled={disabled}
        onChange={() => {}}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
        aria-hidden="true"
        tabIndex={-1}
      />

      <div data-circle style={circleBase}>
        {isSelected && <span style={dotStyle} />}
      </div>

      {(label || hint) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {label && (
            <div
              style={{
                fontSize: '14px',
                color: 'var(--dec-color-text-body)',
                lineHeight: 1.4,
                fontFamily: 'var(--font-ui)',
              }}
            >
              {label}
            </div>
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

export default Radio;
