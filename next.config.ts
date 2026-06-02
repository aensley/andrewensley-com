import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // Generates client-side source maps when the environment variable is set to 'true'
  productionBrowserSourceMaps: process.env.GENERATE_SOURCEMAPS === 'true',
  reactStrictMode: true
}

export default nextConfig
