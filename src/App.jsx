import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ToolPage from './pages/ToolPage';

export default function App() {
  const [view, setView] = useState('landing');

  if (view === 'tool') {
    return <ToolPage />;
  }

  return <LandingPage onStart={() => setView('tool')} />;
}
