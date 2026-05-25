import { useState } from "react";
import type { Currency, PriceChanges } from "../models/currency";

const DEFAULT_AMOUNT = "1";

type UseCurrencyConverterParams = {
  currencies: Currency[];
  priceChanges: PriceChanges;
};

function formatResult(value: number) {
  return Number.isFinite(value)
    ? value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    })
    : "0";
}

export function useCurrencyConverter({
  currencies,
  priceChanges,
}: UseCurrencyConverterParams) {
  const firstCurrency = currencies[0].code;
  const secondCurrency = currencies[1].code;

  const [from, setFromState] = useState(firstCurrency);
  const [to, setToState] = useState(secondCurrency);
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);

  const rate = priceChanges[from]?.[to];

  // По идее можно обернуть в юзМемо [нумерик + рате] но это не зачем тут и так супер изи расчет 
  const numericAmount = Number(amount.replace(",", "."));
  const result = rate ? formatResult(numericAmount * rate.price) : "0";

  const fromCurrency =
    currencies.find((currency) => currency.code === from) ?? currencies[0];
  const toCurrency =
    currencies.find((currency) => currency.code === to) ?? currencies[1];

  // По условию было написано что нельщзя чтобы валюты совпадали ну можно было просто забанить 
  // при выборе но как по мне лучше тчобы свапались валюты местами если юзер выбрал во втором 
  // слоте такую же валюту
  function setFrom(nextFrom: string) {
    setFromState(nextFrom);

    if (nextFrom === to) {
      swapCurrencies();
    }
  }

  function setTo(nextTo: string) {
    setToState(nextTo);

    if (nextTo === from) {
      swapCurrencies();
    }
  }

  function swapCurrencies() {
    setFromState(to);
    setToState(from);
    setAmount(result);
    // Надо ли так делать? В условном гугл конвертере при свапе значения тоже свапаються
  }

  return {
    amount,
    currencies,
    from,
    fromCurrency,
    rate,
    result,
    setAmount,
    setFrom,
    setTo,
    swapCurrencies,
    to,
    toCurrency,
  };
}
