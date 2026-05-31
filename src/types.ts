export interface Venue {
  /** Stable key used for selection (not shown to the user). */
  id: string
  /** Display name — drives both the picker button label and the metadata. */
  name: string
  /** Location tags emitted into the tag list (address, zip, city, state, ...). */
  tags: string[]
}

/**
 * A venue is exactly one of: a preset from the data file, a typed custom name,
 * or nothing. Modelling it as a union keeps the name and its location tags from
 * ever drifting apart.
 */
export type VenueSelection =
  | { kind: 'preset'; venue: Venue }
  | { kind: 'custom'; name: string }
  | { kind: 'none' }

export interface ShowState {
  /** ISO yyyy-mm-dd. */
  date: string
  /** One band per video (an Archive item is one set). */
  bandName: string
  venue: VenueSelection
  /** A subset of GENRES. */
  selectedGenres: string[]
}
