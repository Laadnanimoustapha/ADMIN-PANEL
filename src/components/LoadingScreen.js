import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-logo">
        <i className="fas fa-rocket text-white text-3xl"></i>
      </div>
      <div className="loading-text">ViroTech Enterprise</div>
      <div className="loading-subtext">Initializing your dashboard...</div>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingScreen;