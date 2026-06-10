import { Standing } from '../types';
import { teams } from '../data/worldcup-2026';
import { useI18n } from '../context/I18nContext';

interface GroupTableProps {
  standings: Standing[];
  groupLetter: string;
}

export default function GroupTable({ standings, groupLetter }: GroupTableProps) {
  const { t } = useI18n();

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
        {t('group.group')} {groupLetter}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              <th className="py-2 px-1 text-left w-8">{t('table.pos')}</th>
              <th className="py-2 px-2 text-left">{t('table.team')}</th>
              <th className="py-2 px-1 text-center w-8">{t('table.pld')}</th>
              <th className="py-2 px-1 text-center w-8">{t('table.w')}</th>
              <th className="py-2 px-1 text-center w-8">{t('table.d')}</th>
              <th className="py-2 px-1 text-center w-8">{t('table.l')}</th>
              <th className="py-2 px-1 text-center w-8">{t('table.gf')}</th>
              <th className="py-2 px-1 text-center w-8">{t('table.ga')}</th>
              <th className="py-2 px-1 text-center w-8">{t('table.gd')}</th>
              <th className="py-2 px-2 text-center w-10 font-bold">{t('table.pts')}</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s) => {
              const team = teams.find(t => t.id === s.teamId);
              const isTopTwo = s.position <= 2;
              return (
                <tr
                  key={s.teamId}
                  className={`border-b border-gray-100 dark:border-gray-700/50 ${
                    isTopTwo
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : s.position === 3
                      ? 'bg-yellow-50 dark:bg-yellow-900/10'
                      : ''
                  }`}
                >
                  <td className="py-2 px-1 text-left font-medium text-gray-600 dark:text-gray-400">
                    {s.position}
                  </td>
                  <td className="py-2 px-2 text-left">
                    <span className="mr-1">{team?.flag}</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {team?.name}
                    </span>
                  </td>
                  <td className="py-2 px-1 text-center text-gray-600 dark:text-gray-400">{s.played}</td>
                  <td className="py-2 px-1 text-center text-green-600 dark:text-green-400">{s.won}</td>
                  <td className="py-2 px-1 text-center text-gray-600 dark:text-gray-400">{s.drawn}</td>
                  <td className="py-2 px-1 text-center text-red-500 dark:text-red-400">{s.lost}</td>
                  <td className="py-2 px-1 text-center text-gray-600 dark:text-gray-400">{s.goalsFor}</td>
                  <td className="py-2 px-1 text-center text-gray-600 dark:text-gray-400">{s.goalsAgainst}</td>
                  <td className="py-2 px-1 text-center font-medium text-gray-700 dark:text-gray-300">
                    {s.goalDifference > 0 ? '+' : ''}{s.goalDifference}
                  </td>
                  <td className="py-2 px-2 text-center font-bold text-gray-900 dark:text-gray-100">
                    {s.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
