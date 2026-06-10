import { useMemo, useState } from 'react';
import { KnockoutMatch } from '../types';
import { teams } from '../data/worldcup-2026';
import { usePredictions } from '../context/PredictionsContext';
import { useI18n } from '../context/I18nContext';
import { resolveFullBracket, getMatchesByRound } from '../utils/bracket';
import BracketMatch from './BracketMatch';

const ROUND_ORDER = ['r32', 'r16', 'qf', 'sf', '3rd', 'final'] as const;
const ROUND_LABELS: Record<string, string> = {
  r32: 'knockout.r32',
  r16: 'knockout.r16',
  qf: 'knockout.qf',
  sf: 'knockout.sf',
  '3rd': 'knockout.third',
  final: 'knockout.final',
};

export default function KnockoutBracket() {
  const { predictions } = usePredictions();
  const { t } = useI18n();
  const [activeRound, setActiveRound] = useState<number>(0);

  const bracket = useMemo(() => resolveFullBracket(predictions), [predictions]);

  // Group matches by round
  const roundMatches = useMemo(() => {
    const map: Record<string, KnockoutMatch[]> = {};
    for (const round of ROUND_ORDER) {
      map[round] = getMatchesByRound(bracket, round);
    }
    return map;
  }, [bracket]);

  const currentRound = ROUND_ORDER[activeRound];
  const currentMatches = roundMatches[currentRound] || [];

  // Find champion
  const finalMatch = bracket.find(m => m.matchId === 'final');
  const champion = finalMatch?.winner
    ? teams.find(t => t.id === finalMatch.winner)
    : null;

  return (
    <div>
      {/* Round navigation */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {ROUND_ORDER.map((round, i) => (
          <button
            key={round}
            onClick={() => setActiveRound(i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeRound === i
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t(ROUND_LABELS[round])}
            {i < ROUND_ORDER.length - 1 && (
              <span className="ml-1 text-xs opacity-60">({roundMatches[round]?.length || 0})</span>
            )}
          </button>
        ))}
      </div>

      {/* Matches for current round */}
      <div className="space-y-3">
        {currentMatches.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 py-8">
            {t('status.missing', { n: 0 })}
          </p>
        ) : (
          currentMatches.map(match => (
            <BracketMatch
              key={match.matchId}
              match={match}
              matchId={match.matchId}
            />
          ))
        )}
      </div>

      {/* Champion display */}
      {champion && (
        <div className="mt-8 text-center p-6 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-700">
          <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium mb-1">
            {t('knockout.champion')}
          </p>
          <p className="text-3xl">
            {champion.flag} <span className="font-bold text-gray-900 dark:text-white">{champion.name}</span>
          </p>
        </div>
      )}
    </div>
  );
}
