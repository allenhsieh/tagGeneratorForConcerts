import { useClipboard } from '../hooks/useClipboard'

interface OutputCardProps {
  title: string
  content: string
  hint?: string
}

/** A titled block of generated text with a copy button. */
export function OutputCard({ title, content, hint }: OutputCardProps) {
  const { copy, copied } = useClipboard()
  return (
    <section className="output-card">
      <div className="output-card__head">
        <h3>{title}</h3>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => copy(content)}
          disabled={!content}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {hint && <p className="output-card__hint">{hint}</p>}
      <pre className="output-card__content">{content}</pre>
    </section>
  )
}
