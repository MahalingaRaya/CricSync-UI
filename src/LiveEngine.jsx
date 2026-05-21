import React, { useState } from 'react';
import { Target, Mic } from 'lucide-react';

export const LiveEngine = () => {
  // State for the Live Match Engine
  const [runs, setRuns] = useState(0);
  const [wkts, setWkts] = useState(0);
  const [balls, setBalls] = useState(0);
  const [feed, setFeed] = useState([]);
  const [commentBox, setCommentBox] = useState("");

  const handleScore = (runVal) => {
    setRuns(runs + runVal);
    setBalls(balls + 1);
    const overStr = `${Math.floor((balls + 1) / 6)}.${(balls + 1) % 6}`;
    setFeed([{ type: 'score', over: overStr, text: `Batter scores ${runVal} runs.` }, ...feed]);
  };

  const handleWicket = () => {
    setWkts(wkts + 1);
    setBalls(balls + 1);
    const overStr = `${Math.floor((balls + 1) / 6)}.${(balls + 1) % 6}`;
    setFeed([{ type: 'wicket', over: overStr, text: `OUT! Huge wicket for the fielding side.` }, ...feed]);
  };

  const handleCommentary = () => {
    if (!commentBox) return;
    const overStr = `${Math.floor(balls / 6)}.${balls % 6}`;
    setFeed([{ type: 'commentary', over: overStr, text: commentBox }, ...feed]);
    setCommentBox(""); // Clear input after posting
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto mb-20 md:mb-0 space-y-6">
      
      {/* Real-time Match Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-zinc-800 shadow-xl flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
            <Target className="text-purple-500" /> Live Engine
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm font-medium mt-1">Digital Scoring & Commentary Terminal</p>
        </div>
        <div className="text-right">
          <h2 className="text-4xl md:text-5xl font-black text-white">{runs}<span className="text-2xl text-zinc-600">/{wkts}</span></h2>
          <p className="text-emerald-400 font-bold mt-1 text-sm">Overs: {Math.floor(balls/6)}.{balls%6}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* The Scorer's Keypad */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Scorer Keypad</h3>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2, 3, 4, 6].map(num => (
              <button 
                key={num} 
                onClick={() => handleScore(num)} 
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xl h-16 rounded-2xl transition shadow-md active:scale-95"
              >
                {num}
              </button>
            ))}
            <button 
              onClick={handleWicket} 
              className="bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30 font-black text-xl h-16 rounded-2xl col-span-2 transition active:scale-95"
            >
              WICKET
            </button>
            <button 
              onClick={() => handleScore(0)} 
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-black text-sm h-16 rounded-2xl transition active:scale-95"
            >
              DOT
            </button>
          </div>
        </div>

        {/* The Commentator's Terminal */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl flex flex-col">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Mic size={14} /> Broadcaster Feed
          </h3>
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              value={commentBox}
              onChange={(e) => setCommentBox(e.target.value)}
              placeholder="Add ball-by-ball insight..." 
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
            />
            <button onClick={handleCommentary} className="bg-cyan-500 text-black font-bold px-4 py-2 rounded-xl text-sm transition active:scale-95">
              Post
            </button>
          </div>
          
          {/* Dynamic Feed Output */}
          <div className="flex-1 overflow-y-auto space-y-3 max-h-64 pr-2">
            {feed.length === 0 ? (
              <p className="text-zinc-600 text-sm font-medium text-center mt-10">Match feed is empty. Start scoring above.</p>
            ) : (
              feed.map((item, i) => (
                <div key={i} className="flex gap-3 bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                  <span className="font-black text-zinc-500 text-sm shrink-0">{item.over}</span>
                  <p className={`text-sm ${item.type === 'wicket' ? 'text-red-400 font-bold' : item.type === 'commentary' ? 'text-cyan-400 font-medium' : 'text-zinc-300'}`}>
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
