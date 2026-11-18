export default function FilterBar({
  query,
  onQueryChange,
  sort,
  onSortChange,
  category,
  onCategoryChange,
  categories,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search hotels, restaurants, attractions…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        {query && (
          <button className="clear-btn" onClick={() => onQueryChange('')} aria-label="Clear search">
            ✕
          </button>
        )}
      </div>

      <div className="filter-chips">
        <button
          className={`chip ${category === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            className={`chip ${category === c.key ? 'active' : ''}`}
            onClick={() => onCategoryChange(c.key)}
          >
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      <div className="filter-sort">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sort} onChange={(e) => onSortChange(e.target.value)}>
          <option value="recommended">Recommended</option>
          <option value="rating">Highest rated</option>
          <option value="reviews">Most reviewed</option>
          <option value="name">Name (A–Z)</option>
        </select>
      </div>
    </div>
  );
}