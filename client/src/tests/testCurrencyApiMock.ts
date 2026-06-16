import { vi } from 'vitest';
import currenciesJson from '../data/2_hw_mock_currencies.json';
import priceChangesJson from '../data/2_hw_mock_price_changes.json';
import type { PriceChanges } from '../models/currency';

const NOT_FOUND_STATUS = 404;
const SERVER_ERROR_STATUS = 500;
const priceChanges = priceChangesJson as PriceChanges;

const createJsonResponse = (body: unknown, ok = true, status = 200) => {
  return {
    json: () => Promise.resolve(body),
    ok,
    status
  } as Response;
};

export const mockSuccessfulCurrencyApi = () => {
  return vi.spyOn(globalThis, 'fetch').mockImplementation((input) => {
    const url = input.toString();

    if (url.includes('/Currency')) {
      return Promise.resolve(createJsonResponse(currenciesJson));
    }

    if (url.includes('/prices')) {
      const parsedUrl = new URL(url);
      const paymentCurrency = parsedUrl.searchParams.get('paymentCurrency') ?? '';
      const purchasedCurrency = parsedUrl.searchParams.get('purchasedCurrency') ?? '';
      const priceChange = priceChanges[paymentCurrency]?.[purchasedCurrency];

      return Promise.resolve(createJsonResponse(priceChange ? [priceChange] : []));
    }

    return Promise.resolve(createJsonResponse(null, false, NOT_FOUND_STATUS));
  });
};

export const mockFailedCurrencyApi = () => {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue(createJsonResponse(null, false, SERVER_ERROR_STATUS));
};
