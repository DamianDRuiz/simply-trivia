import { useReducer } from 'react';
import { initialTeamsState } from '../../defaults';
import { teamsReducer } from '../../reducers/teamsReducer';
import TeamCard from '../TeamCard/TeamCard';
import TriviaCard from '../TriviaCard/TriviaCard';
import styles from './SimplyTrivia.module.scss';

export function SimplyTrivia() {
  const [teams, teamsDispatch] = useReducer(teamsReducer, initialTeamsState);

  return (
    <div className={styles.container}>
      <h1>SimplyTrivia</h1>
      <TriviaCard>
        {teams.map((team, i) => (
          <TeamCard
            key={i}
            teamData={teams[i]}
            id={i}
            dispatch={teamsDispatch}
          />
        ))}
      </TriviaCard>
    </div>
  );
}

export default SimplyTrivia;
