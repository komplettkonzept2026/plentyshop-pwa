/**
 * Placeholder manufacturer records that exist in the PlentyONE catalogue.
 * They must never appear in the producer facet UI or in structured data.
 */
const PLACEHOLDER_MANUFACTURERS = new Set(['musterfirma', 'keine angabe', 'no information', '-', '--']);

export const isRealManufacturerName = (name: string | undefined | null): boolean => {
  const value = String(name ?? '').trim();
  return value.length > 0 && !PLACEHOLDER_MANUFACTURERS.has(value.toLowerCase());
};
