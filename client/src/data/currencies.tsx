export type Currency = {
  code: string;
  name: string;
  symbol: string;
  amount: string;
  description: string;
};

export type CurrencyPair = {
  from: Currency;
  to: Currency;
  updatedAt: string;
};

export const currencyPair: CurrencyPair = {
  from: {
    code: 'PLN',
    name: 'Polish zloty',
    symbol: 'zl',
    amount: '1',
    description:
      'This is the official currency and legal tender of Poland. It is subdivided into 100 grosz-y (gr). It is the most traded currency in Central and Eastern Europe and ranks 21st most-traded in the foreign exchange market.'
  },
  to: {
    code: 'JPY',
    name: 'Japanese yen',
    symbol: 'yen',
    amount: '0,99',
    description:
      'The yen is the official currency of Japan. It is the third-most traded currency in the foreign exchange market, after the United States dollar and the euro. It is also widely used as a third reserve currency after the US dollar and the euro.'
  },
  updatedAt: 'Fri, 6 march 2666 99:99 UTC'
};
