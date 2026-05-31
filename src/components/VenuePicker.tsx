import type { VenueSelection } from '../types'
import { VENUES } from '../data/venues'

interface VenuePickerProps {
  venue: VenueSelection
  onSelectPreset: (id: string) => void
  onCustomChange: (name: string) => void
}

/** Preset venue buttons (labels come from the data) plus a custom-venue input. */
export function VenuePicker({ venue, onSelectPreset, onCustomChange }: VenuePickerProps) {
  const activeId = venue.kind === 'preset' ? venue.venue.id : null
  const customValue = venue.kind === 'custom' ? venue.name : ''

  return (
    <div className="venue-picker">
      <div className="venue-picker__presets">
        {VENUES.map((v) => (
          <button
            key={v.id}
            type="button"
            className={`chip chip--toggle${activeId === v.id ? ' is-active' : ''}`}
            aria-pressed={activeId === v.id}
            onClick={() => onSelectPreset(v.id)}
          >
            {v.name}
          </button>
        ))}
      </div>
      <input
        type="text"
        className="text-input"
        placeholder="…or type a custom venue"
        value={customValue}
        onChange={(e) => onCustomChange(e.target.value)}
      />
    </div>
  )
}
