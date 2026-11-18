import React, { useState, useEffect } from 'react';

export default function PanglimaIntro({ onComplete }) {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    // Stage 1: Character walks in (0 - 2 seconds)
    // Stage 2: Character pushes the screen (2 - 3.5 seconds)
    // Stage 3: Screen is pushed away, overlay disappears (3.5 seconds)
    
    const timer1 = setTimeout(() => setStage(2), 2000);
    const timer2 = setTimeout(() => {
      setStage(3);
      setTimeout(onComplete, 800); // Tell App.jsx to show the website after sliding away
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0f3324', // Dark green theme
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transform: stage === 3 ? 'translateX(100%)' : 'translateX(0)', // Screen pushes away to the right
        transition: 'transform 0.8s cubic-bezier(0.8, 0, 0.2, 1)',
      }}
    >
      {/* --- THE CHARACTER --- */}
      <div
        style={{
          position: 'absolute',
          left: stage >= 2 ? '60%' : '-20%', // Walks from left to right
          transition: 'left 2s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        {/* Simple Vector Character (Can be replaced with an image later) */}
        <svg width="150" height="250" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Body/Baju Melayu */}
          <rect x="30" y="60" width="40" height="70" rx="10" fill="#c69b3e" />
          {/* Head */}
          <circle cx="50" cy="40" r="20" fill="#8B5A2B" />
          {/* Songkok Hat */}
          <rect x="30" y="15" width="40" height="15" rx="5" fill="#14181a" />
          {/* Pushing Arms */}
          <rect x="60" y="70" width="30" height="8" rx="4" fill="#8B5A2B" transform={stage >= 2 ? "rotate(-20 60 70)" : ""} style={{ transition: 'transform 0.5s' }} />
          <rect x="60" y="85" width="30" height="8" rx="4" fill="#8B5A2B" transform={stage >= 2 ? "rotate(20 60 85)" : ""} style={{ transition: 'transform 0.5s' }} />
          {/* Legs */}
          <rect x="35" y="130" width="10" height="20" fill="#14181a" />
          <rect x="55" y="130" width="10" height="20" fill="#14181a" />
        </svg>
        
        <div style={{ 
          background: 'var(--gold)', 
          color: '#0f3324', 
          padding: '0.4rem 1rem', 
          borderRadius: '20px', 
          fontWeight: 'bold', 
          marginTop: '1rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
        }}>
          Panglima Mat Berani
        </div>
      </div>

      {/* --- THE TEXT BEING PUSHED --- */}
      <h1 
        style={{
          color: '#f3dca4',
          fontSize: '3rem',
          fontFamily: 'Playfair Display, serif',
          transform: stage >= 2 ? 'translateX(300px) rotate(10deg)' : 'translateX(0)', // Gets pushed to the side
          opacity: stage >= 2 ? 0 : 1, // Fades out as it's pushed
          transition: 'all 0.8s ease-out',
          zIndex: 1,
        }}
      >
        Welcome to Muar...
      </h1>
    </div>
  );
}