import { Team, TeamsAction, TeamsActionType } from 'src/types/types';

export const teamsReducer = (state: Team[], action: TeamsAction) => {
  const modifyScore = (modifier: TeamsActionType) => {
    const newState = [...state];
    const team = newState[action.teamId];

    team.score = modifier == 'increment' ? team.score + 1 : team.score - 1;

    return newState;
  };

  switch (action.type) {
    case 'increment':
      return modifyScore('increment');
    case 'decrement':
      return modifyScore('decrement');
    default:
      throw new Error();
  }
};
