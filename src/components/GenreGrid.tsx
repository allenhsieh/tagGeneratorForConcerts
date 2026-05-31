import { DEFAULT_TAGS, GENRES } from '../data/genres'

interface GenreGridProps {
  selected: string[]
  onToggle: (genre: string) => void
}

/** Tap/click-to-toggle genre chips (touch-friendly; no drag-select). */
export function GenreGrid({ selected, onToggle }: GenreGridProps) {
  const selectedSet = new Set(selected)
  return (
    <section className="genre-section">
      <div className="section-head">
        <h2>Genres</h2>
        <span className="muted">{selected.length} selected</span>
      </div>

      <div className="always-included">
        <span className="muted">Always included:</span>
        {DEFAULT_TAGS.map((tag) => (
          <span key={tag} className="chip chip--locked">
            {tag}
          </span>
        ))}
      </div>

      <div className="genre-grid" role="group" aria-label="Genres">
        {GENRES.map((genre) => {
          const active = selectedSet.has(genre)
          return (
            <button
              key={genre}
              type="button"
              className={`chip chip--toggle${active ? ' is-active' : ''}`}
              aria-pressed={active}
              onClick={() => onToggle(genre)}
            >
              {genre}
            </button>
          )
        })}
      </div>
    </section>
  )
}
