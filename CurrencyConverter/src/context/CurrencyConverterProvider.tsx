
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";
import { currencies, priceChanges } from "../mocks/currencyMocks";
import { CurrencyConverterContext } from "./CurrencyConverterContext";

export const CurrencyConverterProvider = ({ children }: { children: React.ReactNode }) => {
    const converter = useCurrencyConverter({ currencies, priceChanges });
    return (
        <CurrencyConverterContext.Provider value={converter}>
            {children}
        </CurrencyConverterContext.Provider>
    )
};