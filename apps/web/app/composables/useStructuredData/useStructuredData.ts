import type {
  useStructuredDataReturn,
  SetLogoMeta,
  SetWebsiteMeta,
  SetProductMetaData,
  SetProductRobotsMetaData,
  SetProductCanonicalMetaData,
  UseStructuredDataState,
} from './types';
import { productGetters, reviewGetters, productSeoSettingsGetters } from '@plentymarkets/shop-api';
import type { Product, CanonicalAlternate } from '@plentymarkets/shop-api';
import { paths } from '~/utils/paths';

const ORGANIZATION_LOGO =
  'https://cdn03.plentymarkets.com/evlxcyoplb75/frontend/BestTrade/Logos/Logo_ohne_GmbH.jpg';

const SCHEMA_IN_STOCK = 'https://schema.org/InStock';
const SCHEMA_OUT_OF_STOCK = 'https://schema.org/OutOfStock';

const stripHtml = (value: string | undefined | null): string => {
  if (!value) return '';
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const normalizeDomain = (domain: string): string => domain.replace(/\/$/, '');

/**
 * Prefer Plenty SEO mappedAvailability; otherwise derive from stock / salable state.
 * Google Product rich results require a non-empty offers.availability (or review/aggregateRating).
 */
const resolveOfferAvailability = (product: Product): string => {
  const mapped = productSeoSettingsGetters.getMappedAvailability(product)?.trim();
  if (mapped) return mapped;

  const netStock = (product as Product & { stock?: { net?: number | null } }).stock?.net;
  if (typeof netStock === 'number') {
    return netStock > 0 ? SCHEMA_IN_STOCK : SCHEMA_OUT_OF_STOCK;
  }

  if (productGetters.isSalable(product)) {
    return SCHEMA_IN_STOCK;
  }

  // Priced PDP without SEO availability or stock: still emit a valid Schema.org value.
  return SCHEMA_IN_STOCK;
};

/**
 * @description Composable managing meta data
 * @returns useStructuredDataReturn
 * @example
 * ``` ts
 * const { data, loading, setLogoMeta, setStaticPageMeta } = useMeta();
 * ```
 */
export const useStructuredData: useStructuredDataReturn = () => {
  const state = useState<UseStructuredDataState>(`useMeta`, () => ({
    loading: false,
  }));

  /**
   * @description Function for Setting Organization JSON-LD on all pages.
   * @returns SetLogoMeta
   * @example
   * ``` ts
   * setLogoMeta()
   * ```
   */
  const setLogoMeta: SetLogoMeta = () => {
    state.value.loading = true;

    const runtimeConfig = useRuntimeConfig();
    const domain = normalizeDomain(String(runtimeConfig.public.domain || 'https://www.komplett-konzept.de'));

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Komplett Konzept',
      legalName: 'Komplett Konzept GmbH',
      url: `${domain}/`,
      logo: ORGANIZATION_LOGO,
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
    };

    useHead({
      script: [
        {
          key: 'ld-organization',
          type: 'application/ld+json',
          innerHTML: JSON.stringify(structuredData),
        },
      ],
    });

    state.value.loading = false;
  };

  /**
   * @description WebSite + SearchAction JSON-LD for the homepage (sitelinks search box).
   * @example
   * ``` ts
   * setWebsiteMeta()
   * ```
   */
  const setWebsiteMeta: SetWebsiteMeta = () => {
    state.value.loading = true;

    const runtimeConfig = useRuntimeConfig();
    const localePath = useLocalePath();
    const domain = normalizeDomain(String(runtimeConfig.public.domain || 'https://www.komplett-konzept.de'));
    const searchPath = localePath(paths.search);

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Komplett Konzept',
      url: domain,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${domain}${searchPath}?term={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };

    useHead({
      script: [
        {
          key: 'ld-website',
          type: 'application/ld+json',
          innerHTML: JSON.stringify(structuredData),
        },
      ],
    });

    state.value.loading = false;
  };

  /**
   * @description Function for Setting Product JSON-LD on product pages.
   * Offer is included only when price and availability are available.
   * @example
   * ``` ts
   * setProductMetaData(product)
   * ```
   */
  const setProductMetaData: SetProductMetaData = (product: Product) => {
    state.value.loading = true;

    const runtimeConfig = useRuntimeConfig();
    const domain = normalizeDomain(String(runtimeConfig.public.domain || 'https://www.komplett-konzept.de'));
    const localePath = useLocalePath();
    const route = useRoute();
    const { addModernImageExtension } = useModernImage();
    const { price } = useProductPrice(product);

    const productId = Number(productGetters.getItemId(product));
    const { data: productReviews } = useProductReviews(productId);
    const { data: reviewAverage } = useProductReviewAverage(productId);
    const totalReviews = productGetters.getTotalReviews(product);

    // Prefer the live route (includes variation id when present) so schema URL matches the page.
    const productPath = route.path?.startsWith('/')
      ? route.path
      : `/${productGetters.getUrlPath(product)}_${productGetters.getItemId(product)}`;
    const productUrl = `${domain}${localePath(productPath)}`;

    const coverImage = addModernImageExtension(productGetters.getCoverImage(product));
    const description =
      stripHtml(productGetters.getMetaDescription(product)) ||
      stripHtml(product.texts?.description) ||
      stripHtml(productGetters.getName(product));

    const itemCondition = productSeoSettingsGetters.getConditionOfItem(product);
    const priceValue = Number(price.value);
    const priceCurrency = productGetters.getSpecialPriceCurrency(product) || 'EUR';
    // Offer when priced; availability falls back to stock/salable so Rich Results stay valid
    // even when Plenty SEO mappedAvailability is empty.
    const hasOffer = Number.isFinite(priceValue) && priceValue > 0;
    const availability = hasOffer ? resolveOfferAvailability(product) : '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metaObject: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${productUrl}#product`,
      name: productGetters.getName(product),
      image: coverImage ? [coverImage] : [],
      description,
      url: productUrl,
    };

    if (itemCondition) {
      metaObject.itemCondition = itemCondition;
    }

    const sku = productSeoSettingsGetters.getSku(product) || String(productGetters.getItemId(product) || '');
    if (sku) metaObject.sku = sku;

    const mpn = productSeoSettingsGetters.getMpn(product);
    if (mpn) metaObject.mpn = mpn;

    const brand = productSeoSettingsGetters.getBrand(product);
    if (brand) {
      metaObject.brand = { '@type': 'Brand', name: brand };
    }

    const manufacturerName =
      productSeoSettingsGetters.getSeoManufacturer(product) || productGetters.getManufacturer(product)?.name || '';
    if (manufacturerName) {
      metaObject.manufacturer = { '@type': 'Organization', name: manufacturerName };
    }

    const gtin = productSeoSettingsGetters.getGtin(product);
    if (gtin) metaObject.gtin = gtin;

    const gtin8 = productSeoSettingsGetters.getGtin8(product);
    if (gtin8) metaObject.gtin8 = gtin8;

    const gtin13 = productSeoSettingsGetters.getGtin13(product);
    if (gtin13) metaObject.gtin13 = gtin13;

    const isbn = productSeoSettingsGetters.getIsbn(product);
    if (isbn) metaObject.isbn = isbn;

    if (totalReviews > 0) {
      metaObject.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: productGetters.getAverageRating(product),
        reviewCount: totalReviews,
      };
    }

    if (reviewAverage.value) {
      metaObject.review = reviewGetters.getReviewItems(productReviews.value).map((reviewItem) => ({
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: reviewGetters.getReviewRating(reviewItem),
        },
        author: {
          '@type': 'Person',
          name: reviewGetters.getReviewAuthor(reviewItem),
        },
      }));
    }

    if (hasOffer) {
      metaObject.offers = {
        '@type': 'Offer',
        url: productUrl,
        priceCurrency,
        price: priceValue.toFixed(2),
        availability,
        itemCondition: itemCondition || undefined,
        // Return window confirmed against /widerruf + /cancellation-rights (14-day Widerruf).
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          '@id': `${domain}/#merchant-return-policy`,
          applicableCountry: 'DE',
          merchantReturnDays: 14,
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
          inStoreReturnsOffered: false,
          url: `${domain}/widerruf`,
        },
        // Google OfferShippingDetails requires shippingRate + shippingDestination + deliveryTime.
        // /shipping currently has no CMS rates ("Keine Versandinformationen verfügbar"); values
        // follow SCHEMA-FOR-DEV-TEAM.md German-market defaults (free DE ship, 0–1 handling, 1–3 transit).
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          '@id': `${domain}/#shipping-details`,
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0.00',
            currency: priceCurrency || 'EUR',
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
      };

      const priceValidUntil = productSeoSettingsGetters.getPriceValidUntil(product);
      if (priceValidUntil) {
        metaObject.offers.priceValidUntil = priceValidUntil;
      }
    }

    useHead({
      script: [
        {
          key: 'ld-product',
          type: 'application/ld+json',
          innerHTML: JSON.stringify(metaObject),
        },
      ],
    });
    state.value.loading = false;
  };

  const setProductRobotsMetaData: SetProductRobotsMetaData = (product: Product) => {
    state.value.loading = true;

    const route = useRoute();
    let robotsContent = product.seoSettings?.robots || '';

    if (
      (!product.seoSettings?.forceRobotsValue && Object.keys(route.query).length > 0) ||
      product.seoSettings?.forceNoIndex
    ) {
      robotsContent = 'noindex';
    }

    useHead({
      meta: [{ name: 'robots', content: robotsContent }],
    });

    state.value.loading = false;
  };

  const setProductCanonicalMetaData: SetProductCanonicalMetaData = (product: Product) => {
    state.value.loading = true;

    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    const localePath = useLocalePath();
    const domain = normalizeDomain(String(runtimeConfig.public.domain || 'https://www.komplett-konzept.de'));

    const canonical = productSeoSettingsGetters.getCanonical(product);
    const forcedCanonicalUrl = productSeoSettingsGetters.getForcedCanonicalUrl(product)?.trim();
    const seoCanonicalHref = productSeoSettingsGetters.getCanonicalHref(canonical)?.trim();

    // Prefer a configured canonical; otherwise use the current product page URL.
    // shop-api's getCanonical() returns {} when unset, which previously produced an empty href.
    const canonicalHref = forcedCanonicalUrl || seoCanonicalHref || `${domain}${localePath(route.path)}`;

    useHead({
      link: [{ rel: 'canonical', href: canonicalHref }],
    });

    const canonicalAlternates = productSeoSettingsGetters.getCanonicalAlternate(canonical);
    if (canonicalAlternates.length > 0) {
      const alternateLocales = canonicalAlternates.map((item: CanonicalAlternate) => {
        return {
          rel: 'alternate',
          hreflang: productSeoSettingsGetters.getCanonicalAlternateHreflang(item),
          href: productSeoSettingsGetters.getCanonicalAlternateHref(item),
        };
      });

      useHead({
        link: alternateLocales,
      });
    }

    state.value.loading = false;
  };

  return {
    setLogoMeta,
    setWebsiteMeta,
    setProductMetaData,
    setProductRobotsMetaData,
    setProductCanonicalMetaData,
    ...toRefs(state.value),
  };
};
