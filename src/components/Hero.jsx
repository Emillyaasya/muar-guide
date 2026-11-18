export default function Hero({ onPlanTrip, t }) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <span className="hero-eyebrow">{t.heroEyebrow}</span>
        <h1 className="hero-title">
          {t.heroTitle1} <em>Muar</em>{t.heroTitle2}
        </h1>
        <p className="hero-sub">
          {t.heroSub}
        </p>
        <div className="hero-actions">
          <a href="#explore" className="btn btn-primary">{t.heroBtnExplore}</a>
          <button 
            className="btn btn-ghost" 
            onClick={onPlanTrip}
            style={{ cursor: 'pointer', border: '1.5px solid rgba(255,255,255,0.4)' }}
          >
            {t.heroBtnPlan}
          </button>
        </div>
        <div className="hero-stats">
          <div><strong>3</strong><span>{t.statsCat}</span></div>
          <div><strong>19</strong><span>{t.statsPlaces}</span></div>
          <div><strong>5+</strong><span>{t.statsSources}</span></div>
        </div>
      </div>
    </section>
  );
}