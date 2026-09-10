import { describe, expect, it } from 'vitest';
import {
  getCategorySeoH2s,
  normalizeCategoryPath,
  stripHtmlH2Tags,
} from '~/utils/seo/categoryH2Overrides';

describe('categoryH2Overrides', () => {
  it('normalizes production URLs and trailing slashes', () => {
    expect(normalizeCategoryPath('https://www.komplett-konzept.de/lagerlogistik/')).toBe('/lagerlogistik');
    expect(normalizeCategoryPath('/en/labor-medizintechnik')).toBe('/labor-medizintechnik');
  });

  it('returns approved German H2 copy for a missing heading page', () => {
    expect(getCategorySeoH2s('/lagerlogistik', 'de')).toEqual([
      'Lösungen für effiziente Lagerlogistik und optimierte Warenbewegung',
    ]);
  });

  it('returns English copy when the locale is en', () => {
    expect(getCategorySeoH2s('/lagerlogistik', 'en')).toEqual([
      'Solutions for efficient warehouse logistics and optimized goods movement',
    ]);
  });

  it('skips approved rows that require no H2 change', () => {
    expect(getCategorySeoH2s('/automation-antrieb-steuerung', 'de')).toEqual([]);
    expect(getCategorySeoH2s('/ueberuns', 'de')).toEqual([]);
  });

  it('uses the later approved copy when the same URL appears twice', () => {
    expect(getCategorySeoH2s('/kategorie/maschinen-anlagen', 'de')).toEqual([
      'Gebrauchte Maschinen und Anlagen für Industrie und Gewerbe',
    ]);
  });

  it('returns multiple approved H2s for the office supplies category', () => {
    const headings = getCategorySeoH2s('/haus-und-heimwerken/buerobedarf', 'de');
    expect(headings).toHaveLength(6);
    expect(headings[0]).toBe('Bürobedarf und Computerzubehör für den modernen Arbeitsplatz');
    expect(headings[4]).toBe('Häufige Fragen zu Bürobedarf und Computerzubehör');
  });

  it('returns the latest approved H2 for warehouse subcategories', () => {
    expect(getCategorySeoH2s('/lagerlogistik/lagerkaesten', 'de')).toEqual([
      'Lagerkästen und Behältersysteme für Lager, Werkstatt und Industrie',
    ]);
    expect(getCategorySeoH2s('/lagerlogistik/regale', 'de')).toEqual([
      'Regalsysteme für Lager, Werkstatt, Betrieb und Industrie',
    ]);
  });

  it('strips existing H2 markup from Plenty category HTML', () => {
    expect(stripHtmlH2Tags('<h2>Old heading</h2><p>Keep me</p>')).toBe('<p>Keep me</p>');
  });
});
