import type { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline';
}

export function Button({ href, children, variant = 'solid' }: Props) {
  // Text on an accent fill takes accent-fg, never fg: see the token comment.
  const styles =
    variant === 'solid'
      ? 'bg-accent text-accent-fg hover:opacity-90'
      : 'border-border text-fg hover:border-accent border';

  return (
    <a
      href={href}
      className={`rounded-base inline-flex items-center px-5 py-2.5 font-medium transition-all ${styles}`}
    >
      {children}
    </a>
  );
}
