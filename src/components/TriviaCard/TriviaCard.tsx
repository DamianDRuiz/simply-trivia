import { ReactNode } from 'react';
import styles from './TriviaCard.module.scss';

export function TriviaCard({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}

export default TriviaCard;
