import { describe, it, expect } from 'vitest'
import type { ShowState } from '../types'
import {
  buildTags,
  dedupeCaseInsensitive,
  sanitizeId,
  titleCaseWords,
  toCommas,
  toHashtags,
  venueName,
  venueTags,
} from './tags'

const base: ShowState = {
  date: '2026-05-30',
  bandName: '',
  venue: { kind: 'none' },
  selectedGenres: [],
  creator: '',
}

describe('buildTags', () => {
  it('returns only what is selected — defaults are no longer forced', () => {
    expect(buildTags(base)).toEqual([])
    expect(buildTags({ ...base, selectedGenres: ['Music', 'Punk'] })).toEqual(['Music', 'Punk'])
  })

  it('merges genres, venue tags, and band from separate state', () => {
    const tags = buildTags({
      ...base,
      bandName: 'Gel',
      venue: { kind: 'preset', venue: { id: 'x', name: 'High Limit Room', tags: ['High Limit Room', 'Portland'] } },
      selectedGenres: ['Hardcore', 'Powerviolence'],
    })
    expect(tags).toEqual(expect.arrayContaining(['Gel', 'High Limit Room', 'Portland', 'Hardcore', 'Powerviolence']))
  })

  it('de-dupes case-insensitively and sorts', () => {
    const tags = buildTags({ ...base, selectedGenres: ['Punk', 'punk', 'Hardcore'] })
    expect(tags.filter((t) => t.toLowerCase() === 'punk')).toHaveLength(1)
    expect(tags).toEqual([...tags].sort((a, b) => a.localeCompare(b)))
  })

  it('omits a blank/whitespace band name', () => {
    expect(buildTags({ ...base, bandName: '   ' })).not.toContain('')
    expect(buildTags({ ...base, bandName: '   ' })).toEqual(buildTags(base))
  })

  it('title-cases a free-text band name (mirrors v1)', () => {
    expect(buildTags({ ...base, bandName: 'gouge away' })).toContain('Gouge Away')
  })
})

describe('formatters', () => {
  it('toHashtags strips whitespace and prefixes #', () => {
    expect(toHashtags(['Punk Rock', 'Hardcore'])).toBe('#PunkRock #Hardcore')
  })
  it('toCommas joins correctly', () => {
    expect(toCommas(['a', 'b', 'c'])).toBe('a,b,c')
  })
})

describe('helpers', () => {
  it('dedupeCaseInsensitive keeps first-seen casing', () => {
    expect(dedupeCaseInsensitive(['Punk', 'punk', 'PUNK', 'Hardcore'])).toEqual(['Punk', 'Hardcore'])
  })
  it('sanitizeId removes URL-unsafe characters', () => {
    expect(sanitizeId('Gel!! / 2024')).toBe('Gel2024')
  })
  it('titleCaseWords capitalizes each word but preserves stylized caps', () => {
    expect(titleCaseWords('gouge away')).toBe('Gouge Away')
    expect(titleCaseWords('MIL-SPEC')).toBe('MIL-SPEC')
  })
  it('venueName resolves preset, custom (trimmed), and none', () => {
    expect(venueName({ kind: 'preset', venue: { id: 'x', name: 'Foo', tags: [] } })).toBe('Foo')
    expect(venueName({ kind: 'custom', name: '  Bar  ' })).toBe('Bar')
    expect(venueName({ kind: 'none' })).toBe('')
  })
  it('venueTags returns [] for an empty custom name', () => {
    expect(venueTags({ kind: 'custom', name: '   ' })).toEqual([])
    expect(venueTags({ kind: 'custom', name: 'Some Garage' })).toEqual(['Some Garage'])
  })
})
