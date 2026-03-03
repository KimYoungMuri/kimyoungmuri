/** @type {import('next').NextConfig} */
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : 'fhrgjouuzsjecqskxhoy.supabase.co' // fallback so images work when env not set on Vercel

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      { source: '/quantguide', destination: '/quantguide/index.html', permanent: false },
      { source: '/quantguide/', destination: '/quantguide/index.html', permanent: false },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'localhost', pathname: '/**' },
      { protocol: 'https', hostname: 'media.licdn.com', pathname: '/**' },
      { protocol: 'https', hostname: supabaseHost, pathname: '/**' },
    ],
  },
}

module.exports = nextConfig 