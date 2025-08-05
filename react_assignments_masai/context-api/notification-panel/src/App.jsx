import React from 'react';
import NotificationList from './components/NotificationList';
import NotificationControls from './components/NotificationControls';

const App = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Real-Time Notification Panel</h1>
      <NotificationList />
      <NotificationControls />
    </div>
  );
};

export default App;
