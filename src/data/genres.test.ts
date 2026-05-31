import { describe, it, expect } from 'vitest'
import { ALL_TAGS, GENRE_GROUPS } from './genres'

describe('genre groups', () => {
  it('cover the four major scenes, each populated', () => {
    expect(GENRE_GROUPS.map((g) => g.name)).toEqual(['Punk', 'Hardcore', 'Indie', 'Metal'])
    for (const g of GENRE_GROUPS) expect(g.tags.length).toBeGreaterThan(0)
  })

  it('has no case-insensitive duplicates across defaults and every group', () => {
    const lower = ALL_TAGS.map((t) => t.toLowerCase())
    expect(new Set(lower).size).toBe(ALL_TAGS.length)
  })

  it('keeps each group alphabetical so the grid is scannable', () => {
    for (const g of GENRE_GROUPS) {
      expect(g.tags).toEqual([...g.tags].sort((a, b) => a.localeCompare(b)))
    }
  })

  it('has no leading/trailing whitespace', () => {
    expect(ALL_TAGS.filter((t) => t !== t.trim())).toEqual([])
  })
})
