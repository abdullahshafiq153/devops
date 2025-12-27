'use client'; // 👈 This is mandatory for client-side logic

import { useState, useEffect } from 'react';

export default function UpdateNotification() {
  const [showBanner, setShowBanner] = useState(false);
  
  // ⚠️ MANUALLY UPDATE THIS when you release v1.1
  const currentVersion = "1.0"; 

  useEffect(() => {
    // Check for updates every 5 seconds
    const interval = setInterval(() => {
      fetch(`/version.json?t=${Date.now()}`) // Timestamp prevents caching
        .then((res) => res.json())
        .then((data) => {
          if (data.version !== currentVersion) {
            console.log("New version detected:", data.version);
            setShowBanner(true);
          }
        })
        .catch((err) => console.error("Version check failed", err));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#333',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: 9999,
      fontFamily: 'sans-serif'
    }}>
      <h4 style={{ margin: '0 0 10px 0' }}>🚀 Update Available!</h4>
      <p style={{ margin: '0 0 15px 0', fontSize: '0.9em', color: '#ccc' }}>
        A new version has been deployed.
      </p>
      <button 
        onClick={() => window.location.reload()} 
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Reload Page
      </button>
    </div>
  );
}