import type { Venue } from '../types'

/**
 * Single source of truth for preset venues. `name` is used for BOTH the picker
 * button label and the Archive.org metadata, so adding a venue is one entry here.
 */
export const VENUES: Venue[] = [
  {
    id: 'highLimitRoom',
    name: 'High Limit Room',
    tags: [
      'High Limit Room',
      '720 SE Hawthorne Ave',
      '720 SE Hawthorne Ave Portland OR 97214',
      '97214',
      'Portland',
      'Portland Oregon',
      'Portland OR',
      'PDX',
      'Oregon',
    ],
  },
  {
    id: 'turnTurnTurn',
    name: 'Turn! Turn! Turn!',
    tags: [
      'Turn! Turn! Turn!',
      '8 NE Killingsworth St',
      '8 NE Killingsworth St Portland OR 97211',
      '97211',
      'Portland',
      'Portland Oregon',
      'Portland OR',
      'PDX',
      'Oregon',
    ],
  },
  {
    id: 'blackWaterBar',
    name: 'Black Water Bar',
    tags: [
      'Black Water Bar',
      '5115 NE Sandy Blvd',
      '5115 NE Sandy Blvd Portland OR 97213',
      '97213',
      'Portland',
      'Portland Oregon',
      'Portland OR',
      'PDX',
      'Oregon',
    ],
  },
  {
    id: 'kentonClub',
    name: 'The Kenton Club',
    tags: [
      'The Kenton Club',
      'Kenton Club',
      '2025 N Kilpatrick St',
      '2025 N Kilpatrick St Portland OR 97217',
      '97217',
      'Portland',
      'Portland Oregon',
      'Portland OR',
      'PDX',
      'Oregon',
    ],
  },
]
