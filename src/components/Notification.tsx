import React from 'react';

export interface NotificationProps {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  timestamp?: string;
  read?: boolean;
  onClick?: () => void;
}

export interface NotificationData extends NotificationProps {
  id: string | number;
}

export interface NotificationListProps {
  notifications: NotificationData[];
  onMarkAllRead?: () => void;
  onViewAll?: () => void;
}

export function Notification({
  icon,
  title,
  message,
  timestamp,
  read = false,
  onClick,
}: NotificationProps) {
  const isUnread = !read;

  return (
    <div
      role="listitem"
      onClick={onClick}
      style={{
        display: 'flex',
        gap: '10px',
        padding: '10px 14px',
        borderBottom: '1px solid var(--dec-color-surface-subtle)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative' as const,
        background: isUnread ? 'rgba(131,66,187,0.03)' : 'transparent',
        transition: 'background var(--motion-fast)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = 'var(--core-cool-25)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = isUnread
          ? 'rgba(131,66,187,0.03)'
          : 'transparent';
      }}
    >
      {/* Unread indicator bar */}
      {isUnread && (
        <div
          aria-label="Unread"
          style={{
            position: 'absolute' as const,
            left: 0,
            top: 0,
            bottom: 0,
            width: '3px',
            background: 'var(--dec-color-brand-base)',
            borderRadius: '0 2px 2px 0',
          }}
        />
      )}

      {/* Icon */}
      {icon && (
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--dec-crn-base)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 'var(--weight-medium)' as unknown as number,
            color: 'var(--dec-color-text-body)',
            lineHeight: 'var(--leading-snug)',
            fontFamily: 'var(--font-ui)',
          }}
        >
          {title}
        </div>
        {message && (
          <div
            style={{
              fontSize: '11px',
              color: 'var(--dec-color-neutral-foreground)',
              marginTop: '2px',
              lineHeight: 'var(--leading-snug)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            {message}
          </div>
        )}
      </div>

      {/* Timestamp */}
      {timestamp && (
        <div
          style={{
            fontSize: '10px',
            color: 'var(--dec-color-text-hint)',
            whiteSpace: 'nowrap' as const,
            flexShrink: 0,
            fontFamily: 'var(--font-ui)',
            paddingTop: '1px',
          }}
        >
          {timestamp}
        </div>
      )}
    </div>
  );
}

export function NotificationList({
  notifications,
  onMarkAllRead,
  onViewAll,
}: NotificationListProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      style={{
        background: 'var(--dec-color-surface)',
        borderRadius: 'var(--dec-crn-panel)',
        border: '1px solid var(--core-gray-75)',
        boxShadow: '0 4px 16px rgba(55,23,78,0.12)',
        display: 'flex',
        flexDirection: 'column' as const,
        overflow: 'hidden',
        width: '320px',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '10px 14px',
          borderBottom: '1px solid var(--core-gray-75)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          className="material-icons"
          style={{ fontSize: '16px', color: 'var(--dec-color-brand-base)' }}
        >
          notifications
        </span>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 'var(--weight-medium)' as unknown as number,
            color: 'var(--dec-color-text-body)',
            flex: 1,
            fontFamily: 'var(--font-ui)',
          }}
        >
          Notifications
        </div>
        {unreadCount > 0 && (
          <span
            aria-label={`${unreadCount} unread`}
            style={{
              display: 'inline-flex',
              padding: '1px 6px',
              borderRadius: 'var(--dec-crn-full)',
              background: 'var(--dec-color-error-strong)',
              color: 'var(--dec-color-on-dark)',
              fontSize: '9.5px',
              fontWeight: 'var(--weight-bold)' as unknown as number,
              fontFamily: 'var(--font-ui)',
            }}
          >
            {unreadCount}
          </span>
        )}
        {onMarkAllRead && unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            style={{
              fontSize: '11px',
              color: 'var(--dec-color-secondary-foreground)',
              cursor: 'pointer',
              fontWeight: 'var(--weight-medium)' as unknown as number,
              fontFamily: 'var(--font-ui)',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div
        role="list"
        style={{
          overflowY: 'auto' as const,
          maxHeight: '320px',
        }}
      >
        {notifications.length === 0 ? (
          <div
            style={{
              padding: '24px 14px',
              textAlign: 'center' as const,
              color: 'var(--dec-color-text-hint)',
              fontSize: '12px',
              fontFamily: 'var(--font-ui)',
            }}
          >
            No notifications
          </div>
        ) : (
          notifications.map((notif) => (
            <Notification
              key={notif.id}
              icon={notif.icon}
              title={notif.title}
              message={notif.message}
              timestamp={notif.timestamp}
              read={notif.read}
              onClick={notif.onClick}
            />
          ))
        )}
      </div>

      {/* Footer */}
      {onViewAll && (
        <div
          style={{
            padding: '8px 14px',
            borderTop: '1px solid var(--core-gray-75)',
          }}
        >
          <button
            onClick={onViewAll}
            style={{
              width: '100%',
              height: '28px',
              background: 'transparent',
              border: '1px solid var(--dec-color-neutral-base)',
              borderRadius: 'var(--dec-crn-base-sm)',
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              color: 'var(--dec-color-text-label)',
              cursor: 'pointer',
              transition: 'background var(--motion-fast)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                'var(--dec-color-surface-subtle)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}
