import React, { useRef, useState, useCallback, ReactNode } from 'react';

/* ─── Types ─────────────────────────────────────────────────────── */

export type FileStatus = 'uploading' | 'done' | 'error';

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  status: FileStatus;
  progress?: number;
  errorMessage?: string;
  icon?: string;
  iconBg?: string;
  iconColor?: string;
}

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onUpload?: (files: File[]) => void;
  files?: UploadFile[];
  onRemove?: (id: string) => void;
}

/* ─── Helpers ───────────────────────────────────────────────────── */

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function iconForFile(name: string): { icon: string; bg: string; color: string } {
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'csv') return { icon: 'description', bg: 'var(--dec-color-success-subtle)', color: 'var(--dec-color-success-foreground)' };
  if (ext === 'xlsx' || ext === 'xls') return { icon: 'table_chart', bg: 'var(--dec-color-brand-subtle)', color: 'var(--dec-color-brand-base)' };
  if (ext === 'pdf') return { icon: 'picture_as_pdf', bg: 'var(--dec-color-error-subtle)', color: 'var(--dec-color-error-foreground)' };
  return { icon: 'insert_drive_file', bg: 'var(--core-cool-50)', color: 'var(--dec-color-neutral-foreground)' };
}

/* ─── Styles ─────────────────────────────────────────────────────  */

const styles = {
  dropzone: (dragOver: boolean, error: boolean): React.CSSProperties => ({
    border: `2px dashed ${error ? 'var(--dec-color-error-strong)' : dragOver ? 'var(--dec-color-brand-base)' : 'var(--core-cool-200)'}`,
    borderRadius: '12px',
    background: error
      ? 'var(--dec-color-error-subtle)'
      : dragOver
      ? 'rgba(131,66,187,0.04)'
      : 'var(--dec-color-panel-alt)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '24px 20px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'all 0.15s',
  }),

  dropIcon: (error: boolean): React.CSSProperties => ({
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: error ? 'var(--dec-color-error-base)' : 'var(--dec-color-brand-subtle)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  dropIconEl: (error: boolean): React.CSSProperties => ({
    fontSize: '22px',
    color: error ? 'var(--dec-color-error-foreground)' : 'var(--dec-color-brand-base)',
    fontFamily: 'Material Icons',
    lineHeight: 1,
  }),

  dropTitle: (dragOver: boolean, error: boolean): React.CSSProperties => ({
    fontSize: '13px',
    fontWeight: 500,
    color: error
      ? 'var(--dec-color-error-foreground)'
      : dragOver
      ? 'var(--dec-color-brand-base)'
      : 'var(--dec-color-text-body)',
  }),

  dropSub: (dragOver: boolean, error: boolean): React.CSSProperties => ({
    fontSize: '11px',
    color: error
      ? 'var(--dec-color-error-foreground)'
      : dragOver
      ? 'var(--dec-color-secondary-foreground)'
      : 'var(--dec-color-text-label)',
  }),

  dropTypes: {
    fontSize: '10px',
    color: 'var(--th-text-hint)',
    marginTop: '2px',
  } as React.CSSProperties,

  fileList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  } as React.CSSProperties,

  fileItem: (status: FileStatus): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    border: `1px solid ${status === 'error' ? 'var(--dec-color-error-base)' : 'var(--core-gray-75)'}`,
    borderRadius: '8px',
    background: status === 'error' ? 'var(--dec-color-error-subtle)' : 'var(--dec-color-surface)',
  }),

  fileIcon: (bg: string): React.CSSProperties => ({
    width: '32px',
    height: '32px',
    borderRadius: '7px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    background: bg,
  }),

  fileIconEl: (color: string): React.CSSProperties => ({
    fontSize: '18px',
    color,
    fontFamily: 'Material Icons',
    lineHeight: 1,
  }),

  fileInfo: {
    flex: 1,
    minWidth: 0,
  } as React.CSSProperties,

  fileName: {
    fontSize: '13px',
    color: 'var(--dec-color-text-body)',
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,

  fileSize: (status: FileStatus): React.CSSProperties => ({
    fontSize: '10px',
    color: status === 'error' ? 'var(--dec-color-error-foreground)' : 'var(--th-text-hint)',
    marginTop: '1px',
  }),

  removeBtn: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    color: 'var(--th-text-hint)',
    flexShrink: 0,
    padding: 0,
    transition: 'background 0.1s, color 0.1s',
  } as React.CSSProperties,

  progressWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    border: '1px solid var(--core-gray-75)',
    borderRadius: '8px',
    background: 'var(--dec-color-surface)',
  } as React.CSSProperties,

  progressTrack: {
    flex: 1,
    height: '4px',
    background: 'var(--core-cool-50)',
    borderRadius: '2px',
    overflow: 'hidden' as const,
  } as React.CSSProperties,

  progressFill: (pct: number): React.CSSProperties => ({
    height: '100%',
    background: 'var(--dec-color-brand-base)',
    borderRadius: '2px',
    width: `${Math.min(pct, 100)}%`,
    transition: 'width 0.3s',
  }),

  progressPct: {
    fontSize: '11px',
    color: 'var(--dec-color-text-label)',
    flexShrink: 0,
    minWidth: '30px',
    textAlign: 'right' as const,
  } as React.CSSProperties,
};

/* ─── File item components ──────────────────────────────────────── */

interface FileItemProps {
  file: UploadFile;
  onRemove?: (id: string) => void;
}

function FileItemRow({ file, onRemove }: FileItemProps) {
  const { icon, bg, color } = {
    icon: file.icon ?? iconForFile(file.name).icon,
    bg: file.iconBg ?? iconForFile(file.name).bg,
    color: file.iconColor ?? iconForFile(file.name).color,
  };

  if (file.status === 'uploading') {
    return (
      <div style={styles.progressWrap}>
        <div style={styles.fileIcon(bg)}>
          <span className="material-icons" style={styles.fileIconEl(color)}>{icon}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...styles.fileName, marginBottom: '4px' }}>{file.name}</div>
          <div style={styles.progressTrack}>
            <div style={styles.progressFill(file.progress ?? 0)} />
          </div>
        </div>
        <div style={styles.progressPct}>{file.progress ?? 0}%</div>
        {onRemove && (
          <button
            aria-label={`Remove ${file.name}`}
            style={styles.removeBtn}
            onClick={() => onRemove(file.id)}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--core-cool-50)'; (e.currentTarget as HTMLElement).style.color = 'var(--dec-color-text-body)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--th-text-hint)'; }}
          >
            <span className="material-icons" style={{ fontSize: '16px', fontFamily: 'Material Icons', lineHeight: 1 }}>close</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={styles.fileItem(file.status)}>
      <div style={styles.fileIcon(bg)}>
        <span className="material-icons" style={styles.fileIconEl(file.status === 'error' ? 'var(--dec-color-error-foreground)' : color)}>{icon}</span>
      </div>
      <div style={styles.fileInfo}>
        <div style={styles.fileName}>{file.name}</div>
        <div style={styles.fileSize(file.status)}>
          {formatSize(file.size)}{' '}
          {file.status === 'error'
            ? `· ${file.errorMessage ?? 'Upload failed'}`
            : file.status === 'done'
            ? '· Uploaded'
            : ''}
        </div>
      </div>

      {file.status === 'done' && (
        <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: 500, color: 'var(--dec-color-success-foreground)' }}>
          <span className="material-icons" style={{ fontSize: '14px', fontFamily: 'Material Icons', lineHeight: 1 }}>check_circle</span>
          Done
        </span>
      )}
      {file.status === 'error' && (
        <span className="material-icons" style={{ fontSize: '18px', color: 'var(--dec-color-error-strong)', fontFamily: 'Material Icons', lineHeight: 1 }}>error_outline</span>
      )}

      {onRemove && (
        <button
          aria-label={`Remove ${file.name}`}
          style={styles.removeBtn}
          onClick={() => onRemove(file.id)}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--core-cool-50)'; (e.currentTarget as HTMLElement).style.color = 'var(--dec-color-text-body)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--th-text-hint)'; }}
        >
          <span className="material-icons" style={{ fontSize: '16px', fontFamily: 'Material Icons', lineHeight: 1 }}>close</span>
        </button>
      )}
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────── */

export function FileUpload({ accept, multiple = false, maxSize, onUpload, files = [], onRemove }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [dropError, setDropError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (incoming: File[]) => {
      setDropError(null);
      if (!multiple && incoming.length > 1) {
        setDropError('Only one file at a time');
        return;
      }
      if (maxSize) {
        const oversized = incoming.find((f) => f.size > maxSize);
        if (oversized) {
          setDropError(`File too large — max ${formatSize(maxSize)}`);
          return;
        }
      }
      onUpload?.(incoming);
    },
    [multiple, maxSize, onUpload]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files);
    handleFiles(dropped);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = Array.from(e.target.files ?? []);
    handleFiles(chosen);
    e.target.value = '';
  };

  const acceptTypes = accept
    ? accept.split(',').map((t) => t.trim().toUpperCase().replace('.', '')).join(', ')
    : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Drop zone — drag files here or click to browse"
        style={styles.dropzone(dragOver, !!dropError)}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
        onDragEnter={(e) => { e.preventDefault(); setDragOver(true); setDropError(null); }}
        onDragLeave={(e) => { e.preventDefault(); if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(false); }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div style={styles.dropIcon(!!dropError)}>
          <span className="material-icons" style={styles.dropIconEl(!!dropError)}>
            {dropError ? 'error_outline' : dragOver ? 'file_download' : 'cloud_upload'}
          </span>
        </div>
        <div style={styles.dropTitle(dragOver, !!dropError)}>
          {dropError ?? (dragOver ? 'Drop to upload' : 'Drag files here')}
        </div>
        {!dropError && (
          <div style={styles.dropSub(dragOver, false)}>
            {dragOver
              ? 'Release to add files'
              : <span>or <span style={{ color: 'var(--dec-color-secondary-foreground)', textDecoration: 'underline' }}>browse files</span> to upload</span>
            }
          </div>
        )}
        {!dropError && !dragOver && acceptTypes && (
          <div style={styles.dropTypes}>{acceptTypes}{maxSize ? ` · Max ${formatSize(maxSize)}` : ''}</div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={handleInputChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* File list */}
      {files.length > 0 && (
        <div style={styles.fileList}>
          {files.map((f) => (
            <FileItemRow key={f.id} file={f} onRemove={onRemove} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
