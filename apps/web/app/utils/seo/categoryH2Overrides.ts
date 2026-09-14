import { CATEGORY_SEO_H2_OVERRIDES } from './categoryH2Overrides.data';

const LOCALE_PREFIX = /^\/(de|en)(?=\/|$)/i;

export const normalizeCategoryPath = (pathOrUrl: string): string => {
  let path = pathOrUrl.trim();

  try {
    if (/^https?:\/\//i.test(path)) {
      path = new URL(path).pathname;
    }
  } catch {
    // Keep the original value when it is not a valid URL.
  }

  path = path.split('?')[0]?.split('#')[0] ?? path;
  path = path.replace(LOCALE_PREFIX, '');
  if (path.length > 1) {
    path = path.replace(/\/+$/, '');
  }

  return path || '/';
};

const resolveLocaleHeadings = (locale: string, copy: { de: string[]; en: string[] }): string[] => {
  const lang = locale.toLowerCase().split('-')[0];
  if (lang === 'en') return copy.en;
  return copy.de;
};

export const getCategorySeoH2s = (pathOrUrl: string, locale = 'de'): string[] => {
  const path = normalizeCategoryPath(pathOrUrl).toLowerCase();
  const copy = CATEGORY_SEO_H2_OVERRIDES[path];
  if (!copy) return [];
  return resolveLocaleHeadings(locale, copy);
};

/** Remove existing H2 tags from Plenty HTML so code-level SEO H2s are not duplicated. */
export const stripHtmlH2Tags = (html: string): string => {
  if (!html) return html;
  return html
    .replace(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi, '')
    .replace(/^\s+|\s+$/g, '');
};
