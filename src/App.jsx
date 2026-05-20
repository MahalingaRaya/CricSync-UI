import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Trophy, User, Shield, Mic, Target, Zap, Users, CheckCircle, Activity } from 'lucide-react';

const useLiveScore = () => {
  const [runs, setRuns] = useState(186);
  const [balls, setBalls] = useState(111);
  useEffect(() => {
    const interval = setInterval(() => {
      setRuns(prev => prev + Math.floor(Math.random() * 5));
      setBalls(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const overs = Math.floor(balls / 6);
  const currentBalls = balls % 6;
  const crr = (runs / (balls / 6)).toFixed(2);
  return { runs, overs, currentBalls, crr };
};

const Topbar = () => (
  <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <Zap className="w-6 h-6 text-emerald-500 fill-emerald-500" />
      <h1 className="text-2xl font-black tracking-tight text-white">CRICSYNC<span className="text-emerald-500">.</span></h1>
    </div>
    <div className="hidden md:flex gap-6 text-sm font-semibold text-slate-400">
      <Link to="/" className="hover:text-emerald-500 transition-colors">Matches</Link>
      <Link to="/organizer" className="hover:text-emerald-500 transition-colors">Tournaments</Link>
      <Link to="/player" className="hover:text-emerald-500 transition-colors">Ecosystem</Link>
    </div>
    <div className="md:hidden">
      <button className="bg-emerald-500/20 text-emerald-500 border border-emerald-500/50 px-4 py-1.5 rounded-full text-xs font-bold animate-pulse">LIVE</button>
    </div>
  </nav>
);

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "text-emerald-500" : "text-slate-500";
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/')}`}><Home className="w-5 h-5" /><span className="text-[10px] font-bold">Home</span></Link>
        <Link to="/organizer" className={`flex flex-col items-center gap-1 ${isActive('/organizer')}`}><Trophy className="w-5 h-5" /><span className="text-[10px] font-bold">Host</span></Link>
        <Link to="/scorers" className={`flex flex-col items-center gap-1 ${isActive('/scorers')}`}><Target className="w-5 h-5" /><span className="text-[10px] font-bold">Score</span></Link>
        <Link to="/commentator" className={`flex flex-col items-center gap-1 ${isActive('/commentator')}`}><Mic className="w-5 h-5" /><span className="text-[10px] font-bold">Feed</span></Link>
        <Link to="/player" className={`flex flex-col items-center gap-1 ${isActive('/player')}`}><User className="w-5 h-5" /><span className="text-[10px] font-bold">Profile</span></Link>
      </div>
    </div>
  );
};

const Layout = ({ children }) => (
  <div className="min-h-screen bg-[#050814] text-slate-50 font-sans selection:bg-emerald-500/30 pb-20 md:pb-0">
    <Topbar />
    <AnimatePresence mode="wait">
      <motion.main initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-7xl mx-auto p-4 md:p-8">
        {children}
      </motion.main>
    </AnimatePresence>
    <BottomNav />
  </div>
);

const Home = () => {
  const { runs, overs, currentBalls, crr } = useLiveScore();
  return (
    <Layout>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-[#050814] border border-slate-800 p-8 md:p-12 mb-8 shadow-2xl shadow-emerald-900/10">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 md:w-2/3">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-5xl md:text-7xl font-black leading-tight mb-4 tracking-tighter">
            RUN LOCAL CRICKET <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">LIKE THE IPL.</span>
          </motion.h1>
          <p className="text-slate-400 text-lg mb-8 max-w-xl font-medium">Premium scoring, AI analytics, and the ultimate ecosystem hiring board for players, umpires, and commentators.</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-8 py-3.5 rounded-full font-black tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">START TOURNAMENT</button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-5 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                <span className="text-xs font-black text-red-500 tracking-widest">LIVE • FINAL</span>
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chinnaswamy Stadium</span>
            </div>
          </div>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-black mb-1">RCB</h2>
              <div className="text-6xl font-black tracking-tighter text-emerald-400">{runs}<span className="text-3xl text-slate-500">/4</span></div>
              <div className="text-slate-400 font-bold mt-2 text-sm">{overs}.{currentBalls} Overs • CRR: {crr}</div>
            </div>
            <div className="text-right opacity-40 pb-2">
              <h2 className="text-3xl font-black mb-1">CSK</h2>
              <div className="text-sm font-bold uppercase tracking-wider">Yet to bat</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/player" className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:bg-slate-800/80 transition-colors group"><User className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" /><div><h3 className="font-black text-lg">Athletes</h3></div></Link>
          <Link to="/organizer" className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:bg-slate-800/80 transition-colors group"><Trophy className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" /><div><h3 className="font-black text-lg">Organizers</h3></div></Link>
          <Link to="/scorers" className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:bg-slate-800/80 transition-colors group"><Target className="w-8 h-8 text-purple-500 mb-4 group-hover:scale-110 transition-transform" /><div><h3 className="font-black text-lg">Scorers</h3></div></Link>
          <Link to="/commentator" className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:bg-slate-800/80 transition-colors group"><Mic className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 transition-transform" /><div><h3 className="font-black text-lg">Broadcast</h3></div></Link>
        </div>
      </div>
    </Layout>
  );
};

const Player = () => (
  <Layout>
    <div className="flex items-center gap-3 mb-8"><User className="w-8 h-8 text-emerald-500" /><h1 className="text-3xl font-black">Player Identity</h1></div>
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-6 flex flex-col md:flex-row items-center gap-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-3xl font-black text-slate-950">MR</div>
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2"><h2 className="text-3xl font-black">Mahalinga Raya</h2><CheckCircle className="w-5 h-5 text-emerald-500" /></div>
        <p className="text-emerald-400 font-bold tracking-wide text-sm mt-1 mb-3 uppercase">All-Rounder • Bangalore, IN</p>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl"><p className="text-slate-500 font-bold text-xs uppercase mb-2">Matches</p><h3 className="text-4xl font-black">42</h3></div>
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl"><p className="text-slate-500 font-bold text-xs uppercase mb-2">Runs</p><h3 className="text-4xl font-black text-emerald-400">1,204</h3></div>
    </div>
  </Layout>
);

const Scorers = () => (
  <Layout>
    <div className="flex items-center gap-3 mb-8"><Target className="w-8 h-8 text-purple-500" /><h1 className="text-3xl font-black">Live Engine</h1></div>
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-6">
        <div><p className="text-slate-500 font-bold text-xs tracking-wider uppercase mb-1">Current Score</p><h2 className="text-5xl font-black text-white">186<span className="text-2xl text-slate-500">/4</span></h2></div>
        <div className="text-right"><p className="text-slate-500 font-bold text-xs tracking-wider uppercase mb-1">Overs</p><h2 className="text-3xl font-black text-emerald-400">18.3</h2></div>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
        {['0', '1', '2', '3', '4', '6'].map(run => <button key={run} className="bg-slate-800 h-16 rounded-2xl font-black text-2xl border border-slate-700 hover:bg-slate-700">{run}</button>)}
        <button className="bg-red-500/20 text-red-500 border border-red-500/50 h-16 rounded-2xl font-black text-2xl col-span-2 md:col-span-1">W</button>
      </div>
    </div>
  </Layout>
);

const ComingSoon = ({ title }) => <Layout><h1 className="text-3xl font-black">{title} - Coming Soon</h1></Layout>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player />} />
        <Route path="/scorers" element={<Scorers />} />
        <Route path="/commentator" element={<ComingSoon title="Broadcast Feed" />} />
        <Route path="/organizer" element={<ComingSoon title="League Manager" />} />
      </Routes>
    </BrowserRouter>
  );
}
