import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext'; // <-- Imported Global Provider
import { Navigation } from './Navigation';
import { Dashboard } from './Dashboard';
import { Profile } from './Profile';
import { LiveEngine } from './LiveEngine';
import { LeagueOps } from './LeagueOps';

export default function App() {
  return (
    <AppProvider> {/* Wraps entire ecosystem */}
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/organizer" element={<LeagueOps />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/live" element={<LiveEngine />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
