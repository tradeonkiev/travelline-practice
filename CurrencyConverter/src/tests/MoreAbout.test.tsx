import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CurrencyConverterContext } from "../context/CurrencyConverterContext";
import { MoreAbout } from "../components/MoreAbout/MoreAbout";
import type { Currency } from "../models/currency";
import { currencies } from "../mocks/currencyMocks";

const cad = currencies.find((currency) => currency.code === "CAD") as Currency;
const pln = currencies.find((currency) => currency.code === "PLN") as Currency;
const jpy = currencies.find((currency) => currency.code === "JPY") as Currency;

const createCurrencyConverterMock = (from: Currency, to: Currency) => {
  return {
    amount: "1",
    currencies,
    from: from.code,
    fromCurrency: from,
    rate: {
      purchasedCurrencyCode: from.code,
      paymentCurrencyCode: to.code,
      price: 1,
      dateTime: "2026-05-26T00:00:00Z",
    },
    result: "1",
    setAmount: () => { },
    setFrom: () => { },
    setTo: () => { },
    swapCurrencies: () => { },
    to: to.code,
    toCurrency: to,
  }
};

const renderMoreAbout = (from: Currency, to: Currency) => {
  const converter = createCurrencyConverterMock(from, to);
  render(
    <CurrencyConverterContext.Provider value={converter}>
      <MoreAbout />;
    </CurrencyConverterContext.Provider>)
}

describe("MoreAbout", () => {
  it("RenderSelectedCurrencyBlock", () => {
    renderMoreAbout(cad, pln);

    expect(screen.getByLabelText("About CAD/PLN")).toBeTruthy();
    expect(screen.getByRole("button", { name: "CAD/PLN: about" })).toBeTruthy();
  });

  it("RenderSelectedCurrencyNames", () => {
    renderMoreAbout(cad, pln);

    expect(screen.getByText("Canadian dollar - CAD - $")).toBeTruthy();
    expect(screen.getByText("Polish zloty - PLN - zł")).toBeTruthy();
  });

  it("RenderSelectedCurrencyPairDescriptions", () => {
    renderMoreAbout(cad, jpy);

    expect(screen.getByText(cad.description)).toBeTruthy();
    expect(screen.getByText(jpy.description)).toBeTruthy();
  });
});
