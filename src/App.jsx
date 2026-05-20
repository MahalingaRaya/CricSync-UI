import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Trophy, User, Shield, Mic, Activity, Target, Zap, Users, CheckCircle } from 'lucide-react';

const useLiveScore = () => {
  const [runs, setRuns] = useState(186);
  const overs = Math.floor(111 / 6);
  return { runs, overs };
};

const Layout = ({ children }) => (
  <div className="min-h-screen bg-[#050814] text-white pb-20 md:pb-0">
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 p-4 flex justify-between items-center">
      <div className="flex items-center gap-2 font-black text-xl"><Zap className="text-emerald-500" />CRICSYNC</div>
      <div className="md:hidden bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold animate-pulse">LIVE</div>
    </nav>
    <main className="max-w-7xl mx-auto p-4">{children}</main>
  </div>
);

const Home = () => {
  const { runs, overs } = useLiveScore();
  return (
    <Layout>
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-[#050814] border border-slate-800 p-8 mb-6">
        <h1 className="text-4xl md:text-6xl font-black mb-4">RUN LOCAL CRICKET <br/><span className="text-emerald-400">LIKE THE IPL.</span></h1>
        <button className="bg-emerald-500 text-slate-950 px-8 py-3 rounded-full font-black">START TOURNAMENT</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/player" className="bg-slate-900 border border-slate-800 p-6 rounded-3xl"><User className="text-emerald-500 mb-2" />Athletes</Link>
        <Link to="/organizer" className="bg-slate-900 border border-slate-800 p-6 rounded-3xl"><Trophy className="text-cyan-500 mb-2" />Organizers</Link>
        <Link to="/scorers" className="bg-slate-900 border border-slate-800 p-6 rounded-3xl"><Target className="text-purple-500 mb-2" />Scorers</Link>
        <Link to="/commentator" className="bg-slate-900 border border-slate-800 p-6 rounded-3xl"><Mic className="text-amber-500 mb-2" />Broadcast</Link>
      </div>
    </Layout>
  );
};

const Player = () => (
  <Layout>
    <h1 className="text-3xl font-black mb-6">Player Profile</h1>
    <div className="bg-slate-900 p-6 rounded-3xl mb-4">
      <h2 className="text-2xl font-black">Mahalinga Raya <CheckCircle className="inline text-emerald-500" /></h2>
      <p className="text-emerald-400 font-bold">All-Rounder • Bangalore</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-slate-900 p-6 rounded-3xl"><p className="text-xs uppercase text-slate-500">Runs</p><h3 className="text-3xl font-black">1,204</h3></div>
      <div className="bg-slate-900 p-6 rounded-3xl"><p className="text-xs uppercase text-slate-500">Wickets</p><h3 className="text-3xl font-black text-cyan-400">38</h3></div>
    </div>
  </Layout>
);

const Scorer = () => (
  <Layout>
    <h1 className="text-3xl font-black mb-6">Live Scoring</h1>
    <div className="bg-slate-900 p-6 rounded-3xl">
      <h2 className="text-5xl font-black mb-6">186/4</h2>
      <div className="grid grid-cols-4 gap-2">
        {['0','1','2','3','4','6','W','NB'].map(btn => <button key={btn} className="bg-slate-800 h-16 rounded-xl font-bold">{btn}</button>)}
      </div>
    </div>
  </Layout>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player />} />
        <Route path="/scorers" element={<Scorer />} />
        <Route path="/organizer" element={<Layout><h1>League Manager</h1></Layout>} />
        <Route path="/commentator" element={<Layout><h1>Broadcast Feed</h1></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
