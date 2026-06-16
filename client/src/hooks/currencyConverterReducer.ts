import type { Currency, PriceChange, PriceChanges } from '../models/currency';

export const DEFAULT_AMOUNT = '1';

export type CurrencyConverterState = {
  amount: string;
  currencies: Currency[];
  error: string | null;
  from: string;
  isLoading: boolean;
  priceChanges: PriceChanges;
  rateError: string | null;
  to: string;
};

type PriceLoadSuccessPayload = {
  from: string;
  priceChange: PriceChange | null;
  to: string;
};

export type CurrencyConverterAction =
  | { type: 'SET_AMOUNT'; payload: string }
  | { type: 'SET_CURRENCIES'; payload: Currency[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FROM'; payload: string }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_RATE_ERROR'; payload: string | null }
  | { type: 'SET_TO'; payload: string }
  | { type: 'SET_PRICE_CHANGE'; payload: PriceLoadSuccessPayload }
  | { type: 'SWAP_CURRENCIES' };

export const initialCurrencyConverterState: CurrencyConverterState = {
  amount: DEFAULT_AMOUNT,
  currencies: [],
  error: null,
  from: '',
  isLoading: true,
  priceChanges: {},
  rateError: null,
  to: ''
};

const formatResult = (value: number) => {
  return Number.isFinite(value)
    ? value.toLocaleString('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    })
    : '0';
};

export const getSelectedPriceChange = (state: CurrencyConverterState) => {
  return state.priceChanges[state.from]?.[state.to];
};

export const getConvertedAmount = (state: CurrencyConverterState) => {
  const numericAmount = Number(state.amount.replace(',', '.'));
  const rate = getSelectedPriceChange(state);

  return rate ? formatResult(numericAmount * rate.price) : '0';
};

export const currencyConverterReducer = (
  state: CurrencyConverterState,
  action: CurrencyConverterAction
): CurrencyConverterState => {
  switch (action.type) {
    case 'SET_AMOUNT':
      return {
        ...state,
        amount: action.payload
      };

    case 'SET_CURRENCIES': {
      return {
        ...state,
        currencies: action.payload,
        error: null,
        from: action.payload[0]?.code ?? '',
        isLoading: false,
        to: action.payload[1]?.code ?? action.payload[0]?.code ?? ''
      };
    }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: action.payload ? false : state.isLoading
      };

    case 'SET_FROM':
      if (action.payload === state.to) {
        return {
          ...state,
          amount: getConvertedAmount(state),
          from: state.to,
          to: state.from
        };
      }

      return {
        ...state,
        from: action.payload
      };

    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'SET_RATE_ERROR':
      return {
        ...state,
        rateError: action.payload
      };

    case 'SET_TO':
      if (action.payload === state.from) {
        return {
          ...state,
          amount: getConvertedAmount(state),
          from: state.to,
          to: state.from
        };
      }

      return {
        ...state,
        to: action.payload
      };

    case 'SET_PRICE_CHANGE': {
      const { from, priceChange, to } = action.payload;

      return {
        ...state,
        priceChanges: priceChange
          ? {
            ...state.priceChanges,
            [from]: {
              ...state.priceChanges[from],
              [to]: priceChange
            }
          }
          : state.priceChanges,
        rateError: priceChange ? null : 'No price data available for the selected currency pair.'
      };
    }

    case 'SWAP_CURRENCIES':
      return {
        ...state,
        amount: getConvertedAmount(state),
        from: state.to,
        to: state.from
      };

    default:
      return state;
  }
};
