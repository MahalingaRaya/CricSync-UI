import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateMatch = () => {
  const [teamA, setTeamA] = useState('RCB Legends');
  const [teamB, setTeamB] = useState('India Icons');
  const [venue, setVenue] = useState('Chinnaswamy Stadium');
  const [overs, setOvers] = useState(2);
  
  const [tossWinner, setTossWinner] = useState('RCB Legends');
  const [tossDecision, setTossDecision] = useState('BAT');
  
  const [teamAPlayers, setTeamAPlayers] = useState(
    "Mahalinga Raya\nVirat Kohli\nAB de Villiers\nChris Gayle\nGlenn Maxwell\nFaf du Plessis\nKL Rahul\nDinesh Karthik\nAnil Kumble\nYuzvendra Chahal\nMohammed Siraj"
  );
  const [teamBPlayers, setTeamBPlayers] = useState(
    "MS Dhoni\nSachin Tendulkar\nRohit Sharma\nVirender Sehwag\nRahul Dravid\nYuvraj Singh\nRavindra Jadeja\nHardik Pandya\nZaheer Khan\nJasprit Bumrah\nRavichandran Ashwin"
  );
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateMatch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanTeamA = teamA.trim() || "Team A";
      const cleanTeamB = teamB.trim() || "Team B";

      const matchRes = await fetch('https://cricsync-engine.onrender.com/api/matches/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamA: cleanTeamA,
          teamB: cleanTeamB,
          venue: venue.trim() || "Local Ground",
          tossWinner: tossWinner.trim() || cleanTeamA,
          tossDecision: tossDecision,
          maxOvers: Number(overs),
          maxWickets: 10
        })
      });

      if (!matchRes.ok) throw new Error("Match creation failed.");
      const newMatchData = await matchRes.json();
      const matchId = newMatchData.id;

      const teamAList = teamAPlayers.split('\n').filter(name => name.trim() !== '');
      const teamBList = teamBPlayers.split('\n').filter(name => name.trim() !== '');

      const allPlayers = [];
      teamAList.forEach(name => allPlayers.push({ matchId, teamName: cleanTeamA, playerName: name.trim() }));
      teamBList.forEach(name => allPlayers.push({ matchId, teamName: cleanTeamB, playerName: name.trim() }));

      if (allPlayers.length > 0) {
        const playerRes = await fetch('https://cricsync-engine.onrender.com/api/match-players/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(allPlayers)
        });
        
        if (!playerRes.ok) {
          alert("Warning: Match created, but players failed to save. Is the database updated?");
        }
      }

      localStorage.setItem('activeMatchId', matchId);
      localStorage.setItem('matchMaxOvers', overs);
      navigate('/match-center');

    } catch (error) {
      console.error("Setup failed:", error);
      alert("Failed to initialize match on the cloud database.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 flex flex-col items-center py-12 font-sans relative overflow-hidden">
      
      {/* Subtle Background Glow to match Home Screen */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative z-10">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            Setup Match
          </h2>
          <p className="text-zinc-400 text-sm font-bold mt-1">Quick Start Mode</p>
        </div>

        <form onSubmit={handleCreateMatch} className="space-y-8">
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Team A</label>
              <input type="text" required value={teamA} onChange={(e) => setTeamA(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"/>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Team B</label>
              <input type="text" required value={teamB} onChange={(e) => setTeamB(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"/>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Venue</label>
              <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"/>
            </div>
          </div>

          <hr className="border-zinc-800/50" />

          <div className="grid md:grid-cols-3 gap-4 bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/50">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Toss Winner</label>
              <select value={tossWinner} onChange={(e) => setTossWinner(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none">
                <option value={teamA}>{teamA}</option>
                <option value={teamB}>{teamB}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Decision</label>
              <select value={tossDecision} onChange={(e) => setTossDecision(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none">
                <option value="BAT">Batting First</option>
                <option value="BOWL">Bowling First</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Overs</label>
              <select value={overs} onChange={(e) => setOvers(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none">
                <option value="1">1 Over</option>
                <option value="2">2 Overs</option>
                <option value="5">5 Overs</option>
              </select>
            </div>
          </div>

          <hr className="border-zinc-800/50" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{teamA || "Team A"} Roster</label>
              <textarea 
                rows="11" value={teamAPlayers} onChange={(e) => setTeamAPlayers(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{teamB || "Team B"} Roster</label>
              <textarea 
                rows="11" value={teamBPlayers} onChange={(e) => setTeamBPlayers(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-black text-lg py-4 rounded-xl transition active:scale-95 mt-4 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            {loading ? "Syncing to Cloud Engine..." : "Launch Scorecard"}
          </button>

        </form>
      </div>
    </div>
  );
};
