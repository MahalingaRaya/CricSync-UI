import React from 'react';
import { Home, Briefcase, Activity, User, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "text-emerald-400" : "text-zinc-500";

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-black text-black">
            <Zap size={18} />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-white">CricSync</h1>
        </div>
        <span className="text-[10px] font-bold bg-zinc-800 text-zinc-400 px-2 py-1 rounded border border-zinc-700">PRO MODE</span>
      </nav>

      {/* Simplified Mobile Navigation Menu */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#09090b]/95 backdrop-blur-xl border-t border-zinc-800/50 pb-safe z-50">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/')}`}><Home size={20} /><span className="text-[10px] font-semibold">Feed</span></Link>
          <Link to="/organizer" className={`flex flex-col items-center gap-1 ${isActive('/organizer')}`}><Briefcase size={20} /><span className="text-[10px] font-semibold">Organize</span></Link>
          <Link to="/live" className={`flex flex-col items-center gap-1 ${isActive('/live')}`}><Activity size={20} /><span className="text-[10px] font-semibold">Live Engine</span></Link>
          <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile')}`}><User size={20} /><span className="text-[10px] font-semibold">Identity</span></Link>
        </div>
      </div>
    </>
  );
};
