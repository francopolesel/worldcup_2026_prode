import type { PredictionsState, KnockoutMatch } from '../types';
import {
  r32Pairings,
  r16Pairings,
  qfPairings,
  sfPairings,
  thirdPlaceMatch,
  finalMatch,
  teams,
} from '../data/worldcup-2026';
import { calculateGroupStandings, getBestThirdPlaced } from './standings';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a lookup: group letter → winner team ID */
function buildPositionMap(
  standings: Record<string, ReturnType<typeof calculateGroupStandings>[string]>,
  position: number,
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const [group, groupStanding] of Object.entries(standings)) {
    if (groupStanding.length >= position) {
      map[group] = groupStanding[position - 1].teamId;
    }
  }
  return map;
}

/**
 * Type guard: is this a group-based source (winner or runner-up)?
 * Uses a permissive parameter type to accept both KnockoutSource and ThirdPlaceSource.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGroupSource(src: any): src is { group: string; position: 'W' | 'RU' } {
  return src && typeof src === 'object' && 'group' in src && (src.position === 'W' || src.position === 'RU');
}

/**
 * Assign third-placed teams to R32 slots using a greedy algorithm.
 *
 * Each third-place slot lists possibleGroups (the groups whose 3rd-placed
 * team could land here).  We walk the slots in order and pick the
 * highest-ranked available 3rd-placed team that is eligible for the slot.
 */
function assignThirdPlaceSlots(
  bestThirds: { teamId: string; group: string }[],
  pairings: typeof r32Pairings,
): Record<string, string | null> {
  // Build a set of available 3rd-place teams (ranked best → worst).
  const available = bestThirds.map(t => t.teamId);
  const groupOf = Object.fromEntries(bestThirds.map(t => [t.teamId, t.group]));
  const assignments: Record<string, string | null> = {};

  for (const pairing of pairings) {
    for (const side of ['home', 'away'] as const) {
      const src = pairing[side];
      // Only handle third-place sources
      if (isGroupSource(src)) continue;

      // ThirdPlaceSource: find a qualified team whose group is in possibleGroups
      const possible = (src as { possibleGroups: string[] }).possibleGroups;
      let assigned: string | null = null;

      for (let i = 0; i < available.length; i++) {
        if (possible.includes(groupOf[available[i]])) {
          assigned = available.splice(i, 1)[0]; // remove from pool
          break;
        }
      }

      assignments[`${pairing.matchId}:${side}`] = assigned;
    }
  }

  return assignments;
}

/**
 * Derive the loser of a resolved knockout match.
 * Returns null if the match hasn't been resolved yet.
 */
function getLoser(match: KnockoutMatch | undefined): string | null {
  if (!match || match.winner === null) return null;
  if (!match.homeTeamId || !match.awayTeamId) return null;
  return match.winner === match.homeTeamId ? match.awayTeamId : match.homeTeamId;
}

// ---------------------------------------------------------------------------
// R32 resolution
// ---------------------------------------------------------------------------

/**
 * Resolve the Round of 32 matchups from group predictions.
 *
 * Returns a map: matchId → { homeTeamId, awayTeamId }
 * Team IDs are null when the group stage is incomplete.
 */
export function resolveR32Matchups(
  predictions: PredictionsState,
): Record<string, { homeTeamId: string | null; awayTeamId: string | null }> {
  const standings = calculateGroupStandings(predictions);

  // Top 2 per group
  const groupWinners = buildPositionMap(standings, 1);
  const groupRunnersUp = buildPositionMap(standings, 2);

  // Best 8 third-placed teams
  const allThirds = getBestThirdPlaced(standings);
  const bestThirds = allThirds.slice(0, 8).map(s => ({
    teamId: s.teamId,
    group: teamGroupMap[s.teamId],
  }));

  const thirdAssignments = assignThirdPlaceSlots(bestThirds, r32Pairings);

  const matchups: Record<string, { homeTeamId: string | null; awayTeamId: string | null }> = {};

  for (const pairing of r32Pairings) {
    const resolveSide = (side: 'home' | 'away'): string | null => {
      const src = pairing[side];
      if (isGroupSource(src)) {
        const map = src.position === 'W' ? groupWinners : groupRunnersUp;
        return map[src.group] ?? null;
      }
      return thirdAssignments[`${pairing.matchId}:${side}`] ?? null;
    };

    matchups[pairing.matchId] = {
      homeTeamId: resolveSide('home'),
      awayTeamId: resolveSide('away'),
    };
  }

  return matchups;
}

/** teamId → group letter lookup built from the imported teams array */
const teamGroupMap: Record<string, string> = Object.fromEntries(
  teams.map(t => [t.id, t.group]),
);

// ---------------------------------------------------------------------------
// Full bracket
// ---------------------------------------------------------------------------

/**
 * Resolve a single knockout match node.
 */
function resolveMatch(
  matchId: string,
  homeTeamId: string | null,
  awayTeamId: string | null,
  predictions: PredictionsState,
): KnockoutMatch {
  const pred = predictions[matchId];
  let homeScore: number | null = null;
  let awayScore: number | null = null;
  let penaltyWinner: string | null = null;
  let winner: string | null = null;

  if (pred && homeTeamId && awayTeamId) {
    homeScore = pred.homeScore;
    awayScore = pred.awayScore;

    if (pred.homeScore !== pred.awayScore) {
      winner = pred.homeScore > pred.awayScore ? homeTeamId : awayTeamId;
    } else if (pred.penaltyWinner) {
      penaltyWinner = pred.penaltyWinner;
      winner = pred.penaltyWinner;
    }
  }

  return { matchId, homeTeamId, awayTeamId, homeScore, awayScore, penaltyWinner, winner };
}

/**
 * Resolve the full knockout bracket from predictions.
 *
 * Returns all knockout matches in bracket order:
 * R32 → R16 → QF → SF → 3rd Place → Final
 */
export function resolveFullBracket(predictions: PredictionsState): KnockoutMatch[] {
  const allMatches: KnockoutMatch[] = [];
  const r32Matchups = resolveR32Matchups(predictions);

  // --- R32 ---
  for (const pairing of r32Pairings) {
    const matchup = r32Matchups[pairing.matchId];
    allMatches.push(
      resolveMatch(pairing.matchId, matchup?.homeTeamId ?? null, matchup?.awayTeamId ?? null, predictions),
    );
  }

  // Helper: find winner of a match already in the bracket
  const getWinner = (matchId: string): string | null =>
    allMatches.find(m => m.matchId === matchId)?.winner ?? null;

  // --- R16 ---
  for (const pairing of r16Pairings) {
    const [m1, m2] = pairing.sourceMatchIds;
    allMatches.push(resolveMatch(pairing.matchId, getWinner(m1), getWinner(m2), predictions));
  }

  // --- QF ---
  for (const pairing of qfPairings) {
    const [m1, m2] = pairing.sourceMatchIds;
    allMatches.push(resolveMatch(pairing.matchId, getWinner(m1), getWinner(m2), predictions));
  }

  // --- SF ---
  for (const pairing of sfPairings) {
    const [m1, m2] = pairing.sourceMatchIds;
    allMatches.push(resolveMatch(pairing.matchId, getWinner(m1), getWinner(m2), predictions));
  }

  // --- 3rd Place (losers of both semi-finals) ---
  const sfLoser1 = getLoser(allMatches.find(m => m.matchId === 'sf-1'));
  const sfLoser2 = getLoser(allMatches.find(m => m.matchId === 'sf-2'));
  allMatches.push(resolveMatch(thirdPlaceMatch.matchId, sfLoser1, sfLoser2, predictions));

  // --- Final (winners of both semi-finals) ---
  const [sf1, sf2] = finalMatch.sourceMatchIds;
  allMatches.push(resolveMatch(finalMatch.matchId, getWinner(sf1), getWinner(sf2), predictions));

  return allMatches;
}

/**
 * Filter matches by bracket round.
 */
export function getMatchesByRound(allMatches: KnockoutMatch[], round: string): KnockoutMatch[] {
  return allMatches.filter(m => {
    if (round === 'r32') return m.matchId.startsWith('r32');
    if (round === 'r16') return m.matchId.startsWith('r16');
    if (round === 'qf') return m.matchId.startsWith('qf');
    if (round === 'sf') return m.matchId.startsWith('sf');
    if (round === '3rd') return m.matchId === '3rd';
    if (round === 'final') return m.matchId === 'final';
    return false;
  });
}
