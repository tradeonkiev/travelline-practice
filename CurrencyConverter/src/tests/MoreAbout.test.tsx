import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MoreAbout } from "../components/MoreAbout/MoreAbout";
import currenciesJson from "../data/2_hw_mock_currencies.json";
import type { Currency } from "../models/currency";

const currencies = currenciesJson as Currency[];
const cad = currencies.find((currency) => currency.code === "CAD") as Currency;
const pln = currencies.find((currency) => currency.code === "PLN") as Currency;
const jpy = currencies.find((currency) => currency.code === "JPY") as Currency;


describe("MoreAbout", () => {
  it("RenderSelectedCurrencyBlock", () => {
    render(<MoreAbout from={cad} to={pln} />);

    expect(screen.getByLabelText("About CAD/PLN")).toBeTruthy();
    expect(screen.getByRole("button", { name: "CAD/PLN: about" })).toBeTruthy();
  });

  it("RenderSelectedCurrencyNames", () => {
    render(<MoreAbout from={cad} to={pln} />);

    expect(screen.getByText("Canadian dollar - CAD - $")).toBeTruthy();
    expect(screen.getByText("Polish zloty - PLN - zł")).toBeTruthy();
  });

  it("RenderSelectedCurrencyPairDescriptions", () => {
    render(<MoreAbout from={cad} to={jpy} />);

    expect(screen.getByText(cad.description)).toBeTruthy();
    expect(screen.getByText(jpy.description)).toBeTruthy();
  });
});
