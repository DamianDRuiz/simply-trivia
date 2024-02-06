import { Team } from 'src/types/types';
import styles from './TeamCard.module.scss';

type TeamCardProps = { teamData: Team };

export function TeamCard({ teamData }: TeamCardProps) {
  return <div className={styles['container']}>{teamData.name}</div>;
}

export default TeamCard;
