import ar from '~/translations/support_languages/ar.json';
import de from '~/translations/support_languages/de.json';
import en from '~/translations/support_languages/en.json';
import fr from '~/translations/support_languages/fr.json';
import it from '~/translations/support_languages/it.json';
import ja from '~/translations/support_languages/ja.json';
import ko from '~/translations/support_languages/ko.json';
import pt from '~/translations/support_languages/pt.json';
import ru from '~/translations/support_languages/ru.json';
import th from '~/translations/support_languages/th.json';
import vi from '~/translations/support_languages/vi.json';
import zh from '~/translations/support_languages/zh.json';

export const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
  ar: {
    translation: ar,
  },
  ja: {
    translation: ja,
  },
  ko: {
    translation: ko,
  },
  vi: {
    translation: vi,
  },
  th: {
    translation: th,
  },
  ru: {
    translation: ru,
  },
  de: {
    translation: de,
  },
  it: {
    translation: it,
  },
  pt: {
    translation: pt,
  },
  fr: {
    translation: fr,
  },
}
  
  

export type Language = keyof typeof resources;