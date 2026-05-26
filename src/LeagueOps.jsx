import React, { useState } from 'react';
import { useApp } from './AppContext';

// FIXED: Changed from export default to named export to match your routing imports
export function LeagueOps() {
  const { addLeagueEvent } = useApp();
  
  const [tName, setTName] = useState('');
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [matchVenue, setMatchVenue] = useState('');

  const handlePublish = (e) => {
    e.preventDefault();
    if (!team1 || !team2) {
      alert("Please enter both Team Names!");
      return;
    }

    const tournamentData = {
      teamA: team1,
      teamB: team2,
      league: tName || "Corporate Premier League 2K26",
      venue: matchVenue || "International Stadium Bengaluru"
    };

    addLeagueEvent(tournamentData);
    
    setTName('');
    setTeam1('');
    setTeam2('');
    setMatchVenue('');
    alert("🏆 Match Published Live Successfully!");
  };

  return (
    <div className="bg-black text-white min-h-screen p-4 pb-24">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-1">⚡ Organizer Admin Console</h2>
        <p className="text-zinc-400 text-xs mb-6">Broadcast a new active live tournament game</p>
        
        <form onSubmit={handlePublish} className="space-y-4">
          <div>
            <label className="block text-zinc-400 text-xs font-bold uppercase mb-1.5">Tournament / League Name</label>
            <input 
              type="text" 
              placeholder="e.g., Corporate Premier League 2K26"
              value={tName}
              onChange={(e) => setTName(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 text-xs font-bold uppercase mb-1.5">Team A Name</label>
              <input 
                type="text" 
                placeholder="e.g., MahaTech Mahi"
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-bold uppercase mb-1.5">Team B Name</label>
              <input 
                type="text" 
                placeholder="e.g., CricSync"
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 text-xs font-bold uppercase mb-1.5">Match Venue / Stadium</label>
            <input 
              type="text" 
              placeholder="e.g., International Stadium Bengaluru"
              value={matchVenue}
              onChange={(e) => setMatchVenue(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3.5 rounded-xl transition mt-4 text-sm"
          >
            Publish Live Match
          </button>
        </form>
      </div>
    </div>
  );
}
