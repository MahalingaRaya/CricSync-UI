import React from 'react';
import { MapPin, Briefcase, Shield, Target, Mic, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const jobs = [
    { role: "Umpire Required", league: "Bangalore Corporate Cup", venue: "Chinnaswamy Stadium", pay: "自 2,500/Match", icon: <Shield className="text-amber-400" /> },
    { role: "Scorer Required", league: "Whitefield Premier League", venue: "Varthur Sports Ground", pay: "自 1,200/Match", icon: <Target className="text-purple-400" /> },
    { role: "Commentator Wanted", league: "Karnataka State T20", venue: "Alur Grounds", pay: "自 3,000/Day", icon: <Mic className="text-cyan-400" /> }
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6 mb-20">
      
      {/* 1. AUDIENCE WATCHES LIVE MATCH */}
      <div className="relative rounded-3xl bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800/80 p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
          <span className="flex items-center gap-1.5 text-red-500"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />Live Scoreboard</span>
          <span className="flex items-center gap-1"><MapPin size={12} /> Chinnaswamy Stadium</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-white">RCB</h2>
            <div className="text-4xl font-black text-emerald-400 mt-1">186<span className="text-xl text-zinc-600">/4</span></div>
            <p className="text-zinc-500 font-semibold text-xs mt-1">18.3 Overs</p>
          </div>
          <div className="text-right opacity-30">
            <h2 className="text-xl font-black text-white">CSK</h2>
            <p className="text-zinc-500 font-bold text-xs mt-1">Yet to bat</p>
          </div>
        </div>
        <Link to="/live" className="block mt-4 text-center bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold py-2.5 rounded-xl border border-zinc-800">
          Open Match Center / Commentary Feed
        </Link>
      </div>

      {/* 2. PROFESSIONALS FIND OPPORTUNITIES */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Available Marketplace Openings</h3>
        
        {jobs.map((job, i) => (
          <div key={i} className="bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 shrink-0">{job.icon}</div>
              <div>
                <h4 className="font-bold text-white text-sm">{job.role}</h4>
                <p className="text-xs text-zinc-400 font-medium">{job.league}</p>
                <p className="text-[10px] text-zinc-500 font-semibold mt-0.5 flex items-center gap-0.5"><MapPin size={10}/>{job.venue}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-black text-emerald-400 mb-1.5">{job.pay}</p>
              <button onClick={() => alert("Application submitted to tournament organizer!")} className="bg-white text-black text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-zinc-200">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
