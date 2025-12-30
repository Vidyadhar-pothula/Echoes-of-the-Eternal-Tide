```javascript
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Stars = ({ count = 50, speed = 1 }) => (
  <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          width: Math.random() * 2 + 1 + 'px',
          height: Math.random() * 2 + 1 + 'px',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '50%',
          boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
        }}
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: (Math.random() * 3 + 2) / speed,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

const Fireflies = ({ count = 20 }) => (
  <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          background: '#ffd700',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          boxShadow: '0 0 10px #ffd700'
        }}
        animate={{
          x: [Math.random() * 100, Math.random() * 100 - 50, Math.random() * 100],
          y: [Math.random() * 100, Math.random() * 100 - 50, Math.random() * 100],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    ))}
  </div>
);

// Improved Wave component with speed control
const Waves = ({ speed = 1 }) => (
  <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', opacity: 0.4, mixBlendMode: 'overlay', overflow: 'hidden' }}>
    <motion.div
      style={{
        width: '200%', height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)',
        position: 'absolute', top: '50%', left: '-50%'
      }}
      animate={{ rotate: 360, scale: [1, 1.1, 1] }}
      transition={{ duration: 25 / speed, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      style={{
        width: '200%', height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 60%)',
        position: 'absolute', top: '20%', left: '-20%'
      }}
      animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
      transition={{ duration: 30 / speed, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const BackgroundManager = ({ type }) => {
  // Parallax Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 100 };
  const rotateX = useSpring(useTransform(y, [0, window.innerHeight], [2, -2]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, window.innerWidth], [-2, 2]), springConfig);

  useEffect(() => {
    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [x, y]);

  // Reactive speeds
  const getSpeed = () => {
    switch (type) {
      case 'war': return 2.5; // Chaotic
      case 'calm': return 0.5; // Very slow
      default: return 1;
    }
  };

  const getBackgroundStyle = () => {
    switch (type) {
      case 'ocean': return 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)';
      case 'shore': return 'linear-gradient(to bottom, #141E30, #243B55)';
      case 'war': return 'linear-gradient(to bottom, #2b0404, #4a1010)';
      case 'calm': return 'linear-gradient(to bottom, #1e3c72, #2a5298)';
      case 'night': return 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)';
      default: return 'black';
    }
  };

  return (
    <motion.div
      key={type}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1.05 }} // Slight zoom intro
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `url(${ import.meta.env.BASE_URL }mermaid.png) center / cover no - repeat fixed`,
        zIndex: 0,
        overflow: 'hidden',
        perspective: 1000
      }}
    >
      {/* Parallax Container */}
      <motion.div
        style={{
           width: '100%', height: '100%', position: 'absolute',
           rotateX, rotateY // Mouse lag parallax
        }}
        animate={{ 
            scale: [1, 1.05, 1], // Gentle breathing camera 
            x: [0, -10, 0] // Slow drift
        }} 
        transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "easeInOut" 
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: getBackgroundStyle(), opacity: 0.85, mixBlendMode: 'multiply' }} />
        
        {(type === 'night' || type === 'war') && <Stars count={type === 'war' ? 30 : 100} speed={getSpeed()} />}
        {(type === 'ocean' || type === 'calm') && <Waves speed={getSpeed()} />}
        {type === 'shore' && <Waves speed={getSpeed()} />}
        {type === 'calm' && <Fireflies />}
      </motion.div>
    </motion.div>
  );
};

export default BackgroundManager;
```
