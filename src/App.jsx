import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Dashboard } from './Dashboard';
import { Ecosystem } from './Ecosystem';
import { Profile } from './Profile';
import { LiveEngine } from './LiveEngine';

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tournaments" element={<Ecosystem />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/live" element={<LiveEngine />} />
      </Routes>
    </BrowserRouter>
  );
}
