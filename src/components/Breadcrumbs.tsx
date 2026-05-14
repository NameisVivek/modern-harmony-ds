import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const styles: Record<string, React.CSSProperties> = {
  list: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap' as const,
    listStyle: 'none',
    gap: 0,
    minWidth: 0,
    margin: 0,
    padding: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '1.5rem',
    flexShrink: 1,
    position: 'relative' as const,
  },
  separator: {
    fontFamily: 'Material Icons',
    fontSize: '14px',
    color: 'var(--core-cool-200)',
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '0 4px',
    flexShrink: 0,
    userSelect: 'none' as const,
  },
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    borderRadius: '5px',
    padding: '2px 4px',
    transition: 'background var(--motion-fast)',
    maxWidth: '200px',
  },
  link: {
    fontFamily: 'var(--font-ui)',
    fontSize: '13px',
    fontWeight: 'var(--weight-regular)' as unknown as number,
    color: 'var(--dec-color-text-label)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: '1.5rem',
    cursor: 'pointer',
  },
  activeLink: {
    fontFamily: 'var(--font-ui)',
    fontSize: '13px',
    fontWeight: 'var(--weight-medium)' as unknown as number,
    color: 'var(--dec-color-text-body)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: '1.5rem',
    cursor: 'default',
  },
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ul style={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} style={styles.item}>
              {index > 0 && (
                <span style={styles.separator} aria-hidden="true">
                  chevron_right
                </span>
              )}
              <div
                style={{
                  ...styles.labelWrapper,
                  cursor: isLast ? 'default' : 'pointer',
                }}
                onMouseEnter={
                  !isLast
                    ? (e) => {
                        (e.currentTarget as HTMLDivElement).style.background =
                          'rgba(40,40,40,0.07)';
                        const link = e.currentTarget.querySelector('a');
                        if (link) link.style.color = 'var(--dec-color-text-body)';
                      }
                    : undefined
                }
                onMouseLeave={
                  !isLast
                    ? (e) => {
                        (e.currentTarget as HTMLDivElement).style.background = '';
                        const link = e.currentTarget.querySelector('a');
                        if (link) link.style.color = 'var(--dec-color-text-label)';
                      }
                    : undefined
                }
              >
                {isLast ? (
                  <span style={styles.activeLink} aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href ?? '#'}
                    style={styles.link}
                    onFocus={(e) => {
                      (e.currentTarget.parentElement as HTMLDivElement).style.boxShadow =
                        'var(--focus-ring)';
                      (e.currentTarget.parentElement as HTMLDivElement).style.borderRadius =
                        '5px';
                    }}
                    onBlur={(e) => {
                      (e.currentTarget.parentElement as HTMLDivElement).style.boxShadow = '';
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
