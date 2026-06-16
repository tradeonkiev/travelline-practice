import type { Currency, PriceChange } from '../models/currency';
import { mapCurrencyDtoToCurrency, mapPriceChangeDtoToPriceChange } from '../mappers/currencyMappers';
import type { CurrencyDto, PriceChangeDto } from './dto/currencyDto';

const DEFAULT_API_BASE_URL = 'http://localhost:5081';
const DEFAULT_PRICE_HISTORY_START_DATE = '2026-01-01T00:00:00Z';

export const getCurrencies = async (signal?: AbortSignal): Promise<Currency[]> => {
  const response = await fetch(`${DEFAULT_API_BASE_URL}/Currency`, { signal });

  if (!response.ok) {
    throw new Error(`Server responded with status ${response.status}`);
  }

  const currencies = (await response.json()) as CurrencyDto[];

  return currencies.map(mapCurrencyDtoToCurrency);
};

export const getPriceChanges = async (
  paymentCurrency: string,
  purchasedCurrency: string,
  fromDateTime = DEFAULT_PRICE_HISTORY_START_DATE,
  toDateTime?: string,
  signal?: AbortSignal
): Promise<PriceChange[]> => {
  const params = new URLSearchParams({
    fromDateTime,
    paymentCurrency,
    purchasedCurrency
  });

  if (toDateTime) {
    params.append('toDateTime', toDateTime);
  }

  const response = await fetch(`${DEFAULT_API_BASE_URL}/prices?${params.toString()}`, { signal });

  if (!response.ok) {
    throw new Error(`Server responded with status ${response.status}`);
  }

  const priceChanges = (await response.json()) as PriceChangeDto[];

  return priceChanges.map(mapPriceChangeDtoToPriceChange);
};

export const getLatestPriceChange = async (
  paymentCurrency: string,
  purchasedCurrency: string,
  signal?: AbortSignal
): Promise<PriceChange | null> => {
  // await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  const priceChanges = await getPriceChanges(
    paymentCurrency,
    purchasedCurrency,
    DEFAULT_PRICE_HISTORY_START_DATE,
    undefined,
    signal
  );

  if (priceChanges.length === 0) {
    return null;
  }

  return (
    priceChanges.toSorted((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()).at(-1) || null
  );
};
