import type { Team, Match, Standing } from '../types';

// ============================================================================
// TEAMS — all 48 qualified teams for the 2026 FIFA World Cup
// Data source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup
// ============================================================================

export const teams: Team[] = [
  // Group A
  { id: 'MEX', name: 'Mexico',               group: 'A', flag: '🇲🇽' },
  { id: 'RSA', name: 'South Africa',          group: 'A', flag: '🇿🇦' },
  { id: 'KOR', name: 'South Korea',           group: 'A', flag: '🇰🇷' },
  { id: 'CZE', name: 'Czech Republic',        group: 'A', flag: '🇨🇿' },
  // Group B
  { id: 'CAN', name: 'Canada',                group: 'B', flag: '🇨🇦' },
  { id: 'BIH', name: 'Bosnia & Herzegovina',  group: 'B', flag: '🇧🇦' },
  { id: 'QAT', name: 'Qatar',                 group: 'B', flag: '🇶🇦' },
  { id: 'SUI', name: 'Switzerland',           group: 'B', flag: '🇨🇭' },
  // Group C
  { id: 'BRA', name: 'Brazil',                group: 'C', flag: '🇧🇷' },
  { id: 'MAR', name: 'Morocco',               group: 'C', flag: '🇲🇦' },
  { id: 'HAI', name: 'Haiti',                 group: 'C', flag: '🇭🇹' },
  { id: 'SCO', name: 'Scotland',              group: 'C', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  // Group D
  { id: 'USA', name: 'United States',         group: 'D', flag: '🇺🇸' },
  { id: 'PAR', name: 'Paraguay',              group: 'D', flag: '🇵🇾' },
  { id: 'AUS', name: 'Australia',             group: 'D', flag: '🇦🇺' },
  { id: 'TUR', name: 'Turkey',                group: 'D', flag: '🇹🇷' },
  // Group E
  { id: 'GER', name: 'Germany',               group: 'E', flag: '🇩🇪' },
  { id: 'CUW', name: 'Curaçao',              group: 'E', flag: '🇨🇼' },
  { id: 'CIV', name: 'Ivory Coast',           group: 'E', flag: '🇨🇮' },
  { id: 'ECU', name: 'Ecuador',               group: 'E', flag: '🇪🇨' },
  // Group F
  { id: 'NED', name: 'Netherlands',           group: 'F', flag: '🇳🇱' },
  { id: 'JPN', name: 'Japan',                 group: 'F', flag: '🇯🇵' },
  { id: 'SWE', name: 'Sweden',                group: 'F', flag: '🇸🇪' },
  { id: 'TUN', name: 'Tunisia',               group: 'F', flag: '🇹🇳' },
  // Group G
  { id: 'BEL', name: 'Belgium',               group: 'G', flag: '🇧🇪' },
  { id: 'EGY', name: 'Egypt',                 group: 'G', flag: '🇪🇬' },
  { id: 'IRN', name: 'Iran',                  group: 'G', flag: '🇮🇷' },
  { id: 'NZL', name: 'New Zealand',           group: 'G', flag: '🇳🇿' },
  // Group H
  { id: 'ESP', name: 'Spain',                 group: 'H', flag: '🇪🇸' },
  { id: 'CPV', name: 'Cape Verde',            group: 'H', flag: '🇨🇻' },
  { id: 'KSA', name: 'Saudi Arabia',          group: 'H', flag: '🇸🇦' },
  { id: 'URU', name: 'Uruguay',               group: 'H', flag: '🇺🇾' },
  // Group I
  { id: 'FRA', name: 'France',                group: 'I', flag: '🇫🇷' },
  { id: 'SEN', name: 'Senegal',               group: 'I', flag: '🇸🇳' },
  { id: 'IRQ', name: 'Iraq',                  group: 'I', flag: '🇮🇶' },
  { id: 'NOR', name: 'Norway',                group: 'I', flag: '🇳🇴' },
  // Group J
  { id: 'ARG', name: 'Argentina',             group: 'J', flag: '🇦🇷' },
  { id: 'ALG', name: 'Algeria',               group: 'J', flag: '🇩🇿' },
  { id: 'AUT', name: 'Austria',               group: 'J', flag: '🇦🇹' },
  { id: 'JOR', name: 'Jordan',                group: 'J', flag: '🇯🇴' },
  // Group K
  { id: 'POR', name: 'Portugal',              group: 'K', flag: '🇵🇹' },
  { id: 'COD', name: 'DR Congo',              group: 'K', flag: '🇨🇩' },
  { id: 'UZB', name: 'Uzbekistan',            group: 'K', flag: '🇺🇿' },
  { id: 'COL', name: 'Colombia',              group: 'K', flag: '🇨🇴' },
  // Group L
  { id: 'ENG', name: 'England',               group: 'L', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'CRO', name: 'Croatia',               group: 'L', flag: '🇭🇷' },
  { id: 'GHA', name: 'Ghana',                 group: 'L', flag: '🇬🇭' },
  { id: 'PAN', name: 'Panama',                group: 'L', flag: '🇵🇦' },
];

// ============================================================================
// GROUPS — 12 groups (A through L), 4 teams each
// ============================================================================

export const groups: { letter: string; teamIds: string[] }[] = [
  { letter: 'A', teamIds: ['MEX', 'RSA', 'KOR', 'CZE'] },
  { letter: 'B', teamIds: ['CAN', 'BIH', 'QAT', 'SUI'] },
  { letter: 'C', teamIds: ['BRA', 'MAR', 'HAI', 'SCO'] },
  { letter: 'D', teamIds: ['USA', 'PAR', 'AUS', 'TUR'] },
  { letter: 'E', teamIds: ['GER', 'CUW', 'CIV', 'ECU'] },
  { letter: 'F', teamIds: ['NED', 'JPN', 'SWE', 'TUN'] },
  { letter: 'G', teamIds: ['BEL', 'EGY', 'IRN', 'NZL'] },
  { letter: 'H', teamIds: ['ESP', 'CPV', 'KSA', 'URU'] },
  { letter: 'I', teamIds: ['FRA', 'SEN', 'IRQ', 'NOR'] },
  { letter: 'J', teamIds: ['ARG', 'ALG', 'AUT', 'JOR'] },
  { letter: 'K', teamIds: ['POR', 'COD', 'UZB', 'COL'] },
  { letter: 'L', teamIds: ['ENG', 'CRO', 'GHA', 'PAN'] },
];

// ============================================================================
// HELPER — generate group stage matches (round-robin, 6 matches per group)
//
// Standard FIFA group stage pattern:
//   Match 1: team[0] vs team[1]
//   Match 2: team[2] vs team[3]
//   Match 3: team[1] vs team[3]
//   Match 4: team[0] vs team[2]
//   Match 5: team[3] vs team[0]
//   Match 6: team[1] vs team[2]
// ============================================================================

function makeGroupMatches(groupLetter: string, teamIds: string[]): Match[] {
  const [t0, t1, t2, t3] = teamIds;
  return [
    { id: `g-${groupLetter.toLowerCase()}-1`, round: 'group', group: groupLetter, homeTeamId: t0, awayTeamId: t1 },
    { id: `g-${groupLetter.toLowerCase()}-2`, round: 'group', group: groupLetter, homeTeamId: t2, awayTeamId: t3 },
    { id: `g-${groupLetter.toLowerCase()}-3`, round: 'group', group: groupLetter, homeTeamId: t1, awayTeamId: t3 },
    { id: `g-${groupLetter.toLowerCase()}-4`, round: 'group', group: groupLetter, homeTeamId: t0, awayTeamId: t2 },
    { id: `g-${groupLetter.toLowerCase()}-5`, round: 'group', group: groupLetter, homeTeamId: t3, awayTeamId: t0 },
    { id: `g-${groupLetter.toLowerCase()}-6`, round: 'group', group: groupLetter, homeTeamId: t1, awayTeamId: t2 },
  ];
}

// ============================================================================
// GROUP MATCHES — all 72 group stage matches (6 per group × 12 groups)
// ============================================================================

export const groupMatches: Match[] = groups.flatMap(g =>
  makeGroupMatches(g.letter, g.teamIds)
);

// ============================================================================
// BRACKET ROUNDS — ordered list of knockout rounds
// ============================================================================

export const bracketRounds = ['r32', 'r16', 'qf', 'sf', '3rd', 'final'] as const;

// ============================================================================
// KNOCKOUT BRACKET TEMPLATE
//
// R32 pairings follow the 2026 FIFA format:
//   12 group winners + 12 runners-up + 8 best 3rd-placed teams → 32 teams
//   16 matches in Round of 32
//
// Each pairing defines the match ID and the two source slots.
// Sources use the format: { group: string, position: 'W' | 'RU' | '3rd' }
// For 3rd-place slots, the exact group is determined dynamically after
// the group stage based on which groups produce the best 3rd-placed teams.
// The "possibleGroups" array lists the candidate groups for each 3rd slot.
// ============================================================================

interface KnockoutSource {
  group: string;
  position: 'W' | 'RU';
}

interface ThirdPlaceSource {
  position: '3rd';
  possibleGroups: string[];
}

type R32Source = KnockoutSource | ThirdPlaceSource;

interface R32Pairing {
  matchId: string;
  home: R32Source;
  away: R32Source;
}

export const r32Pairings: R32Pairing[] = [
  // --- Left side of bracket (Path 1) ---
  { matchId: 'r32-1',  home: { group: 'A', position: 'W'  }, away: { position: '3rd', possibleGroups: ['C','D','E','F'] } },
  { matchId: 'r32-2',  home: { group: 'B', position: 'W'  }, away: { position: '3rd', possibleGroups: ['A','C','D','E','F'] } },
  { matchId: 'r32-3',  home: { group: 'C', position: 'W'  }, away: { position: '3rd', possibleGroups: ['A','B','D','E','F'] } },
  { matchId: 'r32-4',  home: { group: 'D', position: 'W'  }, away: { position: '3rd', possibleGroups: ['A','B','C','E','F'] } },
  { matchId: 'r32-5',  home: { group: 'E', position: 'W'  }, away: { position: '3rd', possibleGroups: ['A','B','C','D','F'] } },
  { matchId: 'r32-6',  home: { group: 'F', position: 'W'  }, away: { position: '3rd', possibleGroups: ['A','B','C','D','E'] } },
  { matchId: 'r32-7',  home: { group: 'A', position: 'RU' }, away: { group: 'B', position: 'RU' } },
  { matchId: 'r32-8',  home: { group: 'C', position: 'RU' }, away: { group: 'D', position: 'RU' } },
  // --- Right side of bracket (Path 2) ---
  { matchId: 'r32-9',  home: { group: 'G', position: 'W'  }, away: { position: '3rd', possibleGroups: ['H','I','J','K','L'] } },
  { matchId: 'r32-10', home: { group: 'H', position: 'W'  }, away: { position: '3rd', possibleGroups: ['G','I','J','K','L'] } },
  { matchId: 'r32-11', home: { group: 'I', position: 'W'  }, away: { position: '3rd', possibleGroups: ['G','H','J','K','L'] } },
  { matchId: 'r32-12', home: { group: 'J', position: 'W'  }, away: { position: '3rd', possibleGroups: ['G','H','I','K','L'] } },
  { matchId: 'r32-13', home: { group: 'K', position: 'W'  }, away: { position: '3rd', possibleGroups: ['G','H','I','J','L'] } },
  { matchId: 'r32-14', home: { group: 'L', position: 'W'  }, away: { position: '3rd', possibleGroups: ['G','H','I','J','K'] } },
  { matchId: 'r32-15', home: { group: 'E', position: 'RU' }, away: { group: 'F', position: 'RU' } },
  { matchId: 'r32-16', home: { group: 'G', position: 'RU' }, away: { group: 'H', position: 'RU' } },
];

// --- Round of 16 pairings (8 matches) ---
// Each R16 match takes winners from two specific R32 matches.
export const r16Pairings: { matchId: string; sourceMatchIds: [string, string] }[] = [
  { matchId: 'r16-1', sourceMatchIds: ['r32-1', 'r32-2'] },
  { matchId: 'r16-2', sourceMatchIds: ['r32-3', 'r32-4'] },
  { matchId: 'r16-3', sourceMatchIds: ['r32-5', 'r32-6'] },
  { matchId: 'r16-4', sourceMatchIds: ['r32-7', 'r32-8'] },
  { matchId: 'r16-5', sourceMatchIds: ['r32-9', 'r32-10'] },
  { matchId: 'r16-6', sourceMatchIds: ['r32-11', 'r32-12'] },
  { matchId: 'r16-7', sourceMatchIds: ['r32-13', 'r32-14'] },
  { matchId: 'r16-8', sourceMatchIds: ['r32-15', 'r32-16'] },
];

// --- Quarter-final pairings (4 matches) ---
export const qfPairings: { matchId: string; sourceMatchIds: [string, string] }[] = [
  { matchId: 'qf-1', sourceMatchIds: ['r16-1', 'r16-2'] },
  { matchId: 'qf-2', sourceMatchIds: ['r16-3', 'r16-4'] },
  { matchId: 'qf-3', sourceMatchIds: ['r16-5', 'r16-6'] },
  { matchId: 'qf-4', sourceMatchIds: ['r16-7', 'r16-8'] },
];

// --- Semi-final pairings (2 matches) ---
export const sfPairings: { matchId: string; sourceMatchIds: [string, string] }[] = [
  { matchId: 'sf-1', sourceMatchIds: ['qf-1', 'qf-2'] },
  { matchId: 'sf-2', sourceMatchIds: ['qf-3', 'qf-4'] },
];

// --- 3rd place match ---
export const thirdPlaceMatch: { matchId: string; sourceMatchIds: [string, string] } = {
  matchId: '3rd',
  sourceMatchIds: ['sf-1', 'sf-2'],
};

// --- Final ---
export const finalMatch: { matchId: string; sourceMatchIds: [string, string] } = {
  matchId: 'final',
  sourceMatchIds: ['sf-1', 'sf-2'],
};

// ============================================================================
// ALL KNOCKOUT MATCH IDs (in order, for iteration)
// ============================================================================

export const allKnockoutMatchIds: string[] = [
  ...r32Pairings.map(p => p.matchId),
  ...r16Pairings.map(p => p.matchId),
  ...qfPairings.map(p => p.matchId),
  ...sfPairings.map(p => p.matchId),
  thirdPlaceMatch.matchId,
  finalMatch.matchId,
];

// ============================================================================
// DEFAULT STANDINGS — all zeros, used as initial state
// ============================================================================

export function createDefaultStandings(teamId: string, position: number): Standing {
  return {
    position,
    teamId,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  };
}
