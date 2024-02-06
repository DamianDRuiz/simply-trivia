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
    <div className={`${styles.container}`}>
      <div className={`${styles.inner}`}>
        <h2>{teamData.name}</h2> <strong>Score: {teamData.score}</strong>
        <div>
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
