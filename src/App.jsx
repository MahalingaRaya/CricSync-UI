import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Dashboard } from './Dashboard';
import { Ecosystem } from './Ecosystem';

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tournaments" element={<Ecosystem />} />
      </Routes>
    </BrowserRouter>
  );
}
