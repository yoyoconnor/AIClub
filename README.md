# University of Alabama AI Club

The official site for the UA AI Club — events, projects, team, and a handful of
in-browser AI demos. Built and maintained entirely by club members.

## Stack

| Layer     | Choice                                      |
| --------- | ------------------------------------------- |
| Framework | React 19 + TypeScript                       |
| Build     | Vite 6 (+ `vite-plugin-pwa`)                |
| Styling   | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Motion    | `motion` (Framer Motion 12)                 |
| Icons     | `lucide-react`                              |
| ML demos  | TensorFlow.js (lazy-loaded)                 |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build locally
npm run lint       # eslint (must be clean before pushing)
```

## Design system

Everything visual is driven by tokens in `src/index.css`. Nothing should hardcode
a hex value in a component — reach for the scale instead.

- **Palette** — `crimson-50…950` (Alabama crimson, extended into a usable scale)
  and `ink-50…950` (the dark canvas). Use `crimson-600` for primary actions,
  `crimson-500`/`400` for glows and accents, `ink-950` for page background,
  `ink-300`/`400` for body copy.
- **Type** — `font-display` (Space Grotesk) for headings, `font-sans` (Inter) for
  body, `font-mono` (JetBrains Mono) for eyebrows, labels, and metadata.
- **Custom utilities** — `text-gradient`, `glass`, `glow-crimson`, `bg-grid`,
  `bg-dots`, `bg-noise`, `mask-fade-x`, `mask-fade-b`, `section`, `text-hero`,
  `text-section`, `eyebrow`.
- **Animations** — `animate-drift`, `animate-marquee`, `animate-pulse-glow`,
  `animate-scan`, `animate-spin-slow`, `animate-blink`, `animate-float`.
- `.doc` — an unlayered block of typography rules that dark-themes long-form
  content pages (meeting agendas, tutorials) without rewriting their markup.

Reduced-motion is respected globally: CSS animations are neutered in
`index.css` and `<MotionConfig reducedMotion="user">` handles Framer.

## Project layout

```
src/
├─ components/
│  ├─ ui/            Reusable primitives — see below
│  ├─ header.tsx     Fixed glass nav with animated active pill + mobile drawer
│  ├─ footer.tsx     Site footer with oversized wordmark
│  ├─ heroSection.tsx
│  ├─ pillars.tsx    "Four things we do" grid
│  ├─ clubEvents.tsx Home events section + the shared <EventCard>
│  ├─ ImageGallery.tsx  Masonry grid + keyboard-navigable lightbox
│  └─ joinCta.tsx    Bottom conversion section
├─ pages/            One file per route
├─ data/             All copy and content lives here — edit this, not the JSX
├─ hooks/
└─ lib/
```

### UI primitives (`src/components/ui/`)

| File           | Exports                                                                      |
| -------------- | ---------------------------------------------------------------------------- |
| `Reveal.tsx`   | `Reveal`, `Stagger`, `StaggerItem`, `RevealWords`                            |
| `Cards.tsx`    | `GlowCard` (cursor spotlight + 3D tilt), `StatTile`                          |
| `Buttons.tsx`  | `PrimaryButton`, `GhostButton`, `Magnetic`, `Chip`                           |
| `Backdrop.tsx` | `Backdrop` (aurora + grid + grain), `ScrollProgress`, `NeuralCanvas`         |
| `Bits.tsx`     | `SectionHeading`, `Eyebrow`, `Counter`, `Typewriter`, `Marquee`, `PageShell` |
| `DocPage.tsx`  | `DocPage` shell for long-form content routes                                 |

## Adding content

Nearly everything is data-driven — you shouldn't need to touch a component to
publish a new event or member.

- **New event** → add an entry to `src/data/clubEvents.ts`. Use `YYYY-MM-DD` for
  `date`; upcoming/past is derived automatically. `link` can be an internal
  route (`4-17-25`) or a full URL.
- **New project** → `src/data/projectsData.ts`. `status` accepts `Live`,
  `In progress`, or `Archived`, and drives the badge colour.
- **New member** → `src/data/teamMembers.ts`. `position` must match one of the
  roles listed in `GROUPS` in `src/pages/TeamPage.tsx` or the member won't
  appear in a section.
- **About page copy, timeline, values** → `src/data/aboutContent.ts`.
- **Gallery photos** → drop the file in `public/` and add it to
  `src/data/galleryImages.ts`.

### A new write-up page

Create the route component, wrap the body in `<DocPage>`, and register it in
`src/App.tsx`. Plain HTML inside `DocPage` picks up the dark theme for free:

```tsx
import { DocPage } from '../../components/ui/DocPage';

export default function MyMeeting() {
  return (
    <DocPage eyebrow="Meeting recap · Sep 4, 2026" title="Fine-tuning workshop" lede="…">
      <h2>Agenda</h2>
      <p>…</p>
    </DocPage>
  );
}
```

## Performance notes

TensorFlow.js is ~1.6 MB and is only needed by the digit recognizer, so
`ProjectDetailPage` loads it with `React.lazy`. Keep it that way — importing tf
anywhere eagerly puts it back in the main bundle.

## Contributing

1. Branch off `main`.
2. `npm run lint` and `npm run build` must both pass.
3. Prettier runs on commit via Husky.
