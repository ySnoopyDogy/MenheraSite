import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { ErrorView } from '../components/ErrorView';
import { useTranslation } from 'next-i18next/pages';
import Layout from '../components/PageLayout';

const NotFoundPage = (): JSX.Element => {
  const { t } = useTranslation('errors');

  return (
    <Layout page='errors'>
      <main className='mx-auto max-w-7xl p-6 text-center flex flex-col items-center '>
        <ErrorView statusCode={404} title={t('404.title')} text={t('404.description')} />
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['errors', 'header', 'footer'])),
    },
  };
};

export default NotFoundPage;
