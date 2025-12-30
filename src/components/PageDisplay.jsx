import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { storyData } from '../storyData';
import TextRenderer from './TextRenderer';
import BackgroundManager from './BackgroundManager';

const PageDisplay = () => {
  const { currentPageIndex, direction, nextPage, prevPage } = useStore();
  const page = storyData[currentPageIndex];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.9
    }),
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentPageIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 200, damping: 25 },
            opacity: { duration: 0.4 },
            rotateY: { duration: 0.6 },
            scale: { duration: 0.5 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset }) => {
            if (offset.x < -50) nextPage();
            else if (offset.x > 50) prevPage();
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'black',
            overflow: 'hidden',
            boxShadow: '0 0 50px rgba(0,0,0,0.5) inset',
            touchAction: 'none'
          }}
        >
          <BackgroundManager type={page.backgroundType} />
          
          <div style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '900px',
            width: '90%',
            padding: '3rem',
            textAlign: 'center',
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '12px',
            backdropFilter: 'blur(3px)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <TextRenderer text={page.text} animationType={page.animationType} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default PageDisplay;
