import React, { useState } from 'react';

// --- CLEAN PROFESSIONAL STYLES ---
const theme = {
  bg: '#0b0f19', // Deep stealth slate
  surface: '#111827', // Clean card background
  surfaceHighlight: '#1f2937',
  text: '#f9fafb',
  textMuted: '#9ca3af',
  accent: '#3b82f6', // Professional Sports Blue
  success: '#10b981',
  danger: '#ef4444',
  border: '#374151'
};

// --- COMPONENTS ---

const Navbar = ({ setView }) => (
  <nav style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(11, 15, 25, 0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${theme.border}`, padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
    <div onClick={() => setView('home')} style={{ fontWeight: '800', fontSize: '1.2rem', trackingLetter: '1px', color: theme.text, cursor: 'pointer' }}>
      CRICSYNC<span style={{color: theme.accent}}>.</span>
    </div>
    <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', fontWeight: '500', color: theme.textMuted }}>
      <span style={{ cursor: 'pointer' }} onClick={() => setView('home')}>Matches</span>
      <span style={{ cursor: 'pointer' }} onClick={() => setView('player')}>Profile</span>
      <span style={{ cursor: 'pointer', color: theme.text }}>Hiring</span>
      <span style={{ cursor: 'pointer', backgroundColor: theme.text, color: theme.bg, padding: '4px 10px', borderRadius: '4px', fontWeight: '700' }}>Login</span>
    </div>
  </nav>
);

const LiveMatchTracker = () => (
  <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: '12px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
    {/* Match Header */}
    <div style={{ backgroundColor: theme.surfaceHighlight, padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: '700', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: '6px', height: '6px', backgroundColor: theme.danger, borderRadius: '50%' }}></div> LIVE • T20
      </div>
      <span>Chinnaswamy Stadium</span>
    </div>

    {/* Score Section */}
    <div style={{ padding: '20px 15px', borderBottom: `1px solid ${theme.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            RCB <span style={{ color: theme.accent }}>154/4</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: theme.textMuted, marginTop: '2px' }}>17.2 Overs • CRR: 8.95</div>
        </div>
        <div style={{ textAlign: 'right', opacity: 0.6 }}>
          <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>MI</div>
          <div style={{ fontSize: '0.8rem', color: theme.textMuted }}>Yet to bat</div>
        </div>
      </div>
    </div>

    {/* Batters & Bowler Grid */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', backgroundColor: theme.border }}>
      <div style={{ backgroundColor: theme.surface, padding: '12px 15px' }}>
        <div style={{ fontSize: '0.7rem', color: theme.textMuted, marginBottom: '6px', fontWeight: '600' }}>BATTERS</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
          <span style={{ fontWeight: '600', color: theme.text }}>V. Kohli*</span> <span style={{ fontWeight: '700' }}>68 <span style={{color: theme.textMuted, fontSize:'0.75rem', fontWeight:'normal'}}>(42)</span></span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span style={{ color: theme.textMuted }}>G. Maxwell</span> <span>12 <span style={{color: theme.textMuted, fontSize:'0.75rem'}}>(8)</span></span>
        </div>
      </div>
      <div style={{ backgroundColor: theme.surface, padding: '12px 15px' }}>
        <div style={{ fontSize: '0.7rem', color: theme.textMuted, marginBottom: '6px', fontWeight: '600' }}>BOWLER</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span style={{ fontWeight: '600', color: theme.text }}>J. Bumrah*</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: theme.textMuted, marginTop: '2px' }}>3.2-0-24-2</div>
      </div>
    </div>

    {/* Over Timeline */}
    <div style={{ backgroundColor: theme.surface, padding: '12px 15px', borderTop: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '0.75rem', color: theme.textMuted, fontWeight: '600' }}>THIS OVER:</span>
      <div style={{ display: 'flex', gap: '6px' }}>
        {['1', 'W', '4', '•'].map((ball, i) => (
          <div key={i} style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.8rem', fontWeight: '700', backgroundColor: ball === 'W' ? 'rgba(239, 68, 68, 0.2)' : ball === '4' || ball === '6' ? 'rgba(59, 130, 246, 0.2)' : theme.surfaceHighlight, color: ball === 'W' ? theme.danger : ball === '4' || ball === '6' ? theme.accent : theme.text }}>
            {ball}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EcosystemHiring = () => (
  <div style={{ marginBottom: '30px' }}>
    <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '15px', borderLeft: `3px solid ${theme.success}`, paddingLeft: '8px' }}>LEAGUE HIRING BOARD</h3>
    <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '16px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: '700' }}>Need 2 Commentators</h4>
          <div style={{ fontSize: '0.8rem', color: theme.textMuted }}>Bangalore Premier League</div>
        </div>
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: theme.success, padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700' }}>URGENT</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${theme.surfaceHighlight}` }}>
        <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>₹3,000 <span style={{ fontSize: '0.75rem', fontWeight: '500', color: theme.textMuted }}>/ day</span></div>
        <button style={{ backgroundColor: theme.text, color: theme.bg, border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' }}>Apply Now</button>
      </div>
    </div>
  </div>
);

const PlayerProfile = () => (
  <div>
    {/* Profile Banner */}
    <div style={{ backgroundColor: theme.surfaceHighlight, height: '100px', borderRadius: '12px 12px 0 0', position: 'relative' }}></div>
    <div style={{ backgroundColor: theme.surface, border: `1px solid ${theme.border}`, borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '0 20px 20px 20px', marginBottom: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '-35px', marginBottom: '15px' }}>
        <div style={{ width: '70px', height: '70px', backgroundColor: theme.bg, border: `4px solid ${theme.surface}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800' }}>MR</div>
        <button style={{ backgroundColor: theme.surfaceHighlight, border: `1px solid ${theme.border}`, color: theme.text, padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600' }}>Edit Profile</button>
      </div>
      <h2 style={{ margin: '0 0 2px 0', fontSize: '1.3rem', fontWeight: '800' }}>Mahalinga Raya</h2>
      <div style={{ fontSize: '0.85rem', color: theme.accent, fontWeight: '600', marginBottom: '20px' }}>All-Rounder • Bangalore, IN</div>
      
      {/* Stats Grid */}
      <h3 style={{ fontSize: '0.9rem', color: theme.textMuted, fontWeight: '600', marginBottom: '10px' }}>CAREER STATS (T20)</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{ border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '0.7rem', color: theme.textMuted }}>BATTING AVG</div>
          <div style={{ fontSize: '1.3rem', fontWeight: '800' }}>38.4</div>
          <div style={{ fontSize: '0.75rem', color: theme.textMuted, marginTop: '4px' }}>SR: 145.2</div>
        </div>
        <div style={{ border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '0.7rem', color: theme.textMuted }}>ECONOMY</div>
          <div style={{ fontSize: '1.3rem', fontWeight: '800' }}>7.20</div>
          <div style={{ fontSize: '0.75rem', color: theme.textMuted, marginTop: '4px' }}>Wickets: 42</div>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState('home');

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Navbar setView={setView} />
      
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '20px' }}>
        {view === 'home' ? (
          <>
            {/* Clean Hero */}
            <div style={{ marginBottom: '30px', paddingTop: '10px' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', lineHeight: '1.1', margin: '0 0 12px 0' }}>
                Run local cricket <br/>professionally.
              </h1>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ backgroundColor: theme.accent, color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Start Tournament</button>
                <button style={{ backgroundColor: 'transparent', color: theme.text, border: `1px solid ${theme.border}`, padding: '10px 16px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Explore Matches</button>
              </div>
            </div>

            <LiveMatchTracker />
            <EcosystemHiring />
          </>
        ) : (
          <PlayerProfile />
        )}
      </main>
    </div>
  );
}
