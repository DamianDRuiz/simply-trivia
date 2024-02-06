import { useState } from 'react';
import { Team } from 'src/types/types';
import TeamCard from '../TeamCard/TeamCard';
import TriviaCard from '../TriviaCard/TriviaCard';
import styles from './SimplyTrivia.module.scss';

export function SimplyTrivia() {
  const [teams, setTeams] = useState<Team[]>([
    { name: 'Left', score: 0 },
    { name: 'Right', score: 0 },
  ]);

  let teamCards = teams.map((team, i) => (
    <TeamCard key={i} teamData={teams[i]} />
  ));
  return (
    <div className={styles.container}>
      <h1>Welcome to SimplyTrivia!</h1>
      <TriviaCard>{teamCards}</TriviaCard>
    </div>
  );
}

export default SimplyTrivia;
