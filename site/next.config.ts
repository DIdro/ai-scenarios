import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import path from 'node:path'

const nextConfig: NextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-frontmatter', ['yaml']]],
  },
})

export default withMDX(nextConfig)
