/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment at root domain (bandarisgalaxy.github.io)
  // If deploying to a subdirectory, set basePath: '/repo-name'
  basePath: '',
  assetPrefix: '',
};

module.exports = nextConfig;
