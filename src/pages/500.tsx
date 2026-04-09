import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetStaticProps } from 'next';
import { ErrorView } from '../components/ErrorView';
import { useTranslation } from 'next-i18next';
import Layout from '../components/PageLayout';

const CustomErrorPage = (): JSX.Element => {
  const { t } = useTranslation('errors');
  return (
    <Layout page='errors'>
      <main className='mx-auto max-w-7xl p-6 text-center flex flex-col items-center'>
        <ErrorView statusCode={500} title={t('500.title')} text={t('500.description')} />
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

export default CustomErrorPage;
