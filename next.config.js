/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Generates client-side source maps when the environment variable is set to 'true'
  productionBrowserSourceMaps: process.env.GENERATE_SOURCEMAPS === 'true',
  reactStrictMode: true
}

module.exports = nextConfig
