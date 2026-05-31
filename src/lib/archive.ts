import type { ShowState } from '../types'
import { sanitizeId, venueName } from './tags'

const UPLOAD_URL = 'https://archive.org/upload'
const COLLECTION = 'opensource_movies'
const MEDIATYPE = 'movies'

// ───────────────────────────────────────────────────────────────────────────
//  MAKE THIS TOOL YOUR OWN: set these to your own name / channel and every
//  upload link will credit you as the Archive.org "creator" and link back to
//  your channel in the description. Leave CREATOR as '' to skip the credit.
// ───────────────────────────────────────────────────────────────────────────
const CREATOR = 'DJ Panda Express'
const CREATOR_URL = 'https://www.youtube.com/@DJPandaExpress'

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
  params.set('mediatype', MEDIATYPE)

  const venue = venueName(show.venue)
  const band = show.bandName.trim()
  const where = venue ? ` @ ${venue}` : ''
  const headline = band ? `${band}${where} on ${show.date}` : `Live recording${where} on ${show.date}`

  if (band) {
    params.set('identifier', `${show.date}-${sanitizeId(band)}`)
    params.set('band', band)
  }
  params.set('title', headline)
  const credit = CREATOR && CREATOR_URL ? `\n\nRecorded by ${CREATOR} — ${CREATOR_URL}` : ''
  params.set('description', headline + credit)
  if (tags.length > 0) params.set('subject', tags.join(','))
  params.set('date', show.date)
  params.set('language', 'eng')
  if (venue) params.set('venue', venue)
  if (CREATOR) params.set('creator', CREATOR)

  return `${UPLOAD_URL}?${params.toString()}`
}
