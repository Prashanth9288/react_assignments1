import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [intervalRunning, setIntervalRunning] = useState(true);
  const intervalRef = useRef(null);
  let idCounter = useRef(0);

  const addNotification = (message) => {
    setNotifications(prev => [
      ...prev,
      { id: idCounter.current++, message, read: false },
    ]);
  };


  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  
  const stopNotifications = () => {
    clearInterval(intervalRef.current);
    setIntervalRunning(false);
  };

 
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      addNotification("You have a new message!");
    }, 5000);

    return () => clearInterval(intervalRef.current); 
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAllAsRead,
        stopNotifications,
        intervalRunning,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};


export const useNotification = () => useContext(NotificationContext);
