import { Triangle } from "lucide-react";
import styles from "./CurrencyInput.module.scss";
import { useContext } from "react";
import { CurrencyConverterContext } from "../../context/CurrencyConverterContext";

type CurrencyInputProps = {
  id: string;
  onChangeValue: (value: string) => void;
  onCurrencyChange: (currencyCode: string) => void;
  readOnly?: boolean;
};

export const CurrencyInput = ({
  id,
  onChangeValue,
  onCurrencyChange,
  readOnly = false,
}: CurrencyInputProps) => {
  const converter = useContext(CurrencyConverterContext);

  if (!converter) {
    throw new Error("CurrencyInput must be used within CurrencyConverterProvider");
  }

  const { currencies } = converter;
  const value = readOnly ? converter.result : converter.amount;
  const currencyCode = readOnly ? converter.to : converter.from;
  
  return (
    <div className={styles.field}>
      <input
        id={`${id}-amount`}
        className={styles.input}
        inputMode="decimal"
        name={id}
        readOnly={readOnly}
        value={value}
        onChange={(event) => onChangeValue(event.target.value)}
      />
      <span className={styles.divider} />
      <select
        id={`${id}-currency-select`}
        className={styles.select}
        value={currencyCode}
        onChange={(event) => onCurrencyChange(event.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code}
          </option>
        ))}
      </select>
      <Triangle className={styles.arrow} />
    </div>
  );
}
