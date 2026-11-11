import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Silence the "multiple lockfiles" workspace-root warning
  outputFileTracingRoot: path.join(__dirname, '../../'),

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },

  // Turbopack config (used during `next dev --turbopack`)
  // Keeping it empty here is fine — it just signals Next.js that Turbopack
  // is an intentional choice and prevents its artifacts from leaking into
  // the webpack production build.
  turbopack: {},

  experimental: {},
};

export default nextConfig;
