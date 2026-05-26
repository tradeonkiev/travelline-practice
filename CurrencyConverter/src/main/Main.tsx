import { CurrencyCard } from "../components/CurrencyCard/CurrencyCard";
import { CurrencyConverterProvider } from "../context/CurrencyConverterProvider";

export function Main() {
  return (
    <CurrencyConverterProvider>
      <CurrencyCard />
    </CurrencyConverterProvider>
  );
}
