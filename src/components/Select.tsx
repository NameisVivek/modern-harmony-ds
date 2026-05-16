import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
  searchable?: boolean;
  multiple?: boolean;
  id?: string;
}

const css: Record<string, React.CSSProperties> = {
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    position: 'relative',
  },
  label: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--dec-color-text-body)',
    fontFamily: 'var(--font-ui)',
  },
  hint: {
    fontSize: '10px',
    color: 'var(--dec-color-text-hint)',
    marginTop: '1px',
    fontFamily: 'var(--font-ui)',
  },
  errorMsg: {
    fontSize: '10px',
    color: 'var(--dec-color-error-strong)',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    marginTop: '1px',
    fontFamily: 'var(--font-ui)',
  },
  errorIcon: {
    fontFamily: 'var(--font-icons)',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  wrap: {
    position: 'relative',
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 'calc(32px + var(--th-density-offset, 0px))',
    border: '1px solid var(--core-cool-100)',
    borderRadius: 'var(--dec-crn-base)',
    padding: '4px 8px 4px 10px',
    background: 'var(--dec-color-surface)',
    cursor: 'pointer',
    gap: '6px',
    userSelect: 'none',
    fontFamily: 'var(--font-ui)',
    fontSize: '13px',
    color: 'var(--dec-color-text-body)',
    transition: 'border-color var(--motion-fast) var(--ease-in-out), box-shadow var(--motion-fast) var(--ease-in-out)',
    boxSizing: 'border-box',
    width: '100%',
  },
  triggerDisabled: {
    background: 'var(--dec-color-surface-subtle)',
    color: 'var(--dec-color-text-hint)',
    cursor: 'not-allowed',
    borderColor: 'var(--core-gray-75)',
    pointerEvents: 'none',
  },
  placeholder: {
    color: 'var(--dec-color-text-hint)',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  value: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  pills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    flex: 1,
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    height: '20px',
    padding: '0 6px',
    background: 'rgba(131,66,187,0.1)',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 500,
    color: 'var(--dec-color-secondary-foreground)',
    cursor: 'default',
  },
  pillX: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontFamily: 'var(--font-icons)',
    fontSize: '11px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 1,
    color: 'var(--dec-color-secondary-foreground)',
  },
  caret: {
    color: 'var(--dec-color-text-hint)',
    flexShrink: 0,
    fontFamily: 'var(--font-icons)',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 1,
    transition: 'transform var(--motion-fast) var(--ease-in-out)',
  },
  panel: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    minWidth: '100%',
    background: 'var(--dec-color-surface)',
    border: '1px solid var(--core-cool-100)',
    borderRadius: 'var(--dec-crn-base)',
    boxShadow: '0 4px 16px rgba(55,23,78,0.12), 0 2px 4px rgba(55,23,78,0.06)',
    zIndex: 200,
    overflow: 'hidden',
  },
  searchRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 10px',
    borderBottom: '1px solid var(--core-gray-75)',
  },
  searchIcon: {
    fontFamily: 'var(--font-icons)',
    fontSize: '15px',
    color: 'var(--dec-color-text-hint)',
    flexShrink: 0,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 1,
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: 'var(--font-ui)',
    fontSize: '13px',
    color: 'var(--dec-color-text-body)',
  },
  list: {
    maxHeight: '220px',
    overflowY: 'auto',
    padding: '4px 0',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '7px 10px',
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: 'var(--font-ui)',
    color: 'var(--dec-color-text-body)',
    transition: 'background var(--motion-fast)',
  },
  optionSelected: {
    background: 'rgba(131,66,187,0.06)',
    color: 'var(--dec-color-secondary-foreground)',
    fontWeight: 500,
  },
  optionDisabled: {
    color: 'var(--core-cool-200)',
    cursor: 'not-allowed',
  },
  check: {
    width: '15px',
    height: '15px',
    borderRadius: '3px',
    border: '1.5px solid var(--core-cool-200)',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkSelected: {
    background: 'var(--dec-color-brand-base)',
    borderColor: 'var(--dec-color-brand-base)',
  },
  checkIcon: {
    fontFamily: 'var(--font-icons)',
    fontSize: '11px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 1,
    color: 'var(--core-white)',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6px 10px',
    borderTop: '1px solid var(--core-gray-75)',
    fontSize: '12px',
  },
  footerCount: {
    color: 'var(--dec-color-text-hint)',
    fontFamily: 'var(--font-ui)',
  },
  footerClear: {
    color: 'var(--dec-color-secondary-foreground)',
    fontWeight: 500,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: 'var(--font-ui)',
    fontSize: '12px',
    padding: 0,
  },
  empty: {
    padding: '14px 10px',
    textAlign: 'center',
    fontSize: '12px',
    color: 'var(--dec-color-text-hint)',
    fontFamily: 'var(--font-ui)',
  },
  countBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20px',
    minWidth: '20px',
    padding: '0 5px',
    background: 'var(--dec-color-brand-base)',
    borderRadius: '9999px',
    fontSize: '10px',
    fontWeight: 700,
    color: 'var(--core-white)',
    flexShrink: 0,
  },
};

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = '— Select —',
  disabled = false,
  error,
  hint,
  searchable = false,
  multiple = false,
  id,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const inputId = id ?? (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const selectedValues: string[] = multiple
    ? (Array.isArray(value) ? value : value ? [value] : [])
    : [];
  const singleValue = !multiple ? (typeof value === 'string' ? value : '') : '';

  const filteredOptions = search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
      setOpen(false);
      setSearch('');
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      if (searchable) {
        setTimeout(() => searchRef.current?.focus(), 10);
      }
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, searchable, handleClickOutside]);

  const toggleOption = (optValue: string) => {
    if (multiple) {
      const next = selectedValues.includes(optValue)
        ? selectedValues.filter((v) => v !== optValue)
        : [...selectedValues, optValue];
      onChange?.(next);
    } else {
      onChange?.(optValue);
      setOpen(false);
      setSearch('');
    }
  };

  const removeValue = (optValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple) {
      onChange?.(selectedValues.filter((v) => v !== optValue));
    }
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : '');
  };

  const triggerStyle: React.CSSProperties = {
    ...css.trigger,
    ...(disabled ? css.triggerDisabled : {}),
    ...(open ? { borderColor: 'var(--core-violet-600)', boxShadow: '0 0 0 2px var(--th-bg-surface), 0 0 0 4px rgba(131,66,187,0.25)' } : {}),
    ...(error && !open ? { borderColor: 'var(--dec-color-error-strong)' } : {}),
  };

  const getOptionLabel = (val: string) => options.find((o) => o.value === val)?.label ?? val;

  return (
    <div style={css.field}>
      {label && (
        <label htmlFor={inputId} style={css.label}>
          {label}
        </label>
      )}

      <div ref={wrapRef} style={css.wrap}>
        <div
          id={inputId}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          tabIndex={disabled ? -1 : 0}
          style={triggerStyle}
          onClick={() => !disabled && setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); !disabled && setOpen((o) => !o); }
            if (e.key === 'Escape') { setOpen(false); setSearch(''); }
          }}
          onMouseEnter={(e) => {
            if (!disabled && !open) e.currentTarget.style.borderColor = 'var(--core-cool-200)';
          }}
          onMouseLeave={(e) => {
            if (!disabled && !open) e.currentTarget.style.borderColor = error ? 'var(--dec-color-error-strong)' : 'var(--core-cool-100)';
          }}
        >
          {multiple ? (
            selectedValues.length > 0 ? (
              <div style={css.pills}>
                {selectedValues.slice(0, 3).map((v) => (
                  <span key={v} style={css.pill}>
                    {getOptionLabel(v)}
                    <span
                      style={css.pillX}
                      onClick={(e) => removeValue(v, e)}
                      role="button"
                      aria-label={`Remove ${getOptionLabel(v)}`}
                    >close</span>
                  </span>
                ))}
                {selectedValues.length > 3 && (
                  <span style={css.countBadge}>+{selectedValues.length - 3}</span>
                )}
              </div>
            ) : (
              <span style={css.placeholder}>{placeholder}</span>
            )
          ) : (
            singleValue
              ? <span style={css.value}>{getOptionLabel(singleValue)}</span>
              : <span style={css.placeholder}>{placeholder}</span>
          )}

          <span style={{ ...css.caret, transform: open ? 'rotate(180deg)' : 'none' }}>
            expand_more
          </span>
        </div>

        {open && (
          <div style={css.panel} role="listbox">
            {searchable && (
              <div style={css.searchRow}>
                <span style={css.searchIcon}>search</span>
                <input
                  ref={searchRef}
                  style={css.searchInput}
                  placeholder="Search…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            <div style={css.list}>
              {filteredOptions.length === 0 ? (
                <div style={css.empty}>No options found</div>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = multiple
                    ? selectedValues.includes(opt.value)
                    : singleValue === opt.value;

                  const optStyle: React.CSSProperties = {
                    ...css.option,
                    ...(isSelected ? css.optionSelected : {}),
                    ...(opt.disabled ? css.optionDisabled : {}),
                  };

                  return (
                    <div
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      style={optStyle}
                      onClick={() => !opt.disabled && toggleOption(opt.value)}
                      onMouseEnter={(e) => {
                        if (!opt.disabled && !isSelected)
                          e.currentTarget.style.background = '#F8F8FB';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected)
                          e.currentTarget.style.background = '';
                        else
                          e.currentTarget.style.background = 'rgba(131,66,187,0.06)';
                      }}
                    >
                      {multiple && (
                        <div style={{ ...css.check, ...(isSelected ? css.checkSelected : {}) }}>
                          {isSelected && <span style={css.checkIcon}>check</span>}
                        </div>
                      )}
                      {opt.label}
                    </div>
                  );
                })
              )}
            </div>

            {multiple && selectedValues.length > 0 && (
              <div style={css.footer}>
                <span style={css.footerCount}>{selectedValues.length} selected</span>
                <button style={css.footerClear} onClick={clearAll}>Clear all</button>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div style={css.errorMsg}>
          <span style={css.errorIcon} className="material-icons">error_outline</span>
          {error}
        </div>
      )}
      {!error && hint && <div style={css.hint}>{hint}</div>}
    </div>
  );
};

export default Select;
