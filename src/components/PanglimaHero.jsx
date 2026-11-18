import { useState, useEffect } from 'react';

export default function PanglimaHero({ t }) {
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    // Mula animasi lepas 500ms
    const timer = setTimeout(() => setSlideIn(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Watak Panglima (Di sebelah kiri teks) */}
      <div 
        style={{
          position: 'absolute',
          left: slideIn ? '10%' : '-20%', // Bergerak dari kiri ke kanan
          top: '50%',
          transform: 'translateY(-50%)',
          transition: 'left 1.5s ease-in-out',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '6rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}>
          🧔🏽‍♂️🗡️ {/* Ikon Panglima & Pedang */}
        </div>
        <div style={{ 
          background: 'var(--gold)', 
          color: 'var(--green-900)', 
          padding: '0.2rem 0.8rem', 
          borderRadius: '8px', 
          fontWeight: 'bold', 
          fontSize: '0.8rem',
          marginTop: '-10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Panglima Mat Berani
        </div>
      </div>

      {/* Teks Sambutan (Yang ditolak oleh Panglima) */}
      <div 
        className="hero-inner" 
        style={{ 
          position: 'relative',
          zIndex: 1,
          transform: slideIn ? 'translateX(0)' : 'translateX(-100px)', // Teks masuk ke tengah
          opacity: slideIn ? 1 : 0,
          transition: 'all 1.5s ease-in-out',
          paddingLeft: '5rem' // Bagi ruang untuk watak Panglima
        }}
      >
        <span className="hero-eyebrow">{t.heroEyebrow}</span>
        <h1 className="hero-title">
          {t.heroTitle1} <em>Muar</em>{t.heroTitle2}
        </h1>
        <p className="hero-sub">{t.heroSub}</p>
        
        <div className="hero-actions">
          <a href="#explore" className="btn btn-primary">Explore Places</a>
          <button 
            className="btn btn-ghost" 
            onClick={() => window.scrollTo({ top: document.getElementById('planner').offsetTop, behavior: 'smooth' })}
            style={{ cursor: 'pointer', border: '1.5px solid rgba(255,255,255,0.4)' }}
          >
            {t.heroBtnPlan}
          </button>
        </div>
      </div>
    </section>
  );
}