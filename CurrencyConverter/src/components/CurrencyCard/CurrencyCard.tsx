import type { useCurrencyConverter } from "../../hooks/useCurrencyConverter";
import { ConverterHeader } from "../ConverterHeader/ConverterHeader";
import { CurrencyInput } from "../CurrencyInput/CurrencyInput";
import { MoreAbout } from "../MoreAbout/MoreAbout";
import styles from "./CurrencyCard.module.scss";

type CurrencyCardProps = {
  converter: ReturnType<typeof useCurrencyConverter>;
};

export const CurrencyCard = ({ converter }: CurrencyCardProps) => {
  const {
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
  } = converter;

  return (
    <div className={styles.page}>
      <div className={styles.card} aria-label="Currency converter">
        <ConverterHeader
          amount={amount}
          fromCurrency={fromCurrency}
          result={result}
          toCurrency={toCurrency}
          updatedAt={rate.dateTime}
        />

        <div className={styles.fields}>
          <CurrencyInput
            id="from-input"
            value={amount}
            onChangeValue={setAmount}
            currencyCode={from}
            currencies={currencies}
            onCurrencyChange={setFrom}
          />

          <CurrencyInput
            id="to-input"
            value={result}
            onChangeValue={() => { }}
            currencyCode={to}
            currencies={currencies}
            onCurrencyChange={setTo}
            readOnly={true}
          />

          {/* TODO: добавить кнопку add currency чтобы добавлять еще валюты для  конвертации  */}
          <button
            className={styles.swapButton}
            onClick={swapCurrencies}
          >
            Swap
          </button>
        </div>

        <MoreAbout key={`${from}-${to}`} from={fromCurrency} to={toCurrency} />
      </div>
    </div>
  );
};
