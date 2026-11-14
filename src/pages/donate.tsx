import Image from 'next/image';
import Link from 'next/link';

import { useTranslation } from 'next-i18next/pages';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';
import { GetStaticProps } from 'next';
import { SectionDivider } from '../components/common/SectionDivider';
import Layout from '../components/PageLayout';

const DonatePage = (): JSX.Element => {
  const { t } = useTranslation('donate');

  return (
    <Layout page='donate'>
      <main className='container p-6 mx-auto max-w-7xl  mb-10'>
        <SectionDivider title={t('donate')} withoutSpace className='mb-10' />
        <div className='lg:flex justify-around items-center'>
          <div>
            <Image alt='Menhera Crying' src='/images/menhera-crying.png' width={300} height={300} />
          </div>
          <div>
            <h1 className='text-white font-bold text-3xl md:text-4x'>{t('title')}</h1>
            <p className='text-describe font-describe mt-4 md:text-xl max-w-lg'>
              {t('description')}
            </p>
            <div className='text-primary my-6'>
              <span className='font-semibold text-green-400'>Pix: </span>
              donate@menherabot.xyz
            </div>
            <Link
              href={'https://github.com/sponsors/MenheraBot'}
              className='font-semibold text-green-400 text-5xl'
            >
              GitHub Sponsors
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['donate', 'header', 'footer'])),
    },
  };
};

export default DonatePage;
