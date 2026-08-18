import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { ref } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { productGetters, productSeoSettingsGetters } from '@plentymarkets/shop-api';

const {
  useHead,
  useRuntimeConfig,
  useState,
  useProductReviews,
  useProductReviewAverage,
  useRoute,
  useLocalePath,
  useProductPrice,
  useModernImage,
} = vi.hoisted(() => {
  return {
    useHead: vi.fn(),
    useRuntimeConfig: vi.fn(() => ({
      public: {
        domain: 'https://www.komplett-konzept.de',
      },
    })),
    useState: vi.fn((key: string, init: () => { loading: boolean }) => ref(init())),
    useProductReviews: vi.fn(),
    useProductReviewAverage: vi.fn(),
    useRoute: vi.fn(() => ({
      path: '/abb-acs30108p73de-frequenzumrichter-umrichter-acs301-08p7-3de_49565_52884',
      query: {},
    })),
    useLocalePath: vi.fn(() => (path: string) => path),
    useProductPrice: vi.fn(() => ({
      price: ref(589),
      crossedPrice: ref(null),
    })),
    useModernImage: vi.fn(() => ({
      addModernImageExtension: (url: string) => url,
      addModernImageExtensionForGallery: (images: unknown) => images,
      getImageForViewport: () => '',
    })),
  };
});

vi.mock('@plentymarkets/shop-api', () => ({
  productGetters: {
    getAverageRating: vi.fn(() => 4.5),
    getCoverImage: vi.fn(() => 'https://cdn03.plentyone.com/evlxcyoplb75/item/images/49565/full/49565.jpg'),
    getId: vi.fn(() => '52884'),
    getItemId: vi.fn(() => '49565'),
    getManufacturer: vi.fn(() => ({ name: 'ABB' })),
    getMetaDescription: vi.fn(() => 'ABB ACS301-08P7-3DE frequency converter'),
    getName: vi.fn(() => 'ABB ACS301-08P7-3DE Frequenzumrichter Umrichter'),
    getSpecialPriceCurrency: vi.fn(() => 'EUR'),
    getTotalReviews: vi.fn(() => 0),
    getUrlPath: vi.fn(() => 'abb-acs30108p73de-frequenzumrichter-umrichter-acs301-08p7-3de'),
    isSalable: vi.fn(() => true),
  },
  productSeoSettingsGetters: {
    getConditionOfItem: vi.fn(() => 'https://schema.org/UsedCondition'),
    getMappedAvailability: vi.fn(() => 'https://schema.org/InStock'),
    getSeoManufacturer: vi.fn(() => 'ABB'),
    getBrand: vi.fn(() => 'ABB'),
    getSku: vi.fn(() => '49565'),
    getGtin: vi.fn(() => ''),
    getGtin8: vi.fn(() => ''),
    getGtin13: vi.fn(() => ''),
    getIsbn: vi.fn(() => ''),
    getMpn: vi.fn(() => 'ACS301-08P7-3DE'),
    getPriceValidUntil: vi.fn(() => ''),
    getForcedCanonicalUrl: vi.fn(() => ''),
    getCanonical: vi.fn(() => ({})),
    getCanonicalHref: vi.fn(() => ''),
    getCanonicalAlternate: vi.fn(() => []),
    getCanonicalAlternateHref: vi.fn((item: { href: string }) => item.href),
    getCanonicalAlternateHreflang: vi.fn((item: { hreflang: string }) => item.hreflang),
  },
  reviewGetters: {
    getReviewAuthor: vi.fn(() => 'Jane Doe'),
    getReviewItems: vi.fn(() => [{ id: 'review-1' }]),
    getReviewRating: vi.fn(() => 5),
  },
}));

mockNuxtImport('useHead', () => useHead);
mockNuxtImport('useRuntimeConfig', () => useRuntimeConfig);
mockNuxtImport('useState', () => useState);
mockNuxtImport('useProductReviews', () => useProductReviews);
mockNuxtImport('useProductReviewAverage', () => useProductReviewAverage);
mockNuxtImport('useRoute', () => useRoute);
mockNuxtImport('useLocalePath', () => useLocalePath);
mockNuxtImport('useProductPrice', () => useProductPrice);
mockNuxtImport('useModernImage', () => useModernImage);

import { useStructuredData } from '../useStructuredData';

const getStructuredDataByKey = (key: string) => {
  const matchingCall = [...useHead.mock.calls].reverse().find((call) => {
    const scripts = call[0]?.script as Array<{ key?: string; innerHTML: string }> | undefined;
    return scripts?.some((script) => script.key === key);
  });

  const scriptEntry = (matchingCall?.[0]?.script as Array<{ key?: string; innerHTML: string }> | undefined)?.find(
    (script) => script.key === key,
  );

  expect(scriptEntry).toBeDefined();
  return JSON.parse(scriptEntry!.innerHTML);
};

describe('useStructuredData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useProductReviews.mockReturnValue({ data: ref([{ id: 'review-1' }]) });
    useProductReviewAverage.mockReturnValue({ data: ref(undefined) });
    useProductPrice.mockReturnValue({
      price: ref(589),
      crossedPrice: ref(null),
    });
    vi.mocked(productGetters.getTotalReviews).mockReturnValue(0);
    vi.mocked(productSeoSettingsGetters.getForcedCanonicalUrl).mockReturnValue('');
    vi.mocked(productSeoSettingsGetters.getCanonical).mockReturnValue({} as never);
    vi.mocked(productSeoSettingsGetters.getCanonicalHref).mockReturnValue('');
    vi.mocked(productSeoSettingsGetters.getCanonicalAlternate).mockReturnValue([]);
    vi.mocked(productSeoSettingsGetters.getMappedAvailability).mockReturnValue('https://schema.org/InStock');
    vi.mocked(productSeoSettingsGetters.getConditionOfItem).mockReturnValue('https://schema.org/UsedCondition');
  });

  it('emits the full Organization schema with legalName', () => {
    const { setLogoMeta } = useStructuredData();
    setLogoMeta();

    expect(getStructuredDataByKey('ld-organization')).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Komplett Konzept',
      legalName: 'Komplett Konzept GmbH',
      url: 'https://www.komplett-konzept.de/',
      logo: 'https://cdn03.plentymarkets.com/evlxcyoplb75/frontend/BestTrade/Logos/Logo_ohne_GmbH.jpg',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Dunkerstraße 29',
        postalCode: '46325',
        addressLocality: 'Borken-Burlo',
        addressCountry: 'DE',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+49-2862-587950',
        contactType: 'customer service',
        availableLanguage: ['German', 'English'],
      },
      sameAs: [
        'https://www.facebook.com/Komplett.Konzept.GmbH/',
        'https://www.instagram.com/komplettkonzept/',
        'https://www.youtube.com/@konzeptkomplett4034',
      ],
    });
  });

  it('emits WebSite schema with SearchAction for the homepage sitelinks box', () => {
    const { setWebsiteMeta } = useStructuredData();
    setWebsiteMeta();

    expect(getStructuredDataByKey('ld-website')).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Komplett Konzept',
      url: 'https://www.komplett-konzept.de',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.komplett-konzept.de/search?term={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    });
  });

  it('emits Product schema with Offer, return policy and shipping details when price is available', () => {
    const { setProductMetaData } = useStructuredData();

    setProductMetaData({
      texts: { description: 'Test description' },
    } as never);

    const structuredData = getStructuredDataByKey('ld-product');

    expect(structuredData['@type']).toBe('Product');
    expect(structuredData['@id']).toContain('#product');
    expect(structuredData.sku).toBe('49565');
    expect(structuredData.mpn).toBe('ACS301-08P7-3DE');
    expect(structuredData.brand).toEqual({ '@type': 'Brand', name: 'ABB' });
    expect(structuredData.manufacturer).toEqual({ '@type': 'Organization', name: 'ABB' });
    expect(structuredData.itemCondition).toBe('https://schema.org/UsedCondition');
    expect(structuredData.aggregateRating).toBeUndefined();
    expect(structuredData.offers).toEqual({
      '@type': 'Offer',
      url: 'https://www.komplett-konzept.de/abb-acs30108p73de-frequenzumrichter-umrichter-acs301-08p7-3de_49565_52884',
      priceCurrency: 'EUR',
      price: '589.00',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        '@id': 'https://www.komplett-konzept.de/#merchant-return-policy',
        applicableCountry: 'DE',
        merchantReturnDays: 14,
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
        inStoreReturnsOffered: false,
        url: 'https://www.komplett-konzept.de/widerruf',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        '@id': 'https://www.komplett-konzept.de/#shipping-details',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0.00',
          currency: 'EUR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'DE',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
        },
      },
    });
  });

  it('omits Offer when price is unavailable', () => {
    useProductPrice.mockReturnValue({
      price: ref(0),
      crossedPrice: ref(null),
    });

    const { setProductMetaData } = useStructuredData();
    setProductMetaData({ texts: { description: 'Test description' } } as never);

    const structuredData = getStructuredDataByKey('ld-product');
    expect(structuredData.offers).toBeUndefined();
  });

  it('emits Offer with stock-based availability when SEO mappedAvailability is empty', () => {
    vi.mocked(productSeoSettingsGetters.getMappedAvailability).mockReturnValue('');

    const { setProductMetaData } = useStructuredData();
    setProductMetaData({
      texts: { description: 'Test description' },
      stock: { net: 2 },
    } as never);

    const structuredData = getStructuredDataByKey('ld-product');
    expect(structuredData.offers).toBeDefined();
    expect(structuredData.offers.availability).toBe('https://schema.org/InStock');
    expect(structuredData.offers.price).toBe('589.00');
    expect(structuredData.offers.hasMerchantReturnPolicy).toBeDefined();
    expect(structuredData.offers.shippingDetails).toBeDefined();
  });

  it('emits OutOfStock when SEO availability is empty and net stock is zero', () => {
    vi.mocked(productSeoSettingsGetters.getMappedAvailability).mockReturnValue('');

    const { setProductMetaData } = useStructuredData();
    setProductMetaData({
      texts: { description: 'Test description' },
      stock: { net: 0 },
    } as never);

    const structuredData = getStructuredDataByKey('ld-product');
    expect(structuredData.offers.availability).toBe('https://schema.org/OutOfStock');
  });

  it('includes aggregateRating when reviewCount is positive', () => {
    vi.mocked(productGetters.getTotalReviews).mockReturnValue(3);
    useProductReviewAverage.mockReturnValue({ data: ref({}) });

    const { setProductMetaData } = useStructuredData();
    setProductMetaData({ texts: { description: 'Test description' } } as never);

    const structuredData = getStructuredDataByKey('ld-product');
    expect(structuredData.aggregateRating).toEqual({
      '@type': 'AggregateRating',
      ratingValue: 4.5,
      reviewCount: 3,
    });
  });

  it('sets product canonical from the current page URL when SEO canonical is empty', () => {
    const { setProductCanonicalMetaData } = useStructuredData();

    setProductCanonicalMetaData({} as never);

    expect(useHead).toHaveBeenCalledWith({
      link: [
        {
          rel: 'canonical',
          href: 'https://www.komplett-konzept.de/abb-acs30108p73de-frequenzumrichter-umrichter-acs301-08p7-3de_49565_52884',
        },
      ],
    });
  });

  it('normalizes trailing slash on domain for the canonical fallback', () => {
    useRuntimeConfig.mockReturnValue({
      public: {
        domain: 'https://www.komplett-konzept.de/',
      },
    });

    const { setProductCanonicalMetaData } = useStructuredData();
    setProductCanonicalMetaData({} as never);

    expect(useHead).toHaveBeenCalledWith({
      link: [
        {
          rel: 'canonical',
          href: 'https://www.komplett-konzept.de/abb-acs30108p73de-frequenzumrichter-umrichter-acs301-08p7-3de_49565_52884',
        },
      ],
    });
  });

  it('prefers a forced canonical URL over the page URL', () => {
    vi.mocked(productSeoSettingsGetters.getForcedCanonicalUrl).mockReturnValue('https://example.com/custom-canonical');

    const { setProductCanonicalMetaData } = useStructuredData();

    setProductCanonicalMetaData({} as never);

    expect(useHead).toHaveBeenCalledWith({
      link: [
        {
          rel: 'canonical',
          href: 'https://example.com/custom-canonical',
        },
      ],
    });
  });
});
