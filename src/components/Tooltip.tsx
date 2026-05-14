import React, { ReactNode, useState, useRef } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipVariant = 'dark' | 'light';

export interface TooltipProps {
  content: ReactNode;
  position?: TooltipPosition;
  variant?: TooltipVariant;
  children: ReactNode;
}

const ARROW_SIZE = 5;

function getTooltipPositionStyle(
  position: TooltipPosition,
  triggerRect: DOMRect | null,
  tooltipRect: DOMRect | null
): React.CSSProperties {
  if (!triggerRect || !tooltipRect) return { visibility: 'hidden' as const };

  const gap = 8;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  let top = 0;
  let left = 0;

  switch (position) {
    case 'top':
      top = triggerRect.top + scrollY - tooltipRect.height - gap - ARROW_SIZE;
      left = triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'bottom':
      top = triggerRect.bottom + scrollY + gap + ARROW_SIZE;
      left = triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'left':
      top = triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.left + scrollX - tooltipRect.width - gap - ARROW_SIZE;
      break;
    case 'right':
      top = triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.right + scrollX + gap + ARROW_SIZE;
      break;
  }

  return { top, left };
}

function getArrowStyle(position: TooltipPosition, variant: TooltipVariant): React.CSSProperties {
  const darkColor = '#282828';
  const lightBorderColor = '#DDDDE5';
  const color = variant === 'dark' ? darkColor : lightBorderColor;

  const base: React.CSSProperties = {
    content: '""',
    position: 'absolute',
    border: `${ARROW_SIZE}px solid transparent`,
    pointerEvents: 'none',
  };

  switch (position) {
    case 'top':
      return {
        ...base,
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderTopColor: color,
      };
    case 'bottom':
      return {
        ...base,
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderBottomColor: color,
      };
    case 'left':
      return {
        ...base,
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        borderLeftColor: color,
      };
    case 'right':
      return {
        ...base,
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        borderRightColor: color,
      };
  }
}

export function Tooltip({ content, position = 'top', variant = 'dark', children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<React.CSSProperties>({ visibility: 'hidden' });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});

  const isDark = variant === 'dark';

  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    background: isDark ? '#282828' : 'var(--core-white)',
    color: isDark ? 'var(--core-white)' : 'var(--dec-color-text-body)',
    fontFamily: 'var(--font-ui)',
    fontSize: '11px',
    lineHeight: '1.4',
    padding: '6px 10px',
    borderRadius: '6px',
    maxWidth: '200px',
    boxShadow: isDark
      ? '0 2px 8px rgba(20,16,41,0.2)'
      : '0 2px 8px rgba(55,23,78,0.12)',
    border: isDark ? 'none' : '1px solid var(--core-cool-100)',
    zIndex: 2000,
    pointerEvents: 'none',
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.15s var(--ease-out)',
    ...tooltipPos,
  };

  const show = () => {
    setVisible(true);
    // Measure on next frame once tooltip is rendered
    requestAnimationFrame(() => {
      if (triggerRef.current && tooltipRef.current) {
        const tRect = triggerRef.current.getBoundingClientRect();
        const ttRect = tooltipRef.current.getBoundingClientRect();
        setTooltipPos(getTooltipPositionStyle(position, tRect, ttRect));
        setArrowStyle(getArrowStyle(position, variant));
      }
    });
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <>
      <span
        ref={triggerRef}
        style={{ display: 'inline-flex' }}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
      </span>
      <div ref={tooltipRef} role="tooltip" style={tooltipStyle}>
        {content}
        {/* Arrow pseudo-element implemented as real element */}
        <span style={arrowStyle} />
      </div>
    </>
  );
}

export default Tooltip;
