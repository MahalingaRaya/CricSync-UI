import React from 'react';
import { Home, Trophy, User, Activity, Bell, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "text-emerald-400" : "text-zinc-500";

  return (
    <>
      {/* Premium Topbar */}
      <nav className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-black text-black">
            <Zap size={18} />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">CricSync</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative text-zinc-400 hover:text-white transition">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-[#09090b]"></span>
          </button>
          <div className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-xs font-bold shadow-[0_0_10px_rgba(52,211,153,0.2)]">
            MR
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#09090b]/95 backdrop-blur-xl border-t border-zinc-800/50 pb-safe z-50">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/')}`}><Home size={20} /><span className="text-[10px] font-semibold">Home</span></Link>
          <Link to="/live" className={`flex flex-col items-center gap-1 ${isActive('/live')}`}><Activity size={20} /><span className="text-[10px] font-semibold">Live</span></Link>
          <Link to="/tournaments" className={`flex flex-col items-center gap-1 ${isActive('/tournaments')}`}><Trophy size={20} /><span className="text-[10px] font-semibold">Leagues</span></Link>
          <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile')}`}><User size={20} /><span className="text-[10px] font-semibold">Profile</span></Link>
        </div>
      </div>
    </>
  );
};
