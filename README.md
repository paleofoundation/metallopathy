# Metallopathy

An evidence library on heavy metals in people: what published human studies and
agency documents say about metals in the body, the tests used to measure them,
and the chelators and binders studied to change those levels. Every page names
the source of every number and grades the strength of the evidence from A to F.
It does not rank brands.

Built on the shared Paleo Foundation evidence-library design system (the same
system behind PepSanon and RemapRx), rendered as a fully static Next.js site. No
database and no auth: all 81 pages are served from local content files under
`src/content/`.

## Stack

- Next.js 16 (App Router), React 19
- Tailwind v4 + a ported theme stylesheet (`src/styles/theme-wp.css`)
- Static content in `src/content/` (extracted verbatim from the evidence build)

## Content model

| Segment | URL | Count |
|---|---|---|
| Metals | `/metals/<slug>/` | 9 |
| Tests | `/tests/<slug>/` | 8 |
| Protocols and binders | `/protocols/<slug>/` | 25 |
| Foods and questions | `/questions/<slug>/` | 37 |
| Methodology | `/methodology/` | 1 |

Each page carries an evidence grade (A, B, C, D, F, or Not graded), a front-loaded
answer, cited sources, and a reference list. Grades are defined on `/methodology/`.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
```

## Content

`src/lib/site.ts` is the content access layer. Page data lives in
`src/content/pages/<segment>/<slug>.json` and is bundled into
`src/content/all.json` for lookup. Text and citations are preserved verbatim from
the source build; nothing is generated or invented at render time.
