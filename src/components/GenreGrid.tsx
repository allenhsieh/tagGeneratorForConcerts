import { DEFAULT_TAGS, GENRE_GROUPS } from '../data/genres'

interface GenreGridProps {
  selected: string[]
  onToggle: (genre: string) => void
}

/**
 * Tap/click-to-toggle tag chips, grouped by scene (Core, then Punk / Hardcore /
 * Indie / Metal). Every chip toggles — including the Core defaults, which start
 * selected but can be turned off.
 */
export function GenreGrid({ selected, onToggle }: GenreGridProps) {
  const selectedSet = new Set(selected)
  const groups = [{ name: 'Core', tags: DEFAULT_TAGS }, ...GENRE_GROUPS]

  return (
    <section className="genre-section">
      <div className="section-head">
        <h2>Tags</h2>
        <span className="muted">{selected.length} selected</span>
      </div>

      {groups.map((group) => (
        <div className="genre-group" key={group.name}>
          <span className="genre-group__label">{group.name}</span>
          <div className="genre-grid" role="group" aria-label={group.name}>
            {group.tags.map((tag) => {
              const active = selectedSet.has(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  className={`chip chip--toggle${active ? ' is-active' : ''}`}
                  aria-pressed={active}
                  onClick={() => onToggle(tag)}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
