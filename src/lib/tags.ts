import type { ShowState, VenueSelection } from '../types'
import { DEFAULT_TAGS } from '../data/genres'

/**
 * Capitalize the first letter of each space-separated word, leaving the rest
 * untouched (so stylized all-caps like "MIL-SPEC" survive). Mirrors v1's
 * startCaseWords — applied to free-text band/venue input, not curated genres.
 */
export const titleCaseWords = (value: string): string =>
  value
    .split(' ')
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ')

/** Display name for a venue selection (trimmed + title-cased for custom input). */
export function venueName(selection: VenueSelection): string {
  if (selection.kind === 'preset') return selection.venue.name
  if (selection.kind === 'custom') return titleCaseWords(selection.name.trim())
  return ''
}

/** Location/identity tags contributed by a venue selection. */
export function venueTags(selection: VenueSelection): string[] {
  if (selection.kind === 'preset') return selection.venue.tags
  if (selection.kind === 'custom') {
    const name = titleCaseWords(selection.name.trim())
    return name ? [name] : []
  }
  return []
}

/** De-duplicate case-insensitively, keeping the first-seen casing. */
export function dedupeCaseInsensitive(tags: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const tag of tags) {
    const key = tag.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      out.push(tag)
    }
  }
  return out
}

/**
 * The single derivation that merges the three concerns (defaults + genres +
 * venue + band) into the final, sorted, de-duplicated tag list. Pure: no state,
 * no filtering of a shared array.
 */
export function buildTags(show: ShowState): string[] {
  const band = titleCaseWords(show.bandName.trim())
  const all = [
    ...DEFAULT_TAGS,
    ...show.selectedGenres,
    ...venueTags(show.venue),
    ...(band ? [band] : []),
  ]
  return dedupeCaseInsensitive(all).sort((a, b) => a.localeCompare(b))
}

/** Instagram: "#PunkRock #Hardcore" */
export const toHashtags = (tags: string[]): string =>
  tags.map((tag) => '#' + tag.replace(/\s+/g, '')).join(' ')

/** YouTube tags field (and Archive.org subject): "a,b,c" */
export const toCommas = (tags: string[]): string => tags.join(',')

/** Strip characters Archive.org disallows in an item identifier. */
export const sanitizeId = (value: string): string => value.replace(/[^a-zA-Z0-9-_]/g, '')
