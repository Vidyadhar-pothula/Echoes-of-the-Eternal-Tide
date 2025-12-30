import React from 'react';

const StorybookContainer = ({ children }) => {
  return (
    <div style={{
      width: '100vw', 
      height: '100vh', 
      position: 'relative', 
      overflow: 'hidden',
      background: '#000', 
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: '1500px'
    }}>
      {children}
    </div>
  );
};
export default StorybookContainer;
