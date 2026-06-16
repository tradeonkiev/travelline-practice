export type CurrencyDto = {
  code: string;
  name: string;
  description?: string | null;
  symbol: string;
};

export type PriceChangeDto = {
  purchasedCurrencyCode: string;
  paymentCurrencyCode: string;
  price: number;
  dateTime: string;
};
