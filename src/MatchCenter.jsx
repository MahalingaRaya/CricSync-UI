import React, { useState } from 'react';
import { Mic, RotateCcw, UserCircle2, ChevronLeft } from 'lucide-react';
import { useApp } from './AppContext';

export const MatchCenter = () => {
  const { liveMatch, timeline, customCommentary, setCustomCommentary, processDelivery, undoLastAction, history, startSecondInnings, battingRoster, bowlingRoster, striker, setStriker, nonStriker, setNonStriker, currentBowler, setCurrentBowler } = useApp();
  const [commentBox, setCommentBox] = useState("");
  
  // Controls the Keypad Menu
  const [extraMode, setExtraMode] = useState(null); // null, 'WD', 'NB', 'B', 'LB'

  const isOverLimit = liveMatch.balls >= liveMatch.maxOvers * 6;
  const isAllOut = liveMatch.wickets >= 10;
  const isTargetReached = liveMatch.innings === 2 && liveMatch.runs >= liveMatch.target;
  const isInningsOneOver = liveMatch.innings === 1 && (isOverLimit || isAllOut);
  const isMatchOver = liveMatch.innings === 2 && (isOverLimit || isAllOut || isTargetReached);
  const needsPlayerSelection = !striker || !nonStriker || !currentBowler;

  // Handles standard runs off the bat
  const handleBatRun = (runs) => {
    processDelivery({ batterRuns: runs, extraRuns: 0, isLegal: true, physicalRuns: runs, isWicket: false, eventText: `${runs} off the bat` });
  };

  const handleWicket = () => {
    processDelivery({ batterRuns: 0, extraRuns: 0, isLegal: true, physicalRuns: 0, isWicket: true, eventText: "WICKET! Clean Bowled!" });
    setStriker(null);
  };

  // Handles Wides, NBs, Byes, Leg Byes with their physical runs
  const executeExtra = (physicalRunsRun) => {
    if (extraMode === 'WD') {
      processDelivery({ batterRuns: 0, extraRuns: 1 + physicalRunsRun, isLegal: false, physicalRuns: physicalRunsRun, eventText: `Wide + ${physicalRunsRun} runs` });
    } else if (extraMode === 'NB') {
      processDelivery({ batterRuns: physicalRunsRun, extraRuns: 1, isLegal: false, physicalRuns: physicalRunsRun, eventText: `No Ball + ${physicalRunsRun} off bat` });
    } else if (extraMode === 'B') {
      processDelivery({ batterRuns: 0, extraRuns: physicalRunsRun, isLegal: true, physicalRuns: physicalRunsRun, isByeOrLegBye: true, eventText: `${physicalRunsRun} Byes` });
    } else if (extraMode === 'LB') {
      processDelivery({ batterRuns: 0, extraRuns: physicalRunsRun, isLegal: true, physicalRuns: physicalRunsRun, isByeOrLegBye: true, eventText: `${physicalRunsRun} Leg Byes` });
    }
    setExtraMode(null); // Return to standard keypad
  };

  return (
    <div className="p-4 max-w-7xl mx-auto mb-20 space-y-6 bg-black min-h-screen text-white font-sans">
      
      {/* MAIN SCORECARD */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-xl mx-auto mb-2 shadow-2xl relative overflow-hidden">
        {liveMatch.innings === 2 && (
          <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-black text-center text-[10px] font-black tracking-widest py-1 uppercase">Target: {liveMatch.target} • Need {liveMatch.target - liveMatch.runs} from {(liveMatch.maxOvers * 6) - liveMatch.balls}</div>
        )}

        <div className={`flex justify-between items-center mb-4 ${liveMatch.innings === 2 ? 'mt-4' : ''}`}>
          <span className="text-red-500 font-bold flex items-center gap-1.5 text-xs tracking-wider uppercase animate-pulse">● LIVE SCOREBOARD</span>
          <span className="text-zinc-400 text-xs font-black tracking-wide bg-zinc-800 px-3 py-1 rounded-xl">📍 {liveMatch.maxOvers} Overs</span>
        </div>

        <div className="flex justify-between items-center my-6">
          <div className="flex-1">
            <h2 className={`text-xl font-black ${liveMatch.innings === 1 ? 'text-white' : 'text-zinc-500'}`}>{liveMatch.innings === 1 ? liveMatch.teamA : liveMatch.teamB}</h2>
          </div>
          <div className="text-center bg-zinc-950 px-5 py-3 rounded-2xl border border-zinc-800 min-w-[100px]">
            <div className="text-emerald-400 text-3xl font-black tracking-tighter">{liveMatch.runs}/{liveMatch.wickets}</div>
            <p className="text-zinc-400 text-[11px] font-bold mt-0.5">{Math.floor(liveMatch.balls / 6)}.{liveMatch.balls % 6} Overs</p>
          </div>
          <div className="flex-1 text-right">
            <h2 className={`text-xl font-black ${liveMatch.innings === 1 ? 'text-zinc-500' : 'text-white'}`}>{liveMatch.innings === 1 ? liveMatch.teamB : liveMatch.teamA}</h2>
          </div>
        </div>

        {/* BATSMAN & BOWLER LIVE STATS TABLE */}
        {!needsPlayerSelection && !isInningsOneOver && !isMatchOver && (
          <div className="mt-6 pt-4 border-t border-zinc-800 grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-[10px] text-zinc-500 uppercase font-black mb-2 px-1"><span>Batsman</span><span>R (B)</span></div>
              <div className="flex justify-between text-xs font-bold text-emerald-400 bg-emerald-950/20 px-2 py-1.5 rounded-lg mb-1">
                <span className="flex items-center gap-1">▶ {striker.playerName}</span>
                <span>{striker.runsScored} <span className="text-zinc-500 text-[10px]">({striker.ballsFaced})</span></span>
              </div>
              <div className="flex justify-between text-xs font-medium text-zinc-400 px-2 py-1">
                <span>{nonStriker.playerName}</span>
                <span>{nonStriker.runsScored} <span className="text-zinc-600 text-[10px]">({nonStriker.ballsFaced})</span></span>
              </div>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <div className="flex justify-between text-[10px] text-zinc-500 uppercase font-black mb-2 px-1"><span>Bowler</span><span>O-M-R-W</span></div>
              <div className="flex justify-between text-xs font-bold text-cyan-400 bg-cyan-950/20 px-2 py-1.5 rounded-lg">
                <span className="flex items-center gap-1">▶ {currentBowler.playerName}</span>
                <span>{currentBowler.oversBowled.toFixed(1)}-0-{currentBowler.runsConceded}-{currentBowler.wicketsTaken}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
        
        {/* MATCH CONTROL ZONE */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col justify-center relative">
          <button onClick={undoLastAction} disabled={history.length === 0} className="absolute top-6 right-6 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-zinc-300 px-3 py-1.5 rounded-lg transition"><RotateCcw size={12} /> Undo</button>
          
          {isInningsOneOver ? (
            <div className="text-center py-6">
              <h2 className="text-2xl font-black text-white mb-2">Innings Complete</h2>
              <button onClick={startSecondInnings} className="bg-emerald-500 text-black font-black w-full py-4 rounded-xl text-lg mt-4">Start Run Chase</button>
            </div>
          ) : isMatchOver ? (
            <div className="text-center py-6">
              <h2 className="text-2xl font-black text-white mb-2">Match Finished!</h2>
              <p className="text-emerald-400 font-bold bg-emerald-900/30 border border-emerald-800 py-3 rounded-xl">{isTargetReached ? `${liveMatch.teamB} wins!` : `${liveMatch.teamA} wins!`}</p>
            </div>
          ) : needsPlayerSelection ? (
            <div className="space-y-4">
              <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2"><UserCircle2 size={16}/> Select Active Players</h3>
              {!striker && <select onChange={(e) => setStriker(battingRoster.find(p => p.id == e.target.value))} className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white"><option value="">Select Striker...</option>{battingRoster.map(p => <option key={p.id} value={p.id}>{p.playerName}</option>)}</select>}
              {!nonStriker && <select onChange={(e) => setNonStriker(battingRoster.find(p => p.id == e.target.value))} className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white"><option value="">Select Non-Striker...</option>{battingRoster.map(p => <option key={p.id} value={p.id}>{p.playerName}</option>)}</select>}
              {!currentBowler && <select onChange={(e) => setCurrentBowler(bowlingRoster.find(p => p.id == e.target.value))} className="w-full bg-zinc-950 border border-cyan-900 rounded-xl px-4 py-3 text-white"><option value="">Select Bowler...</option>{bowlingRoster.map(p => <option key={p.id} value={p.id}>{p.playerName}</option>)}</select>}
            </div>
          ) : extraMode ? (
            /* EXTRAS SUB-MENU */
            <div className="animate-in fade-in zoom-in duration-200">
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => setExtraMode(null)} className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition"><ChevronLeft size={16} /></button>
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">How many physical runs on this {extraMode}?</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3, 4].map(num => (<button key={num} onClick={() => executeExtra(num)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-black text-lg h-14 rounded-xl active:scale-95">{num}</button>))}
              </div>
            </div>
          ) : (
            /* STANDARD KEYPAD */
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Scorer Keypad</h3>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3, 4, 6].map(num => (<button key={num} onClick={() => handleBatRun(num)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-black text-lg h-12 rounded-xl active:scale-95">{num}</button>))}
                <button onClick={handleWicket} className="bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 font-black text-xs h-12 rounded-xl col-span-2 active:scale-95">WICKET</button>
                
                {/* EXTRA BUTTONS - Opens Sub-Menu */}
                <button onClick={() => setExtraMode('WD')} className="bg-orange-500/20 text-orange-400 border border-orange-500/40 hover:bg-orange-500/30 font-black text-xs h-12 rounded-xl active:scale-95">WD</button>
                <button onClick={() => setExtraMode('NB')} className="bg-purple-500/20 text-purple-400 border border-purple-500/40 hover:bg-purple-500/30 font-black text-xs h-12 rounded-xl active:scale-95">NB</button>
                <button onClick={() => setExtraMode('B')} className="bg-blue-500/20 text-blue-400 border border-blue-500/40 hover:bg-blue-500/30 font-black text-xs h-12 rounded-xl active:scale-95">BYE</button>
                <button onClick={() => setExtraMode('LB')} className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/30 font-black text-xs h-12 rounded-xl active:scale-95">LB</button>
              </div>
            </div>
          )}
        </div>

        {/* TIMELINE FEED */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col">
          <div className="flex justify-between items-center mb-4"><h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><Mic size={14} className="text-cyan-400" /> Broadcaster</h3></div>
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
