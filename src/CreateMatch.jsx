import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateMatch = () => {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [overs, setOvers] = useState(2);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateMatch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://cricsync-engine.onrender.com/api/matches/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamA: teamA || "Team A",
          teamB: teamB || "Team B",
          maxOvers: Number(overs),
          maxWickets: 10
        })
      });

      if (response.ok) {
        const newMatchData = await response.json();
        localStorage.setItem('activeMatchId', newMatchData.id);
        navigate('/match-center');
      } else {
        alert("Backend rejected the match. Is the server awake?");
        setLoading(false);
      }
    } catch (error) {
      console.error("Connection failed:", error);
      alert("Failed to connect to the Render database.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center font-sans">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white">Create Match</h2>
          <p className="text-zinc-500 text-sm font-medium mt-1">Initialize a new game in the database</p>
        </div>

        <form onSubmit={handleCreateMatch} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Batting First (Team A)</label>
            <input 
              type="text" 
              required
              placeholder="e.g., RCB" 
              value={teamA} 
              onChange={(e) => setTeamA(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Bowling First (Team B)</label>
            <input 
              type="text" 
              required
              placeholder="e.g., CSK" 
              value={teamB} 
              onChange={(e) => setTeamB(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Overs</label>
            <select 
              value={overs} 
              onChange={(e) => setOvers(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 appearance-none"
            >
              <option value="2">2 Overs (Quick Match)</option>
              <option value="5">5 Overs</option>
              <option value="10">10 Overs</option>
              <option value="20">20 Overs (T20)</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-black text-lg py-4 rounded-xl transition active:scale-95 disabled:opacity-50 mt-4"
          >
            {loading ? "Connecting to Engine..." : "Initialize Match"}
          </button>

        </form>
      </div>
    </div>
  );
};
