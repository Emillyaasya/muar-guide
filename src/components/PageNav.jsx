const LABELS = {
  en: { home: 'Home', explore: 'Explore', planner: 'Plan Trip', guide: 'Travel Guide', about: 'About & FAQ' },
  my: { home: 'Utama', explore: 'Teroka', planner: 'Rancang Trip', guide: 'Panduan', about: 'Tentang & Soalan' },
};
const ICONS = { home: '🏠', explore: '🧭', planner: '🗺️', guide: '🚗', about: '❓' };
const ORDER = ['home', 'explore', 'planner', 'guide', 'about'];

export default function PageNav({ view, setView, lang = 'en' }) {
  const L = LABELS[lang] || LABELS.en;
  return (
    <nav className="page-nav" aria-label="Pages">
      {ORDER.map((key) => (
        <button
          key={key}
          className={`page-nav-item ${view === key ? 'active' : ''}`}
          onClick={() => setView(key)}
          aria-label={L[key]}
          title={L[key]}
        >
          <span className="pn-icon" aria-hidden="true">{ICONS[key]}</span>
          <span className="pn-label">{L[key]}</span>
        </button>
      ))}
    </nav>
  );
}