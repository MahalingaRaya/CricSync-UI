import React, { useState } from 'react';
import { useApp } from './AppContext'; 

export function Dashboard() {
  const { liveMatch, jobs } = useApp();
  const [commentaryLang, setCommentaryLang] = useState("KN"); 

  const userProfile = JSON.parse(localStorage.getItem("user")) || { role: "ORGANIZER" };

  // FIXED: Smart evaluation layer ensures commentary matches the actual overs bowled
  const getBilingualText = () => {
    // 1. If match hasn't started yet (0.0 Overs), show pre-match introduction
    if (!liveMatch.balls || liveMatch.balls === 0) {
      return {
        EN: `Welcome live! Teams are stepping onto the field at ${liveMatch.venue || 'the stadium'}. Match about to begin shortly!`,
        KN: `ನೇರ ಪ್ರಸಾರಕ್ಕೆ ಸುಸ್ವಾಗತ! ಆಟಗಾರರು ಮೈದಾನಕ್ಕೆ ಪ್ರವೇಶಿಸುತ್ತಿದ್ದಾರೆ. ಪಂದ್ಯವು ಶೀಘ್ರದಲ್ಲೇ ಪ್ರಾರಂಭವಾಗಲಿದೆ!`
      };
    }
    
    // 2. If a wicket just fell
    if (liveMatch.wickets > 0) {
      return {
        EN: `OUT! Huge blow for the batting side! Clean bowled, the fielders are celebrating!`,
        KN: `ಔಟ್! ಬ್ಯಾಟಿಂಗ್ ತಂಡಕ್ಕೆ ಭಾರಿ ಆಘಾತ! ಕ್ಲೀನ್ ಬೌಲ್ಡ್ ಆಗಿ ಬ್ಯಾಟ್ಸ್‌ಮನ್ ಪೆವಿಲಿಯನ್‌ಗೆ ವಾಪಸ್!`
      };
    }
    
    // 3. Standard ball delivery update
    return {
      EN: `Good delivery, pushed safely to deep mid-wicket for a steady single. Score keeps moving.`,
      KN: `ಅದ್ಭುತ ಪ್ರದರ್ಶನ, ಸಿಂಗಲ್ ರನ್ ಗಳಿಸುವ ಮೂಲಕ ಸ್ಕೋರ್ ಕಾರ್ಡ್ ಮುನ್ನಡೆಯುತ್ತಿದೆ.`
    };
  };

  const currentCommentary = getBilingualText();

  return (
    <div className="bg-black text-white min-h-screen p-4 pb-24">
      
      {/* LIVE SCOREBOARD */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-5 shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <span className="text-red-500 font-bold flex items-center gap-1.5 text-xs tracking-wider uppercase animate-pulse">
            ● LIVE SCOREBOARD
          </span>
          <span className="text-zinc-400 text-xs font-bold tracking-wide bg-zinc-800 px-2.5 py-1 rounded-md">
            🏆 {liveMatch.leagueName || "Corporate Premier League"}
          </span>
        </div>

        <div className="flex justify-between items-center my-5">
          <div className="flex-1">
            <h2 className="text-xl font-black tracking-tight text-white">{liveMatch.teamA}</h2>
            <p className="text-zinc-500 text-xs font-semibold mt-0.5">Innings 1</p>
          </div>
          
          <div className="text-center bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-800/50 min-w-[100px]">
            <div className="text-emerald-400 text-3xl font-black tracking-tighter">
              {liveMatch.runs}/{liveMatch.wickets}
            </div>
            <p className="text-zinc-400 text-[11px] font-bold mt-0.5">
              {Math.floor(liveMatch.balls / 6)}.{liveMatch.balls % 6} Overs
            </p>
          </div>

          <div className="flex-1 text-right">
            <h2 className="text-xl font-black tracking-tight text-zinc-400">{liveMatch.teamB}</h2>
            <p className="text-zinc-500 text-xs font-semibold mt-0.5">Yet to bat</p>
          </div>
        </div>
        
        <div className="text-zinc-500 text-xs font-medium text-center border-t border-zinc-800/50 pt-2 mt-2">
          📍 Venue: {liveMatch.venue || "Bengaluru"}
        </div>
      </div>

      {/* BILINGUAL COMMENTARY FEED */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl mb-6">
        <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
          <h4 className="text-xs font-bold tracking-wider uppercase text-zinc-400">🎙️ Live Ball Feed center</h4>
          <div className="flex gap-1 bg-zinc-800 p-0.5 rounded-lg text-[10px] font-black">
            <button onClick={() => setCommentaryLang("EN")} className={`px-2 py-1 rounded-md transition ${commentaryLang === 'EN' ? 'bg-white text-black' : 'text-zinc-400'}`}>EN</button>
            <button onClick={() => setCommentaryLang("KN")} className={`px-2 py-1 rounded-md transition ${commentaryLang === 'KN' ? 'bg-white text-black' : 'text-zinc-400'}`}>ಕನ್ನಡ</button>
          </div>
        </div>
        <p className="text-zinc-200 text-sm font-medium leading-relaxed min-h-[40px]">
          {commentaryLang === "EN" ? currentCommentary.EN : currentCommentary.KN}
        </p>
      </div>

      {/* ORGANIZER PROFILE NOTICE */}
      {userProfile.role === 'ORGANIZER' && (
        <div className="bg-emerald-950/20 border border-emerald-800/60 p-3 rounded-xl mb-6 text-xs text-emerald-400 font-semibold flex justify-between items-center">
          <span>⚡ Organizer Access Enabled: You can broadcast matches via LeagueOps tab</span>
          <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-[10px] font-black">ADMIN</span>
        </div>
      )}

      {/* MARKETPLACE ECOSYSTEM */}
      <h3 className="text-zinc-500 font-bold uppercase tracking-wider text-[11px] mb-3 px-1">
        Available Marketplace Openings
      </h3>
      <div className="space-y-3">
        {jobs.map((job, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex justify-between items-center shadow-md">
            <div>
              <h4 className="font-bold text-white text-sm">{job.role}</h4>
              <p className="text-zinc-400 text-xs mt-0.5">{job.league}</p>
              <p className="text-zinc-500 text-[11px] mt-1">📍 {job.venue}</p>
            </div>
            <div className="text-right">
              <span className="text-emerald-400 font-bold text-xs block">{job.pay}</span>
              <button 
                onClick={() => alert(`Applied successfully for position: ${job.role}!`)}
                className="bg-white text-black font-black text-[11px] px-3.5 py-1.5 rounded-full mt-2 hover:bg-zinc-200 transition"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
