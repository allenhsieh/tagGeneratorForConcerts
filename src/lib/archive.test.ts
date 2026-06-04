import { describe, it, expect } from 'vitest'
import type { ShowState } from '../types'
import { buildArchiveUrl } from './archive'

const base: ShowState = {
  date: '2026-05-30',
  bandName: '',
  venue: { kind: 'none' },
  selectedGenres: [],
  creator: '',
}

const paramsOf = (url: string) => new URL(url).searchParams

describe('buildArchiveUrl', () => {
  it('targets the uploader with base metadata', () => {
    const url = buildArchiveUrl(base, [])
    expect(url.startsWith('https://archive.org/upload?')).toBe(true)
    const p = paramsOf(url)
    // mediatype is an admin-only field; presetting it is rejected, so we omit it
    expect(p.has('mediatype')).toBe(false)
    expect(p.get('collection')).toBe('opensource_movies')
    expect(p.get('language')).toBe('eng')
    expect(p.get('date')).toBe('2026-05-30')
  })

  it('sets the creator param from state, and omits it when blank', () => {
    expect(paramsOf(buildArchiveUrl(base, [])).get('creator')).toBeNull()
    const withCreator = { ...base, creator: 'https://www.youtube.com/@DJPandaExpress' }
    expect(paramsOf(buildArchiveUrl(withCreator, [])).get('creator')).toBe(
      'https://www.youtube.com/@DJPandaExpress',
    )
    // whitespace-only is treated as blank
    expect(paramsOf(buildArchiveUrl({ ...base, creator: '   ' }, [])).get('creator')).toBeNull()
  })

  it('sets identifier (date-band), band, title, and comma-separated subject when a band is present', () => {
    const show: ShowState = { ...base, bandName: 'Gel', venue: { kind: 'custom', name: 'High Limit Room' } }
    const p = paramsOf(buildArchiveUrl(show, ['Hardcore', 'Punk']))
    expect(p.get('identifier')).toBe('2026-05-30-Gel')
    expect(p.get('band')).toBe('Gel')
    expect(p.get('title')).toBe('Gel @ High Limit Room on 2026-05-30')
    expect(p.get('description')).toBe('Gel @ High Limit Room on 2026-05-30')
    // archive.org splits the subject field on commas, not semicolons
    expect(p.get('subject')).toBe('Hardcore,Punk')
    expect(p.get('venue')).toBe('High Limit Room')
  })

  it('falls back to a "Live recording" title with no identifier when band is missing', () => {
    const p = paramsOf(buildArchiveUrl({ ...base, venue: { kind: 'custom', name: 'The Kenton Club' } }, []))
    expect(p.get('identifier')).toBeNull()
    expect(p.get('band')).toBeNull()
    expect(p.get('title')).toBe('Live recording @ The Kenton Club on 2026-05-30')
  })

  it('omits the venue clause and param when no venue is selected', () => {
    const p = paramsOf(buildArchiveUrl({ ...base, bandName: 'Gel' }, []))
    expect(p.get('venue')).toBeNull()
    expect(p.get('title')).toBe('Gel on 2026-05-30')
  })

  it('omits subject when there are no tags', () => {
    expect(paramsOf(buildArchiveUrl(base, [])).get('subject')).toBeNull()
  })
})
