import React from 'react';
import { motion } from 'framer-motion';

const Stars = () => (
  <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          width: Math.random() * 3 + 'px',
          height: Math.random() * 3 + 'px',
          background: 'white',
          borderRadius: '50%',
        }}
        animate={{ opacity: [0.2, 1, 0.2], y: [0, -10, 0] }}
        transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
      />
    ))}
  </div>
);

const Waves = () => (
   <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '200px', opacity: 0.5 }}>
     <motion.div 
       style={{ 
         width: '200%', height: '100%', background: 'rgba(255,255,255,0.1)',
         borderRadius: '40%', position: 'absolute', top: '50%', left: '-50%'
       }}
       animate={{ rotate: 360 }}
       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
     />
   </div>
);

const BackgroundManager = ({ type }) => {
  const getBackgroundStyle = () => {
    switch(type) {
      case 'ocean': return 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)';
      case 'shore': return 'linear-gradient(to bottom, #141E30, #243B55)';
      case 'war': return 'linear-gradient(to bottom, #2b0404, #4a1010)';
      case 'calm': return 'linear-gradient(to bottom, #2C3E50, #4CA1AF)';
      case 'night': return 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)';
      default: return 'black';
    }
  };

  return (
    <motion.div
      key={type}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: getBackgroundStyle(),
        zIndex: 0
      }}
    >
      {(type === 'night' || type === 'war') && <Stars />}
      {(type === 'ocean' || type === 'calm') && <Waves />}
      {type === 'shore' && <Waves />}
    </motion.div>
  );
};

export default BackgroundManager;
