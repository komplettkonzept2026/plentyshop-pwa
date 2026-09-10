const LOCALE_PREFIX = /^\/(de|en)(?=\/|$)/i;

/** Normalize a path or absolute URL to a locale-stripped pathname for SEO maps. */
export const normalizePagePath = (pathOrUrl: string): string => {
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
