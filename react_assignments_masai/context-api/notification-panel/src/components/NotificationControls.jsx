import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const NotificationControls = () => {
  const { markAllAsRead, stopNotifications, intervalRunning } = useNotification();

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={markAllAsRead} style={{ marginRight: '1rem' }}>
        Mark All as Read
      </button>
      <button onClick={stopNotifications} disabled={!intervalRunning}>
        Stop Notifications
      </button>
    </div>
  );
};

export default NotificationControls;
