import type { Metadata } from 'next';

import { assertLocale, LOCALES } from '@modules/i18n';

import '../globals.css';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Every locale is known at build time, so an unknown one is a 404 rather than
// an attempt to render on demand, which a static export cannot do anyway.
export const dynamicParams = false;

export const metadata: Metadata = {
  title: 'Pablo Álvarez Graña',
};

/**
 * This is the root layout: with the locale as the first segment, it is the only
 * place that knows which language the document is in, so it owns <html>.
 */
export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const locale = assertLocale((await params).lang);

  return (
    <html lang={locale} data-theme="base">
      <body>{children}</body>
    </html>
  );
}
