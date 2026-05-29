import React, { useState } from 'react';
import { useApp } from './AppContext'; 

export function Dashboard() {
  // FIXED: Destructured lastBallResult alongside your other global application states
  const { liveMatch, jobs, customCommentary, lastBallResult } = useApp();
  const [commentaryLang, setCommentaryLang] = useState("KN"); 

  const userProfile = JSON.parse(localStorage.getItem("user")) || { role: "ORGANIZER" };

  const getBilingualText = () => {
    // 1. OVERRIDE LAYER: If an organizer explicitly posts custom text, display it first
    if (customCommentary && customCommentary.trim() !== "") {
      return {
        EN: customCommentary,
        KN: `🎙️ ಲೈವ್ ಅಪ್ಡೇಟ್: "${customCommentary}"`
      };
    }

    // 2. Pre-match condition check if zero balls have been recorded
    if (!liveMatch.balls || liveMatch.balls === 0) {
      return {
        EN: `Welcome live! Teams are stepping onto the field at ${liveMatch.venue || 'the stadium'}. Match about to begin shortly!`,
        KN: `ನೇರ ಪ್ರಸಾರಕ್ಕೆ ಸುಸ್ವಾಗತ! ಆಟಗಾರರು ಮೈದಾನಕ್ಕೆ ಪ್ರವೇಶಿಸುತ್ತಿದ್ದಾರೆ. ಪಂದ್ಯವು ಶೀಘ್ರದಲ್ಲೇ ಪ್ರಾರಂಭವಾಗಲಿದೆ!`
      };
    }
    
    // 3. FLAWLESS RUN-BY-RUN COMMENTARY DICTIONARY EVALUATION
    switch (lastBallResult) {
      case "0":
        return {
          EN: "Dot ball! Brilliant defensive length, batsman plays it back carefully to the bowler.",
          KN: "ಡಾಟ್ ಬಾಲ್! ಅತ್ಯುತ್ತಮ ಲೈನ್ ಮತ್ತು ಲೆಂತ್ ಬೌಲಿಂಗ್ ಪ್ರದರ್ಶನ, ರನ್ ಗಳಿಸಲು ಬ್ಯಾಟ್ಸ್‌ಮನ್ ವಿಫಲ."
        };
      case "1":
        return {
          EN: `Single taken. Soft hands, pushed gently down to long-on to put the batting side on strike.`,
          KN: "ಒಂದು ರನ್! ಚೆಂಡನ್ನು ಲಾಂಗ್-ಆನ್ ಕಡೆಗೆ ತಳ್ಳಿ ನಿರಾಯಾಸವಾಗಿ ಒಂದು ರನ್ ಕಲೆಹಾಕಿದ ಬ್ಯಾಟ್ಸ್‌ಮನ್."
        };
      case "2":
        return {
          EN: "Two runs! Excellent running between the wickets, pushed into deep mid-wicket gap.",
          KN: "ಎರಡು ರನ್! ಉತ್ತಮ ಹೊಂದಾಣಿಕೆಯ ಓಟ, ಮೈದಾನದ ಖಾಲಿ ಜಾಗಕ್ಕೆ ತಳ್ಳಿ ಎರಡು ರನ್ ಕಲೆಹಾಕಿದ್ದಾರೆ."
        };
      case "3":
        return {
          EN: "Three runs spectacular! Superb placement and hard work by the boundary sweepers to save the four.",
          KN: "ಮೂರು ರನ್! ಬ್ಯಾಟ್‌ನಿಂದ ಅದ್ಭುತ ಹೊಡೆತ, ಫೀಲ್ಡರ್ ಬೌಂಡರಿ ತಡೆಯುವಷ್ಟರಲ್ಲಿ ಮೂರು ರನ್ ಓಡಿದ್ದಾರೆ."
        };
      case "4":
        return {
          EN: "FOUR! Gorgeous boundary! Cracking sound off the bat as it speeds away across the grass!",
          KN: "ನಾಲ್ಕು ರನ್! ಭರ್ಜರಿ ಬೌಂಡರಿ! ಬ್ಯಾಟ್‌ನ ಮಧ್ಯಭಾಗಕ್ಕೆ ತಗುಲಿದ ಚೆಂಡು ಮಿಂಚಿನ ವೇಗದಲ್ಲಿ ಬೌಂಡರಿ ಗೆರೆ ದಾಟಿದೆ!"
        };
      case "6":
        return {
          EN: "SIX! Absolute monster! High and handsome over deep square leg into the crowd! What a clean strike!",
          KN: "ಸಿಕ್ಸ್! ಭರ್ಜರಿ ಸಿಕ್ಸರ್! ಗಗನಚುಂಬಿ ಹೊಡೆತ, ಚೆಂಡು ನೇರವಾಗಿ ಕ್ರೀಡಾಂಗಣದ ಗ್ಯಾಲರಿಗೆ ಹೋಗಿ ಬಿದ್ದಿದೆ!"
        };
      case "W":
        return {
          EN: `OUT! Huge wicket falls! Clean bowled! Massive celebration breakout for the bowling side!`,
          KN: `ಔಟ್! ಭಾರಿ ಆಘಾತ! ಕ್ಲೀನ್ ಬೌಲ್ಡ್ ಆಗಿ ಬ್ಯಾಟ್ಸ್‌ಮನ್ ಪೆವಿಲಿಯನ್‌ಗೆ ವಾಪಸ್, ಬೌಲಿಂಗ್ ತಂಡದಲ್ಲಿ ಸಂಭ್ರಮ!`
        };
      default:
        return {
          EN: "Steady progression. Keeping the scoreboard moving forward systematically.",
          KN: "ಸ್ಥಿರ ಪ್ರದರ್ಶನ, ರನ್ ಗಳಿಸುವ ಮೂಲಕ ಸ್ಕೋರ್ ಕಾರ್ಡ್ ಮುನ್ನಡೆಯುತ್ತಿದೆ."
        };
    }
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
          <h4 className="text-xs font-bold tracking-wider uppercase text-zinc-400">🎙️ Live Ball Feed Center</h4>
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
