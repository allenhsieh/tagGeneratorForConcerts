# Archive.org Show Tagger

I was sick of manually typing tags and metadata for [the videos](https://archive.org/details/@djpandaexpress) I shoot.

Pick a venue, name the band, and tap the genres for a show. The app builds an
[archive.org/upload link with preset metadata](https://blog.archive.org/2013/02/08/presetting-metadata-with-the-new-beta-uploader/)
(title, date, subject tags, venue) so a new Archive.org item is one click away — plus copy-ready
Instagram hashtags and YouTube tags.

## How it works

Band, venue, and genres are tracked as separate state. The final tag list and every output (the
Archive link, hashtags, etc.) are **derived** from that state by pure functions in `src/lib/`, so
there's no shared-array filtering to keep in sync. Adding a venue is one entry in `src/data/venues.ts`.

## Make it yours

- **Credit yourself:** edit `CREATOR` / `CREATOR_URL` at the top of `src/lib/archive.ts` — every
  upload link will set the Archive.org *creator* and link your channel in the description. Set
  `CREATOR` to `''` to skip the credit entirely.
- **Venues:** add an entry to `src/data/venues.ts`. **Genres:** edit the alphabetical list in
  `src/data/genres.ts`.

## Development

```bash
npm install
npm run dev        # local dev server on :3000
npm test           # unit tests for the tag/URL logic (Vitest)
npm run typecheck  # tsc, no emit
npm run build      # typecheck + production build into dist/ (GitHub Pages)
```

Built with React + Vite + TypeScript; deployed to GitHub Pages via `.github/workflows/deploy.yml`.