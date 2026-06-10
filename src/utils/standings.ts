import type { PredictionsState, Standing } from '../types';
import { groupMatches, teams } from '../data/worldcup-2026';

/**
 * Calculate group standings from predictions.
 * Returns a map: group letter → Standing[] (sorted, with positions assigned).
 */
export function calculateGroupStandings(predictions: PredictionsState): Record<string, Standing[]> {
  const groupStandings: Record<string, Record<string, Standing>> = {};

  // Initialize all teams with zero stats
  for (const team of teams) {
    if (!groupStandings[team.group]) {
      groupStandings[team.group] = {};
    }
    groupStandings[team.group][team.id] = {
      position: 0,
      teamId: team.id,
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

  // Process group match predictions
  for (const match of groupMatches) {
    const pred = predictions[match.id];
    if (!pred) continue;

    const home = groupStandings[match.group!]?.[match.homeTeamId];
    const away = groupStandings[match.group!]?.[match.awayTeamId];
    if (!home || !away) continue;

    home.played++;
    away.played++;
    home.goalsFor += pred.homeScore;
    home.goalsAgainst += pred.awayScore;
    away.goalsFor += pred.awayScore;
    away.goalsAgainst += pred.homeScore;

    if (pred.homeScore > pred.awayScore) {
      home.won++;
      home.points += 3;
      away.lost++;
    } else if (pred.homeScore < pred.awayScore) {
      away.won++;
      away.points += 3;
      home.lost++;
    } else {
      home.drawn++;
      away.drawn++;
      home.points++;
      away.points++;
    }
  }

  // Calculate goal differences and sort each group
  const result: Record<string, Standing[]> = {};
  for (const [group, teamMap] of Object.entries(groupStandings)) {
    const standings = Object.values(teamMap).map(t => ({
      ...t,
      goalDifference: t.goalsFor - t.goalsAgainst,
    }));

    // Sort: points DESC → goalDiff DESC → goalsFor DESC → teamId ASC (stable tie-breaker)
    standings.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.teamId.localeCompare(b.teamId);
    });

    // Assign positions
    standings.forEach((s, i) => {
      s.position = i + 1;
    });

    result[group] = standings;
  }

  return result;
}

/**
 * Get the top 2 teams from a group's standings.
 */
export function getTopTwo(standings: Standing[]): [Standing, Standing] {
  return [standings[0], standings[1]];
}

/**
 * Get the 3rd-placed teams sorted across ALL groups for best 3rd-place qualification.
 * Returns all third-placed teams ranked by points → GD → GF → teamId.
 * The top 8 qualify for the knockout stage.
 */
export function getBestThirdPlaced(standings: Record<string, Standing[]>): Standing[] {
  const thirds: Standing[] = [];
  for (const groupStanding of Object.values(standings)) {
    if (groupStanding.length >= 3) {
      thirds.push({ ...groupStanding[2] });
    }
  }

  // Sort all third-placed teams by points, GD, GF
  thirds.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.teamId.localeCompare(b.teamId);
  });

  return thirds; // top 8 qualify; the rest are eliminated
}

/**
 * Check if all group matches have predictions.
 */
export function areAllGroupMatchesPredicted(predictions: PredictionsState): boolean {
  return groupMatches.every(m => predictions[m.id] !== undefined);
}
