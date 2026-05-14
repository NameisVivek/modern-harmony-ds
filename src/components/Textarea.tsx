import React, { useRef } from 'react';

export interface TextareaProps {
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
  maxLength?: number;
  id?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  hint,
  error,
  disabled = false,
  placeholder,
  value = '',
  onChange,
  rows = 3,
  maxLength,
  id,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputId = id ?? (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const charCount = value.length;
  const showCharCount = typeof maxLength === 'number';

  const baseStyle: React.CSSProperties = {
    padding: '8px 10px',
    border: `1px solid ${error ? 'var(--dec-color-error-strong)' : 'var(--core-cool-100)'}`,
    borderRadius: 'var(--dec-crn-base)',
    fontFamily: 'var(--font-ui)',
    fontSize: '13px',
    color: disabled ? 'var(--dec-color-text-hint)' : 'var(--dec-color-text-body)',
    resize: disabled ? 'none' : 'vertical',
    outline: 'none',
    background: disabled ? 'var(--dec-color-surface-subtle)' : 'var(--dec-color-surface)',
    lineHeight: 1.5,
    transition: 'border-color var(--motion-fast) var(--ease-in-out), box-shadow var(--motion-fast) var(--ease-in-out)',
    width: '100%',
    cursor: disabled ? 'not-allowed' : 'text',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--font-ui)' }}>
      {(label || showCharCount) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {label && (
            <label
              htmlFor={inputId}
              style={{
                fontSize: '11px',
                fontWeight: 500,
                color: 'var(--dec-color-text-body)',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {label}
            </label>
          )}
          {showCharCount && (
            <div
              style={{
                fontSize: '10px',
                color: maxLength && charCount >= maxLength
                  ? 'var(--dec-color-error-strong)'
                  : 'var(--dec-color-text-hint)',
                fontFamily: 'var(--font-ui)',
                flexShrink: 0,
              }}
            >
              {charCount} / {maxLength}
            </div>
          )}
        </div>
      )}

      <textarea
        ref={textareaRef}
        id={inputId}
        rows={rows}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        style={baseStyle}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={(e) => {
          if (!disabled) {
            const color = error ? 'rgba(224,47,58,0.3)' : 'rgba(131,66,187,0.3)';
            const border = error ? 'var(--dec-color-error-strong)' : 'var(--core-violet-600)';
            e.currentTarget.style.borderColor = border;
            e.currentTarget.style.boxShadow = `0 0 0 2px var(--core-white), 0 0 0 4px ${color}`;
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = '';
          e.currentTarget.style.borderColor = error
            ? 'var(--dec-color-error-strong)'
            : 'var(--core-cool-100)';
        }}
      />

      {error && (
        <div
          style={{
            fontSize: '10px',
            color: 'var(--dec-color-error-strong)',
            fontFamily: 'var(--font-ui)',
          }}
        >
          {error}
        </div>
      )}
      {!error && hint && (
        <div
          style={{
            fontSize: '10px',
            color: 'var(--dec-color-text-hint)',
            fontFamily: 'var(--font-ui)',
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
};

export default Textarea;
