import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation, Trans } from 'next-i18next';
import { SectionDivider } from '../components/common/SectionDivider';
import Layout from '../components/PageLayout';
import { FaDiscord } from 'react-icons/fa';

type Props = {
  locale: string;
};

const storyChapters = [
  'world-of-boleham',
  'the-elemental-dragons',
  'born-of-all-creatures',
  'the-draconic-church',
  'the-fall-of-gods',
  'menhera-summon',
  'the-find-of-babel-dungeon',
  'the-guild',
  'the-start-of-chaos',
];

const CommandPage = (): JSX.Element => {
  const { t } = useTranslation('boleham');

  return (
    <Layout page='boleham'>
      <main className='mx-auto max-w-7xl px-6 mb-10'>
        <SectionDivider title={t('boleham')} withoutSpace className='my-6' />
        <h1 className='text-white font-bold text-3xl md:text-4xl mb-3'>
          {t('title')}
          <span className='text-primary'>{' :3'}</span>
        </h1>
        <p className='text-describe text-xl mb-10'>{t('description')}</p>
        <div className='flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 text-white'>
          <aside className='w-full md:w-1/4 p-4 bg-secondary-bg rounded-md'>
            <h2 className='mb-4 text-xl font-bold'>{t('chapters')}</h2>
            <ul className='space-y-2'>
              {storyChapters.map((chapter) => (
                <li key={chapter}>
                  <a className='block p-2 bg-primary rounded-md' href={`#${chapter}`}>
                    {t(`chapters-title.${chapter}`)}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <section className='w-full md:w-3/4 p-4 bg-secondary-bg rounded-md text-white'>
            {storyChapters.map((chapter) => (
              <article key={chapter} id={chapter}>
                <h3 className='mb-4 text-2xl font-bold'>{t(`chapters-title.${chapter}`)}</h3>
                <p className='mb-4'>
                  <Trans
                    t={t}
                    i18nKey={`chapters-text.${chapter}`}
                    components={{
                      nature: <span className='text-green-500' />,
                      water: <span className='text-blue-500' />,
                      fire: <span className='text-red-600' />,
                      ice: <span className='text-blue-200' />,
                      air: <span className='text-gray-400' />,
                      earth: <span className='text-amber-700' />,
                      lightning: <span className='text-yellow-500' />,
                      darkness: <span className='text-primary' />,
                      light: <span className='text-yellow-200' />,
                    }}
                  />
                </p>
              </article>
            ))}
            <p className='flex justify-end items-center'>
              {t('credits')}
              <FaDiscord className='ml-2' />
              mareys
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  return {
    props: {
      locale: locale as string,
      ...(await serverSideTranslations(locale as string, ['boleham', 'header', 'footer'])),
    },
    revalidate: 86400,
  };
};

export default CommandPage;
