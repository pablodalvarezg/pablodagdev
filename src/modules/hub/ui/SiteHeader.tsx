import { LanguageSwitcher, type Locale } from '@modules/i18n';
import { SchemeToggle } from '@modules/theming';
import { Container } from '@shared/ui/Container';

export function SiteHeader({
  locale,
  languageLabel,
  themeLabel,
  names,
}: {
  locale: Locale;
  languageLabel: string;
  themeLabel: string;
  names: Record<Locale, string>;
}) {
  return (
    <header className="border-border border-b py-3">
      <Container className="flex items-center justify-end gap-4">
        <LanguageSwitcher locale={locale} label={languageLabel} names={names} />
        <SchemeToggle label={themeLabel} />
      </Container>
    </header>
  );
}
