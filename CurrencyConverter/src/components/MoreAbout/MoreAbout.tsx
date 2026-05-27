import { useContext, useState } from "react";
import { CurrencyDescription } from "../CurrencyDescription/CurrencyDescription";
import styles from "./MoreAbout.module.scss";
import { ArrowDown } from "lucide-react";
import { CurrencyConverterContext } from "../../context/CurrencyConverterContext";


// надо ли тут делать проверку на то что from и to не равны нулл? вроде бы нет так 
// как эти пропсы всегда должны передаваться в компонент
// это впринципе вопрос к многим данным типо по идее вот я не смогу получить из апи
//  данные по курсам валют если их нету
export const MoreAbout = () => {
  const converter = useContext(CurrencyConverterContext);

  if (!converter) {
    throw new Error("MoreAbout must be used within CurrencyConverterProvider");
  }

  const { fromCurrency: from, toCurrency: to } = converter;
  const [isOpen, setIsOpen] = useState(true);
  const fromCode = from.code;
  const toCode = to.code;

  return (
    <div
      className={styles.about}
      aria-label={`About ${fromCode}/${toCode}`}
    >
      <div className={styles.toggleWrapper}>
        <button
          className={styles.button}
          onClick={() => setIsOpen((value) => !value)}
        >
          {fromCode}/{toCode}: about
          <ArrowDown
            className={isOpen ? styles.arrowOpen : styles.arrowClosed}
          />
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
}
