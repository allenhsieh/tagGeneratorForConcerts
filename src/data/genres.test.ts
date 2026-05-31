import { describe, it, expect } from 'vitest'
import { DEFAULT_TAGS, GENRES } from './genres'

describe('GENRES', () => {
  it('has no case-insensitive duplicates', () => {
    const lower = GENRES.map((g) => g.toLowerCase())
    expect(new Set(lower).size).toBe(GENRES.length)
  })

  it('does not repeat any of the always-included DEFAULT_TAGS', () => {
    const defaults = new Set(DEFAULT_TAGS.map((t) => t.toLowerCase()))
    expect(GENRES.filter((g) => defaults.has(g.toLowerCase()))).toEqual([])
  })

  it('stays alphabetical so the grid is scannable', () => {
    const sorted = [...GENRES].sort((a, b) => a.localeCompare(b))
    expect(GENRES).toEqual(sorted)
  })

  it('has no leading/trailing whitespace', () => {
    expect(GENRES.filter((g) => g !== g.trim())).toEqual([])
  })
})
