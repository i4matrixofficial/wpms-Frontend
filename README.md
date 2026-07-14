# Fixora — Landing Page

A responsive marketing landing page for **Fixora**, a worker-hiring marketplace connecting verified local service providers (plumbers, electricians, cleaners, tutors, and more) with customers who need work done fast.

Built with **Next.js 15 (App Router)**, **React 19**, and **TypeScript**. No external CSS framework — all styling is hand-written and organized in a single global stylesheet using CSS custom properties for easy theming.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Page Sections](#page-sections)
- [Customization Guide](#customization-guide)
- [Adding Real Images](#adding-real-images)
- [Deployment](#deployment)
- [Integrating Into an Existing Project](#integrating-into-an-existing-project)

---

## Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Framework   | Next.js 15 (App Router)              |
| UI Library  | React 19                             |
| Language    | TypeScript                           |
| Styling     | Plain CSS (custom properties, no framework) |
| Fonts       | `next/font/google` — Plus Jakarta Sans (display) + Inter (body) |
| Icons       | Inline SVG (no icon library dependency) |

---

## File Structure

```
fixora-nextjs/
│
├── app/
│   ├── layout.tsx          # Root layout — loads fonts, sets page metadata, imports globals.css
│   ├── page.tsx             # Home page — imports and renders every section in order
│   └── globals.css          # All styling: CSS variables, layout, responsive rules
│
├── components/
│   ├── Navbar.tsx           # Sticky header — logo, nav links, CTA button
│   ├── Hero.tsx              # Headline, subtext, download CTA, phone mockups
│   ├── Stats.tsx              # 4-column stat bar (customers, workers, jobs, rating)
│   ├── HowItWorks.tsx          # "For Customers" / "For Workers" tab toggle — Client Component
│   ├── Features.tsx             # 8-card feature grid
│   ├── Services.tsx              # 8-card service category grid
│   ├── AppShowcase.tsx            # Phone mockup + carousel copy block
│   ├── WhyFixora.tsx               # Side-by-side customer vs. worker benefits
│   ├── Testimonials.tsx             # Customer quote card
│   ├── CTA.tsx                       # Bottom download banner (App Store / Google Play)
│   └── Footer.tsx                     # Site footer — link columns, social, copyright
│
├── public/
│   └── images/                        # Static assets (logo, avatars, screenshots) — currently empty
│
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

**Why this structure:** each visual section of the page is its own component, so you can reorder, remove, or reuse sections independently without touching unrelated code. `HowItWorks.tsx` is the only interactive piece (it uses `useState` for the tab toggle) and is the only file marked `"use client"` — every other component renders on the server by default, which keeps the page fast and ships less JavaScript to the browser.

---

## Getting Started

**Requirements:** Node.js 18.18 or later.

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open the app
http://localhost:3000
```

The page will hot-reload as you edit any file under `app/` or `components/`.

---

## Available Scripts

| Command         | Description                                  |
|-----------------|-----------------------------------------------|
| `npm run dev`    | Starts the local development server            |
| `npm run build`  | Builds an optimized production bundle           |
| `npm run start`   | Serves the production build (run after `build`)  |
| `npm run lint`     | Runs ESLint against the project                   |

---

## Page Sections

The page renders top to bottom in this order (defined in `app/page.tsx`):

1. **Navbar** — sticky navigation with anchor links to each section
2. **Hero** — primary headline and call-to-action
3. **Stats** — trust-building numbers
4. **How It Works** — interactive tabbed 3-step process for customers and workers
5. **Features** — platform capabilities grid
6. **Services** — service categories customers can book
7. **App Showcase** — product screenshots with supporting copy
8. **Why Fixora** — value proposition split by audience
9. **Testimonials** — social proof
10. **CTA** — final download push with app store badges
11. **Footer** — sitemap links and legal

---

## Customization Guide

### Colors

All colors are defined once, as CSS custom properties, at the top of `app/globals.css`:

```css
:root {
  --orange: #ff6a2b;
  --orange-deep: #e6501a;
  --ink: #151521;
  --ink-soft: #5b5b6b;
  --teal: #0ea9a0;
  --blue: #3b7dff;
  --pink: #ff4d8d;
  --purple: #8b5cf6;
  --green: #22b573;
  /* ...etc */
}
```

Change a value here once — every component that references `var(--orange)`, `var(--ink)`, etc. updates automatically. There is no need to hunt through individual component files.

### Fonts

Fonts are configured in `app/layout.tsx` using `next/font/google`:

```tsx
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: [...] });
const inter = Inter({ subsets: ["latin"], weight: [...] });
```

To swap either typeface, change the import and font name here — Next.js handles self-hosting and optimization automatically.

### Copy (Text Content)

Section content (headlines, feature descriptions, testimonial quotes, footer links) lives directly inside each component file as plain text or in small arrays at the top of the file (see `Features.tsx`, `Services.tsx`, `Footer.tsx` for examples). Edit the arrays/text directly — no CMS or data layer is wired up.

---

## Adding Real Images

Currently, avatar photos use placeholder URLs from `randomuser.me`. To use your own assets:

1. Add image files to `public/images/` (e.g. `public/images/avatar-1.jpg`).
2. Reference them in a component using a root-relative path:
   ```tsx
   <img src="/images/avatar-1.jpg" alt="Customer name" />
   ```
3. **Recommended:** for better performance (automatic resizing, lazy loading, and format optimization), replace `<img>` tags with Next.js's built-in `<Image />` component:
   ```tsx
   import Image from "next/image";
   <Image src="/images/avatar-1.jpg" alt="Customer name" width={40} height={40} />
   ```

If you keep using external image URLs (like `randomuser.me`), make sure the domain is listed under `images.remotePatterns` in `next.config.js`, or Next.js will block the request.

---

## Deployment

This is a standard Next.js app and deploys to any platform that supports Node.js or edge runtimes:

- **Vercel** (recommended, zero-config): connect the repository and deploy — no configuration required.
- **Self-hosted / other platforms:** run `npm run build` followed by `npm run start`, or use Next.js's [standalone output mode](https://nextjs.org/docs/app/api-reference/config/next-config-js/output) for containerized deployments (e.g. Docker).

---

## Integrating Into an Existing Project

If you want to merge this into an existing Next.js app rather than run it standalone:

1. Copy the contents of `components/` into your project's own `components/` folder (rename anything that collides with existing filenames).
2. Merge the CSS rules from `app/globals.css` into your project's existing global stylesheet — or keep the styles scoped to this page only by converting the file to a [CSS Module](https://nextjs.org/docs/app/building-your-application/styling/css-modules) (e.g. `fixora.module.css`) and updating each component's `className="hero"` to `className={styles.hero}`.
3. Create a dedicated route instead of overwriting your existing home page, e.g.:
   ```
   app/landing/page.tsx
   ```
   and import the section components there.

---

## License

This project is provided as-is for coursework and personal development use.