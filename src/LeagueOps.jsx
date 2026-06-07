import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, DollarSign, CheckCircle2, Clock, ShieldCheck, X } from 'lucide-react';

export const LeagueOps = () => {
  const [activeTab, setActiveTab] = useState('JOBS');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Controls the "Post Job" popup
  const [showPostForm, setShowPostForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newJob, setNewJob] = useState({
    role: "Main Umpire",
    league: "Bengaluru Corporate Cup",
    location: "Chinnaswamy Stadium",
    date: "This Sunday, 9:00 AM",
    fee: "₹1,500/match",
    type: "Umpiring"
  });

  const API_URL = "https://cricsync-engine.onrender.com/api/matches/marketplace";

  // 1. FETCH JOBS FROM CLOUD
  const fetchJobs = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setJobs(data.reverse()); // Show newest jobs at the top
      }
    } catch (e) {
      console.error("Failed to fetch marketplace jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // 2. POST NEW JOB TO CLOUD
  const handlePostJob = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      });
      if (res.ok) {
        alert("Job successfully posted to the CricSync Network!");
        setShowPostForm(false);
        fetchJobs(); // Refresh the list to show the new job
      }
    } catch (e) {
      alert("Failed to connect to cloud engine.");
    }
    setIsSubmitting(false);
  };

  // 3. APPLY TO JOB (Local state for now)
  const handleApply = (jobId) => {
    setJobs(jobs.map(job => job.id === jobId ? { ...job, applied: true } : job));
    alert("Application sent to League Organizer!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans pb-24 relative">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              Cricket Network
            </h1>
            <p className="text-zinc-500 text-sm font-bold mt-1">The Professional Marketplace for Cricket Ops</p>
          </div>
          <button 
            onClick={() => setShowPostForm(true)}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-2 text-sm"
          >
            <Briefcase size={16} /> Post a Job
          </button>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex gap-2 bg-zinc-950 p-1 rounded-2xl border border-zinc-800 w-full max-w-sm">
          <button onClick={() => setActiveTab('JOBS')} className={`flex-1 py-2 text-sm font-black rounded-xl transition ${activeTab === 'JOBS' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Job Board</button>
          <button onClick={() => setActiveTab('MY_APPS')} className={`flex-1 py-2 text-sm font-black rounded-xl transition ${activeTab === 'MY_APPS' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>My Applications</button>
        </div>

        {/* JOB FEED */}
        <div className="grid gap-4">
          {loading ? (
            <div className="text-center py-20 text-zinc-500 font-bold animate-pulse">Syncing with cloud marketplace...</div>
          ) : jobs.filter(j => activeTab === 'JOBS' ? !j.applied : j.applied).length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-zinc-800/50">
              <ShieldCheck size={48} className="mx-auto text-zinc-600 mb-4" />
              <h3 className="text-xl font-bold text-zinc-400">No active postings found.</h3>
            </div>
          ) : (
            jobs.filter(j => activeTab === 'JOBS' ? !j.applied : j.applied).map(job => (
              <div key={job.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition group flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-zinc-950 border border-zinc-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg text-emerald-400">{job.type || "Operations"}</span>
                    {job.applied && <span className="bg-cyan-950 border border-cyan-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg text-cyan-400 flex items-center gap-1"><CheckCircle2 size={12}/> Applied</span>}
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
                    <button onClick={() => handleApply(job.id)} className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-black font-black px-8 py-3 rounded-xl transition active:scale-95">Easy Apply</button>
                  ) : (
                    <button disabled className="w-full md:w-auto bg-zinc-950 border border-zinc-800 text-zinc-500 font-black px-8 py-3 rounded-xl cursor-not-allowed">Under Review</button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* POST JOB OVERLAY MODAL */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative animate-in zoom-in duration-200">
            <button onClick={() => setShowPostForm(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white"><X size={24} /></button>
            <h2 className="text-2xl font-black text-white mb-6">Create Job Posting</h2>
            
            <form onSubmit={handlePostJob} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Role Needed</label>
                  <input type="text" value={newJob.role} onChange={e => setNewJob({...newJob, role: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Category</label>
                  <select value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500">
                    <option value="Umpiring">Umpiring</option>
                    <option value="Scoring">Scoring</option>
                    <option value="Media">Media/Commentary</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">League / Tournament Name</label>
                <input type="text" value={newJob.league} onChange={e => setNewJob({...newJob, league: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Location</label>
                  <input type="text" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Payout / Fee</label>
                  <input type="text" value={newJob.fee} onChange={e => setNewJob({...newJob, fee: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Date & Time</label>
                <input type="text" value={newJob.date} onChange={e => setNewJob({...newJob, date: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500" required />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-black text-lg py-4 rounded-xl transition active:scale-95 mt-4">
                {isSubmitting ? "Broadcasting..." : "Publish to Network"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
