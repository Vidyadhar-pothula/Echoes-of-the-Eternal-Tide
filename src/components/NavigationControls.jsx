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
        style={{ ...btnStyle, opacity: isFirst ? 0.3 : 1, cursor: isFirst ? 'default' : 'pointer' }}
        aria-label="Previous Page"
      >
        <ArrowLeft size={24} />
      </button>
      <button 
        onClick={nextPage} 
        disabled={isLast}
        style={{ ...btnStyle, opacity: isLast ? 0.3 : 1, cursor: isLast ? 'default' : 'pointer' }}
        aria-label="Next Page"
      >
        <ArrowRight size={24} />
      </button>
    </div>
  );
};

const btnStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  padding: '1rem',
  borderRadius: '50%',
  backdropFilter: 'blur(5px)',
  transition: 'all 0.3s ease',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  outline: 'none'
};

export default NavigationControls;
