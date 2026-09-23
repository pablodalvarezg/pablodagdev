'use client';

import { useCallback } from 'react';

/**
 * The one client component in the hub. It needs a click handler and
 * localStorage, which is the whole bar for crossing into the browser.
 */
export function SchemeToggle({ label }: { label: string }) {
  const toggle = useCallback(() => {
    const root = document.documentElement;
    const current =
      root.dataset.scheme ??
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';

    root.dataset.scheme = next;

    // Private windows and blocked storage throw here. The choice still applies
    // to this page, it just will not outlive it.
    try {
      localStorage.setItem('scheme', next);
    } catch {
      /* the OS preference stays in charge */
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="scheme-toggle text-muted hover:text-fg rounded-base cursor-pointer p-2 transition-colors"
    >
      <svg
        data-icon="light"
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        data-icon="dark"
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
