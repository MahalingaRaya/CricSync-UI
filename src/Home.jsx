import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-3xl w-full text-center space-y-8">
        
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            CricSync
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-zinc-300">
            The Local Cricket Operating System.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 max-w-xl mx-auto text-left shadow-2xl">
          <ul className="space-y-4 text-lg md:text-xl font-medium text-zinc-400">
            <li className="flex items-center gap-3"><span className="text-emerald-500">✔</span> Manage Teams.</li>
            <li className="flex items-center gap-3"><span className="text-emerald-500">✔</span> Run Matches.</li>
            <li className="flex items-center gap-3"><span className="text-emerald-500">✔</span> Score Live.</li>
            <li className="flex items-center gap-3"><span className="text-emerald-500">✔</span> Track Players.</li>
            <li className="flex items-center gap-3"><span className="text-emerald-500">✔</span> Organize Tournaments.</li>
          </ul>
        </div>

        <div className="pt-8 flex flex-wrap justify-center gap-4">
          <Link to="/create-match" className="bg-emerald-500 hover:bg-emerald-600 text-black font-black px-8 py-4 rounded-2xl transition active:scale-95">
            Create Match
          </Link>
          <Link to="/match-center" className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-8 py-4 rounded-2xl transition active:scale-95">
            Go to Match Center
          </Link>
        </div>

      </div>
    </div>
  );
};
