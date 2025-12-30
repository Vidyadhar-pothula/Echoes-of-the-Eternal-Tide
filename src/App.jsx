import React from 'react';
import StorybookContainer from './components/StorybookContainer';
import PageDisplay from './components/PageDisplay';
import NavigationControls from './components/NavigationControls';

function App() {
  return (
    <StorybookContainer>
      <PageDisplay />
      <NavigationControls />
    </StorybookContainer>
  );
}

export default App;
