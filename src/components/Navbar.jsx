import { useState } from 'react';

const TXT = {
  en: { sub: "Royal Town of Johor", search: 'Search food, places, hotels…', contact: 'Contact Us', back: '← Back' },
  my: { sub: 'Bandar Diraja Johor', search: 'Cari makanan, tempat, hotel…', contact: 'Hubungi Kami', back: '← Kembali' },
};

export default function Navbar({
  onContact, onNavigate, onSearch, isContactPage,
  isDark, toggleTheme, lang, toggleLang,
}) {
  const x = TXT[lang] || TXT.en;
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(q);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        
        {/* Brand */}
        <a
          className="brand"
          href="#top"
          onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
        >
          {/* KOTAK HIJAU LOGO DENGAN ZOOM EFFECT */}
          <div style={{
            width: '55px',   // Saiz kotak dibesarkan
            height: '55px',
            background: 'var(--green-800)', 
            borderRadius: '12px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden', // Memastikan gambar tak terkeluar dari kotak
            boxShadow: '0 2px 6px rgba(0,0,0,0.25)'
          }}>
            <img 
              src="/logo.png" 
              alt="Muar Tour Assistance Logo" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                // ZOOM GAMBAR: Tukar nombor ini jika mahu lebih besar/kecil
                transform: 'scale(1.8)' 
              }} 
            />
          </div>
          
          <span className="brand-words" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="brand-text" style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--green-900)' }}>
              Muar Tour Assistance
            </span>
            <span className="brand-sub" style={{ fontSize: '0.7rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {x.sub}
            </span>
          </span>
        </a>

        {/* Search */}
        <form className="nav-search" onSubmit={submit} role="search">
          <span aria-hidden="true">🔍</span>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={x.search}
            aria-label="Search"
          />
        </form>

        {/* Controls */}
        <div className="nav-controls">
          <div className="segmented-control" role="group" aria-label="Language">
            <button className={lang === 'my' ? 'active' : ''} onClick={() => lang !== 'my' && toggleLang()}>BM</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => lang !== 'en' && toggleLang()}>ENG</button>
          </div>

          <div className="segmented-control" role="group" aria-label="Theme">
            <button className={!isDark ? 'active' : ''} onClick={() => isDark && toggleTheme()}>Light</button>
            <button className={isDark ? 'active' : ''} onClick={() => !isDark && toggleTheme()}>Dark</button>
          </div>

          <button
            className="nav-cta"
            onClick={() => (isContactPage ? onNavigate && onNavigate('home') : onContact())}
          >
            {isContactPage ? x.back : x.contact}
          </button>
        </div>
      </div>
    </header>
  );
}