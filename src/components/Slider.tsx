import React, { useId } from 'react';

// ── Keyframe injection ──
const SLIDER_STYLE_ID = 'mh-slider-styles';
function ensureSliderStyles() {
  if (typeof document !== 'undefined' && !document.getElementById(SLIDER_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = SLIDER_STYLE_ID;
    style.textContent = `
      .mh-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 4px;
        border-radius: 2px;
        cursor: pointer;
        outline: none;
      }
      .mh-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--dec-color-brand-base);
        border: 2px solid var(--core-white);
        box-shadow: 0 1px 3px rgba(55,23,78,0.2), 0 0 0 1px rgba(131,66,187,0.3);
        cursor: pointer;
        transition: transform 0.1s;
      }
      .mh-slider::-webkit-slider-thumb:hover {
        transform: scale(1.15);
      }
      .mh-slider:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 2px var(--core-white), 0 0 0 4px var(--dec-color-brand-base);
      }
      .mh-slider::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--dec-color-brand-base);
        border: 2px solid var(--core-white);
        box-shadow: 0 1px 3px rgba(55,23,78,0.2), 0 0 0 1px rgba(131,66,187,0.3);
        cursor: pointer;
      }
      .mh-slider:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .mh-slider:disabled::-webkit-slider-thumb {
        cursor: not-allowed;
      }
    `;
    document.head.appendChild(style);
  }
}

export interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  label?: string;
}

export function Slider({
  min = 0,
  max = 100,
  value,
  onChange,
  step = 1,
  disabled = false,
  showValue = false,
  label,
}: SliderProps) {
  ensureSliderStyles();

  const [internalValue, setInternalValue] = React.useState(value ?? min);
  const controlled = value !== undefined;
  const current = controlled ? value : internalValue;

  const pct = ((current - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (!controlled) setInternalValue(v);
    onChange?.(v);
  };

  const trackStyle = {
    background: `linear-gradient(to right, var(--dec-color-brand-base) ${pct}%, var(--core-cool-100) ${pct}%)`,
  };

  const uid = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {(label || showValue) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {label && (
            <label
              htmlFor={uid}
              style={{
                fontSize: '13px',
                fontWeight: 'var(--weight-medium)' as unknown as number,
                color: 'var(--dec-color-text-body)',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {label}
            </label>
          )}
          {showValue && (
            <span
              style={{
                fontSize: '13px',
                color: disabled ? 'var(--dec-color-text-hint)' : 'var(--dec-color-secondary-foreground)',
                fontWeight: 'var(--weight-medium)' as unknown as number,
                fontFamily: 'var(--font-ui)',
                minWidth: '40px',
                textAlign: 'right',
              }}
            >
              {current}
            </span>
          )}
        </div>
      )}
      <input
        id={uid}
        type="range"
        className="mh-slider"
        min={min}
        max={max}
        step={step}
        value={current}
        disabled={disabled}
        onChange={handleChange}
        style={trackStyle}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
      />
    </div>
  );
}

export default Slider;
