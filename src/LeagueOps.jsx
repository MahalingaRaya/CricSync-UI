import React, { useState } from 'react';
import { Shield, Plus, MapPin } from 'lucide-react';
import { useApp } from './AppContext';
import { useNavigate } from 'react-router-dom';

export const LeagueOps = () => {
  const { addLeagueEvent } = useApp();
  const navigate = useNavigate();
  
  const [leagueName, setLeagueName] = useState('');
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [venue, setVenue] = useState('');
  const [roleNeed, setRoleNeed] = useState('Umpire');

  const handlePostEvent = (e) => {
    e.preventDefault();
    
    // Publish data to state model
    addLeagueEvent({
      role: `${roleNeed} Required`,
      league: leagueName,
      venue: venue,
      pay: roleNeed === 'Umpire' ? "2,500/Match" : roleNeed === 'Scorer' ? "1,200/Match" : "3,000/Day",
      teamA: teamA,
      teamB: teamB
    });

    alert(`Success: Event & Jobs published instantly to the professional feed!`);
    navigate('/'); // Automatically sends organizer to the main audience dashboard view
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6 mb-20">
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-zinc-800 shadow-xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20"><Shield size={20}/></div>
        <div>
          <h1 className="text-2xl font-black text-white">Organizer Dashboard</h1>
          <p className="text-zinc-500 text-xs font-medium">Broadcast match operations and assign roles to professionals.</p>
        </div>
      </div>

      <form onSubmit={handlePostEvent} className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl space-y-4">
        <div>
          <label className="text-xs font-bold text-zinc-400 uppercase mb-1 block">1. Tournament Name</label>
          <input type="text" required placeholder="e.g., Whitefield Premier League" value={leagueName} onChange={(e) => setLeagueName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase mb-1 block">Team A (Batting)</label>
            <input type="text" required placeholder="e.g., RCB" value={teamA} onChange={(e) => setTeamA(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase mb-1 block">Team B (Bowling)</label>
            <input type="text" required placeholder="e.g., CSK" value={teamB} onChange={(e) => setTeamB(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-zinc-400 uppercase mb-1 block">2. Stadium Venue Location</label>
          <div className="relative">
            <input type="text" required placeholder="e.g., Varthur Sports Ground, Bengaluru" value={venue} onChange={(e) => setVenue(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500" />
            <MapPin size={16} className="absolute left-3.5 top-3.5 text-zinc-600" />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-zinc-400 uppercase mb-1 block">3. Immediate Official Needed</label>
          <select value={roleNeed} onChange={(e) => setRoleNeed(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm focus:outline-none focus:border-blue-500">
            <option value="Umpire">Umpire (2,500 INR/Match)</option>
            <option value="Scorer">Digital Scorer (1,200 INR/Match)</option>
            <option value="Commentator">English Commentator (3,000 INR/Day)</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-[0_0_20px_rgba(37,99,235,0.2)] flex items-center justify-center gap-2">
          <Plus size={16} /> BROADCAST CRICKET EVENT
        </button>
      </form>
    </div>
  );
};
