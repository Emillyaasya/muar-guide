import { useState } from 'react';
import { allPlaces } from '../data/muarData';

/* ---------- small EN / BM text dictionary (so you don't need to touch translations.js) ---------- */
const TXT = {
  en: {
    hlTitle: 'Top Picks in Muar', hlSub: 'Hand-picked places to start your trip.', hlBtn: 'Read More',
    evTitle: 'Festivals & Events', evSub: 'Muar comes alive during these seasons. Check local listings for exact dates.',
    gtTitle: 'Getting to Muar', gtSub: 'Approximate driving distances and the best time to visit.',
    from: 'From', dist: 'Distance', time: 'Drive time', best: 'Best time to visit', weather: 'Weather',
    bestDesc: 'Muar is warm all year (about 24–33°C). The drier months, roughly March to September, are best for walking tours. Expect more rain from November to January.',
    note: 'Distances and times are approximate and vary with traffic.',
    faqTitle: 'Frequently Asked Questions', galTitle: 'Photo Gallery',
    nlTitle: 'Get Muar travel updates', nlSub: 'Food spots, festivals and trip ideas in your inbox.',
    nlPlace: 'Your email address', nlBtn: 'Subscribe', nlThanks: 'Thank you! You are on the list.',
    catEyebrow: 'Discover', catTitle: 'Explore Muar by Category', catSub: 'Pick what you feel like, from food trails to riverside heritage.',
    viewMore: 'View More', places: 'places', create: 'Create Your Story', journeyEyebrow: 'Find your way', directions: 'Directions',
    catNames: { accommodation: 'Stay', food: 'Food & Drinks', heritage: 'Culture & Heritage', entertainment: 'Entertainment' },
  },
  my: {
    hlTitle: 'Pilihan Utama di Muar', hlSub: 'Tempat pilihan untuk memulakan perjalanan anda.', hlBtn: 'Baca Lagi',
    evTitle: 'Perayaan & Acara', evSub: 'Muar meriah pada musim-musim ini. Semak senarai tempatan untuk tarikh tepat.',
    gtTitle: 'Perjalanan ke Muar', gtSub: 'Anggaran jarak pemanduan dan masa terbaik untuk melawat.',
    from: 'Dari', dist: 'Jarak', time: 'Masa memandu', best: 'Masa terbaik melawat', weather: 'Cuaca',
    bestDesc: 'Muar panas sepanjang tahun (sekitar 24–33°C). Bulan yang lebih kering, kira-kira Mac hingga September, sesuai untuk berjalan. Jangkakan lebih banyak hujan dari November hingga Januari.',
    note: 'Jarak dan masa adalah anggaran dan bergantung pada trafik.',
    faqTitle: 'Soalan Lazim', galTitle: 'Galeri Foto',
    nlTitle: 'Dapatkan kemas kini pelancongan Muar', nlSub: 'Tempat makan, perayaan dan idea perjalanan ke e-mel anda.',
    nlPlace: 'Alamat e-mel anda', nlBtn: 'Langgan', nlThanks: 'Terima kasih! Anda telah didaftarkan.',
    catEyebrow: 'Terokai', catTitle: 'Teroka Muar Mengikut Kategori', catSub: 'Pilih apa yang anda suka, dari jejak makanan hingga warisan tepi sungai.',
    viewMore: 'Lihat Lagi', places: 'tempat', create: 'Cipta Kisah Anda', journeyEyebrow: 'Cari jalan anda', directions: 'Arah',
    catNames: { accommodation: 'Penginapan', food: 'Makanan & Minuman', heritage: 'Budaya & Warisan', entertainment: 'Hiburan' },
  },
};

/* ---------- 0. Category tiles (inspired by visitjohor2026.my) ---------- */
const CAT_META = [
  { key: 'food', icon: '🍜', tone: 'tone-a' },
  { key: 'heritage', icon: '🏛️', tone: 'tone-b' },
  { key: 'entertainment', icon: '🎬', tone: 'tone-c' },
  { key: 'accommodation', icon: '🏨', tone: 'tone-d' },
];

export function Categories({ onPick, onPlan, lang = 'en' }) {
  const x = TXT[lang] || TXT.en;
  return (
    <section className="section">
      <div className="section-head" style={{ textAlign: 'center' }}>
        <span className="eyebrow">{x.catEyebrow}</span>
        <h2 className="section-title">{x.catTitle}</h2>
        <p className="section-sub" style={{ margin: '0.5rem auto 0' }}>{x.catSub}</p>
      </div>
      <div className="cat-grid">
        {CAT_META.map((c) => {
          const n = allPlaces.filter((p) => p.category === c.key).length;
          return (
            <button key={c.key} className={`cat-tile ${c.tone}`} onClick={() => onPick(c.key)}>
              <span className="cat-icon">{c.icon}</span>
              <span className="cat-name">{x.catNames[c.key]}</span>
              <span className="cat-count">{n} {x.places}</span>
              <span className="cat-more">{x.viewMore} →</span>
            </button>
          );
        })}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="btn btn-primary cta-big" onClick={onPlan}>{x.create} →</button>
      </div>
    </section>
  );
}

/* ---------- 1. Featured highlights ---------- */
export function Highlights({ onOpen, lang = 'en' }) {
  const x = TXT[lang] || TXT.en;
  // one place from each category, up to 3
  const picks = [];
  const seen = new Set();
  for (const p of allPlaces) {
    if (!seen.has(p.category)) { seen.add(p.category); picks.push(p); }
    if (picks.length === 3) break;
  }
  return (
    <section className="section">
      <div className="section-head" style={{ textAlign: 'center' }}>
        <h2 className="section-title">{x.hlTitle}</h2>
        <p className="section-sub" style={{ margin: '0.5rem auto 0' }}>{x.hlSub}</p>
      </div>
      <div className="highlight-grid">
        {picks.map((p) => (
          <article key={p.id} className="highlight glass-panel" onClick={() => onOpen(p)}>
            {p.image ? <img src={p.image} alt={p.name} loading="lazy" /> : <div className="image-placeholder" aria-hidden="true"><span>📍</span></div>}
            <div className="highlight-body">
              <h3>{p.name}</h3>
              <p>{p.note}</p>
              <span className="highlight-link">{x.hlBtn} →</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- 2. Events + Getting there ---------- */
const EVENTS = {
  en: [
    { icon: '🏮', name: 'Chinese New Year', when: 'Jan – Feb', desc: 'Lanterns, family reunion feasts and lion dances around the town.' },
    { icon: '🌙', name: 'Hari Raya Aidilfitri', when: 'After Ramadan', desc: 'Ramadan bazaars and festive open houses with traditional Malay dishes.' },
    { icon: '🪔', name: 'Deepavali', when: 'Oct – Nov', desc: 'Festival of lights, with decorated homes and temple celebrations.' },
    { icon: '🎆', name: 'Merdeka & Local Events', when: 'Aug – Sep', desc: 'Parades and community events along the Muar river. Check local listings.' },
  ],
  my: [
    { icon: '🏮', name: 'Tahun Baru Cina', when: 'Jan – Feb', desc: 'Tanglung, jamuan reunion keluarga dan tarian singa di sekitar bandar.' },
    { icon: '🌙', name: 'Hari Raya Aidilfitri', when: 'Selepas Ramadan', desc: 'Bazar Ramadan dan rumah terbuka dengan hidangan Melayu tradisional.' },
    { icon: '🪔', name: 'Deepavali', when: 'Okt – Nov', desc: 'Pesta cahaya dengan rumah berhias dan sambutan di kuil.' },
    { icon: '🎆', name: 'Merdeka & Acara Tempatan', when: 'Ogos – Sep', desc: 'Perarakan dan acara komuniti di tepi Sungai Muar. Semak senarai tempatan.' },
  ],
};
const ROUTES = [
  { from: 'Melaka', dist: '~50 km', time: '~45 min' },
  { from: 'Kuala Lumpur', dist: '~190 km', time: '~2 h 15 min' },
  { from: 'Johor Bahru', dist: '~170 km', time: '~2 h' },
  { from: 'Singapore', dist: '~200 km', time: '~2 h 30 min' },
];

export function EventsAndTravel({ lang = 'en' }) {
  const x = TXT[lang] || TXT.en;
  const ev = EVENTS[lang] || EVENTS.en;
  return (
    <>
      <section className="section">
        <div className="section-head" style={{ textAlign: 'center' }}>
          <h2 className="section-title">{x.evTitle}</h2>
          <p className="section-sub" style={{ margin: '0.5rem auto 0' }}>{x.evSub}</p>
        </div>
        <div className="event-grid">
          {ev.map((e) => (
            <div key={e.name} className="event glass-panel">
              <span className="event-icon">{e.icon}</span>
              <span className="event-when">{e.when}</span>
              <h3>{e.name}</h3>
              <p>{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head" style={{ textAlign: 'center' }}>
          <span className="eyebrow">{x.journeyEyebrow}</span>
          <h2 className="section-title">{x.gtTitle}</h2>
          <p className="section-sub" style={{ margin: '0.5rem auto 0' }}>{x.gtSub}</p>
        </div>
        <div className="travel-wrap">
          <div className="glass-panel travel-table">
            <table>
              <thead><tr><th>{x.from}</th><th>{x.dist}</th><th>{x.time}</th><th></th></tr></thead>
              <tbody>
                {ROUTES.map((r) => (
                  <tr key={r.from}>
                    <td>{r.from}</td><td>{r.dist}</td><td>{r.time}</td>
                    <td>
                      <a className="route-link" target="_blank" rel="noopener noreferrer"
                         href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(r.from)}&destination=${encodeURIComponent('Muar, Johor')}`}>
                        {x.directions} ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="travel-note">{x.note}</p>
          </div>
          <div className="glass-panel travel-weather">
            <span className="event-icon">🌤️</span>
            <h3>{x.best}</h3>
            <p>{x.bestDesc}</p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- 3. FAQ + Gallery + Newsletter ---------- */
const FAQ = {
  en: [
    ['How many days do I need in Muar?', 'One full day covers the main food and heritage spots. Two to three days lets you explore at a relaxed pace. Use the Trip Planner to build your own plan.'],
    ['What is Muar famous for?', 'Muar is known for its food, including otak-otak and mee bandung, as well as heritage buildings, the riverfront and local culture.'],
    ['Is Muar halal-friendly?', 'Yes. Many eateries are halal, and you will also find Chinese and Indian food. Look for halal certification at each place.'],
    ['How do I get around?', 'A car or e-hailing is easiest. The town centre is also walkable for most of the heritage sites.'],
    ['What should I wear to temples and mosques?', 'Dress modestly with shoulders and knees covered, and remove your shoes before entering. See Local Customs in the Trip Planner.'],
  ],
  my: [
    ['Berapa hari yang diperlukan di Muar?', 'Satu hari penuh meliputi tempat makan dan warisan utama. Dua hingga tiga hari memberi masa untuk meneroka dengan santai. Gunakan Perancang Perjalanan untuk membina pelan anda.'],
    ['Muar terkenal dengan apa?', 'Muar terkenal dengan makanan seperti otak-otak dan mee bandung, serta bangunan warisan, tepi sungai dan budaya tempatan.'],
    ['Adakah Muar mesra halal?', 'Ya. Ramai kedai makan adalah halal, dan terdapat juga makanan Cina dan India. Semak pensijilan halal di setiap tempat.'],
    ['Bagaimana untuk bergerak di Muar?', 'Kereta atau e-hailing paling mudah. Pusat bandar juga boleh dilawati dengan berjalan kaki.'],
    ['Apa yang perlu dipakai ke kuil dan masjid?', 'Berpakaian sopan dengan bahu dan lutut tertutup, dan tanggalkan kasut sebelum masuk. Lihat Adat Tempatan dalam Perancang Perjalanan.'],
  ],
};

const FORM_URL = 'https://formspree.io/f/xaeoobwq'; // Formspree: Muar Assistance Update

export function FaqGalleryNewsletter({ onOpen, lang = 'en' }) {
  const x = TXT[lang] || TXT.en;
  const faq = FAQ[lang] || FAQ.en;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const photos = allPlaces.filter((p) => p.image).slice(0, 6);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setStatus('done'); setEmail(''); }
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="section">
        <div className="section-head" style={{ textAlign: 'center' }}>
          <h2 className="section-title">{x.faqTitle}</h2>
        </div>
        <div className="faq-list">
          {faq.map(([q, a]) => (
            <details key={q} className="faq glass-panel">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head" style={{ textAlign: 'center' }}>
          <h2 className="section-title">{x.galTitle}</h2>
        </div>
        <div className="gallery">
          {photos.map((p) => (
            <button key={p.id} className="gallery-item" onClick={() => onOpen(p)} aria-label={p.name}>
              <img src={p.image} alt={p.name} loading="lazy" />
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <form className="newsletter glass-panel" onSubmit={submit}>
          <h2 className="section-title">{x.nlTitle}</h2>
          <p className="section-sub" style={{ margin: '0.5rem auto 1.25rem' }}>{x.nlSub}</p>
          {status === 'done' ? (
            <p className="newsletter-done">✅ {x.nlThanks}</p>
          ) : (
            <>
              <div className="newsletter-row">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={x.nlPlace} />
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? '…' : x.nlBtn}
                </button>
              </div>
              {status === 'error' && (
                <p style={{ color: '#c0392b', marginTop: '0.75rem', fontSize: '0.85rem' }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </>
          )}
        </form>
      </section>
    </>
  );
}