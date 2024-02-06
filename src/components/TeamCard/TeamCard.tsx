import { Team, TeamsAction } from 'src/types/types';
import styles from './TeamCard.module.scss';

type TeamCardProps = {
  teamData: Team;
  id: number;
  dispatch: React.Dispatch<TeamsAction>;
};

export function TeamCard({ teamData, id, dispatch }: TeamCardProps) {
  const increment = () => dispatch({ type: 'increment', teamId: id });
  const decrement = () => dispatch({ type: 'decrement', teamId: id });

  return (
    <div className={styles['container']}>
      {teamData.name} ({teamData.score})<button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default TeamCard;
