import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // Generates client-side source maps when the environment variable is set to 'true'
  productionBrowserSourceMaps: process.env.GENERATE_SOURCEMAPS === 'true',
  reactStrictMode: true,
  sassOptions: {
    // Suppress deprecation warnings from bootstrap/bootswatch dependencies (lighten(), red(), if() etc.)
    quietDeps: true,
    // Suppress @import deprecation - bootstrap/bootswatch require @import for variable overrides to work
    silenceDeprecations: ['import']
  }
}

export default nextConfig
