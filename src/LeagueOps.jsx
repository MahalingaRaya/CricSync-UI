import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

export const LeagueOps = () => {
  const [activeTab, setActiveTab] = useState('JOBS'); // 'JOBS' or 'MY_APPS'
  
  // Dummy data for the job board
  const [jobs, setJobs] = useState([
    { id: 1, role: "Main Umpire", league: "Bengaluru Corporate Cup", location: "Chinnaswamy Ground B", date: "This Sunday, 9:00 AM", fee: "₹1,500/match", applied: false, type: "Umpiring" },
    { id: 2, role: "Digital Scorer", league: "Tech Premier League", location: "Whitefield Sports Arena", date: "Saturday, 2:00 PM", fee: "₹800/match", applied: false, type: "Scoring" },
    { id: 3, role: "Kannada Commentator", league: "Karnataka State Tournament", location: "Hubli Central Ground", date: "Next Weekend", fee: "₹2,500/day", applied: false, type: "Media" },
    { id: 4, role: "Square Leg Umpire", league: "Bengaluru Corporate Cup", location: "Chinnaswamy Ground B", date: "This Sunday, 9:00 AM", fee: "₹1,000/match", applied: true, type: "Umpiring" }
  ]);

  const handleApply = (jobId) => {
    setJobs(jobs.map(job => job.id === jobId ? { ...job, applied: true } : job));
    alert("Application sent to League Organizer!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              Cricket Network
            </h1>
            <p className="text-zinc-500 text-sm font-bold mt-1">The Professional Marketplace for Cricket Ops</p>
          </div>
          <button className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-2 text-sm">
            <Briefcase size={16} /> Post a Job
          </button>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex gap-2 bg-zinc-950 p-1 rounded-2xl border border-zinc-800 w-full max-w-sm">
          <button 
            onClick={() => setActiveTab('JOBS')} 
            className={`flex-1 py-2 text-sm font-black rounded-xl transition ${activeTab === 'JOBS' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Job Board
          </button>
          <button 
            onClick={() => setActiveTab('MY_APPS')} 
            className={`flex-1 py-2 text-sm font-black rounded-xl transition ${activeTab === 'MY_APPS' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            My Applications
          </button>
        </div>

        {/* JOB FEED */}
        <div className="grid gap-4">
          {jobs.filter(j => activeTab === 'JOBS' ? !j.applied : j.applied).length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-zinc-800/50">
              <ShieldCheck size={48} className="mx-auto text-zinc-600 mb-4" />
              <h3 className="text-xl font-bold text-zinc-400">No active postings found.</h3>
            </div>
          ) : (
            jobs.filter(j => activeTab === 'JOBS' ? !j.applied : j.applied).map(job => (
              <div key={job.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition group flex flex-col md:flex-row justify-between gap-6">
                
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-zinc-950 border border-zinc-800 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg text-emerald-400">
                      {job.type}
                    </span>
                    {job.applied && <span className="bg-cyan-950 border border-cyan-900 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg text-cyan-400 flex items-center gap-1"><CheckCircle2 size={12}/> Applied</span>}
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-black text-white">{job.role}</h2>
                    <p className="text-zinc-400 font-bold text-sm">{job.league}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-zinc-500 pt-2">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {job.date}</span>
                    <span className="flex items-center gap-1 text-emerald-500 font-bold"><DollarSign size={14} /> {job.fee}</span>
                  </div>
                </div>

                <div className="flex items-center md:items-end md:justify-end">
                  {!job.applied ? (
                    <button onClick={() => handleApply(job.id)} className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-black font-black px-8 py-3 rounded-xl transition active:scale-95">
                      Easy Apply
                    </button>
                  ) : (
                    <button disabled className="w-full md:w-auto bg-zinc-950 border border-zinc-800 text-zinc-500 font-black px-8 py-3 rounded-xl cursor-not-allowed">
                      Application Under Review
                    </button>
                  )}
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
