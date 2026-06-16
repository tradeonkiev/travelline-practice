import { useEffect, useReducer } from 'react';
import { getCurrencies, getLatestPriceChange } from '../api/currencyApi';
import {
  currencyConverterReducer,
  getConvertedAmount,
  getSelectedPriceChange,
  initialCurrencyConverterState
} from './currencyConverterReducer';

const SERVER_ERROR_MESSAGE = 'Server responded with an error. Please try again later.';

const isAbortError = (error: unknown) => {
  return typeof error === 'object' && error !== null && 'name' in error && error.name === 'AbortError';
};

export const useCurrencyConverter = () => {
  const [state, dispatch] = useReducer(currencyConverterReducer, initialCurrencyConverterState);

  const { amount, currencies, error, from, isLoading, rateError, to } = state;
  const rate = getSelectedPriceChange(state);
  const result = getConvertedAmount(state);
  const fromCurrency = currencies.find((currency) => currency.code === from) ?? currencies[0];
  const toCurrency = currencies.find((currency) => currency.code === to) ?? currencies[1];

  useEffect(() => {
    const abortController = new AbortController();

    dispatch({ payload: true, type: 'SET_IS_LOADING' });
    dispatch({ payload: null, type: 'SET_ERROR' });

    getCurrencies(abortController.signal)
      .then((loadedCurrencies) => {
        dispatch({ payload: loadedCurrencies, type: 'SET_CURRENCIES' });
      })
      .catch((apiError: unknown) => {
        if (isAbortError(apiError)) {
          console.error(apiError);
          return;
        }

        dispatch({ payload: SERVER_ERROR_MESSAGE, type: 'SET_ERROR' });
      });

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (!from || !to || from === to) {
      return;
    }

    const abortController = new AbortController();

    dispatch({ payload: null, type: 'SET_RATE_ERROR' });

    getLatestPriceChange(from, to, abortController.signal)
      .then((priceChange) => {
        dispatch({
          payload: {
            from,
            priceChange,
            to
          },
          type: 'SET_PRICE_CHANGE'
        });
      })
      .catch((apiError: unknown) => {
        if (isAbortError(apiError)) {
          console.error(apiError);
          return;
        }

        dispatch({ payload: SERVER_ERROR_MESSAGE, type: 'SET_RATE_ERROR' });
      });

    return () => abortController.abort();
  }, [from, to]);

  return {
    amount,
    currencies,
    error,
    from,
    fromCurrency,
    isLoading,
    rate,
    rateError,
    result,
    setAmount: (value: string) => dispatch({ payload: value, type: 'SET_AMOUNT' }),
    setFrom: (currencyCode: string) => dispatch({ payload: currencyCode, type: 'SET_FROM' }),
    setTo: (currencyCode: string) => dispatch({ payload: currencyCode, type: 'SET_TO' }),
    swapCurrencies: () => dispatch({ type: 'SWAP_CURRENCIES' }),
    to,
    toCurrency
  };
};
