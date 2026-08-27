import { describe, expect, it } from 'vitest';
import { isRealManufacturerName } from '../placeholderManufacturer';

describe('isRealManufacturerName', () => {
  it('accepts real manufacturer names', () => {
    expect(isRealManufacturerName('Toshiba')).toBe(true);
    expect(isRealManufacturerName('ABB')).toBe(true);
  });

  it('rejects known placeholder manufacturers', () => {
    expect(isRealManufacturerName('Musterfirma')).toBe(false);
    expect(isRealManufacturerName('musterfirma')).toBe(false);
    expect(isRealManufacturerName('Keine Angabe')).toBe(false);
    expect(isRealManufacturerName('-')).toBe(false);
    expect(isRealManufacturerName('--')).toBe(false);
    expect(isRealManufacturerName('')).toBe(false);
    expect(isRealManufacturerName(null)).toBe(false);
  });
});
