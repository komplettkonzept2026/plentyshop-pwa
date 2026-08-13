import type { Breadcrumb } from '~/components/ui/Breadcrumbs/types';

export type BuildBreadcrumbListParams = {
  breadcrumbs: Breadcrumb[];
  domain: string;
  currentPath: string;
  localizePath?: (path: string) => string;
};

const normalizeDomain = (domain: string): string => domain.replace(/\/$/, '');

const toAbsoluteUrl = (domain: string, path: string, localizePath: (path: string) => string): string => {
  if (!path || path === '#') return '';
  if (/^https?:\/\//i.test(path)) return path;

  const localized = localizePath(path);
  if (!localized || localized === '/') return `${domain}/`;

  return `${domain}${localized.startsWith('/') ? localized : `/${localized}`}`;
};

/**
 * Builds BreadcrumbList JSON-LD from the visible breadcrumb trail.
 * Uses human-readable names, sequential positions, and absolute URLs.
 */
export const buildBreadcrumbListJsonLd = ({
  breadcrumbs,
  domain,
  currentPath,
  localizePath = (path: string) => path,
}: BuildBreadcrumbListParams) => {
  const normalizedDomain = normalizeDomain(domain || 'https://www.komplett-konzept.de');
  const fallbackUrl = toAbsoluteUrl(normalizedDomain, currentPath || '/', localizePath);

  const itemListElement = (breadcrumbs || [])
    .filter((crumb) => Boolean(crumb?.name?.trim()))
    .map((crumb, index) => {
      const link = crumb.link?.trim() || '';
      const absoluteUrl =
        !link || link === '#'
          ? fallbackUrl
          : toAbsoluteUrl(normalizedDomain, link, localizePath) || fallbackUrl;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name.trim(),
        item: absoluteUrl,
      };
    });

  if (itemListElement.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
};
