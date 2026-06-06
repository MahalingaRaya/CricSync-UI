import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import { Navigation } from './Navigation';
import { Home } from './Home';
import { CreateMatch } from './CreateMatch';
import { MatchCenter } from './MatchCenter';

// Temporary placeholders for Phase 2
const Placeholder = ({ title }) => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl font-bold text-zinc-500">
    {title} Module Coming Soon...
  </div>
);

export default function App() {
  return (
    <AppProvider> 
      <BrowserRouter>
        <Navigation />
        <Routes>
          {/* Phase 1: Live and Operational */}
          <Route path="/" element={<Home />} />
          <Route path="/create-match" element={<CreateMatch />} />
          <Route path="/match-center" element={<MatchCenter />} />
          
          {/* Phase 2: Upcoming Modules */}
          <Route path="/teams" element={<Placeholder title="Team Management" />} />
          <Route path="/players" element={<Placeholder title="Player Registration" />} />
          <Route path="/tournaments" element={<Placeholder title="Tournaments" />} />
          <Route path="/careers" element={<Placeholder title="Careers Portal" />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
