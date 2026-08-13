import type { Product } from '@plentymarkets/shop-api';
import {
  getProductCreatedAt,
  getProductNewnessDate,
  getProductReleasedAt,
  isNewProduct,
  parsePlentyDate,
} from '../isNewProduct';

type DateScope = 'variationCreatedAt' | 'itemCreatedAt' | 'releasedAt';

const buildProduct = (value?: string | null, scope: DateScope = 'variationCreatedAt'): Product => {
  const product = {
    variation: {},
    item: {},
  } as Product;

  if (scope === 'variationCreatedAt') {
    (product.variation as { createdAt?: string | null }).createdAt = value;
  } else if (scope === 'itemCreatedAt') {
    (product.item as { createdAt?: string | null }).createdAt = value;
  } else {
    product.variation.releasedAt = value;
  }

  return product;
};

describe('isNewProduct', () => {
  const now = new Date('2026-08-07T12:00:00.000Z');

  it('returns false when createdAt and releasedAt are missing', () => {
    expect(isNewProduct(buildProduct(undefined), { now })).toBe(false);
    expect(isNewProduct(buildProduct(null), { now })).toBe(false);
    expect(isNewProduct(buildProduct(null, 'releasedAt'), { now })).toBe(false);
  });

  it('returns true for products created within 30 days', () => {
    expect(isNewProduct(buildProduct('2026-08-06 16:48:11'), { now })).toBe(true);
    expect(isNewProduct(buildProduct('2026-07-08T12:00:00.000Z'), { now })).toBe(true);
  });

  it('returns false for products older than 30 days', () => {
    expect(isNewProduct(buildProduct('2026-07-07 11:59:59'), { now })).toBe(false);
    expect(isNewProduct(buildProduct('2025-01-01 00:00:00'), { now })).toBe(false);
  });

  it('falls back to item.createdAt', () => {
    expect(isNewProduct(buildProduct('2026-08-01 10:00:00', 'itemCreatedAt'), { now })).toBe(true);
  });

  it('falls back to variation.releasedAt when createdAt is missing', () => {
    expect(getProductReleasedAt(buildProduct('2026-08-01 10:00:00', 'releasedAt'))).toBe('2026-08-01 10:00:00');
    expect(isNewProduct(buildProduct('2026-08-01 10:00:00', 'releasedAt'), { now })).toBe(true);
    expect(isNewProduct(buildProduct('2025-01-01 00:00:00', 'releasedAt'), { now })).toBe(false);
  });

  it('prefers createdAt over releasedAt', () => {
    const product = buildProduct('2026-08-01 10:00:00', 'variationCreatedAt');
    product.variation.releasedAt = '2025-01-01 00:00:00';

    expect(getProductNewnessDate(product)).toBe('2026-08-01 10:00:00');
    expect(isNewProduct(product, { now })).toBe(true);
  });

  it('ignores invalid and zero dates', () => {
    expect(getProductCreatedAt(buildProduct('0000-00-00 00:00:00'))).toBeNull();
    expect(getProductReleasedAt(buildProduct('0000-00-00 00:00:00', 'releasedAt'))).toBeNull();
    expect(parsePlentyDate('not-a-date')).toBeNull();
    expect(isNewProduct(buildProduct('not-a-date'), { now })).toBe(false);
    expect(isNewProduct(buildProduct('not-a-date', 'releasedAt'), { now })).toBe(false);
  });
});
