import React, { ReactNode } from 'react';

export interface TabData {
  id: string;
  label: string;
  content?: ReactNode;
  icon?: string;
  badge?: number | string;
  disabled?: boolean;
}

// ── Primitive components for flexible composition ──

export interface TabProps {
  id: string;
  label: string;
  icon?: string;
  badge?: number | string;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'underline';
}

export function Tab({ label, icon, badge, disabled, active, onClick, variant = 'default' }: TabProps) {
  const isUnderline = variant === 'underline';

  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    height: 'var(--comp-tab-height)',
    padding: '0 16px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--text-base)',
    fontWeight: active ? 'var(--weight-medium)' as unknown as number : 'var(--weight-regular)' as unknown as number,
    color: disabled
      ? 'var(--core-cool-200)'
      : active
      ? 'var(--dec-color-secondary-foreground)'
      : 'var(--dec-color-text-body)',
    borderBottom: active ? `2px solid var(--dec-color-brand-base)` : '2px solid transparent',
    marginBottom: '-1px',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    background: 'transparent',
    border: 'none',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: active ? 'var(--dec-color-brand-base)' : 'transparent',
    outline: 'none',
    transition: 'background 0.1s',
  };

  return (
    <button
      role="tab"
      aria-selected={active}
      disabled={disabled}
      style={baseStyle}
      onClick={() => !disabled && onClick?.()}
      onMouseEnter={(e) => {
        if (disabled) return;
        const el = e.currentTarget;
        if (isUnderline) {
          el.style.textDecoration = 'underline';
          el.style.textUnderlineOffset = '4px';
        } else {
          el.style.background = 'rgba(40,40,40,0.05)';
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.textDecoration = 'none';
        el.style.background = 'transparent';
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = 'var(--focus-ring)';
        e.currentTarget.style.borderRadius = '4px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {icon && (
        <span
          className="material-icons"
          style={{ fontSize: '16px', color: 'inherit' }}
        >
          {icon}
        </span>
      )}
      {label}
      {badge !== undefined && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '18px',
            minWidth: '18px',
            padding: '0 5px',
            borderRadius: '9px',
            background: active ? 'var(--dec-color-brand-base)' : 'var(--core-cool-100)',
            color: active ? 'var(--core-white)' : 'var(--dec-color-neutral-foreground)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-medium)' as unknown as number,
            fontFamily: 'var(--font-ui)',
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export interface TabListProps {
  children: ReactNode;
  variant?: 'default' | 'underline';
}

export function TabList({ children, variant = 'default' }: TabListProps) {
  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        alignItems: 'stretch',
        borderBottom: '1px solid rgba(191,190,206,0.55)',
      }}
      data-variant={variant}
    >
      {children}
    </div>
  );
}

export interface TabPanelProps {
  id: string;
  active?: boolean;
  children: ReactNode;
}

export function TabPanel({ active, children }: TabPanelProps) {
  if (!active) return null;
  return (
    <div role="tabpanel" style={{ padding: '14px 0' }}>
      {children}
    </div>
  );
}

// ── Composite controlled component ──

export interface TabsProps {
  tabs: TabData[];
  active?: string;
  onChange?: (id: string) => void;
  variant?: 'default' | 'underline';
}

export function Tabs({ tabs, active, onChange, variant = 'default' }: TabsProps) {
  const [internalActive, setInternalActive] = React.useState<string>(
    active ?? tabs[0]?.id ?? ''
  );
  const activeId = active !== undefined ? active : internalActive;

  const handleChange = (id: string) => {
    if (active === undefined) setInternalActive(id);
    onChange?.(id);
  };

  return (
    <div>
      <TabList variant={variant}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            icon={tab.icon}
            badge={tab.badge}
            disabled={tab.disabled}
            active={tab.id === activeId}
            onClick={() => handleChange(tab.id)}
            variant={variant}
          />
        ))}
      </TabList>
      {tabs.map((tab) => (
        <TabPanel key={tab.id} id={tab.id} active={tab.id === activeId}>
          {tab.content}
        </TabPanel>
      ))}
    </div>
  );
}

export default Tabs;
