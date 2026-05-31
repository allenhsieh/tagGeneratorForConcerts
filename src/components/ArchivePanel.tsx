import { useClipboard } from '../hooks/useClipboard'

interface ArchivePanelProps {
  url: string
}

/** The hero output: a primary CTA to open the pre-filled Archive.org uploader. */
export function ArchivePanel({ url }: ArchivePanelProps) {
  const { copy, copied } = useClipboard()
  return (
    <section className="archive-panel">
      <div className="archive-panel__head">
        <h2>Archive.org upload</h2>
        <p className="muted">
          Opens the Archive.org uploader with the title, date, subject tags, and venue pre-filled.
        </p>
      </div>

      <div className="archive-panel__actions">
        <a className="btn btn--primary" href={url} target="_blank" rel="noopener noreferrer">
          Open Archive.org uploader →
        </a>
        <button type="button" className="btn btn--ghost" onClick={() => copy(url)}>
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>

      <code className="archive-panel__url">{url}</code>
    </section>
  )
}
