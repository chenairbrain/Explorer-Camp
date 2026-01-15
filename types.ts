export interface ScoreEntry {
  id: string;
  amount: number;
  description: string;
  timestamp: number;
}

export interface Team {
  id: number;
  name: string;
  icon: string;
  color: string;
  pin: string;
  totalScore: number;
  history: ScoreEntry[];
}

export interface AppState {
  teams: Team[];
  lastUpdated: number;
}