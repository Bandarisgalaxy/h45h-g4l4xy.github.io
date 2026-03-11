# H45H G4L4XY Blog

A modern cybersecurity blog built with Next.js, React, and TypeScript. Features CTF writeups, tutorials, and security research.

[![Deploy to GitHub Pages](https://github.com/h45h-g4l4xy/h45h-g4l4xy.github.io/actions/workflows/deploy-react.yml/badge.svg)](https://github.com/h45h-g4l4xy/h45h-g4l4xy.github.io/actions/workflows/deploy-react.yml)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

```bash
cd react-blog
npm install
npm run dev
```

Visit `http://localhost:3000` to see your blog.

### Building for Production

```bash
cd react-blog
npm run build
```

This generates a static site in the `out/` directory.

## 📁 Project Structure

```
react-blog/
├── public/          # Static assets
│   └── images/      # Blog post images
├── src/
│   ├── app/         # Next.js App Router pages
│   ├── components/  # React components
│   ├── lib/         # Utilities and helpers
│   └── types/       # TypeScript types
├── _posts/          # Markdown blog posts
├── next.config.js   # Next.js configuration
└── package.json
```

## ✍️ Writing Posts

Create a new markdown file in `react-blog/_posts/` with frontmatter:

```markdown
---
title: "Your Post Title"
date: 2026-03-11
categories: [Category1, Category2]
tags: [tag1, tag2, tag3]
author: Your Name
description: A brief description
---

Your content here...
```

## 🎨 Features

- ✅ Static site generation with Next.js
- ✅ Markdown blog posts with frontmatter
- ✅ Syntax highlighting for code blocks
- ✅ Math equations with KaTeX
- ✅ Responsive design
- ✅ Dark theme optimized for cybersecurity content
- ✅ Category and tag filtering
- ✅ Full-text search
- ✅ Reading time estimates
- ✅ Table of contents
- ✅ Related posts

## 🚢 Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch.

The deployment workflow:
1. Builds the Next.js site as a static export
2. Uploads to GitHub Pages
3. Site is live at your GitHub Pages URL

### Manual Deployment

If needed, you can trigger a manual deployment from the GitHub Actions tab.

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown, remark-gfm
- **Syntax Highlighting**: highlight.js
- **Math**: KaTeX
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📝 Notes

This project was migrated from Jekyll (Chirpy theme) to Next.js. Old Jekyll files are kept in the root directory for reference but are no longer used in production.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ☕ and 💻 by Harshith**
