const ICONS = { accommodation: '🏨', food: '🍜', heritage: '🏛️', entertainment: '🎬' };

function RatingBadge({ rating, max = 5 }) {
  // No rating yet (e.g. newly added places) -> show nothing instead of crashing
  if (typeof rating !== 'number' || !max) return null;
  const pct = Math.min(100, Math.max(0, (rating / max) * 100));
  return (
    <span className="rating-badge" aria-label={`Rating ${rating} out of ${max}`}>
      <span className="rating-badge-score">{rating.toFixed(1)}</span>
      <span className="rating-badge-max">/{max}</span>
      <span className="rating-badge-bar">
        <span className="rating-badge-fill" style={{ width: `${pct}%` }} />
      </span>
    </span>
  );
}

export default function PlaceCard({ place, onOpen, t }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`;

  // Tentukan label kategori ikut bahasa yang dipilih
  let categoryLabel = "";
  if (place.category === 'accommodation') categoryLabel = t.catStay;
  else if (place.category === 'food') categoryLabel = t.catEat;
  else if (place.category === 'entertainment') categoryLabel = t.catEntertainment || 'Entertainment';
  else categoryLabel = t.catVisit;

  return (
    <article className="place-card">
      <div className="place-card-image">
        {place.image ? (
          <img src={place.image} alt={place.name} loading="lazy" />
        ) : (
          <div className="image-placeholder" aria-hidden="true">
            <span>{ICONS[place.category] || '📍'}</span>
          </div>
        )}
        <span className="place-card-cat">
          {categoryLabel}
        </span>
      </div>

      <div className="place-card-body">
        <div className="place-card-title-row">
          <h3 className="place-card-title">{place.name}</h3>
          <RatingBadge rating={place.rating} max={place.ratingMax} />
        </div>

        <div className="place-card-meta">
          <span className="place-card-loc">📍 {place.location}</span>
          {place.reviewCount != null && (
            <span className="place-card-reviews">· {place.reviewCount.toLocaleString()} reviews</span>
          )}
          {place.priceRange && <span className="place-card-price">· 💰 {place.priceRange}</span>}
        </div>

        <p className="place-card-note">{place.note}</p>

        {place.tags?.length > 0 && (
          <div className="place-card-tags">
            {place.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="place-card-actions">
          <button className="btn btn-primary btn-sm" onClick={() => onOpen(place)}>
            {t.viewDetails}
          </button>
          <a
            className="btn btn-outline btn-sm"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.getDirections}
          </a>
        </div>
      </div>
    </article>
  );
}