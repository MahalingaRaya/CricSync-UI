import React, { useState } from 'react';
import { Mic, RotateCcw, UserCircle2, ChevronLeft, Share2, Eye } from 'lucide-react';
import { useApp } from './AppContext';

export const MatchCenter = () => {
  const { liveMatch, timeline, processDelivery, undoLastAction, history, startSecondInnings, battingRoster, bowlingRoster, striker, setStriker, nonStriker, setNonStriker, currentBowler, setCurrentBowler, allPlayers } = useApp();
  const [extraMode, setExtraMode] = useState(null); 
  
  const [isPublishing, setIsPublishing] = useState(false);
  const [showInstantScorecard, setShowInstantScorecard] = useState(false);
  const [commentaryLang, setCommentaryLang] = useState('EN');

  const isOverLimit = liveMatch.balls >= liveMatch.maxOvers * 6;
  const isAllOut = liveMatch.wickets >= 10;
  const isTargetReached = liveMatch.innings === 2 && liveMatch.runs >= liveMatch.target;
  const isInningsOneOver = liveMatch.innings === 1 && (isOverLimit || isAllOut);
  const isMatchOver = liveMatch.innings === 2 && (isOverLimit || isAllOut || isTargetReached);
  const needsPlayerSelection = !striker || !nonStriker || !currentBowler;

  const getBatRunText = (runs) => {
    if (runs === 6) return { en: "SIX! Absolute monster hit!", kn: "ಭರ್ಜರಿ ಸಿಕ್ಸರ್! ಗಗನಚುಂಬಿ ಹೊಡೆತ!" };
    if (runs === 4) return { en: "FOUR! Beautifully timed drive!", kn: "ನಾಲ್ಕು ರನ್! ಭರ್ಜರಿ ಬೌಂಡರಿ!" };
    if (runs === 0) return { en: "Dot ball. Excellent delivery.", kn: "ಡಾಟ್ ಬಾಲ್! ಅತ್ಯುತ್ತಮ ಬೌಲಿಂಗ್." };
    return { en: `${runs} off the bat`, kn: `ಬ್ಯಾಟ್‌ನಿಂದ ${runs} ರನ್` };
  };

  const handleBatRun = (runs) => processDelivery({ batterRuns: runs, extraRuns: 0, isLegal: true, physicalRuns: runs, isWicket: false, eventText: getBatRunText(runs) });
  
  const handleWicket = () => { 
    processDelivery({ batterRuns: 0, extraRuns: 0, isLegal: true, physicalRuns: 0, isWicket: true, eventText: { en: "OUT! The woodwork is absolutely shattered!", kn: "ಔಟ್! ಭಾರಿ ಆಘಾತ! ಕ್ಲೀನ್ ಬೌಲ್ಡ್!" } }); 
    setStriker(null); 
  };

  const executeExtra = (physicalRunsRun) => {
    if (extraMode === 'WD') processDelivery({ batterRuns: 0, extraRuns: 1 + physicalRunsRun, isLegal: false, physicalRuns: physicalRunsRun, eventText: { en: `Wide + ${physicalRunsRun} runs`, kn: `ವೈಡ್ + ${physicalRunsRun} ರನ್` }});
    else if (extraMode === 'NB') processDelivery({ batterRuns: physicalRunsRun, extraRuns: 1, isLegal: false, physicalRuns: physicalRunsRun, eventText: { en: `No Ball + ${physicalRunsRun} off bat`, kn: `ನೋ ಬಾಲ್ + ${physicalRunsRun} ರನ್` }});
    else if (extraMode === 'B') processDelivery({ batterRuns: 0, extraRuns: physicalRunsRun, isLegal: true, physicalRuns: physicalRunsRun, isByeOrLegBye: true, eventText: { en: `${physicalRunsRun} Byes`, kn: `${physicalRunsRun} ಬೈಸ್` }});
    else if (extraMode === 'LB') processDelivery({ batterRuns: 0, extraRuns: physicalRunsRun, isLegal: true, physicalRuns: physicalRunsRun, isByeOrLegBye: true, eventText: { en: `${physicalRunsRun} Leg Byes`, kn: `${physicalRunsRun} ಲೆಗ್ ಬೈಸ್` }});
    setExtraMode(null); 
  };

  const publishAndCopyLink = async () => {
    setIsPublishing(true);
    try {
      await fetch('https://cricsync-engine.onrender.com/api/match-players/bulk', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(allPlayers) });
      const url = `${window.location.origin}/scorecard/${liveMatch.id}`;
      navigator.clipboard.writeText(url);
      // 🔥 CRICKET THEMED ALERT
      alert("🏏 Match result broadcasted! Official Scorecard link copied to your clipboard.");
    } catch (e) {
      alert("Network error. Stats are saved locally but failed to broadcast.");
    }
    setIsPublishing(false);
  };

  if (showInstantScorecard) {
    const teamAStats = allPlayers.filter(p => p.teamName === liveMatch.teamA);
    const teamBStats = allPlayers.filter(p => p.teamName === liveMatch.teamB);
    
    return (
      <div className="p-4 max-w-3xl mx-auto space-y-6 text-white font-sans pt-10 pb-24">
        <button onClick={() => setShowInstantScorecard(false)} className="text-cyan-400 font-bold flex items-center gap-2 mb-6 hover:text-cyan-300"><ChevronLeft size={20}/> Back to Match Center</button>
        <h2 className="text-3xl font-black mb-4">Instant Scorecard</h2>
        
        {/* INNINGS 1 */}
        <div className="bg-zinc-900/80 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 space-y-4 shadow-xl">
          <h3 className="text-lg font-black text-emerald-400 border-b border-zinc-800 pb-2 uppercase tracking-wider">{liveMatch.teamA} Innings</h3>
          
          <div className="mb-4">
            <h4 className="text-[10px] font-black text-zinc-500 mb-2 uppercase tracking-widest">Batting</h4>
            {teamAStats.filter(p => p.ballsFaced > 0 || p.runsScored > 0).map(p => (<div key={p.id} className="flex justify-between text-sm py-1"><span className="font-bold text-white">{p.playerName}</span><span className="text-zinc-400">{p.runsScored} ({p.ballsFaced})</span></div>))}
          </div>

          <div>
            <h4 className="text-[10px] font-black text-zinc-500 mb-2 uppercase tracking-widest">Bowling</h4>
            {teamBStats.filter(p => p.oversBowled > 0).map(p => (<div key={p.id} className="flex justify-between text-sm py-1"><span className="font-bold text-white">{p.playerName}</span><span className="text-zinc-400">{p.oversBowled.toFixed(1)} Overs - {p.wicketsTaken} W</span></div>))}
          </div>
        </div>

        {/* INNINGS 2 */}
        {liveMatch.innings === 2 && (
          <div className="bg-zinc-900/80 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 space-y-4 shadow-xl">
            <h3 className="text-lg font-black text-cyan-400 border-b border-zinc-800 pb-2 uppercase tracking-wider">{liveMatch.teamB} Innings</h3>
            
            <div className="mb-4">
              <h4 className="text-[10px] font-black text-zinc-500 mb-2 uppercase tracking-widest">Batting</h4>
              {teamBStats.filter(p => p.ballsFaced > 0 || p.runsScored > 0).map(p => (<div key={p.id} className="flex justify-between text-sm py-1"><span className="font-bold text-white">{p.playerName}</span><span className="text-zinc-400">{p.runsScored} ({p.ballsFaced})</span></div>))}
            </div>

            <div>
              <h4 className="text-[10px] font-black text-zinc-500 mb-2 uppercase tracking-widest">Bowling</h4>
              {teamAStats.filter(p => p.oversBowled > 0).map(p => (<div key={p.id} className="flex justify-between text-sm py-1"><span className="font-bold text-white">{p.playerName}</span><span className="text-zinc-400">{p.oversBowled.toFixed(1)} Overs - {p.wicketsTaken} W</span></div>))}
            </div>
          </div>
        )}

        {/* 🔥 CRICKET THEMED BUTTON */}
        <button onClick={publishAndCopyLink} disabled={isPublishing} className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-black text-lg py-4 rounded-xl flex justify-center items-center gap-2 transition active:scale-95 shadow-[0_0_15px_rgba(52,211,153,0.3)] mt-4">
          <Share2 size={20} /> {isPublishing ? "Transmitting to Pavilion..." : "Broadcast Official Scorecard"}
        </button>
      </div>
    );
  }

  // --- MAIN LIVE SCORING UI BELOW ---
  return (
    <div className="p-4 max-w-7xl mx-auto mb-20 space-y-6 bg-[#050505] min-h-screen text-white font-sans">
      <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 max-w-xl mx-auto mb-2 shadow-2xl relative overflow-hidden">
        {liveMatch.innings === 2 && <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-black text-center text-[10px] font-black tracking-widest py-1 uppercase">Target: {liveMatch.target} • Need {liveMatch.target - liveMatch.runs}</div>}
        <div className="flex justify-between items-center mb-4"><span className="text-red-500 font-bold flex items-center gap-1.5 text-xs tracking-wider uppercase animate-pulse">● LIVE</span><span className="text-zinc-400 text-xs font-black tracking-wide bg-zinc-800 px-3 py-1 rounded-xl">📍 {liveMatch.maxOvers} Overs</span></div>
        <div className="flex justify-between items-center my-6">
          <div className="flex-1"><h2 className={`text-xl font-black ${liveMatch.innings === 1 ? 'text-white' : 'text-zinc-500'}`}>{liveMatch.innings === 1 ? liveMatch.teamA : liveMatch.teamB}</h2></div>
          <div className="text-center bg-black/50 px-5 py-3 rounded-2xl border border-zinc-800 min-w-[100px]"><div className="text-emerald-400 text-3xl font-black tracking-tighter">{liveMatch.runs}/{liveMatch.wickets}</div><p className="text-zinc-400 text-[11px] font-bold mt-0.5">{Math.floor(liveMatch.balls / 6)}.{liveMatch.balls % 6} Overs</p></div>
          <div className="flex-1 text-right"><h2 className={`text-xl font-black ${liveMatch.innings === 1 ? 'text-zinc-500' : 'text-white'}`}>{liveMatch.innings === 1 ? liveMatch.teamB : liveMatch.teamA}</h2></div>
        </div>

        {!needsPlayerSelection && !isInningsOneOver && !isMatchOver && (
          <div className="mt-6 pt-4 border-t border-zinc-800 grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-[10px] text-zinc-500 uppercase font-black mb-2 px-1"><span>Batsman</span><span>R (B)</span></div>
              <div className="flex justify-between text-xs font-bold text-emerald-400 bg-emerald-950/20 px-2 py-1.5 rounded-lg mb-1"><span className="flex items-center gap-1">▶ {striker.playerName}</span><span>{striker.runsScored} <span className="text-zinc-500 text-[10px]">({striker.ballsFaced})</span></span></div>
              <div className="flex justify-between text-xs font-medium text-zinc-400 px-2 py-1"><span>{nonStriker.playerName}</span><span>{nonStriker.runsScored} <span className="text-zinc-600 text-[10px]">({nonStriker.ballsFaced})</span></span></div>
            </div>
            <div className="border-l border-zinc-800 pl-4">
              <div className="flex justify-between text-[10px] text-zinc-500 uppercase font-black mb-2 px-1"><span>Bowler</span><span>O-M-R-W</span></div>
              <div className="flex justify-between text-xs font-bold text-cyan-400 bg-cyan-950/20 px-2 py-1.5 rounded-lg"><span className="flex items-center gap-1">▶ {currentBowler.playerName}</span><span>{currentBowler.oversBowled.toFixed(1)}-0-{currentBowler.runsConceded}-{currentBowler.wicketsTaken}</span></div>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-6 rounded-3xl flex flex-col justify-center relative">
          <button onClick={undoLastAction} disabled={history.length === 0} className="absolute top-6 right-6 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 text-zinc-300 px-3 py-1.5 rounded-lg"><RotateCcw size={12} /> Undo</button>
          
          {isInningsOneOver ? (
            <div className="text-center py-6">
              <h2 className="text-2xl font-black text-white mb-2">Innings Complete</h2>
              <button onClick={startSecondInnings} className="bg-emerald-500 text-black font-black w-full py-4 rounded-xl text-lg mt-4 shadow-[0_0_15px_rgba(52,211,153,0.3)]">Start Run Chase</button>
            </div>
          ) : isMatchOver ? (
            <div className="text-center py-6">
              <h2 className="text-3xl font-black text-white mb-2">Match Finished!</h2>
              <p className="text-emerald-400 font-bold bg-emerald-900/30 border border-emerald-800 py-3 rounded-xl mb-6">{isTargetReached ? `${liveMatch.teamB} wins!` : `${liveMatch.teamA} wins!`}</p>
              <button onClick={() => setShowInstantScorecard(true)} className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-black text-lg py-4 rounded-xl transition active:scale-95 flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(52,211,153,0.3)]"><Eye size={20} /> View Full Scorecard</button>
            </div>
          ) : needsPlayerSelection ? (
            <div className="space-y-4">
              <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2"><UserCircle2 size={16}/> Select Active Players</h3>
              {!striker && <select onChange={(e) => setStriker(battingRoster.find(p => p.id == e.target.value))} className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white"><option value="">Select Striker...</option>{battingRoster.map(p => <option key={p.id} value={p.id}>{p.playerName}</option>)}</select>}
              {!nonStriker && <select onChange={(e) => setNonStriker(battingRoster.find(p => p.id == e.target.value))} className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white"><option value="">Select Non-Striker...</option>{battingRoster.map(p => <option key={p.id} value={p.id}>{p.playerName}</option>)}</select>}
              {!currentBowler && <select onChange={(e) => setCurrentBowler(bowlingRoster.find(p => p.id == e.target.value))} className="w-full bg-zinc-950 border border-cyan-900 rounded-xl px-4 py-3 text-white"><option value="">Select Bowler...</option>{bowlingRoster.map(p => <option key={p.id} value={p.id}>{p.playerName}</option>)}</select>}
            </div>
          ) : extraMode ? (
             <div className="animate-in fade-in zoom-in duration-200">
              <div className="flex items-center gap-3 mb-4"><button onClick={() => setExtraMode(null)} className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700"><ChevronLeft size={16} /></button><h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">How many physical runs?</h3></div>
              <div className="grid grid-cols-4 gap-2">{[0, 1, 2, 3, 4, 5, 6].map(num => (<button key={num} onClick={() => executeExtra(num)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-black text-lg h-14 rounded-xl">{num}</button>))}</div>
            </div>
          ) : (
             <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Scorer Keypad</h3>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3, 4, 6].map(num => (<button key={num} onClick={() => handleBatRun(num)} className="bg-zinc-800 hover:bg-zinc-700 text-white font-black text-lg h-12 rounded-xl">{num}</button>))}
                <button onClick={handleWicket} className="bg-red-500/20 text-red-400 border border-red-500/40 font-black text-xs h-12 rounded-xl col-span-2 hover:bg-red-500/30">WICKET</button>
                <button onClick={() => setExtraMode('WD')} className="bg-orange-500/20 text-orange-400 border border-orange-500/40 font-black text-xs h-12 rounded-xl hover:bg-orange-500/30">WD</button>
                <button onClick={() => setExtraMode('NB')} className="bg-purple-500/20 text-purple-400 border border-purple-500/40 font-black text-xs h-12 rounded-xl hover:bg-purple-500/30">NB</button>
                <button onClick={() => setExtraMode('B')} className="bg-blue-500/20 text-blue-400 border border-blue-500/40 font-black text-xs h-12 rounded-xl hover:bg-blue-500/30">BYE</button>
                <button onClick={() => setExtraMode('LB')} className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-black text-xs h-12 rounded-xl hover:bg-cyan-500/30">LB</button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-6 rounded-3xl flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><Mic size={14} className="text-cyan-400" /> Broadcaster</h3>
            <div className="flex gap-1 bg-zinc-950 p-1 rounded-xl text-[10px] font-black border border-zinc-800">
              <button onClick={() => setCommentaryLang("EN")} className={`px-3 py-1 rounded-lg ${commentaryLang === 'EN' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>EN</button>
              <button onClick={() => setCommentaryLang("KN")} className={`px-3 py-1 rounded-lg ${commentaryLang === 'KN' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>ಕನ್ನಡ</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 max-h-56 pr-2">
            {timeline.length === 0 ? <p className="text-zinc-600 text-xs font-medium text-center mt-8">Feed empty.</p> : timeline.map((log) => (
              <div key={log.id} className="flex gap-3 bg-black/50 p-3 rounded-xl border border-zinc-800/50 items-center">
                <span className="font-black text-zinc-500 text-[10px] shrink-0 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">{log.overDisplay}</span>
                <p className="text-xs flex-1 text-zinc-300">{commentaryLang === 'EN' ? log.commentaryEn : log.commentaryKn}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
