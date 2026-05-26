import styles from "./ConverterHeader.module.scss";
import { useContext } from "react";
import { CurrencyConverterContext } from "../../context/CurrencyConverterContext";


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

export const ConverterHeader = () => {
  const converter = useContext(CurrencyConverterContext);

  if (!converter) {
    throw new Error("ConverterHeader must be used within CurrencyConverterProvider");
  }

  const { amount, fromCurrency, result, toCurrency } = converter;
  const updatedAt = converter.rate.dateTime;
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
