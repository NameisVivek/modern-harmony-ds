import React, { ReactNode } from 'react';

export type ProgressVariant = 'linear' | 'circular';
export type ProgressColor = 'violet' | 'success' | 'error' | 'warning';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps {
  value?: number;
  variant?: ProgressVariant;
  indeterminate?: boolean;
  label?: ReactNode;
  size?: ProgressSize;
  color?: ProgressColor;
}

const colorMap: Record<ProgressColor, string> = {
  violet: 'var(--dec-color-brand-base)',
  success: 'var(--dec-color-success-strong)',
  error: 'var(--dec-color-error-strong)',
  warning: 'var(--dec-color-warning-strong)',
};

// ── Keyframe injection ──
const KEYFRAME_ID = 'mh-progress-keyframes';
function ensureKeyframes() {
  if (typeof document !== 'undefined' && !document.getElementById(KEYFRAME_ID)) {
    const style = document.createElement('style');
    style.id = KEYFRAME_ID;
    style.textContent = `
      @keyframes mh-indeterminate {
        0%   { width: 20%; margin-left: -20%; }
        50%  { width: 60%; margin-left: 40%; }
        100% { width: 20%; margin-left: 110%; }
      }
      @keyframes mh-spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

// ── Linear ──

function LinearProgress({ value = 0, indeterminate = false, label, color = 'violet' }: ProgressProps) {
  ensureKeyframes();
  const pct = Math.min(100, Math.max(0, value));
  const fillColor = colorMap[color];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {(label !== undefined || !indeterminate) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: 'var(--dec-color-text-label)',
          }}
        >
          <span>{label}</span>
          {!indeterminate && <span>{pct}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : pct}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          height: '6px',
          background: 'var(--core-cool-50)',
          borderRadius: '3px',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: '3px',
            background: fillColor,
            ...(indeterminate
              ? {
                  width: '40%',
                  animation: 'mh-indeterminate 1.4s ease-in-out infinite',
                }
              : {
                  width: `${pct}%`,
                  transition: 'width 0.3s ease',
                }),
          }}
        />
      </div>
    </div>
  );
}

// ── Circular ──

const circularSizes: Record<ProgressSize, { size: number; stroke: number }> = {
  sm: { size: 16, stroke: 2 },
  md: { size: 24, stroke: 2.5 },
  lg: { size: 32, stroke: 3 },
};

function CircularProgress({
  value = 0,
  indeterminate = false,
  size = 'md',
  color = 'violet',
}: ProgressProps) {
  ensureKeyframes();
  const { size: sz, stroke } = circularSizes[size];
  const pct = Math.min(100, Math.max(0, value));
  const fillColor = colorMap[color];
  const radius = (sz - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (pct / 100) * circumference;

  if (indeterminate) {
    return (
      <div
        role="progressbar"
        style={{
          width: sz,
          height: sz,
          borderRadius: '50%',
          border: `${stroke}px solid var(--core-cool-50)`,
          borderTopColor: fillColor,
          animation: `mh-spin 0.7s linear infinite`,
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <svg
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      width={sz}
      height={sz}
      style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}
    >
      <circle
        cx={sz / 2}
        cy={sz / 2}
        r={radius}
        fill="none"
        stroke="var(--core-cool-50)"
        strokeWidth={stroke}
      />
      <circle
        cx={sz / 2}
        cy={sz / 2}
        r={radius}
        fill="none"
        stroke={fillColor}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
        style={{ transition: 'stroke-dasharray 0.3s ease' }}
      />
    </svg>
  );
}

// ── Public component ──

export function Progress({ variant = 'linear', ...rest }: ProgressProps) {
  if (variant === 'circular') {
    return <CircularProgress {...rest} />;
  }
  return <LinearProgress {...rest} />;
}

export default Progress;
