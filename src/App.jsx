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
          background: 'rgba(0,0,0,0.8)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: '#fff'
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
