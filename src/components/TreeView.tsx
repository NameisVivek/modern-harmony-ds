import React, { useState, ReactNode } from 'react';

export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  iconColor?: string;
  children?: TreeNode[];
  badge?: string | number;
  badgeVariant?: 'default' | 'success';
  meta?: string;
}

export interface TreeViewProps {
  nodes: TreeNode[];
  selected?: string;
  onSelect?: (id: string) => void;
  defaultExpanded?: string[];
}

const styles = {
  tree: {
    border: '1px solid var(--core-gray-75)',
    borderRadius: '10px',
    overflow: 'hidden',
    background: 'var(--dec-color-surface)',
    userSelect: 'none' as const,
  } as React.CSSProperties,

  row: (selected: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    height: '32px',
    cursor: 'pointer',
    position: 'relative',
    background: selected ? 'rgba(131,66,187,0.08)' : 'transparent',
    borderLeft: selected ? '3px solid var(--core-violet-600)' : '3px solid transparent',
    transition: 'background 0.1s',
    boxSizing: 'border-box',
  }),

  indentLine: {
    width: '16px',
    height: '100%',
    position: 'relative' as const,
    flexShrink: 0,
  } as React.CSSProperties,

  toggle: {
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: '4px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    color: 'transparent',
  } as React.CSSProperties,

  toggleIcon: (open: boolean): React.CSSProperties => ({
    fontSize: '16px',
    color: 'var(--core-gray-400)',
    fontFamily: 'Material Icons',
    transition: 'transform 0.15s',
    transform: open ? 'rotate(90deg)' : 'none',
    lineHeight: 1,
  }),

  leaf: {
    width: '20px',
    flexShrink: 0,
  } as React.CSSProperties,

  iconWrap: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  } as React.CSSProperties,

  iconEl: (color?: string): React.CSSProperties => ({
    fontSize: '16px',
    color: color ?? 'var(--dec-color-neutral-foreground)',
    fontFamily: 'Material Icons',
    lineHeight: 1,
  }),

  label: (selected: boolean): React.CSSProperties => ({
    flex: 1,
    fontSize: '13px',
    color: selected ? 'var(--dec-color-secondary-foreground)' : 'var(--dec-color-text-body)',
    fontWeight: selected ? 500 : 400,
    padding: '0 8px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  meta: {
    fontSize: '10px',
    color: 'var(--core-gray-400)',
    paddingRight: '10px',
    flexShrink: 0,
  } as React.CSSProperties,

  badge: (variant: 'default' | 'success'): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '16px',
    height: '16px',
    padding: '0 4px',
    borderRadius: '9999px',
    fontSize: '9px',
    fontWeight: 700,
    background: variant === 'success' ? 'var(--dec-color-success-strong)' : 'var(--dec-color-error-strong)',
    color: variant === 'success' ? 'var(--dec-color-success-foreground)' : 'var(--core-white)',
    marginRight: '8px',
    flexShrink: 0,
  }),
};

interface IndentLinesProps {
  depth: number;
  isLast: boolean[];
}

function IndentLines({ depth, isLast }: IndentLinesProps) {
  if (depth === 0) return null;
  return (
    <>
      {Array.from({ length: depth }).map((_, i) => (
        <div key={i} style={styles.indentLine}>
          <style>{`
            .tree-indent-inner {
              position: absolute; left: 8px; top: 0; bottom: 0; width: 1px;
              background: var(--core-cool-75);
            }
            .tree-indent-inner.last { bottom: 50%; }
          `}</style>
          <div className={`tree-indent-inner${isLast[i] ? ' last' : ''}`} />
        </div>
      ))}
    </>
  );
}

interface TreeNodeItemProps {
  node: TreeNode;
  depth: number;
  isLastAtDepth: boolean[];
  selectedId?: string;
  expandedIds: Set<string>;
  onSelect?: (id: string) => void;
  onToggle: (id: string) => void;
}

function TreeNodeItem({
  node,
  depth,
  isLastAtDepth,
  selectedId,
  expandedIds,
  onSelect,
  onToggle,
}: TreeNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  const handleRowClick = () => {
    if (hasChildren) {
      onToggle(node.id);
    } else {
      onSelect?.(node.id);
    }
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(node.id);
  };

  return (
    <div>
      <div
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={hasChildren ? isExpanded : undefined}
        tabIndex={0}
        style={styles.row(isSelected)}
        onClick={handleRowClick}
        onMouseEnter={(e) => {
          if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'rgba(40,40,40,0.04)';
        }}
        onMouseLeave={(e) => {
          if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent';
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleRowClick();
          }
        }}
        onFocus={(e) => { e.currentTarget.style.outline = '2px solid var(--core-violet-600)'; e.currentTarget.style.outlineOffset = '-2px'; }}
        onBlur={(e) => { e.currentTarget.style.outline = 'none'; }}
      >
        <IndentLines depth={depth} isLast={isLastAtDepth} />

        {hasChildren ? (
          <button
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            style={styles.toggle}
            onClick={handleToggleClick}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--core-cool-50)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <span className="material-icons" style={styles.toggleIcon(isExpanded)}>
              chevron_right
            </span>
          </button>
        ) : (
          <div style={styles.leaf} />
        )}

        {node.icon && (
          <div style={styles.iconWrap}>
            <span className="material-icons" style={styles.iconEl(node.iconColor)}>
              {node.icon}
            </span>
          </div>
        )}

        <span style={styles.label(isSelected)}>{node.label}</span>

        {node.meta && <span style={styles.meta}>{node.meta}</span>}

        {node.badge !== undefined && (
          <span style={styles.badge(node.badgeVariant ?? 'default')}>
            {node.badge}
          </span>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div role="group">
          {node.children!.map((child, i) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              isLastAtDepth={[...isLastAtDepth, i === node.children!.length - 1]}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeView({ nodes, selected, onSelect, defaultExpanded = [] }: TreeViewProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(defaultExpanded));

  const handleToggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div role="tree" style={styles.tree}>
      {nodes.map((node, i) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          depth={0}
          isLastAtDepth={[i === nodes.length - 1]}
          selectedId={selected}
          expandedIds={expandedIds}
          onSelect={onSelect}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}

export default TreeView;
