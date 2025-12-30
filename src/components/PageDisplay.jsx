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
      scale: 0.9,
      zIndex: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
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
            overflow: 'hidden',
            touchAction: 'none'
          }}
        >
          <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
            <BackgroundManager type={page.backgroundType} />
          </div>

          <div
            className="glass-panel"
            onClick={nextPage}
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '900px',
              width: '90%',
              padding: 'clamp(2rem, 5vw, 4rem)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '200px',
              cursor: 'pointer'
            }}
          >
            <TextRenderer
              text={page.text}
              animationType={page.animationType}
              emotional={page.emotional}
            />
            <div style={{ marginTop: '1rem', opacity: 0.5, fontSize: '0.8rem' }}>
              (Tap or Swipe to Continue)
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default PageDisplay;
