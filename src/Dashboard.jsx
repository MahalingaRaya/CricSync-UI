import React from 'react';
import { MapPin, Shield, Target, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from './AppContext'; // <-- Hook context data

export const Dashboard = () => {
  const { jobs, liveMatch } = useApp(); // Destructure state variables

  const getIcon = (role) => {
    if (role.includes("Umpire")) return <Shield className="text-amber-400" />;
    if (role.includes("Scorer")) return <Target className="text-purple-400" />;
    return <Mic className="text-cyan-400" />;
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6 mb-20">
      
      {/* DYNAMIC AUDIENCE LIVE SCORE CARD */}
      <div className="relative rounded-3xl bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800/80 p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
          <span className="flex items-center gap-1.5 text-red-500"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />Live Scoreboard</span>
          <span className="flex items-center gap-1"><MapPin size={12} /> {liveMatch.venue}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-white">{liveMatch.teamA}</h2>
            <div className="text-4xl font-black text-emerald-400 mt-1">
              {liveMatch.runs}<span className="text-xl text-zinc-600">/{liveMatch.wickets}</span>
            </div>
            <p className="text-zinc-500 font-semibold text-xs mt-1">
              {Math.floor(liveMatch.balls / 6)}.{liveMatch.balls % 6} Overs
            </p>
          </div>
          <div className="text-right opacity-30">
            <h2 className="text-xl font-black text-white">{liveMatch.teamB}</h2>
            <p className="text-zinc-500 font-bold text-xs mt-1">Yet to bat</p>
          </div>
        </div>
        <Link to="/live" className="block mt-4 text-center bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold py-2.5 rounded-xl border border-zinc-800">
          Open Match Center / Commentary Feed
        </Link>
      </div>

      {/* DYNAMIC PROFESSIONALS MARKETPLACE */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Available Marketplace Openings</h3>
        
        {jobs.map((job, i) => (
          <div key={i} className="bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 shrink-0">
                {getIcon(job.role)}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{job.role}</h4>
                <p className="text-xs text-zinc-400 font-medium">{job.league}</p>
                <p className="text-[10px] text-zinc-500 font-semibold mt-0.5 flex items-center gap-0.5"><MapPin size={10}/>{job.venue}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-black text-emerald-400 mb-1.5">₹ {job.pay}</p>
              <button onClick={() => alert("Application submitted successfully to the tournament organizer!")} className="bg-white text-black text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-zinc-200">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
