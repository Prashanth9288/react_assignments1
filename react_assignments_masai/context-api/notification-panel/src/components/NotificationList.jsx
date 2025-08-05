import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const NotificationList = () => {
  const { notifications } = useNotification();

  return (
    <div>
      <h2>Notifications</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notifications.map((n) => (
          <li
            key={n.id}
            style={{
              padding: '0.5rem',
              marginBottom: '0.5rem',
              backgroundColor: n.read ? '#eee' : '#cce5ff',
              fontWeight: n.read ? 'normal' : 'bold',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
