import { useCurrencyConverter } from './hooks/useCurrencyConverter';
import { ConverterHeader } from './components/ConverterHeader/ConverterHeader';
import { CurrencyInput } from './components/CurrencyInput/CurrencyInput';
import { MoreAbout } from './components/MoreAbout/MoreAbout';
import styles from './App.module.scss';
import { AppStatus } from './components/AppStatus/AppStatus';

export const App = () => {
  const {
    amount,
    currencies,
    error,
    from,
    fromCurrency,
    isLoading,
    rate,
    rateError,
    result,
    setAmount,
    setFrom,
    setTo,
    swapCurrencies,
    to,
    toCurrency
  } = useCurrencyConverter();

  if (isLoading) {
    return <AppStatus type="loading" message="Loading currency rates" />;
  }

  if (error || !fromCurrency || !toCurrency) {
    return <AppStatus type="error" message={error ?? 'Problem on the server side'} />;
  }

  return (
    <div className={styles.page}>
      {rateError && (
        <div className={styles.toast} role="alert">
          {rateError}
        </div>
      )}

      <div className={styles.card}>
        <ConverterHeader
          amount={amount}
          fromCurrency={fromCurrency}
          result={result}
          toCurrency={toCurrency}
          updatedAt={rate?.dateTime ?? ''}
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
            onChangeValue={() => {}}
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
