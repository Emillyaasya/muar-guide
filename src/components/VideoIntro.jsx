import React, { useState, useRef, useEffect } from 'react';

export default function VideoIntro({ onComplete }) {
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // SET KELAJUAN VIDEO DI SINI (0.5 = separuh laju, 0.25 = sangat laju sikit)
      videoRef.current.playbackRate = 0.5; 

      videoRef.current.play().catch(e => {
        console.log("Auto-play was prevented:", e);
        setTimeout(onComplete, 1000); 
      });
    }
  }, [onComplete]);

  const handleVideoEnd = () => {
    setIsFading(true);
    // Wait 3 seconds for the slower fade animation to finish
    setTimeout(onComplete, 3000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0f3324',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFading ? 0 : 1,
        boxShadow: isFading ? 'inset 0 0 300px 100px rgba(0,0,0,1)' : 'none',
        transition: 'opacity 3s ease-in-out, box-shadow 3s ease-in-out',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      <video
        ref={videoRef}
        src="/intro-video.mp4"
        onEnded={handleVideoEnd}
        muted
        playsInline
        // TAMBAH BARIS INI UNTUK PASTIKAN KELAJUAN KEKAL
        onCanPlay={() => { if(videoRef.current) videoRef.current.playbackRate = 0.5; }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
        }}
      />
      
      {isFading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 51, 36, 0.9)',
            zIndex: 1,
            animation: 'fadeInDark 3s ease-in-out forwards',
          }}
        />
      )}

      {!isFading && (
        <button
          onClick={handleVideoEnd}
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            zIndex: 2,
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.5)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            backdropFilter: 'blur(4px)'
          }}
        >
          Skip Intro →
        </button>
      )}

      <style>{`
        @keyframes fadeInDark {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}