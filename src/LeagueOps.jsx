import React, { useState } from 'react';
import { Shield, Trophy, Play, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LeagueOps = () => {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto mb-20 md:mb-0 space-y-6">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-zinc-800 shadow-xl flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
            <Shield className="text-blue-500" /> League Ops
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm font-medium mt-1">Tournament & Match Control Center</p>
        </div>
        <Trophy size={40} className="text-zinc-800" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Match Initialization Form */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">
            Initialize New Match
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase mb-1 block">Batting Team</label>
              <input 
                type="text" 
                placeholder="e.g., Royal Challengers Bengaluru" 
                value={teamA}
                onChange={(e) => setTeamA(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>
            
            <div className="flex justify-center">
              <span className="bg-zinc-800 text-zinc-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">VS</span>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase mb-1 block">Bowling Team</label>
              <input 
                type="text" 
                placeholder="e.g., Chennai Super Kings" 
                value={teamB}
                onChange={(e) => setTeamB(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 font-medium"
              />
            </div>

            <div className="pt-4">
              <Link to="/live">
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  <Play size={18} /> GENERATE LIVE ENGINE
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Active Tournaments / Quick Stats */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Active Tournaments</h3>
          
          <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between hover:bg-zinc-800/50 transition cursor-pointer">
            <div>
              <h4 className="font-bold text-white text-lg">Bangalore Corporate Cup</h4>
              <p className="text-xs text-zinc-500 font-medium mt-1">12 Teams • 2 Matches Live</p>
            </div>
            <Settings className="text-zinc-600" />
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between hover:bg-zinc-800/50 transition cursor-pointer">
            <div>
              <h4 className="font-bold text-white text-lg">Whitefield Premier League</h4>
              <p className="text-xs text-zinc-500 font-medium mt-1">8 Teams • Draft Phase</p>
            </div>
            <Settings className="text-zinc-600" />
          </div>
        </div>

      </div>
    </div>
  );
};
