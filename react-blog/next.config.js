/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Repo is "h45h-g4l4xy.github.io" under username "bandarisgalaxy"
  // → GitHub Pages serves it at: bandarisgalaxy.github.io/h45h-g4l4xy.github.io/
  basePath: '/h45h-g4l4xy.github.io',
  assetPrefix: '/h45h-g4l4xy.github.io',
};

module.exports = nextConfig;
