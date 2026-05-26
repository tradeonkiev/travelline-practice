import { useContext } from "react";
import { CurrencyConverterContext } from "../../context/CurrencyConverterContext";
import { ConverterHeader } from "../ConverterHeader/ConverterHeader";
import { CurrencyInput } from "../CurrencyInput/CurrencyInput";
import { MoreAbout } from "../MoreAbout/MoreAbout";
import styles from "./CurrencyCard.module.scss";

export const CurrencyCard = () => {
  const converter = useContext(CurrencyConverterContext);

  if (!converter) {
    throw new Error("CurrencyCard must be used within CurrencyConverterProvider");
  }

  const {
    from,
    fromCurrency,
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
        <ConverterHeader />

        <div className={styles.fields}>
          <CurrencyInput
            id="from-input"
            onChangeValue={setAmount}
            onCurrencyChange={setFrom}
          />

          <CurrencyInput
            id="to-input"
            onChangeValue={() => { }}
            onCurrencyChange={setTo}
            readOnly={true}
          />

          {/* TODO: добавить кнопку add currency input чтобы добавлять еще валюты для  конвертации  */}
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
