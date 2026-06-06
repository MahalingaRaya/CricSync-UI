import React, { useState } from 'react';
import { Mic, RotateCcw } from 'lucide-react';
import { useApp } from './AppContext';

export const MatchCenter = () => {
  const { liveMatch, timeline, customCommentary, setCustomCommentary, processDelivery, undoLastAction, history, startSecondInnings } = useApp();
  const [commentaryLang, setCommentaryLang] = useState("EN");
  const [commentBox, setCommentBox] = useState("");

  const isOverLimit = liveMatch.balls >= liveMatch.maxOvers * 6;
  const isAllOut = liveMatch.wickets >= 10;
  const isTargetReached = liveMatch.innings === 2 && liveMatch.runs >= liveMatch.target;
  const isInningsOneOver = liveMatch.innings === 1 && (isOverLimit || isAllOut);
  const isMatchOver = liveMatch.innings === 2 && (isOverLimit || isAllOut || isTargetReached);

  const handleScore = (runs) => {
    if (isInningsOneOver || isMatchOver) return;
    processDelivery(runs, 0, true, `${runs} off the bat`);
  };

  const handleExtra = (type) => {
    if (isInningsOneOver || isMatchOver) return;
    // Wides and No Balls: +1 run, 0 legal balls
    processDelivery(1, 0, false, type); 
  };

  const handleWicket = () => {
    if (isInningsOneOver || isMatchOver) return;
    processDelivery(0, 1, true, "WICKET! Clean Bowled!");
  };

  return (
    <div className="p-4 max-w-7xl mx-auto mb-20 space-y-6 bg-black min-h-screen text-white font-sans">
      
      {/* SCORECARD */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-xl mx-auto mb-2 shadow-2xl relative overflow-hidden">
        {liveMatch.innings === 2 && (
          <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-black text-center text-[10px] font-black tracking-widest py-1 uppercase">
            Target: {liveMatch.target} • Need {liveMatch.target - liveMatch.runs} from {(liveMatch.maxOvers * 6) - liveMatch.balls}
          </div>
        )}

        <div className={`flex justify-between items-center mb-4 ${liveMatch.innings === 2 ? 'mt-4' : ''}`}>
          <span className="text-red-500 font-bold flex items-center gap-1.5 text-xs tracking-wider uppercase animate-pulse">
            ● LIVE MATCH CENTER
          </span>
          <span className="text-zinc-400 text-xs font-black tracking-wide bg-zinc-800 px-3 py-1 rounded-xl flex items-center gap-2">
            📍 Bengaluru • {liveMatch.maxOvers} Overs
          </span>
        </div>

        <div className="flex justify-between items-center my-6">
          <div className="flex-1">
            <h2 className={`text-xl font-black ${liveMatch.innings === 1 ? 'text-white' : 'text-zinc-500'}`}>
              {liveMatch.innings === 1 ? liveMatch.teamA : liveMatch.teamB}
            </h2>
            <p className="text-emerald-400 text-xs font-bold mt-0.5">Batting (Inn {liveMatch.innings})</p>
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
            <h2 className={`text-xl font-black ${liveMatch.innings === 1 ? 'text-zinc-500' : 'text-white'}`}>
              {liveMatch.innings === 1 ? liveMatch.teamB : liveMatch.teamA}
            </h2>
            <p className="text-cyan-500 text-xs font-bold mt-0.5">Bowling</p>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto flex justify-end mb-6 pr-2">
        <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/scorecard/${liveMatch.id}`); alert("Link Copied!"); }} className="text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-lg mr-2">
          🔗 Spectator Link
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        
        {/* MATCH CONTROL ZONE */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col justify-center relative">
          
          {/* UNDO BUTTON */}
          <button 
            onClick={undoLastAction} 
            disabled={history.length === 0}
            className="absolute top-6 right-6 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:hover:bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg transition"
          >
            <RotateCcw size={12} /> Undo
          </button>

          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Match Control</h3>
          
          {isInningsOneOver ? (
            <div className="text-center py-6">
              <h2 className="text-2xl font-black text-white mb-2">Innings Complete</h2>
              <button onClick={startSecondInnings} className="bg-emerald-500 text-black font-black w-full py-4 rounded-xl text-lg mt-4">Start Run Chase</button>
            </div>
          ) : isMatchOver ? (
            <div className="text-center py-6">
              <h2 className="text-2xl font-black text-white mb-2">Match Finished!</h2>
              <p className="text-emerald-400 font-bold bg-emerald-900/30 border border-emerald-800 py-3 rounded-xl">
                {isTargetReached ? `${liveMatch.teamB} wins!` : `${liveMatch.teamA} wins!`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3, 4, 6].map(num => (
                <button key={num} onClick={() => handleScore(num)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-black text-lg h-12 rounded-xl transition active:scale-95">{num}</button>
              ))}
              <button onClick={handleWicket} className="bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 font-black text-xs h-12 rounded-xl col-span-2 transition active:scale-95">WICKET</button>
              
              {/* EXTRAS */}
              <button onClick={() => handleExtra("WD")} className="bg-orange-500/20 text-orange-400 border border-orange-500/40 hover:bg-orange-500/30 font-black text-xs h-12 rounded-xl col-span-2 transition active:scale-95">WIDE (WD)</button>
              <button onClick={() => handleExtra("NB")} className="bg-purple-500/20 text-purple-400 border border-purple-500/40 hover:bg-purple-500/30 font-black text-xs h-12 rounded-xl col-span-2 transition active:scale-95">NO BALL (NB)</button>
            </div>
          )}
        </div>

        {/* TIMELINE FEED */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><Mic size={14} className="text-cyan-400" /> Broadcaster</h3>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 max-h-56 pr-2">
            {timeline.length === 0 ? <p className="text-zinc-600 text-xs font-medium text-center mt-8">Feed empty.</p> : timeline.map((log) => (
              <div key={log.id} className="flex gap-3 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50 items-center">
                <span className="font-black text-zinc-500 text-[10px] shrink-0 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">{log.overDisplay}</span>
                <p className="text-xs flex-1 text-zinc-300">{log.commentaryEn}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
