import type { ShowState } from '../types'
import { sanitizeId, venueName } from './tags'

const UPLOAD_URL = 'https://archive.org/upload'
const COLLECTION = 'opensource_movies'
const MEDIATYPE = 'movies'

// ───────────────────────────────────────────────────────────────────────────
//  MAKE THIS TOOL YOUR OWN: set this to your channel/profile link and every
//  upload link will pre-fill it as the Archive.org "creator". Leave '' to skip.
// ───────────────────────────────────────────────────────────────────────────
const CREATOR = 'https://www.youtube.com/@DJPandaExpress'

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
  params.set('description', headline)
  if (tags.length > 0) params.set('subject', tags.join(','))
  params.set('date', show.date)
  params.set('language', 'eng')
  if (venue) params.set('venue', venue)
  if (CREATOR) params.set('creator', CREATOR)

  return `${UPLOAD_URL}?${params.toString()}`
}
