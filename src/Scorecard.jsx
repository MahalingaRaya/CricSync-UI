import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Target, Share2 } from 'lucide-react';

export const Scorecard = () => {
  const { id } = useParams(); // Grabs the Match ID from the URL
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = "https://cricsync-engine.onrender.com/api";

  const fetchLiveScore = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/matches/${id}`);
      if (response.ok) {
        const data = await response.json();
        setMatchData(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Spectator sync waiting on backend...");
    }
  };

  useEffect(() => {
    fetchLiveScore();
    // Auto-refresh every 5 seconds for spectators
    const interval = setInterval(fetchLiveScore, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
        <div className="text-zinc-500 animate-pulse text-lg font-bold">Connecting to Live Broadcast...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans flex flex-col items-center pt-10">
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <span className="text-red-500 font-bold flex items-center gap-1.5 text-xs tracking-wider uppercase animate-pulse">
            ● LIVE BROADCAST
          </span>
          <span className="text-zinc-400 text-[10px] font-black tracking-wide bg-zinc-800 px-2 py-1 rounded-md">
            MATCH ID: {id}
          </span>
        </div>

        <div className="flex justify-between items-center my-6">
          <div className="flex-1">
            <h2 className="text-xl font-black text-white">{matchData.teamA}</h2>
            <p className="text-zinc-500 text-xs font-semibold mt-0.5">Innings 1</p>
          </div>
          
          <div className="text-center bg-zinc-950 px-5 py-3 rounded-2xl border border-zinc-800 min-w-[110px]">
            <div className="text-emerald-400 text-4xl font-black tracking-tighter">
              {matchData.runsA || 0}/{matchData.wicketsA || 0}
            </div>
            <p className="text-zinc-400 text-[11px] font-bold mt-1">
              {Math.floor((matchData.ballsA || 0) / 6)}.{(matchData.ballsA || 0) % 6} Overs
            </p>
          </div>

          <div className="flex-1 text-right">
            <h2 className="text-xl font-black text-zinc-400">{matchData.teamB}</h2>
            <p className="text-zinc-500 text-xs font-semibold mt-0.5">Yet to bat</p>
          </div>
        </div>
        
        <div className="text-zinc-500 text-xs font-medium text-center border-t border-zinc-800/40 pt-4 mt-2">
          Spectator Mode • Auto-syncing from CricSync Cloud
        </div>
      </div>
      
      <button 
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Public link copied! Share it on WhatsApp.");
        }}
        className="mt-6 flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-bold px-6 py-3 rounded-full transition border border-zinc-700"
      >
        <Share2 size={16} /> Copy Public Link
      </button>

    </div>
  );
};
