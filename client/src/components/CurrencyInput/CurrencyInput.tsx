import { Triangle } from 'lucide-react';
import type { Currency } from '../../models/currency';
import styles from './CurrencyInput.module.scss';

type CurrencyInputProps = {
  id: string;
  value: string;
  currencyCode: string;
  currencies: Currency[];
  onChangeValue: (value: string) => void;
  onCurrencyChange: (currencyCode: string) => void;
  readOnly?: boolean;
};

export const CurrencyInput = ({
  id,
  value,
  currencyCode,
  currencies,
  onChangeValue,
  onCurrencyChange,
  readOnly = false
}: CurrencyInputProps) => {
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
};
