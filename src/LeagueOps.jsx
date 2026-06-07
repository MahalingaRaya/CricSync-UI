import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, IndianRupee, CheckCircle2, Clock, ShieldCheck, X } from 'lucide-react';

export const LeagueOps = () => {
  const [activeTab, setActiveTab] = useState('JOBS');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showPostForm, setShowPostForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newJob, setNewJob] = useState({
    role: "Main Umpire",
    league: "Bengaluru Corporate Cup",
    location: "Chinnaswamy Stadium",
    date: "This Sunday, 9:00 AM",
    fee: "1500/match", 
    type: "Umpiring"
  });

  const API_URL = "https://cricsync-engine.onrender.com/api/matches/marketplace";

  // 🔥 UPDATED: 4-Second Timeout & Instant Fallbacks
  const fetchJobs = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); 
      
      const res = await fetch(API_URL, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (res.ok) {
        const data = await res.json();
        setJobs(data.reverse());
      } else {
        throw new Error("Backend error");
      }
    } catch (e) {
      console.log("Cloud sleeping. Loading instant local data for recruiter demo.");
      // Instant fallbacks so the board is NEVER blank
      setJobs([
        { id: 99, role: "Pro Digital Scorer", league: "TCS Inter-Corporate Cup", location: "Bengaluru Central", date: "Saturday, 4:00 PM", fee: "1200/match", type: "Scoring", applied: false },
        { id: 98, role: "Main Umpire", league: "Karnataka Tech Premier League", location: "Whitefield Arena", date: "Sunday, 9:00 AM", fee: "2500/day", type: "Umpiring", applied: false },
        { id: 97, role: "Kannada Commentator", league: "State Level Tournament", location: "Hubli Sports Ground", date: "Next Weekend", fee: "3000/day", type: "Media", applied: true }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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
        fetchJobs(); 
      }
    } catch (e) {
      alert("Failed to connect to cloud engine. Saving locally for demo.");
      // For demo purposes: if backend is sleeping, temporarily add it to the UI anyway
      setJobs([{...newJob, id: Date.now(), applied: false}, ...jobs]);
      setShowPostForm(false);
    }
    setIsSubmitting(false);
  };

  const handleApply = (jobId) => {
    setJobs(jobs.map(job => job.id === jobId ? { ...job, applied: true } : job));
    alert("Application sent to League Organizer!");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans pb-24 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-6 relative z-10 pt-4">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              Cricket Network
            </h1>
            <p className="text-zinc-400 text-sm font-bold mt-1">The Professional Marketplace for Cricket Ops</p>
          </div>
          <button onClick={() => setShowPostForm(true)} className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-black px-6 py-3 rounded-xl transition hover:scale-105 active:scale-95 flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            <Briefcase size={16} /> Post a Job
          </button>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex gap-2 bg-zinc-900/80 backdrop-blur-sm p-1.5 rounded-2xl border border-zinc-800 w-full max-w-sm">
          <button onClick={() => setActiveTab('JOBS')} className={`flex-1 py-2 text-sm font-black rounded-xl transition ${activeTab === 'JOBS' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}>Job Board</button>
          <button onClick={() => setActiveTab('MY_APPS')} className={`flex-1 py-2 text-sm font-black rounded-xl transition ${activeTab === 'MY_APPS' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}>My Applications</button>
        </div>

        {/* JOB FEED */}
        <div className="grid gap-4">
          {loading ? (
            <div className="text-center py-20 text-emerald-500 font-bold animate-pulse">Syncing with cloud marketplace...</div>
          ) : jobs.filter(j => activeTab === 'JOBS' ? !j.applied : j.applied).length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800/50">
              <ShieldCheck size={48} className="mx-auto text-zinc-600 mb-4" />
              <h3 className="text-xl font-bold text-zinc-400">No active postings found.</h3>
            </div>
          ) : (
            jobs.filter(j => activeTab === 'JOBS' ? !j.applied : j.applied).map(job => (
              <div key={job.id} className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-6 hover:border-cyan-500/50 transition group flex flex-col md:flex-row justify-between gap-6 shadow-xl">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-zinc-950 border border-zinc-800 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg text-emerald-400">
                      {job.type || "Operations"}
                    </span>
                    {job.applied && <span className="bg-cyan-950 border border-cyan-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg text-cyan-400 flex items-center gap-1"><CheckCircle2 size={12}/> Applied</span>}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">{job.role || "Cricket Professional Needed"}</h2>
                    <p className="text-zinc-400 font-bold text-sm">{job.league || "Local Tournament"}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-zinc-400 pt-2 bg-zinc-950/50 p-3 rounded-2xl border border-zinc-800/50 inline-flex">
                    <span className="flex items-center gap-1"><MapPin size={14} className="text-zinc-500"/> {job.location || "TBD"}</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-zinc-500"/> {job.date || "Flexible"}</span>
                    <span className="flex items-center gap-0.5 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md"><IndianRupee size={12} /> {job.fee || "Negotiable"}</span>
                  </div>
                </div>
                <div className="flex items-center md:items-end md:justify-end">
                  {!job.applied ? (
                    <button onClick={() => handleApply(job.id)} className="w-full md:w-auto bg-zinc-800 hover:bg-emerald-500 hover:text-black text-white font-black px-8 py-3 rounded-xl transition active:scale-95 border border-zinc-700 hover:border-emerald-500">Easy Apply</button>
                  ) : (
                    <button disabled className="w-full md:w-auto bg-zinc-950 border border-zinc-800 text-zinc-600 font-black px-8 py-3 rounded-xl cursor-not-allowed">Under Review</button>
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
                  <input type="text" value={newJob.role} onChange={e => setNewJob({...newJob, role: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Category</label>
                  <select value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500">
                    <option value="Umpiring">Umpiring</option>
                    <option value="Scoring">Scoring</option>
                    <option value="Media">Media/Commentary</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">League / Tournament Name</label>
                <input type="text" value={newJob.league} onChange={e => setNewJob({...newJob, league: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Location</label>
                  <input type="text" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Payout / Fee (₹)</label>
                  <input type="text" placeholder="e.g. 1500/match" value={newJob.fee} onChange={e => setNewJob({...newJob, fee: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Date & Time</label>
                <input type="text" value={newJob.date} onChange={e => setNewJob({...newJob, date: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500" required />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-black text-lg py-4 rounded-xl transition active:scale-95 mt-4">
                {isSubmitting ? "Broadcasting..." : "Publish to Network"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
