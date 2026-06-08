import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import type { Currency } from '../../models/currency';
import { CurrencyDescription } from '../CurrencyDescription/CurrencyDescription';
import styles from './MoreAbout.module.scss';

type MoreAboutProps = {
  from: Currency;
  to: Currency;
};

export const MoreAbout = ({ from, to }: MoreAboutProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const fromCode = from.code;
  const toCode = to.code;

  return (
    <div className={styles.about} aria-label={`About ${fromCode}/${toCode}`}>
      <div className={styles.toggleWrapper}>
        <button className={styles.button} onClick={() => setIsOpen((value) => !value)}>
          {fromCode}/{toCode}: about
          <ArrowDown className={isOpen ? styles.arrowOpen : styles.arrowClosed} />
        </button>
      </div>

      {isOpen && (
        <div className={styles.content}>
          <CurrencyDescription currency={from} />
          <CurrencyDescription currency={to} />
        </div>
      )}
    </div>
  );
};
