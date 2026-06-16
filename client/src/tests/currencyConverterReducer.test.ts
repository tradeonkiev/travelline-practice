import { describe, expect, it } from 'vitest';
import {
  currencyConverterReducer,
  getConvertedAmount,
  initialCurrencyConverterState
} from '../hooks/currencyConverterReducer';
import type { Currency, PriceChange } from '../models/currency';

const currencies: Currency[] = [
  {
    code: 'CAD',
    description: 'Canadian dollar description',
    name: 'Canadian dollar',
    symbol: '$'
  },
  {
    code: 'PLN',
    description: 'Polish zloty description',
    name: 'Polish zloty',
    symbol: 'zl'
  }
];

const priceChange: PriceChange = {
  dateTime: '2026-04-27T09:00:00.000Z',
  paymentCurrencyCode: 'CAD',
  price: 2.95,
  purchasedCurrencyCode: 'PLN'
};

describe('currencyConverterReducer', () => {
  it('moves to loading state', () => {
    const state = currencyConverterReducer(
      {
        ...initialCurrencyConverterState,
        error: 'Previous error',
        isLoading: false
      },
      { payload: true, type: 'SET_IS_LOADING' }
    );

    expect(state.isLoading).toBe(true);
  });

  it('writes loaded currencies and selected pair', () => {
    const state = currencyConverterReducer(initialCurrencyConverterState, {
      payload: currencies,
      type: 'SET_CURRENCIES'
    });

    expect(state.isLoading).toBe(false);
    expect(state.currencies).toEqual(currencies);
    expect(state.from).toBe('CAD');
    expect(state.to).toBe('PLN');
  });

  it('writes request error', () => {
    const state = currencyConverterReducer(initialCurrencyConverterState, {
      payload: 'Server responded with an error. Please try again later.',
      type: 'SET_ERROR'
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Server responded with an error. Please try again later.');
  });

  it('writes price data and converts amount', () => {
    const loadedState = currencyConverterReducer(initialCurrencyConverterState, {
      payload: currencies,
      type: 'SET_CURRENCIES'
    });
    const stateWithAmount = currencyConverterReducer(loadedState, {
      payload: '2',
      type: 'SET_AMOUNT'
    });
    const state = currencyConverterReducer(stateWithAmount, {
      payload: {
        from: 'CAD',
        priceChange,
        to: 'PLN'
      },
      type: 'SET_PRICE_CHANGE'
    });

    expect(state.priceChanges.CAD.PLN).toEqual(priceChange);
    expect(getConvertedAmount(state)).toBe('5.9');
  });

  it('writes rate error when price data is not available', () => {
    const loadedState = currencyConverterReducer(initialCurrencyConverterState, {
      payload: currencies,
      type: 'SET_CURRENCIES'
    });

    const state = currencyConverterReducer(loadedState, {
      payload: {
        from: 'CAD',
        priceChange: null,
        to: 'PLN'
      },
      type: 'SET_PRICE_CHANGE'
    });

    expect(state.priceChanges).toEqual({});
    expect(state.rateError).toBe('No price data available for the selected currency pair.');
  });
});
