import React, { useState } from 'react';
import { useApp } from './AppContext'; 

export function Dashboard() {
  // FIXED: Destructured timeline alongside liveMatch, jobs, and customCommentary
  const { liveMatch, jobs, timeline, customCommentary, lastBallResult } = useApp();
  const [commentaryLang, setCommentaryLang] = useState("KN"); 

  const userProfile = JSON.parse(localStorage.getItem("user")) || { role: "ORGANIZER" };

  const getBilingualText = () => {
    // 1. OVERRIDE LAYER: If an organizer explicitly posts custom text from the box, display it first
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
    
    // 3. RUN-BY-RUN COMMENTARY DICTIONARY EVALUATION BASED ON DATABASE LOGS
    // Fallback to checking state if timeline hasn't finished loading yet
    switch (lastBallResult) {
      case "0":
        return {
          EN: "Dot ball! Brilliant defensive length, batsman plays it back carefully to the bowler.",
          KN: "ಡಾಟ್ ಬಾಲ್! ಅತ್ಯುತ್ತಮ ಲೈನ್ ಮತ್ತು ಲೆಂತ್ ಬೌಲಿಂಗ್ ಪ್ರದರ್ಶನ, ರನ್ ಗಳಿಸಲು ಬ್ಯಾಟ್ಸ್‌ಮನ್ ವಿಫಲ."
        };
      case "1":
        return {
          EN: "Single taken. Soft hands, pushed gently down to long-on to put the batting side on strike.",
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
          EN: "OUT! Huge wicket falls! Clean bowled! Massive celebration breakout for the bowling side!",
          KN: "ಔಟ್! ಭಾರಿ ಆಘಾತ! ಕ್ಲೀನ್ ಬೌಲ್ಡ್ ಆಗಿ ಬ್ಯಾಟ್ಸ್‌ಮನ್ ಪೆವಿಲಿಯನ್‌ಗೆ ವಾಪಸ್, ಬೌಲಿಂಗ್ ತಂಡದಲ್ಲಿ ಸಂಭ್ರಮ!"
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
    <div className="bg-black text-white min-h-screen p-4 pb-24 font-sans">
      
      {/* LIVE SCOREBOARD */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-xl mx-auto mb-5 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-red-500 font-bold flex items-center gap-1.5 text-xs tracking-wider uppercase animate-pulse">
            ● LIVE SCOREBOARD
          </span>
          <span className="text-zinc-400 text-xs font-black tracking-wide bg-zinc-800 px-3 py-1 rounded-xl">
            🏆 {liveMatch.leagueName || "Corporate Premier League"}
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
        
        <div className="text-zinc-500 text-xs font-medium text-center border-t border-zinc-800/40 pt-3 mt-2">
          📍 Venue: {liveMatch.venue || "Bengaluru"}
        </div>
      </div>

      {/* BILINGUAL COMMENTARY FEED */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl max-w-xl mx-auto mb-5 shadow-xl">
        <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2.5">
          <h4 className="text-xs font-black tracking-wider uppercase text-zinc-400">🎙️ Latest Over Comment</h4>
          <div className="flex gap-1 bg-zinc-950 p-0.5 rounded-xl text-[10px] font-black border border-zinc-800">
            <button onClick={() => setCommentaryLang("EN")} className={`px-2.5 py-1 rounded-lg ${commentaryLang === 'EN' ? 'bg-white text-black font-black' : 'text-zinc-500'}`}>EN</button>
            <button onClick={() => setCommentaryLang("KN")} className={`px-2.5 py-1 rounded-lg ${commentaryLang === 'KN' ? 'bg-white text-black font-black' : 'text-zinc-500'}`}>ಕನ್ನಡ</button>
          </div>
        </div>
        <p className="text-zinc-100 text-sm font-semibold leading-relaxed min-h-[40px]">
          {commentaryLang === "EN" ? currentCommentary.EN : currentCommentary.KN}
        </p>
      </div>

      {/* NEW SECTION: SCROLLING PERMANENT BALL TIMELINE LOG HISTORY FROM DATABASE */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl max-w-xl mx-auto mb-6 shadow-xl">
        <h3 className="text-xs font-black tracking-wider uppercase text-zinc-500 mb-4 px-0.5">
          📜 Full Inning Summary Timeline
        </h3>
        <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
          {timeline.length === 0 ? (
            <p className="text-zinc-600 text-xs font-bold text-center py-4">No historical deliveries logged in backend database yet.</p>
          ) : (
            timeline.map((log) => (
              <div key={log.id} className="flex gap-4 bg-zinc-950/60 border border-zinc-800/40 p-3 rounded-xl items-center">
                <span className="font-black text-zinc-500 text-xs bg-zinc-900 px-2 py-1 rounded border border-zinc-800 text-center min-w-[38px]">
                  Ov {log.overDisplay}
                </span>
                <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${log.isWicket ? 'bg-red-500 text-white' : log.runValue === 6 || log.runValue === 4 ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                  {log.isWicket ? 'W' : log.runValue}
                </span>
                <p className="text-xs text-zinc-300 font-medium truncate flex-1">
                  {commentaryLang === "EN" ? log.commentaryEn : log.commentaryKn}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ORGANIZER PROFILE NOTICE */}
      {userProfile.role === 'ORGANIZER' && (
        <div className="bg-emerald-950/20 border border-emerald-800/60 p-3 rounded-xl mb-6 text-xs text-emerald-400 font-semibold flex justify-between items-center max-w-xl mx-auto">
          <span>⚡ Organizer Access Enabled: You can broadcast matches via LeagueOps tab</span>
          <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-[10px] font-black">ADMIN</span>
        </div>
      )}

      {/* CLOUD CONNECTED JOB MARKETPLACE ECOSYSTEM */}
      <div className="max-w-xl mx-auto">
        <h3 className="text-zinc-500 font-bold uppercase tracking-wider text-[11px] mb-3 px-1">
          Available Marketplace Openings
        </h3>
        <div className="space-y-3">
          {jobs.length === 0 ? (
            <div className="text-center p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-xs text-zinc-500 font-bold">
              No tournament roles currently listed in cloud storage database.
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex justify-between items-center shadow-md">
                <div>
                  <h4 className="font-bold text-white text-sm">{job.roleRequired || job.role}</h4>
                  <p className="text-zinc-400 text-xs mt-0.5">{job.leagueName || job.league}</p>
                  <p className="text-zinc-500 text-[11px] mt-1.5 flex items-center gap-1">📍 {job.venue}</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold text-xs block tracking-tight bg-emerald-950/30 border border-emerald-900/50 px-2.5 py-0.5 rounded-md">
                    {job.payPerMatch || job.pay}
                  </span>
                  <button 
                    onClick={() => alert(`Applied successfully for position: ${job.roleRequired || job.role}!`)}
                    className="bg-white text-black font-black text-[11px] px-4 py-1.5 rounded-full mt-3 hover:bg-zinc-200 transition-colors shadow-md"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
