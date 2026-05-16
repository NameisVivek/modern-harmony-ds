import React, { ReactNode } from 'react';

export type StepState = 'completed' | 'active' | 'pending' | 'error';

export interface StepData {
  label: string;
  sublabel?: string;
  description?: string;
  content?: ReactNode;
}

export interface StepperProps {
  steps: StepData[];
  current: number;
  orientation?: 'horizontal' | 'vertical';
}

function getStepState(index: number, current: number): StepState {
  if (index < current) return 'completed';
  if (index === current) return 'active';
  return 'pending';
}

const circleColors: Record<StepState, React.CSSProperties> = {
  completed: {
    background: 'var(--dec-color-brand-base)',
    borderColor: 'var(--dec-color-brand-base)',
    color: 'var(--core-white)',
  },
  active: {
    background: 'var(--th-bg-surface)',
    borderColor: 'var(--dec-color-brand-base)',
    color: 'var(--dec-color-brand-base)',
    boxShadow: '0 0 0 3px rgba(131,66,187,0.15)',
  },
  pending: {
    background: 'var(--th-bg-surface)',
    borderColor: 'var(--th-border-strong)',
    color: 'var(--dec-color-text-hint)',
  },
  error: {
    background: 'var(--dec-color-error-strong)',
    borderColor: 'var(--dec-color-error-strong)',
    color: 'var(--core-white)',
  },
};

interface StepCircleProps {
  state: StepState;
  number: number;
  size?: number;
  fontSize?: number;
}

function StepCircle({ state, number, size = 32, fontSize = 13 }: StepCircleProps) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-ui)',
    fontSize,
    fontWeight: 'var(--weight-medium)' as unknown as number,
    position: 'relative',
    zIndex: 1,
    flexShrink: 0,
    border: '2px solid',
    transition: 'all 0.15s',
    ...circleColors[state],
  };

  return (
    <div style={style}>
      {state === 'completed' && (
        <span className="material-icons" style={{ fontSize: size * 0.5 }}>check</span>
      )}
      {state === 'error' && (
        <span className="material-icons" style={{ fontSize: size * 0.5 }}>close</span>
      )}
      {(state === 'active' || state === 'pending') && number}
    </div>
  );
}

// ── Horizontal Stepper ──

function HorizontalStepper({ steps, current }: StepperProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      {steps.map((step, i) => {
        const state = getStepState(i, current);
        const isLast = i === steps.length - 1;
        const connectorCompleted = i < current;

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              position: 'relative',
            }}
          >
            {/* Connector line */}
            {!isLast && (
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '50%',
                  width: '100%',
                  height: '2px',
                  background: connectorCompleted
                    ? 'var(--dec-color-brand-base)'
                    : 'var(--core-cool-100)',
                  zIndex: 0,
                  transition: 'background 0.2s',
                }}
              />
            )}

            <StepCircle state={state} number={i + 1} />

            <div
              style={{
                fontSize: '11px',
                fontWeight:
                  state === 'pending'
                    ? 'var(--weight-regular)' as unknown as number
                    : 'var(--weight-medium)' as unknown as number,
                color:
                  state === 'active'
                    ? 'var(--dec-color-brand-base)'
                    : state === 'pending'
                    ? 'var(--dec-color-text-hint)'
                    : state === 'error'
                    ? 'var(--dec-color-error-foreground)'
                    : 'var(--dec-color-text-body)',
                marginTop: '6px',
                textAlign: 'center',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {step.label}
            </div>

            {step.sublabel && (
              <div
                style={{
                  fontSize: '10px',
                  color:
                    state === 'active'
                      ? 'var(--dec-color-brand-base)'
                      : state === 'error'
                      ? 'var(--dec-color-error-foreground)'
                      : 'var(--dec-color-text-hint)',
                  textAlign: 'center',
                  marginTop: '1px',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                {step.sublabel}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Vertical Stepper ──

function VerticalStepper({ steps, current }: StepperProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {steps.map((step, i) => {
        const state = getStepState(i, current);
        const isLast = i === steps.length - 1;
        const lineCompleted = i < current;

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '12px',
              position: 'relative',
              paddingBottom: isLast ? 0 : '16px',
            }}
          >
            {/* Left column: circle + line */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <StepCircle state={state} number={i + 1} size={28} fontSize={12} />
              {!isLast && (
                <div
                  style={{
                    width: '2px',
                    flex: 1,
                    minHeight: '16px',
                    background: lineCompleted
                      ? 'var(--dec-color-brand-base)'
                      : 'var(--core-cool-100)',
                    margin: '4px 0',
                    transition: 'background 0.2s',
                  }}
                />
              )}
            </div>

            {/* Right column: body */}
            <div style={{ paddingTop: '4px', flex: 1 }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight:
                    state === 'pending'
                      ? 'var(--weight-regular)' as unknown as number
                      : 'var(--weight-medium)' as unknown as number,
                  color:
                    state === 'active'
                      ? 'var(--dec-color-brand-base)'
                      : state === 'pending'
                      ? 'var(--dec-color-text-hint)'
                      : 'var(--dec-color-text-body)',
                  lineHeight: '1.3',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                {step.label}
              </div>
              {step.description && (
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--dec-color-neutral-foreground)',
                    marginTop: '4px',
                    lineHeight: '1.4',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  {step.description}
                </div>
              )}
              {step.content && state === 'active' && (
                <div
                  style={{
                    background: 'var(--th-bg-muted)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    marginTop: '8px',
                    fontSize: '12px',
                    color: 'var(--dec-color-text-body)',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  {step.content}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Public component ──

export function Stepper({ steps, current, orientation = 'horizontal' }: StepperProps) {
  if (orientation === 'vertical') {
    return <VerticalStepper steps={steps} current={current} />;
  }
  return <HorizontalStepper steps={steps} current={current} />;
}

export default Stepper;
