import type { VenueSelection } from '../types'
import { VenuePicker } from './VenuePicker'

interface ShowDetailsProps {
  date: string
  bandName: string
  venue: VenueSelection
  onDateChange: (date: string) => void
  onBandChange: (name: string) => void
  onSelectPreset: (id: string) => void
  onCustomVenueChange: (name: string) => void
}

/** The show inputs: date, band, and venue. Everything binds live — no Enter needed. */
export function ShowDetails(props: ShowDetailsProps) {
  return (
    <section className="show-details">
      <div className="field">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          className="text-input"
          value={props.date}
          onChange={(e) => props.onDateChange(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="band">Band</label>
        <input
          id="band"
          type="text"
          className="text-input"
          value={props.bandName}
          placeholder="The band in this video"
          onChange={(e) => props.onBandChange(e.target.value)}
        />
      </div>

      <div className="field field--wide">
        <span className="field-label">Venue</span>
        <VenuePicker
          venue={props.venue}
          onSelectPreset={props.onSelectPreset}
          onCustomChange={props.onCustomVenueChange}
        />
      </div>
    </section>
  )
}
