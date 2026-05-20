import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Layout({ title, children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
        <h1 className="text-2xl font-black text-red-500">
          CricSync
        </h1>

        <div className="flex gap-4 text-sm overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
          <Link to="/player" className="hover:text-red-500 transition-colors">Player</Link>
          <Link to="/organizer" className="hover:text-red-500 transition-colors">Organizer</Link>
          <Link to="/commentator" className="hover:text-red-500 transition-colors">Commentator</Link>
          <Link to="/umpire" className="hover:text-red-500 transition-colors">Umpire</Link>
          <Link to="/admin" className="hover:text-red-500 transition-colors">Admin</Link>
          <Link to="/scorers" className="hover:text-red-500 transition-colors">Scorers</Link>
        </div>
      </nav>

      {/* Page */}
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-black mb-6">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}

/* ---------------- HOME ---------------- */
function Home() {
  return (
    <Layout title="Run Local Cricket Like IPL">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-6xl font-black leading-tight">
            CricSync
          </h2>
          <p className="text-zinc-400 mt-5 text-lg">
            One platform for organizers, players,
            scorers, commentators and umpires.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="bg-red-500 hover:bg-red-600 transition-colors px-6 py-3 rounded-2xl font-bold">
              Start Match
            </button>
            <button className="border border-zinc-700 hover:border-zinc-500 transition-colors px-6 py-3 rounded-2xl">
              Live Scores
            </button>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-400 font-bold text-sm tracking-wider">LIVE MATCH</p>
              <h2 className="text-2xl font-bold mt-1">
                RCB vs CSK
              </h2>
            </div>
            <span className="bg-red-500/20 text-red-500 border border-red-500/50 px-4 py-1 rounded-full text-sm font-bold h-fit animate-pulse">
              LIVE
            </span>
          </div>

          <div className="mt-10">
            <h1 className="text-7xl font-black tracking-tighter">
              186<span className="text-4xl text-zinc-500">/4</span>
            </h1>
            <p className="text-zinc-400 mt-2 font-medium">
              18.3 Overs
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="bg-zinc-800/50 border border-zinc-700/50 p-4 rounded-2xl">
              <p className="text-zinc-400 text-sm">Top Batter</p>
              <h2 className="text-xl font-bold mt-1">
                Virat 94(52)
              </h2>
            </div>
            <div className="bg-zinc-800/50 border border-zinc-700/50 p-4 rounded-2xl">
              <p className="text-zinc-400 text-sm">Run Rate</p>
              <h2 className="text-xl font-bold mt-1">
                10.16
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
        <Card title="Players" value="12,842" />
        <Card title="Live Matches" value="126" />
        <Card title="Tournaments" value="78" />
        <Card title="Teams" value="450" />
      </div>
    </Layout>
  );
}

/* ---------------- PLAYER ---------------- */
function Player() {
  return (
    <Layout title="Player Dashboard">
      <div className="grid md:grid-cols-3 gap-5">
        <DashboardCard title="Matches" value="142" />
        <DashboardCard title="Runs" value="4,820" />
        <DashboardCard title="Strike Rate" value="148.6" />
      </div>
      <div className="bg-zinc-900 mt-8 p-6 rounded-3xl border border-zinc-800">
        <h2 className="text-2xl font-bold text-red-500">
          Career Stats
        </h2>
        <div className="mt-6 space-y-4">
          <Stat label="Highest Score" value="124" />
          <Stat label="50s" value="28" />
          <Stat label="100s" value="7" />
          <Stat label="MVP Awards" value="16" />
        </div>
      </div>
    </Layout>
  );
}

/* ---------------- ORGANIZER ---------------- */
function Organizer() {
  return (
    <Layout title="Organizer Dashboard">
      <div className="grid md:grid-cols-3 gap-5">
        <DashboardCard title="Active Tournaments" value="12" />
        <DashboardCard title="Teams Registered" value="64" />
        <DashboardCard title="Upcoming Matches" value="18" />
      </div>
      <div className="mt-8 bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
        <h2 className="text-2xl font-bold mb-6 text-red-500">
          Tournament Controls
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-bold">
            Create Tournament
          </button>
          <button className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl font-bold">
            Auction Players
          </button>
          <button className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl font-bold">
            Schedule Matches
          </button>
        </div>
      </div>
    </Layout>
  );
}

/* ---------------- COMMENTATOR ---------------- */
function Commentator() {
  return (
    <Layout title="Commentator Panel">
      <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
        <h2 className="text-2xl font-bold text-red-500">
          Live Commentary
        </h2>
        <div className="space-y-4 mt-6">
          <Commentary text="FOUR! Beautiful cover drive piercing the gap." />
          <Commentary text="Huge SIX into the crowd! What a shot." />
          <Commentary text="WICKET! Bowled him completely. The stumps are shattered." />
        </div>
      </div>
    </Layout>
  );
}

/* ---------------- UMPIRE ---------------- */
function Umpire() {
  return (
    <Layout title="Umpire Dashboard">
      <div className="grid md:grid-cols-2 gap-5">
        <DashboardCard title="Assigned Matches" value="14" />
        <DashboardCard title="Completed Reports" value="32" />
      </div>
      <div className="bg-zinc-900 mt-8 p-6 rounded-3xl border border-zinc-800">
        <h2 className="text-2xl font-bold text-red-500">
          Match Reports
        </h2>
        <div className="mt-5 space-y-4">
          <Stat label="Fair Play Incidents" value="2" />
          <Stat label="No Ball Reviews" value="5" />
          <Stat label="Wide Reviews" value="8" />
        </div>
      </div>
    </Layout>
  );
}

/* ---------------- ADMIN ---------------- */
function Admin() {
  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 gap-5">
        <DashboardCard title="Total Users" value="25K" />
        <DashboardCard title="Revenue" value="₹4.8L" />
        <DashboardCard title="Live Matches" value="126" />
        <DashboardCard title="Reports" value="12" />
      </div>
      <div className="bg-zinc-900 mt-8 p-6 rounded-3xl border border-zinc-800">
        <h2 className="text-2xl font-bold text-red-500">
          Platform Management
        </h2>
        <div className="flex flex-wrap gap-4 mt-6">
          <button className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-bold">
            Manage Users
          </button>
          <button className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl font-bold">
            Approve Tournaments
          </button>
          <button className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl font-bold">
            Reports & Analytics
          </button>
        </div>
      </div>
    </Layout>
  );
}

/* ---------------- SCORERS ---------------- */
function Scorers() {
  return (
    <Layout title="Scorer Panel">
      <div className="grid md:grid-cols-3 gap-5">
        <DashboardCard title="Current Score" value="186/4" />
        <DashboardCard title="Overs" value="18.3" />
        <DashboardCard title="CRR" value="10.16" />
      </div>
      <div className="bg-zinc-900 mt-8 p-6 rounded-3xl border border-zinc-800">
        <h2 className="text-2xl font-bold text-red-500">
          Scoring Controls
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-6">
          <ScoreButton text="0" />
          <ScoreButton text="1" />
          <ScoreButton text="2" />
          <ScoreButton text="4" />
          <ScoreButton text="6" />
          <ScoreButton text="W" />
        </div>
      </div>
    </Layout>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */
function Card({ title, value }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl hover:border-red-500/50 transition-colors">
      <p className="text-zinc-400 font-medium">{title}</p>
      <h1 className="text-4xl font-black mt-2">{value}</h1>
    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl hover:border-zinc-600 transition-colors">
      <p className="text-zinc-400 font-medium">{title}</p>
      <h1 className="text-5xl font-black mt-3 text-red-500">{value}</h1>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
      <p className="text-zinc-400">{label}</p>
      <p className="font-bold text-xl">{value}</p>
    </div>
  );
}

function Commentary({ text }) {
  return (
    <div className="bg-zinc-800/50 border border-zinc-700/50 p-4 rounded-2xl flex gap-3 items-start">
      <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0"></div>
      <p className="text-zinc-300 leading-relaxed">{text}</p>
    </div>
  );
}

function ScoreButton({ text }) {
  return (
    <button className="bg-red-500 hover:bg-red-600 active:scale-95 transition-all h-14 rounded-2xl font-black text-2xl shadow-lg shadow-red-500/20">
      {text}
    </button>
  );
}

/* ---------------- APP ---------------- */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player />} />
        <Route path="/organizer" element={<Organizer />} />
        <Route path="/commentator" element={<Commentator />} />
        <Route path="/umpire" element={<Umpire />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/scorers" element={<Scorers />} />
      </Routes>
    </BrowserRouter>
  );
}
