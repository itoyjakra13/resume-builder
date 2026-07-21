import React from 'react';
import { ResumeProvider } from './context/ResumeContext';
import { ResumeBuilderApp } from './components/ResumeBuilderApp';

function App() {
  return (
    <ResumeProvider>
      <ResumeBuilderApp />
    </ResumeProvider>
  );
}

export default App;
