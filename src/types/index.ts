// Team
export interface Team {
  id: string;        // e.g. "ARG"
  name: string;      // e.g. "Argentina"
  group: string;     // e.g. "A"
  flag: string;      // emoji flag
}

// Match
export interface Match {
  id: string;
  round: 'group' | 'r32' | 'r16' | 'qf' | 'sf' | '3rd' | 'final';
  group?: string;         // group stage only
  homeTeamId: string;
  awayTeamId: string;
  date?: string;          // optional, for display
  stadium?: string;       // optional
}

// Prediction
export interface Prediction {
  homeScore: number;
  awayScore: number;
  penaltyWinner?: string;  // team ID, for knockout draws only
}

export type PredictionsState = Record<string, Prediction>;  // matchId → Prediction

// Group standings
export interface Standing {
  position: number;
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

// Knockout match with winner resolved
export interface KnockoutMatch {
  matchId: string;
  homeTeamId: string | null;   // null = not yet known
  awayTeamId: string | null;
  homeScore: number | null;
  awayScore: number | null;
  penaltyWinner: string | null;
  winner: string | null;       // resolved team ID
}

// Complete app state (serialized to URL)
export interface ProdeState {
  username: string;
  predictions: PredictionsState;
}

// Bracket round info
export type BracketRound = 'r32' | 'r16' | 'qf' | 'sf' | '3rd' | 'final';

// Language
export type Locale = 'es' | 'en';
