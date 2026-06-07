import React from 'react';
import { UserCircle, Award, CheckCircle2, Star } from 'lucide-react';

export const Profile = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans pb-24">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        
        {/* Profile Header */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-emerald-900/40 to-cyan-900/40"></div>
          
          <UserCircle size={80} className="mx-auto text-zinc-400 relative z-10 bg-black rounded-full border-4 border-black" />
          <h2 className="text-2xl font-black text-white mt-4 flex items-center justify-center gap-2">
            Mahalinga Raya <CheckCircle2 size={18} className="text-emerald-400" />
          </h2>
          <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mt-1">Pro Scorer & Tech Umpire</p>
          
          <div className="flex justify-center gap-4 mt-6">
            <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl text-center">
              <span className="block text-2xl font-black text-white">42</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Matches</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl text-center">
              <span className="block text-2xl font-black text-white flex justify-center items-center gap-1">4.9<Star size={14} className="text-yellow-400 fill-yellow-400"/></span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Rating</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-zinc-400 uppercase tracking-widest px-2">Certifications & Badges</h3>
          
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4">
            <div className="bg-emerald-500/20 p-3 rounded-full text-emerald-400">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-black text-white">Level 2 Digital Scorer</h4>
              <p className="text-xs text-zinc-500 font-medium">Verified by CricSync Network</p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4">
            <div className="bg-cyan-500/20 p-3 rounded-full text-cyan-400">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-black text-white">Professional Umpire Badge</h4>
              <p className="text-xs text-zinc-500 font-medium">Completed 20+ error-free matches</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
