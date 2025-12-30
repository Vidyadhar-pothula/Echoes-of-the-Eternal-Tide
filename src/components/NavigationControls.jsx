import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from '../store';
import { storyData } from '../storyData';

const NavigationControls = () => {
  const { nextPage, prevPage, currentPageIndex } = useStore();
  const isFirst = currentPageIndex === 0;
  const isLast = currentPageIndex === storyData.length - 1;

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
      position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', gap: '1rem', zIndex: 50
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
