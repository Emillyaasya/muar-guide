export default function Footer({ t, onNavigate, onFilter }) {
  return (
    <footer className="footer" id="plan">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>{t.footerTitle}</h4>
          <p className="footer-note" style={{ opacity: 0.85 }}>
            {t.footerDesc}
          </p>
        </div>
        
        {/* Kolum Explore - Boleh diklik untuk tapis kad di halaman utama */}
        <div className="footer-col">
          <h4>{t.footerExplore}</h4>
          <ul>
            <li style={{ cursor: 'pointer' }} onClick={() => { onNavigate('home'); onFilter('accommodation'); window.scrollTo(0, 600); }}>
              {t.footerStays}
            </li>
            <li style={{ cursor: 'pointer' }} onClick={() => { onNavigate('home'); onFilter('food'); window.scrollTo(0, 600); }}>
              {t.footerRestaurants}
            </li>
            <li style={{ cursor: 'pointer' }} onClick={() => { onNavigate('home'); onFilter('heritage'); window.scrollTo(0, 600); }}>
              {t.footerHeritage}
            </li>
            <li style={{ cursor: 'pointer' }} onClick={() => { onNavigate('home'); onFilter('entertainment'); window.scrollTo(0, 600); }}>
              {t.footerGettingAround}
            </li>
          </ul>
        </div>
        
        {/* Kolum Plan - Boleh diklik untuk pergi ke Trip Planner */}
        <div className="footer-col">
          <h4>{t.footerPlan}</h4>
          <ul>
            <li style={{ cursor: 'pointer' }} onClick={() => { onNavigate('planner'); window.scrollTo(0, 0); }}>
              {t.footerBestTime}
            </li>
            <li style={{ cursor: 'pointer' }} onClick={() => { onNavigate('planner'); window.scrollTo(0, 0); }}>
              {t.footerMoney}
            </li>
            <li style={{ cursor: 'pointer' }} onClick={() => { onNavigate('planner'); window.scrollTo(0, 0); }}>
              {t.footerSafety}
            </li>
          </ul>
        </div>
        
        {/* Kolum Ke-4: Developer & Advisor */}
        <div className="footer-col">
          <h4>{t.footerNote}</h4>
          <p className="footer-note" style={{ whiteSpace: 'pre-line', marginBottom: '1rem' }}>
            {t.footerNoteDesc}
          </p>
          
          <h4 style={{ marginTop: '1rem' }}>{t.footerAdvisor}</h4>
          <p className="footer-note">
            {t.footerAdvisorName}
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        {t.footerCopyright || `© ${new Date().getFullYear()} Muar Guide · A student project · Not affiliated with any booking platform.`}
      </div>
    </footer>
  );
}