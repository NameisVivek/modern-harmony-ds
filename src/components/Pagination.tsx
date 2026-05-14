import React from 'react';

export interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
  pageSizeOptions?: number[];
}

function getPageNumbers(page: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, '...', totalPages];
  }

  if (page >= totalPages - 2) {
    return [1, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', page - 1, page, page + 1, '...', totalPages];
}

const btnBase: React.CSSProperties = {
  minWidth: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 'var(--dec-crn-base-sm)',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  fontFamily: 'var(--font-ui)',
  fontSize: '13px',
  color: 'var(--dec-color-text-body)',
  padding: '0 6px',
  transition: 'background var(--motion-fast)',
  lineHeight: 1,
};

const activeBtn: React.CSSProperties = {
  ...btnBase,
  background: 'var(--dec-color-brand-base)',
  color: 'var(--dec-color-on-dark)',
  fontWeight: 'var(--weight-medium)' as unknown as number,
};

const disabledBtn: React.CSSProperties = {
  ...btnBase,
  color: 'var(--core-cool-200)',
  cursor: 'not-allowed',
};

const dotsStyle: React.CSSProperties = {
  minWidth: '30px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--dec-color-text-hint)',
  fontSize: '13px',
  userSelect: 'none',
};

export function Pagination({
  total,
  page,
  pageSize,
  onChange,
  pageSizeOptions = [25, 50, 100],
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages = getPageNumbers(page, totalPages);
  const isFirst = page === 1;
  const isLast = page === totalPages;

  const startRecord = Math.min((page - 1) * pageSize + 1, total);
  const endRecord = Math.min(page * pageSize, total);

  const NavButton = ({
    icon,
    disabled,
    onClick,
    ariaLabel,
  }: {
    icon: string;
    disabled: boolean;
    onClick: () => void;
    ariaLabel: string;
  }) => (
    <button
      style={disabled ? disabledBtn : btnBase}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={(e) => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = 'var(--dec-color-surface-subtle)';
      }}
      onMouseLeave={(e) => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
      }}
    >
      <span className="material-icons" style={{ fontSize: '18px' }}>
        {icon}
      </span>
    </button>
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        justifyContent: 'space-between',
        padding: '8px 0',
        flexWrap: 'wrap' as const,
      }}
    >
      {/* Rows per page */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            fontSize: '12px',
            color: 'var(--dec-color-text-label)',
            whiteSpace: 'nowrap',
          }}
        >
          Rows per page:
        </span>
        <select
          value={pageSize}
          onChange={(e) => onChange(1, Number(e.target.value))}
          style={{
            height: '30px',
            padding: '0 24px 0 10px',
            border: '1px solid var(--dec-color-neutral-base)',
            borderRadius: 'var(--dec-crn-base-sm)',
            fontFamily: 'var(--font-ui)',
            fontSize: '12px',
            color: 'var(--dec-color-text-body)',
            appearance: 'none',
            background:
              "#fff url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='%238C8C8C'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\") no-repeat right 8px center",
            cursor: 'pointer',
          }}
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Record count */}
      <span
        style={{
          fontSize: '12px',
          color: 'var(--dec-color-text-label)',
          whiteSpace: 'nowrap',
        }}
      >
        {startRecord}–{endRecord} of {total.toLocaleString()} records
      </span>

      {/* Page buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        <NavButton
          icon="first_page"
          disabled={isFirst}
          onClick={() => onChange(1, pageSize)}
          ariaLabel="First page"
        />
        <NavButton
          icon="chevron_left"
          disabled={isFirst}
          onClick={() => onChange(page - 1, pageSize)}
          ariaLabel="Previous page"
        />

        {pages.map((p, i) =>
          p === '...' ? (
            <div key={`dots-${i}`} style={dotsStyle}>
              •••
            </div>
          ) : (
            <button
              key={p}
              style={p === page ? activeBtn : btnBase}
              onClick={() => onChange(p as number, pageSize)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              onMouseEnter={(e) => {
                if (p !== page)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    'var(--dec-color-surface-subtle)';
              }}
              onMouseLeave={(e) => {
                if (p !== page)
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              {p}
            </button>
          )
        )}

        <NavButton
          icon="chevron_right"
          disabled={isLast}
          onClick={() => onChange(page + 1, pageSize)}
          ariaLabel="Next page"
        />
        <NavButton
          icon="last_page"
          disabled={isLast}
          onClick={() => onChange(totalPages, pageSize)}
          ariaLabel="Last page"
        />
      </div>
    </div>
  );
}
