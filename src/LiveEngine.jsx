import React, { useState } from 'react';
import { Target, Mic } from 'lucide-react';
import { useApp } from './AppContext'; // <-- Import global state hook

public const LiveEngine = () => {
  // Destructure database synchronized states and functions from Context
  const { liveMatch, setLiveMatch, updateDatabaseScore } = useApp(); 
  const [feed, setFeed] = useState([]);
  const [commentBox, setCommentBox] = useState("");

  const handleScore = (runVal) => {
    const updatedRuns = liveMatch.runs + runVal;
    const updatedBalls = liveMatch.balls + 1;
    const overStr = `${Math.floor(updatedBalls / 6)}.${updatedBalls % 6}`;
    
    // 1. Optimistically update frontend view state instantly for ultra-fast UX
    setLiveMatch({
      ...liveMatch,
      runs: updatedRuns,
      balls: updatedBalls
    });

    // 2. Append action event to local commentary list array
    setFeed([{ type: 'score', over: overStr, text: `Batter scores ${runVal} run(s).` }, ...feed]);

    // 3. Stream data over REST directly into Spring Boot database repository
    updateDatabaseScore(updatedRuns, liveMatch.wickets, updatedBalls);
  };

  const handleWicket = () => {
    const updatedWickets = liveMatch.wickets + 1;
    const updatedBalls = liveMatch.balls + 1;
    const overStr = `${Math.floor(updatedBalls / 6)}.${updatedBalls % 6}`;

    // 1. Optimistically update frontend view state instantly
    setLiveMatch({
      ...liveMatch,
      wickets: updatedWickets,
      balls: updatedBalls
    });

    // 2. Append action event to local commentary list array
    setFeed([{ type: 'wicket', over: overStr, text: `OUT! Huge wicket falls for ${liveMatch.teamA}.` }, ...feed]);

    // 3. Stream data over REST directly into Spring Boot database repository
    updateDatabaseScore(liveMatch.runs, updatedWickets, updatedBalls);
  };

  const handleCommentary = () => {
    if (!commentBox) return;
    const overStr = `${Math.floor(liveMatch.balls / 6)}.${liveMatch.balls % 6}`;
    setFeed([{ type: 'commentary', over: overStr, text: commentBox }, ...feed]);
    setCommentBox(""); 
  };

  return (
    <div className="p-4 max-w-7xl mx-auto mb-20 space-y-6">
      
      {/* Real-time Match Terminal Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-zinc-800 shadow-xl flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Target className="text-purple-500" /> Live Engine
          </h1>
          <p className="text-zinc-400 text-xs font-medium mt-1">Scoring Terminal for: {liveMatch.teamA} vs {liveMatch.teamB}</p>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-black text-white">{liveMatch.runs}<span className="text-xl text-zinc-600">/{liveMatch.wickets}</span></h2>
          <p className="text-emerald-400 font-bold mt-1 text-xs">Overs: {Math.floor(liveMatch.balls/6)}.{liveMatch.balls%6}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Scorer Keypad */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Scorer Keypad</h3>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2, 3, 4, 6].map(num => (
              <button key={num} onClick={() => handleScore(num)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xl h-14 rounded-2xl transition active:scale-95">
                {num}
              </button>
            ))}
            <button onClick={handleWicket} className="bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30 font-black text-sm h-14 rounded-2xl col-span-2 transition active:scale-95">
              WICKET
            </button>
            <button onClick={() => handleScore(0)} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-black text-sm h-14 rounded-2xl transition active:scale-95">
              DOT
            </button>
          </div>
        </div>

        {/* Commentator Feed input */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl flex flex-col">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Mic size={14} /> Broadcaster Feed
          </h3>
          <div className="flex gap-2 mb-4">
            <input 
              type="text" value={commentBox} onChange={(e) => setCommentBox(e.target.value)}
              placeholder="Add ball-by-ball insight..." className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none"
            />
            <button onClick={handleCommentary} className="bg-cyan-500 text-black font-bold px-4 py-2 rounded-xl text-sm transition active:scale-95">
              Post
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 max-h-56 pr-2">
            {feed.length === 0 ? (
              <p className="text-zinc-600 text-xs font-medium text-center mt-8">Feed empty. Start tapping the scoring keypad.</p>
            ) : (
              feed.map((item, i) => (
                <div key={i} className="flex gap-3 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                  <span className="font-black text-zinc-500 text-xs shrink-0">{item.over}</span>
                  <p className={`text-xs ${item.type === 'wicket' ? 'text-red-400 font-bold' : item.type === 'commentary' ? 'text-cyan-400 font-medium' : 'text-zinc-300'}`}>
                    {item.text}
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
