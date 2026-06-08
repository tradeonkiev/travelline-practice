import { useCurrencyConverter } from './hooks/useCurrencyConverter';
import { currencies as mockCurrencies, priceChanges } from './mocks/currencyMocks';
import { ConverterHeader } from './components/ConverterHeader/ConverterHeader';
import { CurrencyInput } from './components/CurrencyInput/CurrencyInput';
import { MoreAbout } from './components/MoreAbout/MoreAbout';
import styles from './App.module.scss';

export const App = () => {
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
    toCurrency
  } = useCurrencyConverter({ currencies: mockCurrencies, priceChanges });

  return (
    <div className={styles.page}>
      <div className={styles.card}>
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
            currencyCode={from}
            currencies={currencies}
            onChangeValue={setAmount}
            onCurrencyChange={setFrom}
          />

          <CurrencyInput
            id="to-input"
            value={result}
            currencyCode={to}
            currencies={currencies}
            onChangeValue={() => { }}
            onCurrencyChange={setTo}
            readOnly={true}
          />

          <button className={styles.swapButton} onClick={swapCurrencies}>
            Swap
          </button>
        </div>

        <MoreAbout key={`${from}-${to}`} from={fromCurrency} to={toCurrency} />
      </div>
    </div>
  );
};
