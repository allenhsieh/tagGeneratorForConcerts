interface TagPreviewProps {
  tags: string[]
  onReset: () => void
}

/** Read-only preview of the final, merged tag list, plus a reset. */
export function TagPreview({ tags, onReset }: TagPreviewProps) {
  return (
    <section className="tag-preview">
      <div className="section-head">
        <h3>
          Final tags <span className="muted">({tags.length})</span>
        </h3>
        <button type="button" className="btn btn--ghost" onClick={onReset}>
          Reset
        </button>
      </div>
      <div className="tag-preview__list">
        {tags.map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}
