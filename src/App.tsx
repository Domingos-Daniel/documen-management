import React from 'react';
import { Sidebar } from './components/ui/sidebar';
import { MainContent } from './components/ui/main-content';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;