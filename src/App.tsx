import { useMemo, useReducer } from 'react'
import type { ShowState, VenueSelection } from './types'
import { VENUES } from './data/venues'
import { DEFAULT_TAGS } from './data/genres'
import { buildTags, toCommas, toHashtags } from './lib/tags'
import { buildArchiveUrl } from './lib/archive'
import { ShowDetails } from './components/ShowDetails'
import { GenreGrid } from './components/GenreGrid'
import { ArchivePanel } from './components/ArchivePanel'
import { TagPreview } from './components/TagPreview'
import { OutputCard } from './components/OutputCard'

type Action =
  | { type: 'SET_DATE'; date: string }
  | { type: 'SET_BAND'; name: string }
  | { type: 'SELECT_PRESET_VENUE'; id: string }
  | { type: 'SET_CUSTOM_VENUE'; name: string }
  | { type: 'TOGGLE_GENRE'; genre: string }
  | { type: 'RESET' }

const today = (): string => new Date().toISOString().slice(0, 10)

const initialState = (): ShowState => ({
  date: today(),
  bandName: '',
  venue: { kind: 'none' },
  selectedGenres: [...DEFAULT_TAGS],
})

function reducer(state: ShowState, action: Action): ShowState {
  switch (action.type) {
    case 'SET_DATE':
      return { ...state, date: action.date }
    case 'SET_BAND':
      return { ...state, bandName: action.name }
    case 'SELECT_PRESET_VENUE': {
      const found = VENUES.find((v) => v.id === action.id)
      const venue: VenueSelection = found ? { kind: 'preset', venue: found } : { kind: 'none' }
      return { ...state, venue }
    }
    case 'SET_CUSTOM_VENUE':
      return {
        ...state,
        venue: action.name.trim() === '' ? { kind: 'none' } : { kind: 'custom', name: action.name },
      }
    case 'TOGGLE_GENRE': {
      const has = state.selectedGenres.includes(action.genre)
      return {
        ...state,
        selectedGenres: has
          ? state.selectedGenres.filter((g) => g !== action.genre)
          : [...state.selectedGenres, action.genre],
      }
    }
    case 'RESET':
      return initialState()
    default:
      return state
  }
}

export default function App() {
  const [show, dispatch] = useReducer(reducer, undefined, initialState)

  // Everything below is derived from `show` — no effects, no mirrored state.
  const tags = useMemo(() => buildTags(show), [show])
  const archiveUrl = useMemo(() => buildArchiveUrl(show, tags), [show, tags])
  const hashtags = useMemo(() => toHashtags(tags), [tags])
  const commas = useMemo(() => toCommas(tags), [tags])

  return (
    <div className="app">
      <header className="app__header">
        <h1>Archive.org Show Tagger</h1>
        <p className="muted">Pick a venue, name the band, tap genres — get a ready-to-go upload link.</p>
      </header>

      <ShowDetails
        date={show.date}
        bandName={show.bandName}
        venue={show.venue}
        onDateChange={(date) => dispatch({ type: 'SET_DATE', date })}
        onBandChange={(name) => dispatch({ type: 'SET_BAND', name })}
        onSelectPreset={(id) => dispatch({ type: 'SELECT_PRESET_VENUE', id })}
        onCustomVenueChange={(name) => dispatch({ type: 'SET_CUSTOM_VENUE', name })}
      />

      <GenreGrid selected={show.selectedGenres} onToggle={(genre) => dispatch({ type: 'TOGGLE_GENRE', genre })} />

      <ArchivePanel url={archiveUrl} />

      <TagPreview tags={tags} onReset={() => dispatch({ type: 'RESET' })} />

      <div className="secondary-outputs">
        <OutputCard title="Instagram hashtags" hint="Paste into your IG caption" content={hashtags} />
        <OutputCard
          title="YouTube tags"
          hint="Comma-separated — for YouTube, or to paste into Archive.org's subject field"
          content={commas}
        />
      </div>
    </div>
  )
}
