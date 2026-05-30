import type { Currency } from '../../models/currency';
import styles from './CurrencyDescription.module.scss';

type CurrencyDescriptionProps = {
  currency: Currency;
};

export const CurrencyDescription = ({ currency }: CurrencyDescriptionProps) => {
  return (
    <div className={styles.description}>
      <div className={styles.title}>
        {currency.name} - {currency.code} - {currency.symbol}
      </div>
      <div className={styles.text}>
        {currency.description ?? 'Description is not available for this currency'}

        {/* ну я короче на всякий случай добавил по дефеолту чо есть вдруг там калл вообще надо бы и 
         к другим данным сделать но в то что описание было впадлу добавлять я поверю a в то что имя 
         валюты написать в падлу было это уже анрил*/}
      </div>
    </div>
  );
};
