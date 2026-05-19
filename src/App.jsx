import React, { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [appliedPlayer, setAppliedPlayer] = useState(false);
  const [appliedUmpire, setAppliedUmpire] = useState(false);

  const handlePlayerApply = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://cricsync-engine.onrender.com/api/actions/apply-player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: 'Mahalinga Raya',
          email: 'mahi@cricsync.com',
          skillType: 'All-Rounder',
          targetTeam: 'Bengaluru Smashers'
        })
      });
      if (response.ok) {
        setAppliedPlayer(true);
        alert("✅ SUCCESS! Your player profile was just saved to the live Aiven Database!");
      } else {
        alert("⚠️ Something went wrong with the data format.");
      }
    } catch (error) {
      alert("⏳ The Render backend is currently waking up from sleep mode! Wait about 45 seconds and tap it again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUmpireRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://cricsync-engine.onrender.com/api/actions/register-umpire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          umpireName: 'Mahalinga Raya',
          email: 'mahi@cricsync.com',
          experienceYears: 5
        })
      });
      if (response.ok) {
        setAppliedUmpire(true);
        alert("✅ SUCCESS! You are officially registered as an umpire in the cloud database!");
      } else {
        alert("⚠️ Something went wrong with the data format.");
      }
    } catch (error) {
      alert("⏳ The Render backend is currently waking up from sleep mode! Wait about 45 seconds and tap it again.");
    } finally {
      setLoading(false);
    }
  };

  const handleComingSoon = (feature) => {
    alert(`🚀 The ${feature} feature is being built next!`);
  };

  return (
    <div style={{ backgroundColor: '#0b0f19', color: '#f3f4f6', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '40px' }}>
      
      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, backdropFilter: 'blur(12px)', backgroundColor: 'rgba(11, 15, 25, 0.8)', borderBottom: '1px solid #1f2937', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50 }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '2px', color: '#10b981', cursor: 'pointer' }} onClick={() => handleComingSoon('Home Dashboard')}>CRICSYNC<span style={{color:'#fff'}}>.</span></div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', fontWeight: '500' }}>
          <span style={{ color: '#9ca3af', cursor: 'pointer' }} onClick={() => handleComingSoon('Matches List')}>Matches</span>
          <span style={{ color: '#9ca3af', cursor: 'pointer' }} onClick={() => handleComingSoon('Tournaments')}>Tournaments</span>
          <span style={{ color: '#10b981', cursor: 'pointer' }} onClick={() => handleComingSoon('Hiring Board')}>Hiring</span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div style={{ background: 'linear-gradient(180deg, rgba(16,185,129,0.1) 0%, rgba(11,15,25,1) 100%)', padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '10px' }}>
          RUN LOCAL CRICKET <br/><span style={{ color: '#10b981' }}>PROFESSIONALLY.</span>
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto 25px auto' }}>
          Premium live scoring, professional league analytics, and ecosystem hiring board.
        </p>
      </div>

      {/* MATCH CARD */}
      <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', maxWidth: '360px', margin: '-20px auto 40px auto', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)', position: 'relative', zIndex: 10 }}>
        <div style={{ background: 'linear-gradient(90deg, #ef4444 0%, #3b82f6 100%)', padding: '6px 15px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
          <span>Live Tracking</span>
          <span>Chinnaswamy</span>
        </div>
        
        <div style={{ padding: '25px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '55px', height: '55px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: '#ef4444', margin: '0 auto 8px auto' }}>RCB</div>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: '600' }}>HOME</span>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#4b5563', fontWeight: '800', fontSize: '1.1rem', marginBottom: '4px' }}>VS</div>
            <span style={{ backgroundColor: '#1f2937', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', color: '#10b981', fontWeight: '700' }}>T20 LIVE</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '55px', height: '55px', backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: '#3b82f6', margin: '0 auto 8px auto' }}>MI</div>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: '600' }}>AWAY</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1f2937', padding: '15px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            onClick={handlePlayerApply}
            disabled={loading || appliedPlayer}
            style={{ backgroundColor: appliedPlayer ? '#065f46' : '#1f2937', color: appliedPlayer ? '#10b981' : '#fff', width: '100%', border: '1px solid #374151', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}>
            {loading ? 'Processing Cloud...' : appliedPlayer ? '✓ Spot Application Sent' : 'Apply for Player Spot'}
          </button>
          <button 
            onClick={handleUmpireRegister}
            disabled={loading || appliedUmpire}
            style={{ backgroundColor: appliedUmpire ? '#065f46' : 'transparent', color: appliedUmpire ? '#10b981' : '#fff', width: '100%', border: '1px solid #10b981', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}>
            {loading ? 'Processing Cloud...' : appliedUmpire ? '✓ Registered as Official' : 'Register as Umpire'}
          </button>
        </div>
      </div>

      {/* HIRING BOARD */}
      <div style={{ padding: '0 20px', maxWidth: '360px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#9ca3af', marginBottom: '15px', letterSpacing: '1px' }}>LEAGUE HIRING BOARD</h3>
        
        <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '20px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700' }}>URGENT</div>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '4px', paddingRight: '60px' }}>Need 2 Commentators</h4>
          <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '12px' }}>Bangalore Premier League</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1f2937', paddingTop: '12px', marginTop: '12px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>₹3,000<span style={{ fontSize:'0.75rem', color:'#9ca3af', fontWeight:'400' }}> / day</span></div>
            <button onClick={() => handleComingSoon('Job Application')} style={{ backgroundColor: '#10b981', color: '#0b0f19', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>Apply Now</button>
          </div>
        </div>
      </div>

    </div>
  );
}
