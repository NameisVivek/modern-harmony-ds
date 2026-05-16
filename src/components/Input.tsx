import React, { useRef } from 'react';

export interface InputProps {
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
  prefixText?: string;
  suffixText?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  size?: 'default' | 'compact';
  type?: string;
  id?: string;
}

const styles = {
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  label: {
    fontSize: '11px',
    fontWeight: 500,
    color: 'var(--dec-color-text-body)',
    fontFamily: 'var(--font-ui)',
  },
  hint: {
    fontSize: '10px',
    color: 'var(--dec-color-text-label)',
    marginTop: '2px',
    fontFamily: 'var(--font-ui)',
  },
  errorMsg: {
    fontSize: '10px',
    color: 'var(--dec-color-error-strong)',
    marginTop: '2px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    fontFamily: 'var(--font-ui)',
  },
  errorIcon: {
    fontFamily: 'var(--font-icons)',
    fontSize: '12px',
  },
  inputWrap: {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
  },
  adornment: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    position: 'absolute' as const,
    pointerEvents: 'none' as const,
    color: 'var(--dec-color-text-hint)',
    fontFamily: 'var(--font-ui)',
    fontSize: '14px',
    userSelect: 'none' as const,
  },
  prefixAdornment: {
    left: '8px',
  },
  suffixAdornment: {
    right: '8px',
  },
  prefixTextAdornment: {
    left: '10px',
    fontSize: '13px',
  },
  suffixTextAdornment: {
    right: '10px',
    fontSize: '13px',
  },
  iconMaterial: {
    fontFamily: 'var(--font-icons)',
    fontSize: '16px',
    lineHeight: 1,
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
};

export const Input: React.FC<InputProps> = ({
  label,
  hint,
  error,
  disabled = false,
  prefixIcon,
  suffixIcon,
  prefixText,
  suffixText,
  placeholder,
  value,
  onChange,
  size = 'default',
  type = 'text',
  id,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = id ?? (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const height = size === 'compact'
    ? 'calc(28px + var(--th-density-offset, 0px))'
    : 'calc(32px + var(--th-density-offset, 0px))';
  const hasPrefixIcon = Boolean(prefixIcon);
  const hasSuffixIcon = Boolean(suffixIcon);
  const hasPrefixText = Boolean(prefixText);
  const hasSuffixText = Boolean(suffixText);

  const paddingLeft = hasPrefixIcon ? '30px' : hasPrefixText ? `${(prefixText?.length ?? 0) * 8 + 18}px` : '10px';
  const paddingRight = hasSuffixIcon ? '30px' : hasSuffixText ? `${(suffixText?.length ?? 0) * 8 + 18}px` : '10px';

  const inputBaseStyle: React.CSSProperties = {
    height,
    paddingLeft,
    paddingRight,
    borderRadius: 'var(--dec-crn-base)',
    border: `1px solid ${error ? 'var(--dec-color-error-strong)' : 'var(--core-cool-100)'}`,
    background: disabled ? 'var(--dec-color-surface-subtle)' : 'var(--dec-color-surface)',
    fontFamily: 'var(--font-ui)',
    fontSize: '14px',
    color: disabled ? 'var(--dec-color-text-hint)' : 'var(--dec-color-text-body)',
    outline: 'none',
    width: '100%',
    cursor: disabled ? 'not-allowed' : 'text',
    transition: 'border-color var(--motion-base) var(--ease-in-out), box-shadow var(--motion-base) var(--ease-in-out)',
    boxSizing: 'border-box',
  };

  return (
    <div style={styles.field}>
      {label && (
        <label htmlFor={inputId} style={styles.label}>
          {label}
        </label>
      )}

      <div style={styles.inputWrap}>
        {prefixIcon && (
          <span style={{ ...styles.adornment, ...styles.prefixAdornment }}>
            <span style={styles.iconMaterial}>{prefixIcon}</span>
          </span>
        )}
        {!prefixIcon && prefixText && (
          <span style={{ ...styles.adornment, ...styles.prefixTextAdornment }}>
            {prefixText}
          </span>
        )}

        <input
          ref={inputRef}
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          style={inputBaseStyle}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.borderColor = 'var(--core-violet-600)';
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--core-white), 0 0 0 4px rgba(131,66,187,0.3)';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = '';
            e.currentTarget.style.borderColor = error
              ? 'var(--dec-color-error-strong)'
              : 'var(--core-cool-100)';
          }}
        />

        {suffixIcon && (
          <span style={{ ...styles.adornment, ...styles.suffixAdornment }}>
            <span style={styles.iconMaterial}>{suffixIcon}</span>
          </span>
        )}
        {!suffixIcon && suffixText && (
          <span style={{ ...styles.adornment, ...styles.suffixTextAdornment }}>
            {suffixText}
          </span>
        )}
      </div>

      {error && (
        <div style={styles.errorMsg}>
          <span style={styles.errorIcon} className="material-icons">error_outline</span>
          {error}
        </div>
      )}
      {!error && hint && (
        <div style={styles.hint}>{hint}</div>
      )}
    </div>
  );
};

export default Input;
