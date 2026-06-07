import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import { Navigation } from './Navigation'; 
import { Home } from './Home';
import { CreateMatch } from './CreateMatch';
import { MatchCenter } from './MatchCenter';
import { Scorecard } from './Scorecard';
import { LeagueOps } from './LeagueOps'; 
import { Profile } from './Profile'; 

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
          
          {/* Your New Ecosystem Routes */}
          <Route path="/organize" element={<LeagueOps />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/teams" element={<Placeholder title="Team Management" />} />
          <Route path="/players" element={<Placeholder title="Player Registration" />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
