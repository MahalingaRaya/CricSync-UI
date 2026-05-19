import React, { useState, useEffect } from 'react';

// --- STYLES (Simulating Tailwind/Shadcn/Glassmorphism) ---
const colors = {
  bg: '#050814',
  card: 'rgba(17, 24, 39, 0.7)',
  glass: 'rgba(17, 24, 39, 0.4)',
  neonGreen: '#10b981',
  neonRed: '#ef4444',
  text: '#f3f4f6',
  textMuted: '#9ca3af',
  border: 'rgba(255, 255, 255, 0.1)',
};

const glassCard = {
  background: colors.card,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid ${colors.border}`,
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
};

// --- REALTIME SCORE SIMULATOR (Impresses Recruiters) ---
const useLiveScore = () => {
  const [runs, setRuns] = useState(154);
  const [balls, setBalls] = useState(104); // 17.2 overs

  useEffect(() => {
    const interval = setInterval(() => {
      setRuns(prev => prev + Math.floor(Math.random() * 4));
      setBalls(prev => prev + 1);
    }, 4500); // Updates every 4.5 seconds to simulate live WebSocket
    return () => clearInterval(interval);
  }, []);

  const overs = Math.floor(balls / 6);
  const currentBalls = balls % 6;
  return { runs, overs, currentBalls };
};

// --- COMPONENTS ---

const DashboardHome = () => {
  const { runs, overs, currentBalls } = useLiveScore();
  return (
    <div style={{ padding: '20px', animation: 'fadeIn 0.5s ease-in' }}>
      {/* HERO */}
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px', margin: '0 0 10px 0' }}>
          RUN LOCAL CRICKET <br/><span style={{ color: colors.neonGreen, textShadow: '0 0 20px rgba(16,185,129,0.4)' }}>LIKE THE IPL.</span>
        </h1>
        <p style={{ color: colors.textMuted, fontSize: '1rem' }}>Live Scoring • Auctions • Role-Based Dashboards</p>
      </div>

      {/* LIVE MATCH CARD */}
      <div style={{ ...glassCard, position: 'relative', overflow: 'hidden', margin: '0 auto 30px', maxWidth: '400px' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${colors.neonRed}, ${colors.neonGreen})` }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.neonRed, boxShadow: `0 0 10px ${colors.neonRed}`, animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: colors.neonRed, letterSpacing: '1px' }}>LIVE • T20</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: colors.textMuted }}>Chinnaswamy Stadium</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900' }}>RCB</h2>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: colors.neonGreen }}>{runs}/4</div>
            <div style={{ fontSize: '0.85rem', color: colors.textMuted }}>{overs}.{currentBalls} Overs</div>
          </div>
          <h3 style={{ margin: 0, color: colors.textMuted }}>VS</h3>
          <div style={{ textAlign: 'center', opacity: 0.5 }}>
            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900' }}>MI</h2>
            <div style={{ fontSize: '0.85rem' }}>Yet to bat</div>
          </div>
        </div>
      </div>

      {/* HIGHLIGHTS / CAPS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ ...glassCard, padding: '15px', textAlign: 'center', borderTop: '2px solid #f97316' }}>
          <div style={{ fontSize: '0.7rem', color: colors.textMuted, marginBottom: '5px' }}>ORANGE CAP</div>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>V. Kohli</div>
          <div style={{ color: '#f97316', fontWeight: '900' }}>342 Runs</div>
        </div>
        <div style={{ ...glassCard, padding: '15px', textAlign: 'center', borderTop: '2px solid #a855f7' }}>
          <div style={{ fontSize: '0.7rem', color: colors.textMuted, marginBottom: '5px' }}>PURPLE CAP</div>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>J. Bumrah</div>
          <div style={{ color: '#a855f7', fontWeight: '900' }}>14 Wickets</div>
        </div>
      </div>
    </div>
  );
};

const PlayerDashboard = () => (
  <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', animation: 'fadeIn 0.5s ease-in' }}>
    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '20px' }}>Athlete Profile</h2>
    <div style={{ ...glassCard, display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: `linear-gradient(45deg, ${colors.neonGreen}, #3b82f6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>MR</div>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Mahalinga Raya</h3>
        <span style={{ color: colors.neonGreen, fontSize: '0.85rem', fontWeight: 'bold' }}>Verified All-Rounder ✓</span>
      </div>
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
      <div style={{ ...glassCard, padding: '15px' }}><div style={{ fontSize: '0.8rem', color: colors.textMuted }}>Matches</div><div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>42</div></div>
      <div style={{ ...glassCard, padding: '15px' }}><div style={{ fontSize: '0.8rem', color: colors.textMuted }}>Strike Rate</div><div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>145.2</div></div>
      <div style={{ ...glassCard, padding: '15px' }}><div style={{ fontSize: '0.8rem', color: colors.textMuted }}>Batting Avg</div><div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>38.4</div></div>
      <div style={{ ...glassCard, padding: '15px' }}><div style={{ fontSize: '0.8rem', color: colors.textMuted }}>Economy</div><div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>7.2</div></div>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', animation: 'fadeIn 0.5s ease-in' }}>
    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '20px' }}>League Command Center</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
      {/* STAT 1 */}
      <div style={{ ...glassCard, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><div style={{ fontSize: '0.8rem', color: colors.textMuted }}>Platform Revenue</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colors.neonGreen }}>₹1,42,000</div></div>
        <div style={{ padding: '8px 12px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', color: colors.neonGreen, fontSize: '0.8rem', fontWeight: 'bold' }}>+14%</div>
      </div>
      {/* STAT 2 */}
      <div style={{ ...glassCard, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><div style={{ fontSize: '0.8rem', color: colors.textMuted }}>Active Tournaments</div><div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>8</div></div>
        <button style={{ background: colors.text, color: colors.bg, border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold' }}>Manage</button>
      </div>
    </div>
  </div>
);

// --- MAIN APP (Custom Routing) ---
export default function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      
      {/* GLASSMORPHISM NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, background: colors.glass, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: `1px solid ${colors.border}`, padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50 }}>
        <div onClick={() => setCurrentView('home')} style={{ fontWeight: '900', fontSize: '1.3rem', letterSpacing: '1px', color: colors.text, cursor: 'pointer' }}>
          CRICSYNC<span style={{color: colors.neonGreen}}>.</span>
        </div>
        <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', fontWeight: '600' }}>
          <span style={{ color: currentView === 'player' ? colors.neonGreen : colors.textMuted, cursor: 'pointer' }} onClick={() => setCurrentView('player')}>Player</span>
          <span style={{ color: currentView === 'admin' ? colors.neonGreen : colors.textMuted, cursor: 'pointer' }} onClick={() => setCurrentView('admin')}>Admin</span>
        </div>
      </nav>

      {/* DYNAMIC VIEW ROUTER */}
      <main>
        {currentView === 'home' && <DashboardHome />}
        {currentView === 'player' && <PlayerDashboard />}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

    </div>
  );
}
