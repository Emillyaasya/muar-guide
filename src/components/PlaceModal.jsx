import { useEffect } from 'react';

const ICONS = { accommodation: '🏨', food: '🍜', heritage: '🏛️', entertainment: '🎬' };

export default function PlaceModal({ place, onClose }) {
  const mapsUrl = place
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`
    : '#';

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!place) return null;

  const hasRating = typeof place.rating === 'number' && place.ratingMax;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-image">
          {place.image ? (
            <img src={place.image} alt={place.name} />
          ) : (
            <div className="image-placeholder" aria-hidden="true">
              <span>{ICONS[place.category] || '📍'}</span>
            </div>
          )}
        </div>

        <div className="modal-body">
          <div className="modal-title-row">
            <h2>{place.name}</h2>
            {hasRating && (
              <span className="rating-pill">
                ⭐ {place.rating.toFixed(1)}/{place.ratingMax}{place.ratingLabel ? ` · ${place.ratingLabel}` : ''}
              </span>
            )}
          </div>

          <div className="modal-meta">
            <span>📍 {place.location}</span>
            {place.reviewCount != null && (
              <span>· {place.reviewCount.toLocaleString()} reviews</span>
            )}
            {place.priceRange && <span>· 💰 {place.priceRange}</span>}
            {place.duration && <span>· ⏱ {place.duration}</span>}
          </div>

          <p className="modal-note">{place.note}</p>

          {place.tags?.length > 0 && (
            <div className="place-card-tags">
              {place.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}

          <div className="modal-source">
            <strong>Source:</strong>{' '}
            <a href={place.sourceUrl} target="_blank" rel="noopener noreferrer">
              {place.source}
            </a>
          </div>

          <div className="modal-actions">
            <a
              className="btn btn-primary"
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
            <a
              className="btn btn-outline"
              href={place.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}