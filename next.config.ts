import createMDX from '@next/mdx';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Everything resolves at build time and ships as plain HTML in out/.
  // No server, no ISR, no Server Actions: see CLAUDE.md for what that rules out.
  output: 'export',

  // Pages are served from directories, so URLs end in a slash. Canonical and
  // hreflang have to agree with what the server actually serves, or they point
  // at a URL that redirects.
  trailingSlash: true,
};

const withMDX = createMDX({
  options: {
    // Named as strings on purpose. Turbopack compiles MDX in Rust and a JavaScript
    // function cannot cross that boundary, so importing the plugins here builds
    // under webpack and fails under Turbopack, which is the default in Next 16.
    remarkPlugins: ['remark-frontmatter', ['remark-mdx-frontmatter', { name: 'frontmatter' }]],
  },
});

export default withMDX(nextConfig);
