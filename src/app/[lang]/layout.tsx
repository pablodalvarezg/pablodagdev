import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { assertLocale, LOCALES } from '@modules/i18n';

import '../globals.css';

// next/font subsets these and sets font-display: swap, which the performance
// criteria ask for, and self-hosts them so there is no request to Google.
const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Every locale is known at build time, so an unknown one is a 404 rather than
// an attempt to render on demand, which a static export cannot do anyway.
export const dynamicParams = false;

export const metadata: Metadata = {
  title: 'Pablo Álvarez Graña',
};

/** Applies a stored scheme before the document paints, so neither one flashes. */
const noFlash = `try{var s=localStorage.getItem('scheme');if(s==='light'||s==='dark')document.documentElement.dataset.scheme=s}catch(e){}`;

/**
 * This is the root layout: with the locale as the first segment, it is the only
 * place that knows which language the document is in, so it owns <html>.
 */
export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const locale = assertLocale((await params).lang);

  return (
    <html lang={locale} data-theme="base" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-bg text-fg flex min-h-dvh flex-col font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
        {children}
      </body>
    </html>
  );
}
