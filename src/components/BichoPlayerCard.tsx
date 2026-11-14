import { TFunction } from 'next-i18next/pages';
import { BichoGame, DiscordUser } from '../services/api/api.types';
import { optionBetToText } from '../services/bicho';
import { Avatar } from './Avatar';

const BichoPlayerCard = ({
  player,
  t,
  user,
}: {
  player: BichoGame['players'][number];
  user: DiscordUser;
  t: TFunction;
}): JSX.Element => {
  const won = player.didWin;
  return (
    <div className={`${won ? 'bg-primary' : 'bg-secondary'} p-2 rounded-md`}>
      <div className='flex gap-2 items-center mb-4'>
        {user.found && <Avatar src={user.avatar} />}
        <p className='text-white'>
          {user.found ? (user.displayName ?? `@${user.username}`) : `ID: ${player.id}`}
        </p>
      </div>
      <p className='text-white'>
        {t(won ? 'profit' : 'bet', {
          bet: player.bet,
          profit: player.profit,
        })}
      </p>
      <p className='text-white'>{t('choice', { option: optionBetToText(player.option, t) })}</p>
    </div>
  );
};

export { BichoPlayerCard };
