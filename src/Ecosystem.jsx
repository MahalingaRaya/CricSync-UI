import React from 'react';
import { Briefcase, MapPin, CheckCircle, Shield, Mic, Target } from 'lucide-react';

export const Ecosystem = () => {
  const jobs = [
    { role: "Lead Umpire", pay: "₹2,500/match", event: "Bangalore Corporate Cup", icon: <Shield size={18} className="text-amber-500"/>, urgent: true },
    { role: "Digital Scorer", pay: "₹1,200/match", event: "Whitefield Premier League", icon: <Target size={18} className="text-purple-500"/>, urgent: false },
    { role: "English Commentator", pay: "₹3,000/day", event: "Karnataka State T20", icon: <Mic size={18} className="text-cyan-500"/>, urgent: true }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto mb-20 md:mb-0 space-y-6">
      
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-zinc-800 shadow-xl">
        <h1 className="text-3xl font-black text-white mb-2">Cricket Network</h1>
        <p className="text-zinc-400 text-sm font-medium">The official hiring board for umpires, scorers, and commentators.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest px-1">Open Positions</h2>
        
        {jobs.map((job, index) => (
          <div key={index} className="bg-zinc-900/50 border border-zinc-800/80 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-800/50 transition">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-950 flex items-center justify-center border border-zinc-800 shrink-0">
                {job.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white text-lg">{job.role}</h3>
                  {job.urgent && <span className="bg-red-500/20 text-red-400 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">Urgent</span>}
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-zinc-500">
                  <span className="flex items-center gap-1"><Briefcase size={12}/> {job.event}</span>
                  <span className="flex items-center gap-1"><MapPin size={12}/> Bangalore</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center gap-2 border-t border-zinc-800 pt-4 md:pt-0 md:border-0">
              <span className="font-black text-emerald-400">{job.pay}</span>
              <button className="bg-white hover:bg-zinc-200 text-black text-xs font-bold px-5 py-2 rounded-full transition">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
