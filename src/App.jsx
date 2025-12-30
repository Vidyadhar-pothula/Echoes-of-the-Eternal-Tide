import React from 'react';
import StorybookContainer from './components/StorybookContainer';
import PageDisplay from './components/PageDisplay';
import NavigationControls from './components/NavigationControls';
import AudioManager from './components/AudioManager';
import { useStore } from './store';

function App() {
  const { hasStarted, setHasStarted } = useStore();

  return (
    <StorybookContainer>
      <AudioManager />

      {!hasStarted && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100vw', height: '100vh',
          background: '#000', // Solid black for initial state
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#fff',
          transition: 'opacity 2s ease-out', // Slow CSS transition
          opacity: 1,
          pointerEvents: 'auto'
        }}>
          <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: '2rem' }}>Echoes of the Eternal Tide</h1>
          <button
            className="btn-nav"
            style={{ padding: '1rem 3rem', borderRadius: '50px', fontSize: '1.2rem', background: 'var(--color-accent)', color: '#000', fontWeight: 'bold' }}
            onClick={() => setHasStarted(true)}
          >
            Begin Story
          </button>
        </div>
      )}

      {/* Screen Curtain for dark-to-light transition */}
      <div
        style={{
          position: 'absolute', inset: 0, background: '#000', zIndex: 90,
          pointerEvents: 'none',
          opacity: hasStarted ? 0 : 1,
          transition: 'opacity 3s ease-in-out',
          transitionDelay: '0.5s' // Delay slightly after click
        }}
      />

      {hasStarted && (
        <>
          <PageDisplay />
          <NavigationControls />
        </>
      )}
    </StorybookContainer>
  );
}

export default App;
