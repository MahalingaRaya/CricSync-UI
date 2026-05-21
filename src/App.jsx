import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Dashboard } from './Dashboard';
import { Ecosystem } from './Ecosystem';
import { Profile } from './Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tournaments" element={<Ecosystem />} />
        <Route path="/profile" element={<Profile />} />
        {/* Placeholder for the Live Engine route */}
        <Route path="/live" element={<div className="p-8 text-center text-zinc-500 font-bold">Live Engine Coming Soon...</div>} />
      </Routes>
    </BrowserRouter>
  );
}
