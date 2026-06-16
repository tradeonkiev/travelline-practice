import { describe, expect, it } from 'vitest';
import { mapCurrencyDtoToCurrency, mapPriceChangeDtoToPriceChange } from '../mappers/currencyMappers';

describe('currency mappers', () => {
  it('maps CurrencyDto to Currency', () => {
    expect(
      mapCurrencyDtoToCurrency({
        code: 'CAD',
        description: null,
        name: 'Canadian dollar',
        symbol: '$'
      })
    ).toEqual({
      code: 'CAD',
      description: '',
      name: 'Canadian dollar',
      symbol: '$'
    });
  });

  it('maps PriceChangeDto to PriceChange', () => {
    expect(
      mapPriceChangeDtoToPriceChange({
        dateTime: '2026-04-27T09:00:00.000Z',
        paymentCurrencyCode: 'CAD',
        price: 2.95,
        purchasedCurrencyCode: 'PLN'
      })
    ).toEqual({
      dateTime: '2026-04-27T09:00:00.000Z',
      paymentCurrencyCode: 'CAD',
      price: 2.95,
      purchasedCurrencyCode: 'PLN'
    });
  });
});
