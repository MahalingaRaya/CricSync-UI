import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home as HomeIcon, Trophy, User, Shield, Mic, Target, Zap, Activity } from 'lucide-react';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-[#050814] text-white pb-20 md:pb-0">
    <nav className="sticky top-0 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 p-4 flex justify-between items-center">
      <div className="flex items-center gap-2 font-black text-xl"><Zap className="text-emerald-500" />CRICSYNC</div>
    </nav>
    <main className="max-w-7xl mx-auto p-4">{children}</main>
  </div>
);

const HomePage = () => (
  <Layout>
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-[#050814] border border-slate-800 p-8 mb-6">
      <h1 className="text-4xl font-black mb-4">RUN LOCAL CRICKET <br/><span className="text-emerald-400">LIKE THE IPL.</span></h1>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Link to="/player" className="bg-slate-900 border border-slate-800 p-6 rounded-3xl"><User className="text-emerald-500 mb-2" />Athletes</Link>
      <Link to="/organizer" className="bg-slate-900 border border-slate-800 p-6 rounded-3xl"><Trophy className="text-cyan-500 mb-2" />Host</Link>
    </div>
  </Layout>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/player" element={<Layout><h1 className="text-2xl font-black">Player Profile</h1></Layout>} />
        <Route path="/scorers" element={<Layout><h1 className="text-2xl font-black">Live Engine</h1></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
