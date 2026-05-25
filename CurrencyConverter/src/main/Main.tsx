import { CurrencyCard } from "../components/CurrencyCard/CurrencyCard";
import { useCurrencyConverter } from "../hooks/useCurrencyConverter";
import { currencies, priceChanges } from "../mocks/currencyMocks";

export function Main() {
  const converter = useCurrencyConverter({ currencies, priceChanges });

  return <CurrencyCard converter={converter} />;
}
