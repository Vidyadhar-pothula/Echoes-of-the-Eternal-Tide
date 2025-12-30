import React from 'react';
import { motion } from 'framer-motion';

const TextRenderer = ({ text, animationType }) => {
  // Split text into words/letters for detailed animation
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: animationType === 'typewriter' ? 0.04 : 0.12, delayChildren: 0.3 }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  if (animationType === 'slide') {
    child.hidden.y = 50;
  }

  return (
    <motion.h2
      style={{
        fontFamily: "'Georgia', serif",
        fontSize: '2.5rem',
        lineHeight: '1.4',
        fontWeight: '300',
        color: '#f0f0f0',
        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        letterSpacing: '0.02em',
      }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
          key={index}
        >
          {word === "secrets" || word === "war" || word === "broken" ? (
            <span style={{ color: '#ffcccb', textShadow: '0 0 10px rgba(255,100,100,0.5)' }}>{word}</span>
          ) : word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default TextRenderer;
