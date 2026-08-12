import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/PageLayout';

const LegalPage = (): JSX.Element => {
  const { t, i18n } = useTranslation('legal');

  return (
    <Layout page='legal'>
      <main className='container p-6 mx-auto max-w-7xl'>
        <div>
          <h1 id='privacy' className='text-white font-bold text-3xl md:text-4x'>
            {t('privacy.title')}
          </h1>
          <small className='text-white'>
            {t('last-change', {
              date: new Date('2022-06-27').toLocaleDateString(i18n.language, {
                dateStyle: 'short',
              }),
            })}
          </small>
          <p className='mt-6 text-white'>
            <span className='text-yellow-600'>{t('privacy.disclaimer')}</span>
            <ul className='text-describe'>
              <li>
                <h2 className='text-2xl mt-1 text-white'>{t('privacy.collect')}</h2>
                <p>{t('privacy.collect-description')}</p>
              </li>
              <li>
                <h2 className='text-2xl mt-1 text-white'>{t('privacy.protection')}</h2>
                <p>{t('privacy.protection-description')}</p>
              </li>
              <li>
                <h2 className='text-2xl mt-1 text-white'>{t('privacy.third-party')}</h2>
                <p>{t('privacy.third-party-data')}</p>
              </li>
              <li>
                <h2 className='text-2xl mt-1 text-white'>{t('privacy.deletion')}</h2>
                <p>
                  {t('privacy.deletion-description')}{' '}
                  <a href='mailto:support@menherabot.xyz'>
                    <b>support@menherabot.xyz</b>
                  </a>
                </p>
              </li>
            </ul>
          </p>
        </div>
        <div className='mt-10'>
          <h1 id='terms-of-service' className='text-white font-bold text-3xl md:text-4x'>
            {t('tos.title')}
          </h1>
          <small className='text-white'>
            {t('last-change', {
              date: new Date('2026-08-12').toLocaleDateString(i18n.language, {
                dateStyle: 'short',
              }),
            })}
          </small>
          <div className='text-describe mt-6'>
            <span className='text-yellow-600'>
              {t('tos.disclaimer')}
              <b> {t('tos.agree')} </b>
              {t('tos.end-disclaimer')}
            </span>
            <ul>
              <li>
                <h2 className='text-2xl mt-1 text-white'>{t('tos.bugs')}</h2>
                <p>{t('tos.bugs-description')}</p>
              </li>
              <li>
                <h2 className='text-2xl mt-1 text-white'>{t('tos.age')}</h2>
                <p>{t('tos.age-description')}</p>
              </li>
              <li>
                <h2 className='text-2xl mt-1 text-white'>{t('tos.guidelines')}</h2>
                <p>
                  {t('tos.guidelines-description')}{' '}
                  <a href='https://discord.com/guidelines' className='text-primary underline'>
                    {t('tos.guidelines-link')}
                  </a>
                </p>
              </li>
              <ol className='list-disc'>
                <li>{t('tos.nsfw')}</li>
                <li>{t('tos.discrimination')}</li>
              </ol>
            </ul>
          </div>
          <h2 className='text-2xl mt-1 text-white'>{t('tos.apeal')}</h2>
          <p className='text-describe'>
            {t('tos.apeal-description')}{' '}
            <a
              href='https://github.com/MenheraBot/MenheraBot/discussions/132'
              className='text-primary underline'
            >
              {t('tos.apeal-link')}
            </a>
          </p>
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['legal', 'header', 'footer'])),
    },
  };
};

export default LegalPage;
