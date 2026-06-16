import styles from './AppStatus.module.scss';

type AppStatusProps = {
  message: string;
  type: 'loading' | 'error';
};

export const AppStatus = ({ message, type }: AppStatusProps) => {
  return (
    <div className={styles.page}>
      <div className={type === 'error' ? styles.error : styles.status} role={type === 'error' ? 'alert' : 'status'}>
        {message}
      </div>
    </div>
  );
};
