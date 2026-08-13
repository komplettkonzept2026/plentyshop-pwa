import type { Product } from '@plentymarkets/shop-api';

export const NEW_PRODUCT_MAX_AGE_DAYS = 30;

type ProductWithCreationDate = Product & {
  variation?: Product['variation'] & { createdAt?: string | null };
  item?: Product['item'] & { createdAt?: string | null };
};

const isValidPlentyDate = (value: string | null | undefined): value is string => {
  return typeof value === 'string' && Boolean(value.trim()) && !value.startsWith('0000-00-00');
};

/**
 * Returns the product creation timestamp from the storefront payload.
 * Prefer variation.createdAt; fall back to item.createdAt when present.
 */
export const getProductCreatedAt = (product: Product): string | null => {
  const productWithDates = product as ProductWithCreationDate;
  const createdAt = productWithDates.variation?.createdAt || productWithDates.item?.createdAt;

  return isValidPlentyDate(createdAt) ? createdAt : null;
};

/**
 * Returns variation.releasedAt when present.
 * Used as a temporary newness signal until Plenty exposes createdAt on storefront items.
 */
export const getProductReleasedAt = (product: Product): string | null => {
  const releasedAt = product.variation?.releasedAt;
  if (typeof releasedAt !== 'string') {
    return null;
  }

  return isValidPlentyDate(releasedAt) ? releasedAt : null;
};

/**
 * Date used for the "New" badge: prefer createdAt, then releasedAt.
 */
export const getProductNewnessDate = (product: Product): string | null => {
  return getProductCreatedAt(product) || getProductReleasedAt(product);
};

/**
 * Parses Plenty date strings such as "2026-08-06 16:48:11" or ISO timestamps.
 */
export const parsePlentyDate = (value: string): Date | null => {
  const normalized = value.includes('T') ? value : value.replace(' ', 'T');
  const date = new Date(normalized);

  return Number.isNaN(date.getTime()) ? null : date;
};

/**
 * True when the product was created/released within the last {@link NEW_PRODUCT_MAX_AGE_DAYS} days.
 */
export const isNewProduct = (
  product: Product,
  options?: { now?: Date; maxAgeDays?: number },
): boolean => {
  const newnessDate = getProductNewnessDate(product);
  if (!newnessDate) {
    return false;
  }

  const parsedDate = parsePlentyDate(newnessDate);
  if (!parsedDate) {
    return false;
  }

  const now = options?.now ?? new Date();
  const maxAgeDays = options?.maxAgeDays ?? NEW_PRODUCT_MAX_AGE_DAYS;
  const ageMs = now.getTime() - parsedDate.getTime();

  if (ageMs < 0) {
    return true;
  }

  return ageMs <= maxAgeDays * 24 * 60 * 60 * 1000;
};
