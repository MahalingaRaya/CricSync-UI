import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
// Make sure to import your Navigation component wherever it lives
import { Navigation } from './Navigation'; 
import { Home } from './Home';
import { CreateMatch } from './CreateMatch';
import { MatchCenter } from './MatchCenter';
import { Scorecard } from './Scorecard';

// 🔥 Import the new LinkedIn-style board
import { LeagueOps } from './LeagueOps'; 

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
          <Route path="/" element={<Home />} />
          <Route path="/create-match" element={<CreateMatch />} />
          <Route path="/match-center" element={<MatchCenter />} />
          <Route path="/scorecard/:id" element={<Scorecard />} /> 
          
          {/* 🔥 Connect the Organize Route to the Job Board */}
          <Route path="/organize" element={<LeagueOps />} />
          
          <Route path="/teams" element={<Placeholder title="Team Management" />} />
          <Route path="/players" element={<Placeholder title="Player Registration" />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
