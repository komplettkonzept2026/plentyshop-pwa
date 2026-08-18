import type { UseModernImageReturn } from './types';
import type { Product, ImagesData } from '@plentymarkets/shop-api';
import { productGetters } from '@plentymarkets/shop-api';

const getImageForViewport = (product: Product, context: string, isTablet: boolean) => {
  if (context === 'ItemList') return productGetters.getPreviewImage(product);
  if (context === 'Wishlist')
    return isTablet ? productGetters.getFullImage(product) : productGetters.getMiddleImage(product);
  if (context === 'CartProductCard')
    return isTablet ? productGetters.getSecondPreviewImage(product) : productGetters.getPreviewImage(product);

  return '';
};

const MODERN_SUFFIX_RE = /\.(?:avif|webp)$/i;
const CONVERTIBLE_EXT = new Set(['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'webp', 'WEBP']);

const isTruthySetting = (value: unknown): boolean => value === true || value === 'true' || value === 1 || value === '1';

/** Strip a trailing .avif / .webp so we can rebuild a fallback chain from the original asset. */
export const stripModernImageExtension = (url: string): string => {
  const stripped = url.replace(MODERN_SUFFIX_RE, '');
  // Only treat as double-extension (e.g. .jpg.avif) when a real base image ext remains.
  if (/\.(jpe?g|png|webp)(?:$|\?)/i.test(stripped)) return stripped;
  return url;
};

const canConvertItemImage = (url: string): boolean => {
  if (!/\/item\/images\//.test(url)) return false;
  const matches = url.match(/\.(\w+)(?:$|\?)/);
  const baseExtension = String(matches?.[1] ?? '');
  return CONVERTIBLE_EXT.has(baseExtension);
};

export const useModernImage: UseModernImageReturn = () => {
  const { getSetting: useAvif } = useSiteSettings('useAvif');
  const { getSetting: useWebp } = useSiteSettings('useWebp');

  const avifEnabled = () => isTruthySetting(useAvif());
  const webpEnabled = () => isTruthySetting(useWebp());

  const withModernExtension = (url: string, extension: 'avif' | 'webp'): string => {
    const original = stripModernImageExtension(url);
    if (!canConvertItemImage(original)) return original;
    if (original.toLowerCase().endsWith(`.${extension}`)) return original;
    return `${original}.${extension}`;
  };

  /**
   * Single-URL helper (cards, schema, etc.): prefer AVIF, then WebP, else original.
   */
  const addModernImageExtension = (url: string | undefined): string => {
    if (!url) return '';

    const original = stripModernImageExtension(url);
    if (!canConvertItemImage(original)) return original;

    if (avifEnabled()) return withModernExtension(original, 'avif');
    if (webpEnabled()) return withModernExtension(original, 'webp');

    return original;
  };

  /**
   * Picture sources for product gallery / LCP: AVIF → WebP → original JPEG/PNG.
   * When AVIF is on, WebP is still offered as the mid-tier fallback even if useWebp is off,
   * so browsers without AVIF still get a modern format (mail: WebP/AVIF with fallback).
   */
  const getModernImageSources = (url: string | undefined) => {
    const original = stripModernImageExtension(url || '');
    if (!original || !canConvertItemImage(original)) {
      return { original, avif: '', webp: '' };
    }

    const wantAvif = avifEnabled();
    const wantWebp = webpEnabled() || wantAvif;

    return {
      original,
      avif: wantAvif ? withModernExtension(original, 'avif') : '',
      webp: wantWebp ? withModernExtension(original, 'webp') : '',
    };
  };

  const addModernImageExtensionForGallery = (images: ImagesData[]) => {
    return images.map((image: ImagesData) => ({
      ...image,
      // Keep originals on the object so <picture> can build a full fallback chain.
      // Consumers that need a single preferred URL should call addModernImageExtension().
      url: stripModernImageExtension(image.url),
      urlPreview: stripModernImageExtension(image.urlPreview),
      urlMiddle: stripModernImageExtension(image.urlMiddle),
      urlSecondPreview: stripModernImageExtension(image.urlSecondPreview),
    }));
  };

  return {
    addModernImageExtension,
    addModernImageExtensionForGallery,
    getModernImageSources,
    stripModernImageExtension,
    getImageForViewport: (product, context) => {
      const viewport = useViewport();
      return getImageForViewport(product, context, viewport.isGreaterOrEquals('md'));
    },
  };
};
