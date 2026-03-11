/** @type {import('next').NextConfig} */
const BASE_PATH = '/h45h-g4l4xy.github.io';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Repo is "h45h-g4l4xy.github.io" under username "bandarisgalaxy"
  // → GitHub Pages serves it at: bandarisgalaxy.github.io/h45h-g4l4xy.github.io/
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  // Expose basePath to client components (e.g. for markdown image src prefixing)
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

module.exports = nextConfig;
