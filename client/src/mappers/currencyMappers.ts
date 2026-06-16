import type { Currency, PriceChange } from '../models/currency';
import type { CurrencyDto, PriceChangeDto } from '../api/dto/currencyDto';

export const mapCurrencyDtoToCurrency = (dto: CurrencyDto): Currency => {
  return {
    code: dto.code,
    description: dto.description ?? '',
    name: dto.name,
    symbol: dto.symbol
  };
};

export const mapPriceChangeDtoToPriceChange = (dto: PriceChangeDto): PriceChange => {
  return {
    dateTime: dto.dateTime,
    paymentCurrencyCode: dto.paymentCurrencyCode,
    price: dto.price,
    purchasedCurrencyCode: dto.purchasedCurrencyCode
  };
};
