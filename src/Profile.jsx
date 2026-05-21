import React, { useState } from 'react';
import { User, MapPin, Award, Shield, CheckCircle } from 'lucide-react';

export const Profile = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto mb-20 md:mb-0 space-y-6">
      
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 md:p-8 rounded-3xl border border-zinc-800 shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-3xl font-black text-black shadow-[0_0_30px_rgba(52,211,153,0.3)]">
          MR
        </div>
        <div className="text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <h1 className="text-3xl font-black text-white tracking-tight">Mahalinga Raya</h1>
            <CheckCircle size={20} className="text-emerald-500" />
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400 text-sm font-medium mb-4">
            <MapPin size={14} /> Bengaluru, Karnataka
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">All-Rounder</span>
            <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Right-Hand Bat</span>
            <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Right-Arm Medium</span>
          </div>
        </div>
      </div>

      {/* Career & Draft Status */}
      <div className="grid md:grid-cols-2 gap-4">
        
        {/* Availability Toggle */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Shield size={18} className="text-blue-400" /> Draft Status
            </h3>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Allow organizers to recruit you.</p>
          </div>
          <button 
            onClick={() => setIsAvailable(!isAvailable)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${isAvailable ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-zinc-800 text-zinc-400'}`}
          >
            {isAvailable ? 'AVAILABLE TO JOIN' : 'UNAVAILABLE'}
          </button>
        </div>

        {/* Stats Summary */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl flex items-center gap-6">
           <Award size={32} className="text-amber-400 opacity-80" />
           <div className="flex-1 grid grid-cols-3 gap-4 text-center">
             <div>
               <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Matches</p>
               <p className="text-xl font-black text-white">42</p>
             </div>
             <div>
               <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Runs</p>
               <p className="text-xl font-black text-emerald-400">1.2k</p>
             </div>
             <div>
               <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Wickets</p>
               <p className="text-xl font-black text-cyan-400">38</p>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};
