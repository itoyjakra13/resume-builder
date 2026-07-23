import React from 'react';
import { ResumeProvider } from './context/ResumeContext';
import { ResumeBuilderApp } from './components/ResumeBuilderApp';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ResumeProvider>
        <ResumeBuilderApp />
      </ResumeProvider>
    </ErrorBoundary>
  );
}

export default App;

