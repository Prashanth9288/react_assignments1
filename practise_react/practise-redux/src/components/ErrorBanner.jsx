// src/components/ErrorBanner.jsx
import React from 'react';

// Shows an error message
export default function ErrorBanner({ message }) {
  return (
    <div style={{ padding: 12, background: '#ffe6e6', color: '#900', borderRadius: 6 }}>
      <strong>Error:</strong> {message}
    </div>
  );
}
