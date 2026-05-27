import { useContext } from "react";
import { CurrencyConverterContext } from "../context/CurrencyConverterContext";

export const useCurrencyConverterContext = () => {
    const context = useContext(CurrencyConverterContext);
    if (!context) {
        throw new Error("useCurrencyConverterContext must be used within CurrencyConverterProvider");
    }
    return context;
}