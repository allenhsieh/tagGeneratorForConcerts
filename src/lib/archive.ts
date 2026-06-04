import type { ShowState } from '../types'
import { sanitizeId, titleCaseWords, venueName } from './tags'

const UPLOAD_URL = 'https://archive.org/upload'
const COLLECTION = 'opensource_movies'

// ───────────────────────────────────────────────────────────────────────────
//  MAKE THIS TOOL YOUR OWN: the Creator input is pre-filled with this. Anyone
//  can edit or clear it in the UI; a blank input omits the creator param.
// ───────────────────────────────────────────────────────────────────────────
export const DEFAULT_CREATOR = 'https://www.youtube.com/@DJPandaExpress'

/**
 * Build an archive.org/upload link with metadata pre-filled via query params
 * (the "presetting metadata" feature of the uploader). Pure function — no
 * effects, no missing dependencies.
 *
 * Multi-value fields (subject, collection) are comma-separated: that's the
 * separator the uploader splits on when populating the metadata editor.
 */
export function buildArchiveUrl(show: ShowState, tags: string[]): string {
  const params = new URLSearchParams()
  params.set('collection', COLLECTION)

  const venue = venueName(show.venue)
  const band = titleCaseWords(show.bandName.trim())
  const where = venue ? ` @ ${venue}` : ''
  const headline = band ? `${band}${where} on ${show.date}` : `Live recording${where} on ${show.date}`

  if (band) {
    params.set('identifier', `${show.date}-${sanitizeId(band)}`)
    params.set('band', band)
  }
  params.set('title', headline)
  params.set('description', headline)
  if (tags.length > 0) params.set('subject', tags.join(','))
  params.set('date', show.date)
  params.set('language', 'eng')
  if (venue) params.set('venue', venue)
  const creator = show.creator.trim()
  if (creator) params.set('creator', creator)

  return `${UPLOAD_URL}?${params.toString()}`
}
