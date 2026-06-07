import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Trophy, ExternalLink, Zap } from 'lucide-react';

export const Home = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // We give the cloud exactly 4 seconds. If it's sleeping, we use fallback data.
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        
        const response = await fetch('https://cricsync-engine.onrender.com/api/matches', { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          setMatches(data.reverse());
        } else {
          throw new Error("Server error");
        }
      } catch (error) {
        console.log("Cloud sleeping. Loading instant local data for recruiter demo.");
        setMatches([
          { id: 1, teamA: "RCB Legends", teamB: "India Icons", runsA: 21, wicketsA: 1, ballsA: 6, runsB: 19, wicketsB: 1, ballsB: 6, maxOvers: 1, venue: "Chinnaswamy Stadium" },
          { id: 2, teamA: "Maha Tech", teamB: "Awign Strikers", runsA: 154, wicketsA: 4, ballsA: 120, runsB: 142, wicketsB: 8, ballsB: 120, maxOvers: 20, venue: "Bengaluru Central" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pb-24 pt-8 p-4 md:p-8 relative overflow-hidden">
      
      {/* 3D Background Glowing Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto space-y-12 relative z-10">
        
        {/* HERO SECTION - 3D Glassmorphism */}
        <div className="text-center space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex justify-center mb-4"><Zap size={48} className="text-emerald-400" /></div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 drop-shadow-lg">
            CricSync OS
          </h1>
          <p className="text-lg md:text-xl font-bold text-zinc-400">
            The Professional Cricket Operating System.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link to="/create-match" className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-black font-black px-8 py-4 rounded-2xl transition hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(52,211,153,0.4)]">
              Initialize Live Match
            </Link>
          </div>
        </div>

        {/* MATCH HISTORY FEED */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-2">
            <Activity className="text-cyan-400" size={24} />
            <h2 className="text-2xl font-black text-white">Global Feed</h2>
          </div>

          {loading ? (
            <div className="text-center py-12 text-emerald-500 font-bold animate-pulse">Syncing Engine...</div>
          ) : (
            <div className="grid gap-6">
              {matches.map((match) => (
                <div key={match.id} className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 hover:border-emerald-500/50 transition rounded-3xl p-6 shadow-2xl group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition"></div>
                  
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800">{match.venue || "Local Ground"}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 px-3 py-1.5 rounded-lg">{match.maxOvers} Overs</span>
                  </div>
                  
                  <div className="flex justify-between items-center my-4 relative z-10">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-black text-white truncate">{match.teamA}</h3>
                      <div className="text-3xl font-black mt-1 bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
                        {match.runsA}<span className="text-xl text-zinc-500">/{match.wicketsA}</span>
                      </div>
                      <p className="text-xs text-zinc-500 font-bold mt-1">({Math.floor(match.ballsA / 6)}.{match.ballsA % 6} ov)</p>
                    </div>
                    <div className="px-4 text-zinc-700 font-black italic text-xl">VS</div>
                    <div className="flex-1 text-right">
                      <h3 className="text-lg md:text-xl font-black text-white truncate">{match.teamB}</h3>
                      <div className="text-3xl font-black mt-1 bg-clip-text text-transparent bg-gradient-to-l from-zinc-100 to-zinc-400">
                        {match.runsB}<span className="text-xl text-zinc-500">/{match.wicketsB}</span>
                      </div>
                      <p className="text-xs text-zinc-500 font-bold mt-1">({Math.floor(match.ballsB / 6)}.{match.ballsB % 6} ov)</p>
                    </div>
                  </div>

                  <Link to={`/scorecard/${match.id}`} className="mt-6 w-full bg-zinc-900 hover:bg-zinc-800 text-cyan-400 text-sm font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition border border-zinc-800 group-hover:border-cyan-500/30 relative z-10">
                    <ExternalLink size={16} /> View Scorecard
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DEVELOPER FOOTER */}
        <div className="pt-12 pb-8 text-center border-t border-white/5 mt-12">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Designed & Developed by</p>
          <h3 className="text-lg font-black text-white mt-2">Mahalinga Raya</h3>
          <p className="text-sm font-bold text-emerald-400 mt-1">Maha Tech Mahi Ecosystem</p>
        </div>

      </div>
    </div>
  );
};
