import React, { useRef } from 'react';

export interface CheckboxProps {
  label?: string;
  hint?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (checked: boolean) => void;
  id?: string;
}

const css: Record<string, React.CSSProperties> = {
  wrapper: {
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: '10px',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    fontFamily: 'var(--font-ui)',
  },
  wrapperDisabled: {
    cursor: 'not-allowed',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
    pointerEvents: 'none',
  },
  box: {
    width: '18px',
    height: '18px',
    minWidth: '18px',
    borderRadius: '4px',
    border: '1.5px solid var(--dec-color-neutral-border)',
    background: 'var(--dec-color-surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background var(--motion-fast) var(--ease-in-out), border-color var(--motion-fast) var(--ease-in-out), box-shadow var(--motion-fast) var(--ease-in-out)',
    marginTop: '1px',
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  boxChecked: {
    background: 'var(--dec-color-brand-base)',
    borderColor: 'var(--dec-color-brand-base)',
  },
  boxIndeterminate: {
    background: 'var(--dec-color-brand-base)',
    borderColor: 'var(--dec-color-brand-base)',
  },
  boxError: {
    borderColor: 'var(--dec-color-error-strong)',
  },
  boxErrorChecked: {
    background: 'var(--dec-color-error-strong)',
    borderColor: 'var(--dec-color-error-strong)',
  },
  boxDisabled: {
    background: 'var(--dec-color-surface-subtle)',
    borderColor: 'var(--core-cool-100)',
    cursor: 'not-allowed',
  },
  boxDisabledChecked: {
    background: 'var(--core-cool-100)',
    borderColor: 'var(--core-cool-100)',
  },
  checkIcon: {
    fontFamily: 'var(--font-icons)',
    fontSize: '13px',
    color: 'var(--core-white)',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 1,
    userSelect: 'none',
  },
  checkIconDisabled: {
    color: 'var(--dec-color-text-hint)',
  },
  indeterminateDash: {
    width: '9px',
    height: '2px',
    background: 'var(--core-white)',
    borderRadius: '1px',
  },
  indeterminateDashDisabled: {
    background: 'var(--dec-color-text-hint)',
  },
  textWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
  },
  label: {
    fontSize: '14px',
    color: 'var(--dec-color-text-body)',
    lineHeight: 1.5,
    fontFamily: 'var(--font-ui)',
  },
  labelDisabled: {
    color: 'var(--dec-color-text-hint)',
  },
  hint: {
    fontSize: '11px',
    color: 'var(--dec-color-text-label)',
    fontFamily: 'var(--font-ui)',
  },
  errorMsg: {
    fontSize: '11px',
    color: 'var(--dec-color-error-strong)',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    marginTop: '4px',
    marginLeft: '28px',
    fontFamily: 'var(--font-ui)',
  },
  errorIcon: {
    fontFamily: 'var(--font-icons)',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 1,
  },
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  hint,
  checked = false,
  indeterminate = false,
  disabled = false,
  error,
  onChange,
  id,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = id ?? (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const handleClick = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  const computeBoxStyle = (): React.CSSProperties => {
    if (disabled) {
      return checked
        ? { ...css.box, ...css.boxDisabled, ...css.boxDisabledChecked }
        : { ...css.box, ...css.boxDisabled };
    }
    if (error) {
      return checked
        ? { ...css.box, ...css.boxErrorChecked }
        : { ...css.box, ...css.boxError };
    }
    if (indeterminate) return { ...css.box, ...css.boxIndeterminate };
    if (checked) return { ...css.box, ...css.boxChecked };
    return { ...css.box };
  };

  const boxStyle = computeBoxStyle();

  return (
    <div>
      <div
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        style={{
          ...css.wrapper,
          ...(disabled ? css.wrapperDisabled : {}),
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={(e) => {
          if (disabled) return;
          const box = e.currentTarget.querySelector('[data-box]') as HTMLElement;
          if (!box) return;
          if (checked || indeterminate) {
            box.style.background = 'var(--dec-color-secondary-foreground)';
            box.style.borderColor = 'var(--dec-color-secondary-foreground)';
          } else if (error) {
            box.style.borderColor = 'var(--core-red-600)';
            box.style.background = 'rgba(224,47,58,0.04)';
          } else {
            box.style.borderColor = 'var(--dec-color-brand-base)';
            box.style.background = 'rgba(131,66,187,0.04)';
          }
        }}
        onMouseLeave={(e) => {
          if (disabled) return;
          const box = e.currentTarget.querySelector('[data-box]') as HTMLElement;
          if (!box) return;
          // Reset to computed style
          if (error && checked) {
            box.style.background = 'var(--dec-color-error-strong)';
            box.style.borderColor = 'var(--dec-color-error-strong)';
          } else if (error) {
            box.style.background = 'var(--dec-color-surface)';
            box.style.borderColor = 'var(--dec-color-error-strong)';
          } else if (checked || indeterminate) {
            box.style.background = 'var(--dec-color-brand-base)';
            box.style.borderColor = 'var(--dec-color-brand-base)';
          } else {
            box.style.background = 'var(--dec-color-surface)';
            box.style.borderColor = 'var(--dec-color-neutral-border)';
          }
        }}
        onFocus={(e) => {
          const box = e.currentTarget.querySelector('[data-box]') as HTMLElement;
          if (box && !disabled) {
            box.style.boxShadow = '0 0 0 2px var(--core-white), 0 0 0 4px rgba(131,66,187,0.3)';
            box.style.borderColor = 'var(--dec-color-brand-base)';
          }
        }}
        onBlur={(e) => {
          const box = e.currentTarget.querySelector('[data-box]') as HTMLElement;
          if (box) box.style.boxShadow = '';
        }}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          style={css.hiddenInput}
          onChange={() => {}} // controlled via wrapper onClick
          aria-hidden="true"
          tabIndex={-1}
        />

        <div data-box style={boxStyle}>
          {(checked || indeterminate) && (
            indeterminate ? (
              <div style={{ ...css.indeterminateDash, ...(disabled ? css.indeterminateDashDisabled : {}) }} />
            ) : (
              <span style={{ ...css.checkIcon, ...(disabled ? css.checkIconDisabled : {}) }}>
                check
              </span>
            )
          )}
        </div>

        {(label || hint) && (
          <div style={css.textWrap}>
            {label && (
              <label
                htmlFor={inputId}
                style={{ ...css.label, ...(disabled ? css.labelDisabled : {}) }}
                onClick={(e) => e.preventDefault()}
              >
                {label}
              </label>
            )}
            {hint && <div style={css.hint}>{hint}</div>}
          </div>
        )}
      </div>

      {error && (
        <div style={css.errorMsg}>
          <span style={css.errorIcon} className="material-icons">error_outline</span>
          {error}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
