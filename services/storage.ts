import { AppState, Team, ScoreEntry } from '../types';
import { INITIAL_TEAMS, STORAGE_KEY } from '../constants';

export const getAppState = (): AppState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      teams: INITIAL_TEAMS,
      lastUpdated: Date.now()
    };
  }
  return JSON.parse(stored);
};

export const saveAppState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const addScoreToTeam = (teamId: number, amount: number, description: string): AppState => {
  const currentState = getAppState();
  const updatedTeams = currentState.teams.map(team => {
    if (team.id === teamId) {
      const newEntry: ScoreEntry = {
        id: Math.random().toString(36).substr(2, 9),
        amount,
        description,
        timestamp: Date.now()
      };
      return {
        ...team,
        totalScore: team.totalScore + amount,
        history: [newEntry, ...team.history]
      };
    }
    return team;
  });

  const newState = {
    teams: updatedTeams,
    lastUpdated: Date.now()
  };
  saveAppState(newState);
  return newState;
};

export const resetData = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
};