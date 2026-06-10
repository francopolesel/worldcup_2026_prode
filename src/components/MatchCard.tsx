import { Match, Prediction } from '../types';
import { teams } from '../data/worldcup-2026';
import { usePredictions } from '../context/PredictionsContext';
import { useI18n } from '../context/I18nContext';

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const { getPrediction, setPrediction } = usePredictions();
  const { t } = useI18n();
  
  const home = teams.find(t => t.id === match.homeTeamId);
  const away = teams.find(t => t.id === match.awayTeamId);
  const pred = getPrediction(match.id);
  
  const isKnockout = match.round !== 'group';
  const isDraw = pred && pred.homeScore === pred.awayScore;
  const showPenalty = isKnockout && isDraw;

  const handleScoreChange = (side: 'home' | 'away', value: string) => {
    const score = value === '' ? 0 : Math.max(0, parseInt(value) || 0);
    const current = pred || { homeScore: 0, awayScore: 0 };
    const updated: Prediction = {
      homeScore: side === 'home' ? score : current.homeScore,
      awayScore: side === 'away' ? score : current.awayScore,
      penaltyWinner: current.penaltyWinner,
    };
    // If scores are no longer a draw, clear penalty winner
    if (updated.homeScore !== updated.awayScore) {
      delete updated.penaltyWinner;
    }
    setPrediction(match.id, updated);
  };

  const handlePenaltyWinner = (teamId: string) => {
    const current = pred || { homeScore: 0, awayScore: 0 };
    setPrediction(match.id, { ...current, penaltyWinner: teamId });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-3">
        {/* Home team */}
        <div className="flex-1 text-right">
          <span className="text-2xl mr-1">{home?.flag}</span>
          <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
            {home?.name}
          </span>
        </div>

        {/* Score inputs */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="20"
            value={pred?.homeScore ?? ''}
            onChange={e => handleScoreChange('home', e.target.value)}
            className="w-14 h-12 text-center text-xl font-bold rounded-lg border border-gray-300 dark:border-gray-600
                      bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-gray-400 dark:text-gray-500 font-bold text-lg">-</span>
          <input
            type="number"
            min="0"
            max="20"
            value={pred?.awayScore ?? ''}
            onChange={e => handleScoreChange('away', e.target.value)}
            className="w-14 h-12 text-center text-xl font-bold rounded-lg border border-gray-300 dark:border-gray-600
                      bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* Away team */}
        <div className="flex-1 text-left">
          <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
            {away?.name}
          </span>
          <span className="text-2xl ml-1">{away?.flag}</span>
        </div>
      </div>

      {/* Penalty picker */}
      {showPenalty && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">
            {t('match.penalty.winner')}
          </p>
          <div className="flex gap-2 justify-center">
            {[match.homeTeamId, match.awayTeamId].map(teamId => {
              const team = teams.find(t => t.id === teamId);
              const selected = pred?.penaltyWinner === teamId;
              return (
                <button
                  key={teamId}
                  onClick={() => handlePenaltyWinner(teamId)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selected
                      ? 'bg-yellow-500 text-white ring-2 ring-yellow-400 ring-offset-2 dark:ring-offset-gray-800'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {team?.flag} {team?.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
