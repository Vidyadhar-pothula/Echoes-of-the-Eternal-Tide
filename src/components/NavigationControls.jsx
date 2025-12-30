import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from '../store';
import { storyData } from '../storyData';

const NavigationControls = () => {
  const { nextPage, prevPage, currentPageIndex } = useStore();
  const isFirst = currentPageIndex === 0;
  const isLast = currentPageIndex === storyData.length - 1;
  const [isVisible, setIsVisible] = useState(true);

  // Idle Timer
  useEffect(() => {
    let timeout;
    const resetTimer = () => {
      setIsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsVisible(false), 3000); // 3 seconds idle
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('keydown', resetTimer);

    resetTimer(); // Init

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage]);

  return (
    <div style={{
      position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', gap: '1rem', zIndex: 50,
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.5s ease',
      pointerEvents: isVisible ? 'auto' : 'none'
    }}>
      <button
        onClick={prevPage}
        disabled={isFirst}
        className="btn-nav"
        aria-label="Previous Page"
      >
        <ArrowLeft size={24} />
      </button>
      <button
        onClick={nextPage}
        disabled={isLast}
        className="btn-nav"
        aria-label="Next Page"
      >
        <ArrowRight size={24} />
      </button>
    </div>
  );
};

export default NavigationControls;
