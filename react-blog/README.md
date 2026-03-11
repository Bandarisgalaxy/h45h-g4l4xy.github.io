# H45H G4L4XY — React Blog

Modern cybersecurity blog built with Next.js, React, and Tailwind CSS.

## Features

- Animated hacker-terminal intro screen
- Matrix rain background
- Blog with Markdown rendering + syntax highlighting
- Full-text search
- Category & tag filtering
- Table of contents
- Copy code buttons
- Dark / light theme toggle
- Custom neon cursor
- Fully responsive
- Static export → GitHub Pages deployment

## Quick Start

```bash
# 1. Install dependencies
cd react-blog
npm install

# 2. Migrate your Jekyll posts
chmod +x migrate.sh
./migrate.sh

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

## Project Structure

```
react-blog/
├── _posts/               ← Markdown blog posts (migrated here)
├── src/
│   ├── app/              ← Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── categories/
│   │   │   ├── page.tsx
│   │   │   └── [category]/page.tsx
│   │   ├── tags/[tag]/page.tsx
│   │   └── about/page.tsx
│   ├── components/       ← React UI components
│   ├── lib/              ← posts.ts, utils.ts
│   ├── types/            ← TypeScript types
│   └── context/          ← ThemeContext
├── public/               ← Static assets
├── migrate.sh            ← Migration script
├── next.config.js
└── tailwind.config.js
```

## Deployment to GitHub Pages

The GitHub Actions workflow at `.github/workflows/deploy-react.yml` automatically:

1. Copies posts from `_posts/` into `react-blog/_posts/`
2. Builds the Next.js static site
3. Deploys the `out/` directory to GitHub Pages

### Manual Deploy

```bash
cd react-blog
npm run build
# → static files in out/ directory
```

## Blog Post Format

Posts use standard Jekyll frontmatter — **no changes required** to existing posts:

```yaml
---
layout: post          # ignored by React (safe to keep)
title: "Post Title"
date: 2025-07-25
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, ctf]
author: Harshith
description: "Brief description for SEO"
toc: true             # shows table of contents sidebar
---

## Your content here
```

## Categories

| Category | Subcategories |
|---|---|
| SOC | Log Analysis, SIEM, DFIR, Threat Hunting |
| PicoCTF | Cryptography, Web Exploitation |
| CTF Tips & Tricks | — |
| Projects | AI Assisted Network Monitoring |
