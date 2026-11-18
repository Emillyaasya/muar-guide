export default function Contact({ onBack, t }) {
  return (
    <div className="section" style={{ paddingTop: '4rem', paddingBottom: '6rem', minHeight: '80vh' }}>
      <button className="btn btn-outline" onClick={onBack} style={{ marginBottom: '2rem' }}>
        {t.backBtn}
      </button>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{t.contactTitle}</h2>
        <p style={{ textAlign: 'center', color: 'var(--ink-soft)', marginBottom: '2rem' }}>{t.contactSub}</p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }} onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.contactName}</label>
            <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--green-50)', color: 'var(--ink)' }} required />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.contactEmail}</label>
            <input type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--green-50)', color: 'var(--ink)' }} required />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.contactMessage}</label>
            <textarea rows="5" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--green-50)', color: 'var(--ink)', fontFamily: 'inherit' }} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>{t.contactSend}</button>
        </form>
      </div>
    </div>
  );
}