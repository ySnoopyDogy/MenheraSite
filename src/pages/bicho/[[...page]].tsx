import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths, GetStaticProps } from 'next';
import { SectionDivider } from '../../components/common/SectionDivider';
import Layout from '../../components/PageLayout';
import { getBichoGames, getUsers } from '../../services/api/api';
import { BichoGame, DiscordUser } from '../../services/api/api.types';
import BichoGameDisplay from '../../components/BichoGameDisplay';
import { Button } from '../../components/common/Button';
import { useRouter } from 'next/router';

const BICHO_HOURS_DURATION = 5;
const INITIAL_BICHO_PAGE = 1;

type Props = {
  games: BichoGame[];
  users: DiscordUser[];
  page: number;
  locale: string;
};

const BichoPage = (props: Props): JSX.Element => {
  const { t } = useTranslation('bicho');

  const router = useRouter();

  const changePage = async (toSum: number) => {
    const currentPage = Number(props.page);
    const nextPage = currentPage + toSum;
    if (nextPage < 1) return;
    if (nextPage > currentPage && props.games.length < 10) return;

    router.push(`/bicho/${nextPage}`);
  };

  return (
    <Layout page='bicho'>
      <main className='container p-6 mx-auto max-w-7xl  mb-10'>
        <SectionDivider title={t('bicho')} withoutSpace className='mb-10' />
        <h1 className='text-white font-bold text-3xl md:text-4xl mb-3'>
          {t('title')}
          <span className='text-primary'>{' >,...,<'}</span>
        </h1>
        <p className='text-describe text-xl'>{t('description', { time: BICHO_HOURS_DURATION })}</p>
        {props.games.length > 0 ? (
          <BichoGameDisplay users={props.users} games={props.games} locale={props.locale} />
        ) : (
          <div className='bg-secondary-bg rounded-2xl my-11 py-11 px-4 mb-6 flex-1'>
            <p className='text-describe text-xl'>{t('no-games', { page: props.page })}</p>
          </div>
        )}
        <div className='mt-6 flex justify-between'>
          <Button
            onClick={() => changePage(-1)}
            isDisabled={props.page <= 1}
            className={`text-white`}
          >
            {t('prev-page')}
          </Button>
          <Button
            onClick={() => changePage(1)}
            isDisabled={props.games.length < 10}
            className='text-white'
          >
            {t('next-page')}
          </Button>
        </div>
      </main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { page: ['1'] } }, { params: { page: ['2'] } }],
    fallback: 'blocking',
  };
};

// @ts-expect-error Ele diz umas coisas estranhas aqui
export const getStaticProps: GetStaticProps = async ({ locale, params = {} }) => {
  const page = params.page ?? INITIAL_BICHO_PAGE;

  if (Number(page) < 1) return { redirect: { destination: '/bicho' } };

  const games = await getBichoGames(Number(page));
  const users = await getUsers(
    Array.from(new Set(games.flatMap((a) => a.players.map((b) => b.id)))),
  );

  const lastGameAt = Date.now() - (games[0]?.date ?? Date.now());

  const toRevalidate =
    lastGameAt > 3600
      ? 3600
      : BICHO_HOURS_DURATION * 3600 -
        Math.floor((Date.now() - (games[0]?.date ?? Date.now())) / 1000);

  return {
    props: {
      games,
      page,
      users,
      locale: locale ?? 'pt-BR',
      ...(await serverSideTranslations(locale ?? 'pt-BR', ['bicho', 'header', 'footer'])),
    },
    revalidate: toRevalidate - 5 > 2 ? toRevalidate - 5 : 2,
  };
};

export default BichoPage;
