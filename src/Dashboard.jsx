import React from 'react';
import { Activity, Shield, Target, Users } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 mb-20 md:mb-0">
      
      {/* Recruiter-Level Hero Scorecard */}
      <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/80 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="p-5 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-950/30">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Live • Final</span>
          </div>
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Chinnaswamy</span>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">RCB</h2>
              <div className="text-6xl md:text-7xl font-black text-emerald-400 tracking-tighter mt-1">
                186<span className="text-3xl text-zinc-600">/4</span>
              </div>
              <p className="text-zinc-400 font-medium text-sm mt-2">18.3 Overs • CRR: 10.1</p>
            </div>
            <div className="text-right opacity-40">
              <h2 className="text-2xl font-black text-white tracking-tight">CSK</h2>
              <p className="text-xs font-bold uppercase tracking-wider mt-2 text-zinc-500">Yet to bat</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/50">
              <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1 tracking-wider">Batter</p>
              <p className="font-black text-white">V. Kohli* <span className="text-emerald-400">82 (45)</span></p>
            </div>
            <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/50">
              <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1 tracking-wider">Bowler</p>
              <p className="font-black text-white">J. Bumrah <span className="text-emerald-400">1/24</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Ecosystem Grid */}
      <div>
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1 mb-4">Core Ecosystem</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Live Engine", icon: <Target className="text-purple-400" />, desc: "Scorer Module" },
            { title: "League Ops", icon: <Shield className="text-blue-400" />, desc: "Tournaments" },
            { title: "Talent Pool", icon: <Users className="text-amber-400" />, desc: "Player Stats" },
            { title: "Hiring Hub", icon: <Activity className="text-pink-400" />, desc: "Recruit Staff" },
          ].map((mod, i) => (
            <div key={i} className="bg-zinc-900/40 border border-zinc-800/50 p-5 rounded-3xl hover:bg-zinc-800 transition cursor-pointer">
              <div className="mb-4 bg-zinc-950 w-10 h-10 rounded-full flex items-center justify-center border border-zinc-800">{mod.icon}</div>
              <h4 className="font-bold text-white">{mod.title}</h4>
              <p className="text-xs text-zinc-500 mt-1 font-medium">{mod.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
