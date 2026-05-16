import React, { useState, ReactNode } from 'react';

/* ─── Types ─────────────────────────────────────────────────────── */

export type FieldValueType = 'default' | 'mono' | 'highlight' | 'error' | 'empty' | 'secondary';

export interface FieldDef {
  label: string;
  value?: ReactNode;
  rawValue?: string;
  type?: FieldValueType;
  editable?: boolean;
  onEdit?: (value: string) => void;
}

export interface FieldValuePairsProps {
  fields: FieldDef[];
  layout?: 'stack' | 'grid' | 'inline';
  columns?: 1 | 2 | 3 | 4;
  labelWidth?: number;
  title?: string;
  onEditAll?: () => void;
}

/* ─── Styles ─────────────────────────────────────────────────────── */

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 500,
  color: 'var(--th-text-secondary)',
  lineHeight: 1.4,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

function valueStyles(type: FieldValueType): React.CSSProperties {
  const base: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 1.4,
    fontFamily: 'var(--font-ui)',
  };
  switch (type) {
    case 'mono':
      return { ...base, fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--dec-color-text-body)' };
    case 'highlight':
      return { ...base, color: 'var(--dec-color-secondary-foreground)', fontWeight: 500 };
    case 'error':
      return { ...base, color: 'var(--dec-color-error-foreground)', fontWeight: 500 };
    case 'empty':
      return { ...base, color: 'var(--core-cool-200)', fontStyle: 'italic' };
    case 'secondary':
      return { ...base, color: 'var(--dec-color-text-label)' };
    default:
      return { ...base, color: 'var(--dec-color-text-body)' };
  }
}

const editActionStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '3px',
  fontSize: '11px',
  color: 'var(--dec-color-secondary-foreground)',
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',
  fontFamily: 'var(--font-ui)',
  fontWeight: 500,
  padding: 0,
  marginTop: '2px',
  transition: 'color 0.1s',
};

const sectionHead: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  color: 'var(--dec-color-text-body)',
  marginBottom: '12px',
  paddingBottom: '8px',
  borderBottom: '1px solid var(--core-cool-50)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const sectionActionStyle: React.CSSProperties = {
  fontSize: '11px',
  color: 'var(--dec-color-secondary-foreground)',
  cursor: 'pointer',
  fontWeight: 500,
  background: 'transparent',
  border: 'none',
  fontFamily: 'var(--font-ui)',
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
};

/* ─── Inline editable field ─────────────────────────────────────── */

interface InlineEditFieldProps {
  field: FieldDef;
}

function InlineEditField({ field }: InlineEditFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(field.rawValue ?? String(field.value ?? ''));

  const commit = () => {
    setEditing(false);
    field.onEdit?.(draft);
  };

  const cancel = () => {
    setEditing(false);
    setDraft(field.rawValue ?? String(field.value ?? ''));
  };

  if (editing) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit();
            if (e.key === 'Escape') cancel();
          }}
          style={{
            fontSize: '13px',
            fontFamily: 'var(--font-ui)',
            color: 'var(--dec-color-text-body)',
            border: '1px solid var(--dec-color-brand-base)',
            borderRadius: '4px',
            padding: '3px 6px',
            outline: 'none',
            boxShadow: 'var(--focus-ring-inset)',
            background: 'var(--dec-color-surface)',
          }}
        />
        <div style={{ display: 'flex', gap: '6px' }}>
          <button style={{ ...editActionStyle, color: 'var(--dec-color-brand-base)' }} onClick={commit}>
            <span className="material-icons" style={{ fontSize: '13px', fontFamily: 'Material Icons', lineHeight: 1 }}>check</span>
            Save
          </button>
          <button style={{ ...editActionStyle, color: 'var(--th-text-secondary)' }} onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <span style={valueStyles(field.type ?? 'default')}>
        {field.value ?? field.rawValue ?? <span style={valueStyles('empty')}>—</span>}
      </span>
      <div>
        <button
          style={editActionStyle}
          onClick={() => setEditing(true)}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--dec-color-secondary-inverse)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--dec-color-secondary-foreground)'; }}
        >
          <span className="material-icons" style={{ fontSize: '13px', fontFamily: 'Material Icons', lineHeight: 1 }}>edit</span>
          Edit
        </button>
      </div>
    </div>
  );
}

/* ─── Stacked / grid field ──────────────────────────────────────── */

function StackedField({ field }: { field: FieldDef }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
      <span style={labelStyle}>{field.label}</span>
      {field.editable ? (
        <InlineEditField field={field} />
      ) : (
        <span style={valueStyles(field.type ?? 'default')}>
          {field.value ?? <span style={valueStyles('empty')}>—</span>}
        </span>
      )}
    </div>
  );
}

/* ─── Inline list row ───────────────────────────────────────────── */

interface InlineRowProps {
  field: FieldDef;
  labelWidth?: number;
  isLast: boolean;
}

function InlineRow({ field, labelWidth = 120, isLast }: InlineRowProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: isLast ? '8px 0 0' : '8px 0',
      borderBottom: isLast ? 'none' : '1px solid var(--core-cool-50)',
    }}>
      <span style={{ ...labelStyle, width: labelWidth, flexShrink: 0, lineHeight: 1.5 }}>{field.label}</span>
      <span style={{ ...valueStyles(field.type ?? 'default'), flex: 1, lineHeight: 1.5 }}>
        {field.editable ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{field.value ?? '—'}</span>
            <button
              style={editActionStyle}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--dec-color-secondary-inverse)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--dec-color-secondary-foreground)'; }}
              onClick={() => field.onEdit?.('')}
            >
              <span className="material-icons" style={{ fontSize: '13px', fontFamily: 'Material Icons', lineHeight: 1 }}>edit</span>
              Edit
            </button>
          </span>
        ) : (
          field.value ?? <span style={valueStyles('empty')}>—</span>
        )}
      </span>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────── */

export function FieldValuePairs({
  fields,
  layout = 'grid',
  columns = 4,
  labelWidth,
  title,
  onEditAll,
}: FieldValuePairsProps) {
  const header = (
    title ? (
      <div style={sectionHead}>
        {title}
        {onEditAll && (
          <button
            style={sectionActionStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--dec-color-secondary-inverse)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--dec-color-secondary-foreground)'; }}
            onClick={onEditAll}
          >
            <span className="material-icons" style={{ fontSize: '13px', fontFamily: 'Material Icons', lineHeight: 1 }}>edit</span>
            Edit
          </button>
        )}
      </div>
    ) : null
  );

  if (layout === 'inline') {
    return (
      <div style={{ fontFamily: 'var(--font-ui)' }}>
        {header}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {fields.map((field, i) => (
            <InlineRow key={i} field={field} labelWidth={labelWidth} isLast={i === fields.length - 1} />
          ))}
        </div>
      </div>
    );
  }

  const cols = layout === 'stack' ? 1 : columns;
  const gap = cols === 1 ? '12px' : cols <= 2 ? '16px 24px' : '14px 20px';

  return (
    <div style={{ fontFamily: 'var(--font-ui)' }}>
      {header}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>
        {fields.map((field, i) => (
          <StackedField key={i} field={field} />
        ))}
      </div>
    </div>
  );
}

export default FieldValuePairs;
