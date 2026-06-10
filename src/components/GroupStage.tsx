import { useState } from 'react';
import { usePredictions } from '../context/PredictionsContext';
import { useI18n } from '../context/I18nContext';
import { groups, groupMatches } from '../data/worldcup-2026';
import { calculateGroupStandings, areAllGroupMatchesPredicted } from '../utils/standings';
import GroupTable from './GroupTable';
import MatchCard from './MatchCard';

export default function GroupStage() {
  const { predictions } = usePredictions();
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState(groups[0]?.letter || 'A');
  const [view, setView] = useState<'matches' | 'table'>('matches');

  const standings = calculateGroupStandings(predictions);
  const allPredicted = areAllGroupMatchesPredicted(predictions);

  const currentMatches = groupMatches.filter(m => m.group === activeTab);
  const currentStandings = standings[activeTab] || [];

  return (
    <div>
      {/* Group selector tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {groups.map(g => (
          <button
            key={g.letter}
            onClick={() => setActiveTab(g.letter)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === g.letter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t('group.group')} {g.letter}
          </button>
        ))}
      </div>

      {/* View toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView('matches')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            view === 'matches'
              ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          {t('group.matches')}
        </button>
        <button
          onClick={() => setView('table')}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            view === 'table'
              ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          {t('group.table')}
        </button>
      </div>

      {/* Content */}
      {view === 'matches' ? (
        <div className="space-y-3">
          {currentMatches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        currentStandings.length > 0 && (
          <GroupTable standings={currentStandings} groupLetter={activeTab} />
        )
      )}

      {/* Progress indicator */}
      <div className="mt-6 text-center">
        {allPredicted ? (
          <p className="text-green-600 dark:text-green-400 font-medium">
            {t('status.all.predicted')} ✓
          </p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {t('status.missing', { n: groupMatches.length - Object.keys(predictions).filter(k => groupMatches.some(m => m.id === k)).length })}
          </p>
        )}
      </div>
    </div>
  );
}
