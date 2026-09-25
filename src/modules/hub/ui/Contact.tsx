import { getTranslations, type Locale } from '@modules/i18n';
import { site } from '@shared/config/site';
import { Section } from '@shared/ui/Section';

export function Contact({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  const links = [
    { label: t('contact.email'), href: `mailto:${site.email}`, value: site.email },
    { label: t('contact.linkedin'), href: site.linkedin, value: 'pablodalvarezg' },
    { label: t('contact.github'), href: site.github, value: 'pablodalvarezg' },
  ];

  return (
    <Section id="contact" eyebrow={t('contact.eyebrow')} title={t('contact.title')}>
      <div className="flex flex-col gap-6">
        <p className="text-lg">{t('contact.body')}</p>
        <ul className="flex flex-col gap-3">
          {links.map((link) => (
            <li key={link.label} className="flex flex-wrap items-baseline gap-x-4">
              <span className="text-muted w-20 shrink-0 font-mono text-xs tracking-wider uppercase">
                {link.label}
              </span>
              <a
                href={link.href}
                className="hover:text-accent underline-offset-4 transition-colors hover:underline"
              >
                {link.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
