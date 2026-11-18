import { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import PageNav from './components/PageNav';
import Hero from './components/Hero';
import PlaceCard from './components/PlaceCard';
import PlaceModal from './components/PlaceModal';
import Footer from './components/Footer';
import TripPlanner from './components/TripPlanner'; 
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';
import VideoIntro from './components/VideoIntro'; // CHANGED: Import VideoIntro animation
import { Categories, Highlights, EventsAndTravel, FaqGalleryNewsletter } from './components/MoreSections';
import { allPlaces } from './data/muarData';
import { translations } from './data/translations';
import './App.css';

export default function App() {
  const [selected, setSelected] = useState(null);
  // pages: home | explore | planner | guide | about | contact
  const [view, setView] = useState('home'); 
  
  // Intro plays on every page load AND every time the visitor comes back to this tab.
  const [showIntro, setShowIntro] = useState(true);
  const [introRun, setIntroRun] = useState(0);

  // State Tema, Bahasa & Tapisan
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState('en');
  const [category, setCategory] = useState('all'); 
  const [query, setQuery] = useState('');

  const t = translations[lang];

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  // Replay the intro when the visitor switches to another tab and comes back
  useEffect(() => {
    const MIN_AWAY_MS = 0; // e.g. 5000 = only replay if they were away 5+ seconds
    let leftAt = null;
    const onVisibility = () => {
      if (document.hidden) {
        leftAt = Date.now();
      } else if (leftAt !== null) {
        if (Date.now() - leftAt >= MIN_AWAY_MS) {
          setIntroRun((n) => n + 1);
          setShowIntro(true);
        }
        leftAt = null;
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Go to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  // Any old link that points to #explore now opens the Explore page
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href="#explore"]');
      if (a) { e.preventDefault(); setView('explore'); }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Fade-in sections as they scroll into view
  useEffect(() => {
    const els = document.querySelectorAll('.section');
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    els.forEach((el) => { el.classList.add('reveal'); io.observe(el); });
    return () => io.disconnect();
  }, [view]);

  // Logik untuk tapis tempat berdasarkan butang yang ditekan + carian
  const filteredPlaces = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPlaces.filter((place) => {
      if (category !== 'all' && place.category !== category) return false;
      if (!q) return true;
      return (
        place.name.toLowerCase().includes(q) ||
        (place.tags || []).some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [category, query]);

  const goExplore = (cat) => {
    setCategory(cat);
    setView('explore');
  };

  return (
    <div className="app">
      
      {/* CHANGED: Use VideoIntro instead of PanglimaIntro */}
      {showIntro && <VideoIntro key={introRun} onComplete={() => setShowIntro(false)} />}

      {/* The rest of the website */}
      <Navbar 
        onContact={() => setView('contact')} 
        onNavigate={setView}
        onSearch={(q) => { setQuery(q); setCategory('all'); setView('explore'); }}
        isContactPage={view === 'contact'} 
        t={t}
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
        lang={lang}
        toggleLang={() => setLang(lang === 'en' ? 'my' : 'en')}
      />

      <PageNav view={view} setView={setView} lang={lang} />

      {view === 'contact' && <Contact onBack={() => setView('home')} t={t} />}

      {view === 'planner' && <TripPlanner onBack={() => setView('home')} t={t} isDark={isDark} />}

      {/* ---------- HOME ---------- */}
      {view === 'home' && (
        <>
          <Hero onPlanTrip={() => setView('planner')} t={t} />
          <Categories lang={lang} onPick={goExplore} onPlan={() => setView('planner')} />
          <Highlights onOpen={setSelected} lang={lang} />
          <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
            <button className="btn btn-outline cta-big" onClick={() => goExplore('all')}>
              {lang === 'my' ? 'Lihat semua tempat' : 'See all places'} →
            </button>
          </div>
        </>
      )}

      {/* ---------- EXPLORE ---------- */}
      {view === 'explore' && (
        <section className="section" id="explore">
          <div className="section-head" style={{ textAlign: 'center' }}>
            <h2 className="section-title">{t.exploreTitle}</h2>
            <p className="section-sub" style={{ margin: '0 auto', marginBottom: '2rem' }}>
              {t.exploreSub}
            </p>
          </div>

          <div className="filter-search explore-search">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={lang === 'my' ? 'Cari tempat...' : 'Search places...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <button className={`btn ${category === 'all' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setCategory('all')}>
              {t.catAll || "All"}
            </button>
            <button className={`btn ${category === 'accommodation' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setCategory('accommodation')}>
              🏨 {t.catStay}
            </button>
            <button className={`btn ${category === 'food' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setCategory('food')}>
              🍜 {t.catEat}
            </button>
            <button className={`btn ${category === 'heritage' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setCategory('heritage')}>
              🏛️ {t.catVisit}
            </button>
            <button className={`btn ${category === 'entertainment' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setCategory('entertainment')}>
              🎬 {t.catEntertainment || "Entertainment"}
            </button>
          </div>

          <div className="card-grid">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} onOpen={setSelected} t={t} />
              ))
            ) : (
              <div style={{ textAlign: 'center', width: '100%', padding: '3rem', gridColumn: '1 / -1', color: 'var(--ink-soft)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Coming Soon! 🚧</h3>
                <p>{t.comingSoon || "We are still curating the best spots in Muar. Check back later!"}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------- GUIDE ---------- */}
      {view === 'guide' && <EventsAndTravel lang={lang} />}

      {/* ---------- ABOUT ---------- */}
      {view === 'about' && (
        <>
          <section className="section section-alt">
            <div className="section-head" style={{ textAlign: 'center' }}>
              <h2 className="section-title">{t.whyTitle}</h2>
              <p className="section-sub">{t.whySub}</p>
            </div>
            <div className="feature-grid">
              <div className="feature">
                <span className="feature-icon">🏛️</span>
                <h3>{t.feature1Title}</h3>
                <p>{t.feature1Desc}</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🍜</span>
                <h3>{t.feature2Title}</h3>
                <p>{t.feature2Desc}</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🌊</span>
                <h3>{t.feature3Title}</h3>
                <p>{t.feature3Desc}</p>
              </div>
            </div>
          </section>
          <FaqGalleryNewsletter onOpen={setSelected} lang={lang} />
        </>
      )}

      <Footer 
        t={t} 
        onNavigate={(page) => setView(page)} 
        onFilter={(cat) => goExplore(cat)} 
      />
      
      <PlaceModal place={selected} onClose={() => setSelected(null)} t={t} />
      <BackToTop />
    </div>
  );
}