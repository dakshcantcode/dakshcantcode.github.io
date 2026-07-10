# dakshcantcode.github.io

Personal portfolio for Daksh Agrawal — CS @ University of Waterloo, AI Engineer @ Kissht.

Live at **[dakshcantcode.github.io](https://dakshcantcode.github.io)**.

## Stack

- [Next.js](https://nextjs.org) (App Router, static export)
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/) for scroll-driven and interactive animation

## Project structure

```
src/
  app/            Routes: / (home), /about, /experience
  components/
    home/         Sections used on the landing page
    experience/   Experience page: timeline, project showcase, skills
    about/        About page: instruments, Now Playing, contact
    shell/        Site-wide chrome: nav, footer, theming, notation motifs
    piano/        Reusable interactive piano-key primitive
    stage/        Moonlight Sonata audio engine + player controls
    motion/       Shared animation primitives (reveal, stagger, signal thread, etc.)
    ui/           shadcn/ui primitives
  lib/            Typed content (resume data, Spotify playlist snapshot)
  hooks/          Shared hooks
public/           Static assets
```

## Development

```bash
npm install
npm run dev       # start the dev server at localhost:3000
npm run build     # production static export -> out/
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
static export and publishes it to GitHub Pages automatically.
