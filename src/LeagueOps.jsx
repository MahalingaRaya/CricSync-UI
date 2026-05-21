import React, { useState } from 'react';
import { Shield, Plus, MapPin, Users } from 'lucide-react';

export const LeagueOps = () => {
  const [leagueName, setLeagueName] = useState('');
  const [matchTeams, setMatchTeams] = useState('');
  const [location, setLocation] = useState('');

  const handlePostEvent = (e) => {
    e.preventDefault();
    alert(`Success: Event published to the Professional Marketplace!`);
    setLeagueName(''); setMatchTeams(''); setLocation('');
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6 mb-20">
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-zinc-800 shadow-xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20"><Shield size={20}/></div>
        <div>
          <h1 className="text-2xl font-black text-white">Organizer Dashboard</h1>
          <p className="text-zinc-500 text-xs font-medium">Post events, establish matches, and secure specialized officials.</p>
        </div>
      </div>

      <form onSubmit={handlePostEvent} className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl space-y-4">
        <div>
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 block">1. Tournament Configuration</label>
          <input 
            type="text" required placeholder="e.g., Bangalore Corporate Cup" value={leagueName} onChange={(e) => setLeagueName(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 block">2. Establish Live Match Fixture</label>
          <input 
            type="text" required placeholder="e.g., RCB vs CSK" value={matchTeams} onChange={(e) => setMatchTeams(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 block">3. Add Stadium Location</label>
          <div className="relative">
            <input 
              type="text" required placeholder="e.g., Chinnaswamy Stadium, Bangalore" value={location} onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <MapPin size={16} className="absolute left-3.5 top-3.5 text-zinc-600" />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 block">4. Post Hiring Needs</label>
          <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 text-sm focus:outline-none focus:border-blue-500">
            <option>Need Umpires, Scorers & Commentators</option>
            <option>Need Umpires Only</option>
            <option>Need Scorers Only</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-[0_0_20px_rgba(37,99,235,0.2)] flex items-center justify-center gap-2">
          <Plus size={16} /> BROADCAST CRICKET EVENT
        </button>
      </form>
    </div>
  );
};
