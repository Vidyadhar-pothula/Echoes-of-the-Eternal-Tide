import React from 'react';
import { motion } from 'framer-motion';

const TextRenderer = ({ text, animationType, emotional, onComplete }) => {
  // Use lines for better pacing if text has newlines
  const lines = text.split('\n');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.8, // Delay between lines
        delayChildren: 0.3
      }
    })
  };

  // For individual lines
  const lineVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    }
  };

  // For typewriter effect (splitting line into characters/words if needed, 
  // but for simplicity and readability, fading distinct lines is often more cinematic 
  // than character-by-character for long text. However, prompt asks for "typewriter or fade-in".
  // Let's do a hybrid: Lines appear one by one. If it's typewriter, the line itself wipes or fades in faster.)

  return (
    <motion.div
      className="text-display"
      style={{
        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
        color: 'var(--color-text-primary)',
        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        margin: 0,
        lineHeight: 1.6
      }}
      variants={container}
      initial="hidden"
      animate="visible"
      onAnimationComplete={() => onComplete && onComplete()}
    >
      {lines.map((line, index) => (
        <motion.p
          key={index}
          variants={lineVariant}
          style={{
            marginBottom: '1rem',
            textShadow: emotional ? '0 0 20px rgba(255, 215, 0, 0.4)' : 'none',
            color: emotional ? 'rgba(255, 255, 240, 1)' : 'var(--color-text-primary)'
          }}
        >
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
};

export default TextRenderer;
