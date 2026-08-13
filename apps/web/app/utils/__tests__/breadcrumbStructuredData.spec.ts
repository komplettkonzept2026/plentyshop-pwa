import { describe, expect, it } from 'vitest';
import { buildBreadcrumbListJsonLd } from '../breadcrumbStructuredData';

describe('buildBreadcrumbListJsonLd', () => {
  it('builds sequential positions with absolute URLs and human-readable names', () => {
    const result = buildBreadcrumbListJsonLd({
      domain: 'https://www.komplett-konzept.de/',
      currentPath: '/elektronik-elektrotechnik/bauelemente/test-product_1944_1958',
      breadcrumbs: [
        { name: 'Home', link: '/' },
        { name: 'Elektronik & Elektrotechnik', link: '/Elektronik-Elektrotechnik' },
        { name: 'Bauelemente', link: '/Elektronik-Elektrotechnik/bauelemente' },
        { name: 'Test Product', link: '#' },
      ],
    });

    expect(result).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.komplett-konzept.de/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Elektronik & Elektrotechnik',
          item: 'https://www.komplett-konzept.de/Elektronik-Elektrotechnik',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Bauelemente',
          item: 'https://www.komplett-konzept.de/Elektronik-Elektrotechnik/bauelemente',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Test Product',
          item: 'https://www.komplett-konzept.de/elektronik-elektrotechnik/bauelemente/test-product_1944_1958',
        },
      ],
    });
  });

  it('skips crumbs with empty names and returns null when nothing remains', () => {
    expect(
      buildBreadcrumbListJsonLd({
        domain: 'https://www.komplett-konzept.de',
        currentPath: '/',
        breadcrumbs: [{ name: '', link: '/' }, { name: '   ', link: '/x' }],
      }),
    ).toBeNull();
  });

  it('applies localizePath for locale-prefixed URLs', () => {
    const result = buildBreadcrumbListJsonLd({
      domain: 'https://www.komplett-konzept.de',
      currentPath: '/en/Elektronik-Elektrotechnik',
      localizePath: (path) => (path === '/' ? '/en' : `/en${path}`),
      breadcrumbs: [
        { name: 'Home', link: '/' },
        { name: 'Electronics', link: '/Elektronik-Elektrotechnik' },
      ],
    });

    expect(result?.itemListElement).toEqual([
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.komplett-konzept.de/en',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Electronics',
        item: 'https://www.komplett-konzept.de/en/Elektronik-Elektrotechnik',
      },
    ]);
  });
});
