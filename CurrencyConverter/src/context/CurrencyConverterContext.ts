import { createContext } from "react";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";

export type CurrencyConverterType = ReturnType<typeof useCurrencyConverter>;
export const CurrencyConverterContext = createContext<CurrencyConverterType | null>(null);
