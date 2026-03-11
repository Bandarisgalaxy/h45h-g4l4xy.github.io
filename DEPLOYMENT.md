# 🚀 Deployment Guide

## Overview

Your blog is now configured to automatically deploy to GitHub Pages using Next.js static export.

## Current Setup

### ✅ Completed Configuration

1. **Next.js Static Export** - Configured in `react-blog/next.config.js`
2. **GitHub Actions Workflow** - `.github/workflows/deploy-react.yml`
3. **Updated .gitignore** - Excludes build artifacts and dependencies
4. **Updated README** - Modern documentation for Next.js setup

### 📁 Repository Structure

```
h45h-g4l4xy.github.io/
├── react-blog/              # Your Next.js blog (active)
│   ├── _posts/              # Blog posts (markdown)
│   ├── public/              # Static assets
│   ├── src/                 # React components & pages
│   ├── next.config.js       # Next.js config (static export enabled)
│   └── package.json
├── .github/
│   └── workflows/
│       ├── deploy-react.yml           # Active deployment workflow
│       └── pages-deploy.yml.disabled  # Old Jekyll workflow (disabled)
├── cleanup-jekyll.sh        # Script to remove old Jekyll files
└── README.md                # Updated documentation
```

## 🔧 GitHub Pages Setup

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
   - **Branch**: This will be managed by GitHub Actions automatically

### Step 2: Verify Workflow Permissions

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, ensure:
   - ✅ **Read and write permissions** is selected
   - ✅ **Allow GitHub Actions to create and approve pull requests** is checked

## 🚢 Deployment Process

### Automatic Deployment

The site automatically deploys when you:
- Push to the `main` branch
- Modify files in `react-blog/` or `_posts/`

### Manual Deployment

1. Go to **Actions** tab
2. Select **Deploy React Blog to GitHub Pages**
3. Click **Run workflow**
4. Select branch (usually `main`)
5. Click **Run workflow**

## 🧪 Testing Before Deployment

### Test Locally

```bash
cd react-blog
npm install
npm run dev
```

Visit http://localhost:3000

### Test Production Build

```bash
cd react-blog
npm run build
```

The static site will be generated in `react-blog/out/`

## 🗑️ Cleaning Up Jekyll Files

Once you've confirmed the Next.js site works correctly:

```bash
./cleanup-jekyll.sh
```

This will remove:
- Jekyll config files (_config.yml, Gemfile)
- Jekyll directories (_posts, _site, _data, _plugins, _sass, _tabs, assets)
- Jekyll build tools

**⚠️ Important**: Make sure your Next.js site is working before running this script!

## 📝 Writing New Posts

### Create a New Post

1. Create a file in `react-blog/_posts/` with format: `YYYY-MM-DD-title.md`
2. Add frontmatter:

```markdown
---
title: "Your Post Title"
date: 2026-03-11
categories: [CTF, Web Exploitation]
tags: [xss, javascript, security]
author: Harshith
description: A brief description of your post
toc: true
---

Your content here...
```

### Add Images

1. Place images in `react-blog/public/images/`
2. Reference in markdown: `![alt text](/images/your-image.png)`

### Preview Changes

```bash
cd react-blog
npm run dev
```

Visit the post at http://localhost:3000/blog/your-post-slug

## 🔍 Troubleshooting

### Build Fails

Check the **Actions** tab for error details. Common issues:

1. **Missing dependencies**: Run `npm install` in react-blog/
2. **Syntax errors**: Check your markdown files for proper frontmatter
3. **Missing images**: Ensure all referenced images exist in `public/images/`

### Site Not Updating

1. Check **Actions** tab - ensure workflow completed successfully
2. GitHub Pages can take 1-2 minutes to update after deployment
3. Try hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

### Hydration Errors

If you see hydration errors:
1. Ensure all image paths are correct
2. Check that frontmatter in all posts is valid YAML
3. Clear browser cache

## 📊 Monitoring

### Check Deployment Status

- **Actions Tab**: See build/deploy logs
- **Environments**: View deployment history and URLs

### Analytics (Optional)

Add analytics to your site:
1. Edit `react-blog/src/app/layout.tsx`
2. Add your analytics script (Google Analytics, Plausible, etc.)

## 🎯 Next Steps

- [x] Configure Next.js for static export
- [x] Set up GitHub Actions workflow
- [x] Update .gitignore
- [x] Test production build
- [ ] Push changes to GitHub
- [ ] Verify deployment on GitHub Pages
- [ ] Run cleanup script to remove Jekyll files
- [ ] Add any missing images to posts
- [ ] Configure custom domain (optional)

## 🆘 Getting Help

If you encounter issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [GitHub Pages documentation](https://docs.github.com/en/pages)
3. Check workflow logs in the Actions tab
4. Ensure all prerequisites are met (Node.js 18+, npm installed)

---

**Your site is ready to deploy! 🎉**

Push your changes to GitHub and watch the magic happen in the Actions tab.
