export type Team = {
  name: string;
  score: number;
};

export type TeamsAction = { type: TeamsActionType; teamId: number };

export type TeamsActionType = 'increment' | 'decrement';
