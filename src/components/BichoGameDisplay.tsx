import { useTranslation, Trans } from 'next-i18next/pages';
import { Fragment, useState } from 'react';
import { BichoGame, DiscordUser } from '../services/api/api.types';
import { BichoPlayerCard } from './BichoPlayerCard';
import { mapResultToAnimal } from '../services/bicho';

type BichoGameDisplayProps = {
  games: BichoGame[];
  users: DiscordUser[];
  locale: string;
};

const BichoGamesTable = ({ games, locale, users }: BichoGameDisplayProps): JSX.Element => {
  const { t } = useTranslation('bicho');

  const [expandedRow, setExpandedRow] = useState<null | number>(null);

  const toggleRow = (index: number): void => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <table className='min-w-full bg-secondary-bg border border-gray-300 mt-10'>
      <thead>
        <tr>
          <th className='py-2 px-4 sm:text-left border-b table-cell text-primary'>{t('game')}</th>
          <th className='py-2 px-4 sm:text-left border-b hidden sm:table-cell text-primary'>
            {t('date')}
          </th>
          <th className='py-2 px-4 sm:text-left border-b hidden sm:table-cell text-primary'>
            {t('winners')}
          </th>
          <th className='py-2 px-4 sm:text-left border-b hidden sm:table-cell text-primary'>
            {t('biggest-profit')}
          </th>
        </tr>
      </thead>
      <tbody>
        {games.map((game, index) => (
          <Fragment key={`bicho-game-${game.id}`}>
            <tr
              className={`${expandedRow === index ? 'bg-[#191919]' : ''} cursor-pointer`}
              onClick={() => toggleRow(index)}
            >
              <td className='py-2 sm:text-left text-center px-4 border-b table-cell text-white'>
                {t('game-id', { id: game.id })}
              </td>
              <td className='py-2 px-4 border-b hidden sm:table-cell text-describe'>
                {new Intl.DateTimeFormat(locale, {
                  timeZone: 'America/Sao_Paulo',
                  dateStyle: 'short',
                  timeStyle: 'short',
                }).format(game.date)}
              </td>
              <td className='py-2 px-4 border-b hidden sm:table-cell text-describe'>{`${
                game.players.filter((a) => a.didWin).length
              } / ${game.players.length}`}</td>
              <td className='py-2 px-4 border-b hidden sm:table-cell text-describe'>
                {game.players.reduce<string | number>(
                  (p, c) => (c.didWin ? (typeof p === 'string' || c.profit > p ? c.profit : p) : p),
                  '-',
                )}
                {game.players.filter((a) => a.didWin).length > 0 ? '⭐' : ''}
              </td>
            </tr>
            {expandedRow === index && (
              <tr
                className='cursor-pointer w-full max-w-screen-md h-full overflow-auto'
                onClick={() => toggleRow(index)}
              >
                <td colSpan={4} className='p-4 bg-[#191919] text-white'>
                  <div className='flex flex-col gap-6 sm:flex-row sm:justify-between'>
                    <div className='bg-secondary rounded-lg p-2'>
                      <p>
                        {t('ended-in', {
                          date: new Intl.DateTimeFormat(locale, {
                            timeZone: 'America/Sao_Paulo',
                            dateStyle: 'short',
                            timeStyle: 'short',
                          }).format(game.date),
                        })}
                      </p>
                      <p>
                        {game.players.length > 0 ? (
                          <Trans
                            i18nKey={'winners-info'}
                            t={t}
                            values={{
                              players: game.players.length,
                              winners: game.players.filter((a) => a.didWin).length,
                            }}
                            components={[
                              <span className='text-primary' key='0' />,
                              <span className='text-primary' key='1' />,
                              <span className='text-primary' key='2' />,
                            ]}
                          />
                        ) : (
                          t('no-players')
                        )}
                      </p>
                      <p>{t('results')}:</p>
                      {game.results.map((a, i) => (
                        <div key={`resultados-${i}`}>
                          {`${i + 1}) `}
                          <span className='text-primary'>{`${a.join('')} [${t(
                            `bichos.${mapResultToAnimal(a)}`,
                          )}]`}</span>
                        </div>
                      ))}
                    </div>
                    {game.players.length > 0 && (
                      <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                        {game.players.map((a) => (
                          <BichoPlayerCard
                            t={t}
                            player={a}
                            user={users.find((b) => b.id === a.id)!}
                            key={`bicho-player-card-${a.id}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default BichoGamesTable;
