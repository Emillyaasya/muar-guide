import { useEffect, useRef, useState } from 'react';
import './Intro.css';

const COPY = {
  en: { welcome: 'Welcome to', tagline: 'Bandar Maharani', skip: 'Skip intro' },
  my: { welcome: 'Selamat datang ke', tagline: 'Bandar Maharani', skip: 'Langkau' },
};

export default function Intro({ lang = 'en', onDone }) {
  const [open, setOpen] = useState(false);
  const closing = useRef(false);
  const timers = useRef([]);
  const c = COPY[lang] || COPY.en;

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    setOpen(true); // panels slide apart
    timers.current.push(
      setTimeout(() => onDone(), 950)
    );
  };

  useEffect(() => {
    // Stop the page behind from scrolling while the intro plays
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timers.current.push(setTimeout(close, reduced ? 1200 : 3200));

    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      timers.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`intro ${open ? 'is-open' : ''}`}
      role="dialog"
      aria-label="Welcome to Muar"
      onClick={close}
    >
      <div className="intro-panel intro-panel-left" />
      <div className="intro-panel intro-panel-right" />

      <div className="intro-content">
        <p className="intro-welcome">{c.welcome}</p>

        <h1 className="intro-title" aria-label="Muar">
          {['M', 'U', 'A', 'R'].map((ch, i) => (
            <span className="intro-mask" key={ch}>
              <span className="intro-letter" style={{ '--i': i }}>{ch}</span>
            </span>
          ))}
        </h1>

        <svg className="intro-river" viewBox="0 0 600 30" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 15 C 50 0, 100 30, 150 15 S 250 0, 300 15 S 400 30, 450 15 S 550 0, 600 15"
            pathLength="1"
          />
        </svg>

        <p className="intro-tagline">{c.tagline}</p>
      </div>

      <button
        type="button"
        className="intro-skip"
        onClick={(e) => { e.stopPropagation(); close(); }}
      >
        {c.skip}
      </button>
    </div>
  );
}