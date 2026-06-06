import React, { useState } from 'react';
import { Target, Mic } from 'lucide-react';
import { useApp } from './AppContext';

export const MatchCenter = () => {
  const { liveMatch, timeline, customCommentary, setCustomCommentary, lastBallResult, updateDatabaseScore } = useApp();
  const [commentaryLang, setCommentaryLang] = useState("EN");
  const [commentBox, setCommentBox] = useState("");

  const handleScore = (runVal) => {
    const updatedRuns = liveMatch.runs + runVal;
    const updatedBalls = liveMatch.balls + 1;
    updateDatabaseScore(updatedRuns, liveMatch.wickets, updatedBalls, runVal.toString());
  };

  const handleWicket = () => {
    const updatedWickets = liveMatch.wickets + 1;
    const updatedBalls = liveMatch.balls + 1;
    updateDatabaseScore(liveMatch.runs, updatedWickets, updatedBalls, "W");
  };

  const handleCommentarySubmit = () => {
    if (!commentBox.trim()) return;
    setCustomCommentary(commentBox);
    setCommentBox("");
  };

  return (
    <div className="p-4 max-w-7xl mx-auto mb-20 space-y-6 bg-black min-h-screen text-white font-sans">
      
      {/* 1. TOP SCORECARD (Ported from Dashboard) */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-xl mx-auto mb-2 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-red-500 font-bold flex items-center gap-1.5 text-xs tracking-wider uppercase animate-pulse">
            ● LIVE MATCH CENTER
          </span>
          <span className="text-zinc-400 text-xs font-black tracking-wide bg-zinc-800 px-3 py-1 rounded-xl">
            🏆 {liveMatch.leagueName}
          </span>
        </div>

        <div className="flex justify-between items-center my-6">
          <div className="flex-1">
            <h2 className="text-xl font-black text-white">{liveMatch.teamA}</h2>
            <p className="text-zinc-500 text-xs font-semibold mt-0.5">Innings 1</p>
          </div>
          
          <div className="text-center bg-zinc-950 px-5 py-3 rounded-2xl border border-zinc-800 min-w-[100px]">
            <div className="text-emerald-400 text-3xl font-black tracking-tighter">
              {liveMatch.runs}/{liveMatch.wickets}
            </div>
            <p className="text-zinc-400 text-[11px] font-bold mt-0.5">
              {Math.floor(liveMatch.balls / 6)}.{liveMatch.balls % 6} Overs
            </p>
          </div>

          <div className="flex-1 text-right">
            <h2 className="text-xl font-black text-zinc-400">{liveMatch.teamB}</h2>
            <p className="text-zinc-500 text-xs font-semibold mt-0.5">Yet to bat</p>
          </div>
        </div>
      </div>

      {/* NEW: SPECTATOR LINK BUTTON */}
      <div className="max-w-xl mx-auto flex justify-end mb-6 pr-2">
        <button 
          onClick={() => {
            const url = `${window.location.origin}/scorecard/${liveMatch.id}`;
            navigator.clipboard.writeText(url);
            alert("Spectator Link Copied! Share with friends on WhatsApp.");
          }}
          className="text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-lg hover:bg-cyan-500/20 transition active:scale-95 shadow-lg"
        >
          🔗 Copy Spectator Link
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        
        {/* 2. SCORER KEYPAD */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Match Control Keypad</h3>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2, 3, 4, 6].map(num => (
              <button key={num} onClick={() => handleScore(num)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xl h-14 rounded-2xl transition active:scale-95">
                {num}
              </button>
            ))}
            <button onClick={handleWicket} className="bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 font-black text-sm h-14 rounded-2xl col-span-2 transition active:scale-95">
              ☝ WICKET
            </button>
            <button onClick={() => handleScore(0)} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-black text-sm h-14 rounded-2xl transition active:scale-95">
              DOT BALL
            </button>
          </div>
        </div>

        {/* 3. COMMENTARY & TIMELINE FEED */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Mic size={14} className="text-cyan-400" /> Broadcaster Feed
            </h3>
            <div className="flex gap-1 bg-zinc-950 p-0.5 rounded-xl text-[10px] font-black border border-zinc-800">
              <button onClick={() => setCommentaryLang("EN")} className={`px-2 py-1 rounded-lg ${commentaryLang === 'EN' ? 'bg-white text-black font-black' : 'text-zinc-500'}`}>EN</button>
              <button onClick={() => setCommentaryLang("KN")} className={`px-2 py-1 rounded-lg ${commentaryLang === 'KN' ? 'bg-white text-black font-black' : 'text-zinc-500'}`}>ಕನ್ನಡ</button>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <input 
              type="text" value={commentBox} onChange={(e) => setCommentBox(e.target.value)}
              placeholder="Add ball-by-ball insight..." className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
            <button onClick={handleCommentarySubmit} className="bg-cyan-500 text-black font-bold px-5 py-2 rounded-xl text-sm transition active:scale-95">
              Post
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 max-h-56 pr-2">
            {timeline.length === 0 ? (
              <p className="text-zinc-600 text-xs font-medium text-center mt-8">Feed empty. Start tapping the scoring keypad.</p>
            ) : (
              timeline.map((log) => (
                <div key={log.id} className="flex gap-3 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50 items-center">
                  <span className="font-black text-zinc-500 text-xs shrink-0 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                    {log.overDisplay}
                  </span>
                  <p className={`text-xs flex-1 ${log.commentaryEn.includes('WICKET') ? 'text-red-400 font-bold' : 'text-zinc-300'}`}>
                    {commentaryLang === "EN" ? log.commentaryEn : (log.commentaryKn || log.commentaryEn)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
