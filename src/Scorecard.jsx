import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Share2 } from 'lucide-react';

export const Scorecard = () => {
  const { id } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const API_BASE_URL = "https://cricsync-engine.onrender.com/api";

  const fetchScorecardData = async () => {
    try {
      // 1. Fetch the team scores
      const matchRes = await fetch(`${API_BASE_URL}/matches/${id}`);
      if (!matchRes.ok) throw new Error("Match not found");
      const match = await matchRes.json();
      setMatchData(match);

      // 2. Fetch all 22 player stats
      const playerRes = await fetch(`${API_BASE_URL}/match-players/match/${id}`);
      if (playerRes.ok) {
        const players = await playerRes.json();
        setTeamAPlayers(players.filter(p => p.teamName === match.teamA));
        setTeamBPlayers(players.filter(p => p.teamName === match.teamB));
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to load scorecard");
    }
  };

  useEffect(() => {
    fetchScorecardData();
    const interval = setInterval(fetchScorecardData, 10000); // Auto-sync every 10s
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center font-bold text-zinc-500 animate-pulse">Loading Scorecard...</div>;
  }

  // Helper to render a batting table
  const renderBattingTable = (players) => (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-zinc-900 text-zinc-500 text-[10px] uppercase tracking-widest font-black">
          <tr>
            <th className="px-4 py-2 rounded-l-lg">Batter</th>
            <th className="px-4 py-2 text-right">R</th>
            <th className="px-4 py-2 text-right">B</th>
            <th className="px-4 py-2 text-right">4s</th>
            <th className="px-4 py-2 text-right">6s</th>
            <th className="px-4 py-2 text-right rounded-r-lg">SR</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {players.filter(p => p.ballsFaced > 0 || p.runsScored > 0).map(p => (
            <tr key={p.id} className="hover:bg-zinc-900/50 transition">
              <td className="px-4 py-3 font-bold text-emerald-400">{p.playerName}</td>
              <td className="px-4 py-3 text-right font-black text-white">{p.runsScored}</td>
              <td className="px-4 py-3 text-right text-zinc-400">{p.ballsFaced}</td>
              <td className="px-4 py-3 text-right text-zinc-400">{p.fours}</td>
              <td className="px-4 py-3 text-right text-zinc-400">{p.sixes}</td>
              <td className="px-4 py-3 text-right text-zinc-500 font-medium">
                {p.ballsFaced > 0 ? ((p.runsScored / p.ballsFaced) * 100).toFixed(1) : "0.0"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Helper to render a bowling table
  const renderBowlingTable = (players) => (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-zinc-900 text-zinc-500 text-[10px] uppercase tracking-widest font-black">
          <tr>
            <th className="px-4 py-2 rounded-l-lg">Bowler</th>
            <th className="px-4 py-2 text-right">O</th>
            <th className="px-4 py-2 text-right">R</th>
            <th className="px-4 py-2 text-right">W</th>
            <th className="px-4 py-2 text-right rounded-r-lg">ECON</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {players.filter(p => p.oversBowled > 0).map(p => (
            <tr key={p.id} className="hover:bg-zinc-900/50 transition">
              <td className="px-4 py-3 font-bold text-cyan-400">{p.playerName}</td>
              <td className="px-4 py-3 text-right text-zinc-400">{p.oversBowled.toFixed(1)}</td>
              <td className="px-4 py-3 text-right text-zinc-400">{p.runsConceded}</td>
              <td className="px-4 py-3 text-right font-black text-white">{p.wicketsTaken}</td>
              <td className="px-4 py-3 text-right text-zinc-500 font-medium">
                {p.oversBowled > 0 ? (p.runsConceded / Math.floor(p.oversBowled)).toFixed(1) : "0.0"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">CricSync Scorecard</h1>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Public link copied!"); }} className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold px-4 py-2 rounded-lg transition border border-zinc-800">
            <Share2 size={14} /> Share
          </button>
        </div>

        {/* MATCH SUMMARY */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-zinc-500 text-[10px] font-black tracking-widest uppercase">{matchData.venue || "Local Ground"}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-black text-white">{matchData.teamA}</h2>
              <div className="text-emerald-400 text-4xl font-black tracking-tighter mt-1">{matchData.runsA || 0}<span className="text-2xl text-emerald-600">/{matchData.wicketsA || 0}</span></div>
              <p className="text-zinc-500 text-xs font-bold mt-1">{Math.floor((matchData.ballsA || 0) / 6)}.{(matchData.ballsA || 0) % 6} Overs</p>
            </div>
            <div className="px-4 text-zinc-700 font-black italic text-xl">VS</div>
            <div className="flex-1 text-right">
              <h2 className="text-2xl font-black text-white">{matchData.teamB}</h2>
              <div className="text-cyan-400 text-4xl font-black tracking-tighter mt-1">{matchData.runsB || 0}<span className="text-2xl text-cyan-600">/{matchData.wicketsB || 0}</span></div>
              <p className="text-zinc-500 text-xs font-bold mt-1">{Math.floor((matchData.ballsB || 0) / 6)}.{(matchData.ballsB || 0) % 6} Overs</p>
            </div>
          </div>
        </div>

        {/* INNINGS 1 DETAILS */}
        <div className="bg-zinc-950 border border-zinc-800/50 rounded-3xl p-6">
          <h3 className="text-sm font-black text-white mb-4 uppercase tracking-wider">{matchData.teamA} Innings</h3>
          {renderBattingTable(teamAPlayers)}
          {renderBowlingTable(teamBPlayers)}
        </div>

        {/* INNINGS 2 DETAILS */}
        {matchData.ballsB > 0 && (
          <div className="bg-zinc-950 border border-zinc-800/50 rounded-3xl p-6">
            <h3 className="text-sm font-black text-white mb-4 uppercase tracking-wider">{matchData.teamB} Innings</h3>
            {renderBattingTable(teamBPlayers)}
            {renderBowlingTable(teamAPlayers)}
          </div>
        )}

      </div>
    </div>
  );
};
