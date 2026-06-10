import { KnockoutMatch as KnockoutMatchType } from '../types';
import { teams } from '../data/worldcup-2026';
import { usePredictions } from '../context/PredictionsContext';
import { useI18n } from '../context/I18nContext';

interface BracketMatchProps {
  match: KnockoutMatchType;
  matchId: string;
}

export default function BracketMatch({ match, matchId }: BracketMatchProps) {
  const { setPrediction, getPrediction } = usePredictions();
  const { t } = useI18n();

  const pred = getPrediction(matchId);
  const homeTeam = match.homeTeamId ? teams.find(t => t.id === match.homeTeamId) : null;
  const awayTeam = match.awayTeamId ? teams.find(t => t.id === match.awayTeamId) : null;
  const isDraw = pred && pred.homeScore === pred.awayScore;

  const handleScore = (side: 'home' | 'away', value: string) => {
    const score = value === '' ? 0 : Math.max(0, parseInt(value) || 0);
    const current = pred || { homeScore: 0, awayScore: 0 };
    const updated = {
      homeScore: side === 'home' ? score : current.homeScore,
      awayScore: side === 'away' ? score : current.awayScore,
      penaltyWinner: current.penaltyWinner,
    };
    if (updated.homeScore !== updated.awayScore) {
      delete updated.penaltyWinner;
    }
    setPrediction(matchId, updated);
  };

  const handlePenalty = (teamId: string) => {
    const current = pred || { homeScore: 0, awayScore: 0 };
    setPrediction(matchId, { ...current, penaltyWinner: teamId });
  };

  const isHomeWinner = match.winner && match.winner === match.homeTeamId;
  const isAwayWinner = match.winner && match.winner === match.awayTeamId;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2.5 w-full sm:min-w-[220px] shadow-sm">
      {/* Home team */}
      <div className={`flex items-center justify-between py-1 ${isHomeWinner ? 'bg-green-50 dark:bg-green-900/20 -mx-2.5 px-2.5 rounded-t-lg' : ''}`}>
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          {match.homeTeamId ? (
            <>
              <span className="text-base">{homeTeam?.flag}</span>
              <span className={`text-sm truncate ${isHomeWinner ? 'font-bold text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                {homeTeam?.name || match.homeTeamId}
              </span>
            </>
          ) : (
            <span className="text-xs text-gray-400 italic">{t('knockout.pending')}</span>
          )}
        </div>
        <input
          type="number"
          min="0"
          max="20"
          value={pred?.homeScore ?? ''}
          onChange={e => handleScore('home', e.target.value)}
          disabled={!match.homeTeamId}
          className="w-10 h-8 text-center text-sm font-bold rounded border border-gray-200 dark:border-gray-600
                     bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     disabled:opacity-30 disabled:cursor-not-allowed
                     focus:ring-1 focus:ring-blue-500 outline-none
                     [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      {/* Separator */}
      <div className="border-t border-gray-100 dark:border-gray-700 my-1" />

      {/* Away team */}
      <div className={`flex items-center justify-between py-1 ${isAwayWinner ? 'bg-green-50 dark:bg-green-900/20 -mx-2.5 px-2.5 rounded-b-lg' : ''}`}>
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          {match.awayTeamId ? (
            <>
              <span className="text-base">{awayTeam?.flag}</span>
              <span className={`text-sm truncate ${isAwayWinner ? 'font-bold text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                {awayTeam?.name || match.awayTeamId}
              </span>
            </>
          ) : (
            <span className="text-xs text-gray-400 italic">{t('knockout.pending')}</span>
          )}
        </div>
        <input
          type="number"
          min="0"
          max="20"
          value={pred?.awayScore ?? ''}
          onChange={e => handleScore('away', e.target.value)}
          disabled={!match.awayTeamId}
          className="w-10 h-8 text-center text-sm font-bold rounded border border-gray-200 dark:border-gray-600
                     bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     disabled:opacity-30 disabled:cursor-not-allowed
                     focus:ring-1 focus:ring-blue-500 outline-none
                     [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      {/* Penalty winner selection */}
      {isDraw && match.homeTeamId && match.awayTeamId && (
        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <p className="text-[10px] text-gray-400 mb-1.5 text-center">{t('match.select.winner')}</p>
          <div className="flex gap-1">
            {[match.homeTeamId, match.awayTeamId].map(tid => {
              const team = teams.find(t => t.id === tid);
              const selected = pred?.penaltyWinner === tid;
              return (
                <button
                  key={tid}
                  onClick={() => handlePenalty(tid)}
                  className={`flex-1 py-1 rounded text-xs font-medium transition-all ${
                    selected
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {team?.flag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Penalty indicator when resolved */}
      {match.penaltyWinner && !isDraw && (
        <div className="mt-1 text-center">
          <span className="text-[10px] text-yellow-600 dark:text-yellow-400 font-medium">
            {teams.find(t => t.id === match.penaltyWinner)?.flag} {t('match.penalties')} ✓
          </span>
        </div>
      )}
    </div>
  );
}
