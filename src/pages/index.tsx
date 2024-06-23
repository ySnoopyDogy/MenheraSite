import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { HiCheck, HiStar, HiOutlineEmojiHappy } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { RiSwordLine } from 'react-icons/ri';
import { FaRegKissWinkHeart } from 'react-icons/fa';
import { Button } from '../components/common/Button';
import Image from 'next/image';
import Layout from '../components/PageLayout';
import { SectionDivider } from '../components/common/SectionDivider';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { WeeklyTopFiltered } from '../services/api/api.types';
import { fetchWeeklyHunters } from '../services/api/api';

const useCategories = () => {
  const { t } = useTranslation('index');

  const commandsCategories = [
    {
      name: t('categories.actions'),
      id: 'actions',
      description: t('categories.actions-description'),
      Icon: FaRegKissWinkHeart,
    },
    {
      name: t('categories.economy'),
      id: 'economy',
      description: t('categories.economy-description'),
      Icon: HiStar,
    },
    {
      name: t('categories.fun'),
      id: 'fun',
      description: t('categories.fun-description'),
      Icon: HiOutlineEmojiHappy,
    },
    {
      name: t('categories.rpg'),
      id: 'roleplay',
      description: t('categories.rpg-description'),
      Icon: RiSwordLine,
    },
  ];

  return commandsCategories;
};

const useFeatures = () => {
  const { t } = useTranslation('index');

  const features = [
    t('features.facility'),
    t('features.funny'),
    t('features.roleplay'),
    t('features.permissions'),
  ];

  return features;
};

type Props = {
  weekly: WeeklyTopFiltered[];
  nextWeeklyUpdate: number;
};

const HomePage = ({ weekly, nextWeeklyUpdate }: Props): JSX.Element => {
  const { t, i18n } = useTranslation('index');
  const features = useFeatures();
  const categories = useCategories();

  const toWritableUTF = (str: string): string => str.replace(/[^\x00-\xFF]/g, '');

  return (
    <Layout page='index'>
      <main>
        <section id='descritpion' className='flex-1 flex p-6 container min-h-fit mx-auto max-w-7xl'>
          <div className='md:max-w-xl'>
            <h1 className='text-white mt-6 font-bold text-4xl md:text-5xl'>
              {t('greetings')} <span className='text-primary'>Menhera Bot</span>
            </h1>
            <p className='mt-4 font-describe text-describe text-base md:text-xl'>
              {t('mission')}
              <Link href='/commands' passHref>
                <span className='text-primary cursor-pointer'> {t('here')}</span>
              </Link>
              .
            </p>
            <ul className='grid grid-cols-2 my-6 gap-2'>
              {features.map((feature, index) => (
                <li key={index} className='text-white text-base font-bold flex gap-3'>
                  <HiCheck color='#38FF40' /> {feature}
                </li>
              ))}
            </ul>
            <a href='/invite' target='_blank'>
              <Button>{t('invite')}</Button>
            </a>
          </div>
          <div className='hidden flex-1 lg:flex justify-center items-center gap-4'>
            <Image
              src='/images/home-section-1.png'
              width={150}
              height={400}
              layout='intrinsic'
              alt='Menhera comendo pipica'
            />
            <Image
              src='/images/home-section-1.png'
              width={150}
              height={500}
              layout='intrinsic'
              alt='Menhera comendo pipica'
            />
            <Image
              src='/images/home-section-1.png'
              width={150}
              height={400}
              layout='intrinsic'
              alt='Menhera comendo pipica'
            />
          </div>
          <IoIosArrowDown
            className='text-primary bottom animate-bounce absolute hidden md:block inset-x-1/2 bottom-0'
            size={50}
          />
        </section>
        <SectionDivider className='hidden md:flex' />
        <section id='ranking' className='relative  flex flex-row items-center mx-auto max-w-7xl'>
          <div className='hidden md:block absolute h-3/4 w-56'>
            <Image
              src='/images/home-section-2-menhera.png'
              layout='fill'
              alt='Menhera de olho em você!'
            />
          </div>
          <div className='bg-secondary-bg md:ml-20 px-6 py-8 md:flex gap-3 justify-around items-center flex-1'>
            <div className='max-w-max shrink md:max-w-md'>
              <small className='flex items-center gap-2'>
                <span className='text-primary font-bold'>{t('weekly-ranking')}</span>
                <div className='bg-separate-color h-1 flex-1 px-2' />
              </small>
              <span className='text-white font-bold'>
                {t('next-update', {
                  date: new Date(nextWeeklyUpdate).toLocaleString(i18n.language),
                })}
              </span>
              <h1 className='text-white font-bold text-3xl md:text-5xl mt-4'>
                {t('best-hunters')}
              </h1>
              <p className='text-describe text-base mt-4'>{t('ranking-description')}</p>
            </div>
            <ul className='mt-6 overflow-auto h-full max-h-72 w-full max-w-full md:max-w-lg flex-none lg:flex-1'>
              {weekly.map((data) => (
                <li key={`${data.type}-top`} className='mt-6 first:mt-0 mr-3 pb-4 md:mr-10'>
                  <div className='text-white top-0 sticky bg-secondary-bg capitalize font-bold text-2xl'>
                    {t(`huntTypes.${data.type}s`)}
                  </div>
                  {data.users.map((user, position) => (
                    <div
                      className='border-b-2 border-b-separate-color'
                      key={`${user.user_id}-${user.hunt_type}`}
                    >
                      <div className='flex justify-between mt-4 text-white '>
                        <span className='font-medium'>
                          {toWritableUTF(user.user_tag ?? t('unknown-tag', { tag: position + 1 }))}
                        </span>
                        <span className='font-bold'>#{position + 1}</span>
                      </div>
                      <span className='font-bold text-primary'>
                        {t('hunted', { amount: user.hunted })}
                      </span>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <SectionDivider title={t('commands')} />
        <section className='container min-h-fit p-6 mx-auto max-w-7xl'>
          <h2 className='text-white font-bold text-4xl md:text-6xl'>
            {t('findout')} <span className='text-primary'>{'>.<'} </span>
          </h2>
          <p className='text-describe font-describe mt-4 md:text-xl'>{t('findout-description')}</p>
          <div className='my-6 flex gap-10 flex-wrap justify-between'>
            {categories.map((category) => (
              <div key={category.id} className='max-w-lg'>
                {<category.Icon color='#975AFF' size={25} />}
                <h3 className='text-white font-bold text-xl lg:text-2xl my-4'>
                  {t('category')} <span className='text-primary'>{category.name}</span>
                </h3>
                <p className='text-describe font-describe text-base mb-6 md:max-w-sm lg:max-w-md'>
                  {category.description}
                </p>
                <Link
                  href={{
                    pathname: '/commands',
                    hash: `#table`,
                    query: { category: category.id },
                  }}
                  passHref
                >
                  <Button>{t('see-commands')}</Button>
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className='relative h-full w-full'>
          <Image
            src='/images/home-section-4-bg.png'
            layout='fill'
            alt='Discord'
            className='-z-10 bg-contain sm:block hidden'
          />
          <Image
            src='/images/home-section-4-bg-mobile.png'
            layout='fill'
            alt='Discord'
            className='-z-10 bg-contain sm:hidden block'
          />
          <div className='p-6 lg:p-0 mx-auto max-w-7xl flex justify-between relative'>
            <div className='md:py-6'>
              <h1 className='text-white font-bold text-4xl md:text-6xl'>
                {t('add-me.first')} <span className='text-primary'>{t('add-me.second')}</span>{' '}
                {t('add-me.third')}
              </h1>
              <p className='text-describe font-describe mt-4 mb-6 md:text-xl max-w-3xl'>
                {t('add-me.description')}
              </p>
              <a href='/invite' target='_blank'>
                <Button>{t('add-me.add')}</Button>
              </a>
            </div>
            <Image
              className='hidden lg:block absolute h-full right-0'
              src='/images/menhera-de-fone.png'
              height={336}
              width={264}
              alt='Discord'
            />
          </div>
        </section>
        <section className='container min-h-fit px-6 pt-6 mx-auto max-w-7xl flex items-center justify-between'>
          <div className='hidden md:block -mb-3 -z-10'>
            <Image
              src='/images/menhera-piscando.png'
              width='374'
              height='390'
              alt='Menhera piscando!'
            />
          </div>
          <div>
            <SectionDivider title={t('about-me')} withoutSpace className='mb-6' />
            <h1 className='text-white font-bold text-4xl md:text-6xl'>{t('know-me-better')}</h1>
            <p className='text-describe font-describe mt-4 mb-6 md:text-xl max-w-3xl'>
              {t('know-me-description')}
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const weeklyHunters = await fetchWeeklyHunters();

  const rawWeekly = weeklyHunters.data.reduce<WeeklyTopFiltered[]>(
    (acc, user) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const found = acc.find((item) => item.type === user.hunt_type)!;
      found.users.push(user);

      return acc;
    },
    [
      { type: 'demon', users: [] },
      { type: 'giant', users: [] },
      { type: 'angel', users: [] },
      { type: 'archangel', users: [] },
      { type: 'demigod', users: [] },
      { type: 'god', users: [] },
    ],
  );

  const weekly = rawWeekly.map((a) => ({
    type: a.type,
    users: a.users.sort((a, b) => b.hunted - a.hunted).slice(0, 10),
  }));

  return {
    props: {
      weekly,
      nextWeeklyUpdate: weeklyHunters.nextUpdate,
      ...(await serverSideTranslations(locale as string, ['index', 'header', 'footer'])),
    },
    revalidate: 60,
  };
};

export default HomePage;
