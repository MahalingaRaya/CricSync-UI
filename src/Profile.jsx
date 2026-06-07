import React from 'react';
import { UserCircle, Award, CheckCircle2, Star, Code2, Database, Layout } from 'lucide-react';

export const Profile = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans pb-24">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        
        {/* Profile Header */}
        <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 rounded-[2.5rem] p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-emerald-600/30 to-cyan-600/30 blur-2xl"></div>
          
          <UserCircle size={90} className="mx-auto text-zinc-400 relative z-10 bg-black rounded-full border-4 border-black shadow-xl" />
          <h2 className="text-3xl font-black text-white mt-4 flex items-center justify-center gap-2 relative z-10">
            Mahalinga Raya <CheckCircle2 size={22} className="text-emerald-400" />
          </h2>
          <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mt-2 relative z-10">Software Developer • Creator of CricSync</p>
          
          <div className="flex justify-center gap-4 mt-8 relative z-10">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl text-center w-full">
              <span className="block text-3xl font-black text-white">42</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Matches Logged</span>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl text-center w-full">
              <span className="block text-3xl font-black text-white flex justify-center items-center gap-1">4.9<Star size={18} className="text-yellow-400 fill-yellow-400"/></span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Global Rating</span>
            </div>
          </div>
        </div>

        {/* Tech Stack & Engineering Badges */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest px-2">Engineering & Stack</h3>
          
          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-3xl flex items-center gap-5 hover:border-cyan-500/50 transition">
            <div className="bg-cyan-500/20 p-3.5 rounded-2xl text-cyan-400"><Layout size={24} /></div>
            <div>
              <h4 className="font-black text-white text-lg">React.js Frontend</h4>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">Context API, Tailwind CSS, Vercel</p>
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-3xl flex items-center gap-5 hover:border-emerald-500/50 transition">
            <div className="bg-emerald-500/20 p-3.5 rounded-2xl text-emerald-400"><Database size={24} /></div>
            <div>
              <h4 className="font-black text-white text-lg">Spring Boot Engine</h4>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">Java, Hibernate JPA, RESTful API</p>
            </div>
          </div>
        </div>

        {/* System Badges */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest px-2">Ecosystem Role</h3>
          <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-3xl flex items-center gap-5">
            <div className="bg-purple-500/20 p-3.5 rounded-2xl text-purple-400"><Code2 size={24} /></div>
            <div>
              <h4 className="font-black text-white text-lg">System Architect</h4>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">Founder @ Maha Tech Mahi</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
