import type { MDXComponents } from 'mdx/types';

/**
 * How a case study body renders. Every value here is a semantic token, so a world
 * restyles the prose by redefining tokens and never by touching this file.
 *
 * Next 16 calls this with no arguments: earlier versions passed the inherited
 * components in, and a signature that takes them silently receives undefined.
 */
const components: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-14 scroll-mt-24 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props) => <h3 className="mt-10 text-lg font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="mt-5 max-w-prose leading-relaxed text-pretty" {...props} />,
  ul: (props) => <ul className="mt-5 max-w-prose list-disc space-y-2 pl-5" {...props} />,
  ol: (props) => <ol className="mt-5 max-w-prose list-decimal space-y-2 pl-5" {...props} />,
  li: (props) => <li className="marker:text-accent leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  a: (props) => (
    <a className="text-accent underline underline-offset-4 hover:no-underline" {...props} />
  ),
  code: (props) => (
    <code className="bg-border/60 rounded-base px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />
  ),
  // No `img` here on purpose: a case study writes screenshots as literal <img>
  // tags, which MDX passes straight through without consulting this map. They
  // are styled by `.case-study img` in globals.css, which reaches both those and
  // the cover the layout renders.
  blockquote: (props) => (
    <blockquote
      className="border-accent text-muted mt-6 max-w-prose border-l-2 pl-5 italic"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
