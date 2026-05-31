/**
 * Tags pre-selected when the app loads. They're no longer forced — the user can
 * toggle any of them off — but they start checked since most uploads want them.
 */
export const DEFAULT_TAGS: string[] = ['Music', 'Punk', 'Punk Rock', 'Punk Music']

export interface GenreGroup {
  /** Section heading shown above the chips. */
  name: string
  /** The genres in this group, kept alphabetical (so the grid is scannable). */
  tags: string[]
}

/**
 * The curated subgenre vocabulary, organized by major scene. A few genres
 * genuinely straddle two scenes (grindcore, metalcore, emo…); each lives in one
 * group only. Keep groups alphabetical and in consistent Title Case.
 */
export const GENRE_GROUPS: GenreGroup[] = [
  {
    name: 'Punk',
    tags: [
      'Anarcho-Punk',
      'Art Punk',
      'Chain Punk',
      'Cowpunk',
      'Crust Punk',
      'D-beat',
      'Dance-Punk',
      'Deathrock',
      'Egg Punk',
      'Folk Punk',
      'Garage Punk',
      'Glam Punk',
      'Gothic Punk',
      'Horror Punk',
      'Noise Punk',
      'Oi!',
      'Peace Punk',
      'Pop Punk',
      'Post-Punk',
      'Proto-Punk',
      'Psychobilly',
      'Queercore',
      'Raw Punk',
      'Riot Grrrl',
      'Ska Punk',
      'Skate Punk',
      'Street Punk',
      'Two Tone',
    ],
  },
  {
    name: 'Hardcore',
    tags: [
      'Beatdown Hardcore',
      'Crossover',
      'Crossover Thrash',
      'Crustgrind',
      'Digital Hardcore',
      'Easycore',
      'Emoviolence',
      'Fastcore',
      'Grindcore',
      'Hardcore',
      'Hardcore Punk',
      'Mathcore',
      'Melodic Hardcore',
      'Metalcore',
      'Post-Hardcore',
      'Powerviolence',
      'Sasscore',
      'Screamo',
      'Skramz',
      'Straight Edge',
      'Thrashcore',
      'Youth Crew',
    ],
  },
  {
    name: 'Indie',
    tags: [
      'Alternative Rock',
      'Dream Pop',
      'Emo',
      'Garage Rock',
      'Grunge',
      'Indie Pop',
      'Indie Rock',
      'Jangle Pop',
      'Lo-Fi',
      'Math Rock',
      'Midwest Emo',
      'No Wave',
      'Noise Rock',
      'Post-Rock',
      'Power Pop',
      'Shoegaze',
      'Slowcore',
      'Surf Rock',
    ],
  },
  {
    name: 'Metal',
    tags: [
      'Black Metal',
      'Death Metal',
      'Doom Metal',
      'Metal',
      'Sludge Metal',
      'Stoner Rock',
      'Thrash',
      'Thrash Metal',
    ],
  },
]

/** Every toggleable tag (defaults + all groups) — used for de-dup guards. */
export const ALL_TAGS: string[] = [...DEFAULT_TAGS, ...GENRE_GROUPS.flatMap((g) => g.tags)]
