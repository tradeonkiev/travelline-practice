import type { Currency } from "../../models/currency";
import styles from "./ConverterHeader.module.scss";

type ConverterHeaderProps = {
  amount: string;
  fromCurrency: Currency;
  result: string;
  toCurrency: Currency;
  updatedAt: string;
};

const formatDate = (value: string) => {
  if (!value) {
    return "Rate date is not available";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "long",
    timeZone: "UTC",
  }).format(new Date(value));
}

export const ConverterHeader = ({
  amount,
  fromCurrency,
  result,
  toCurrency,
  updatedAt,
}: ConverterHeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.label}>
        {amount} {fromCurrency.name} is
      </div>

      <div className={styles.result}>
        {result} {toCurrency.name}
      </div>

      <div className={styles.date}>{formatDate(updatedAt)}</div>
    </div>
  );
};
