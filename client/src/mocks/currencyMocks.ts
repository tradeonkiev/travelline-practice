import currenciesJson from '../data/2_hw_mock_currencies.json';
import priceChangesJson from '../data/2_hw_mock_price_changes.json';
import type { Currency, PriceChanges } from '../models/currency';

export const currencies = currenciesJson as Currency[];
export const priceChanges = priceChangesJson as PriceChanges;
