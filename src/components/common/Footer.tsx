import Link from 'next/link';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

const socialMedia = [
  {
    alt: 'Discord',
    href: 'https://discord.com/invite/fZMdQbA',
    icon: FaDiscord,
  },
  {
    alt: 'Twitter',
    href: 'https://twitter.com/__MenheraBot',
    icon: FaTwitter,
  },
  {
    alt: 'Github',
    href: 'https://github.com/MenheraBot/MenheraBot',
    icon: FaGithub,
  },
];

const useFooter = () => {
  const footerItems = [
    {
      redirect: '/',
      name: 'home',
      external: false,
    },
    {
      redirect: '/commands',
      name: 'commands',
      external: false,
    },
    {
      redirect: '/changelog',
      name: 'changelog',
      external: false,
    },
    {
      redirect: '/status',
      name: 'status',
      external: false,
    },
    {
      redirect: '/bicho',
      name: 'bicho',
      external: false,
    },
    {
      redirect: '/boleham',
      name: 'boleham',
      external: false,
    },
    {
      redirect: '/support',
      name: 'support',
      external: true,
    },
    {
      redirect: '/invite',
      name: 'invite',
      external: true,
    },
    {
      redirect: '/legal',
      name: 'legal',
      external: false,
    },
  ];

  return footerItems;
};

export function Footer(): JSX.Element {
  const { t } = useTranslation('footer');
  const footerItens = useFooter();

  return (
    <footer className='bg-secondary-bg'>
      <div className='container mx-auto p-6 max-w-7xl md:pt-16'>
        <div className='flex items-center justify-between'>
          <div className='hidden md:block max-w-xl'>
            <h1 className='font-bold text-white text-4xl'>Menhera Bot</h1>
            <p className='text-describe text-xl mt-6 md:max-w-sm'>{t('description')}</p>
          </div>
          <div>
            <h3 className='text-white text-xl md:text-2xl font-bold mt-6 md:mt-0'>{t('menu')}</h3>
            <ul className='grid grid-rows-3 grid-cols-3 gap-x-3 flex-wrap justify-between mt-6'>
              {footerItens.map((item) => (
                <li
                  key={item.name}
                  className='text-describe px-3 md:text-lg md:pl-0 hover:underline'
                >
                  {item.external ? (
                    <a href={item.redirect} rel='noopener noreferrer' target='_blank'>
                      {t(item.name as 'apeal')}
                    </a>
                  ) : (
                    <Link href={item.redirect}>{t(item.name as 'apeal')}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='md:flex flex-row-reverse justify-between md:border-t border-t-separate-color md:mt-6 md:py-6'>
          <ul className='flex items-center justify-center gap-6 my-6 md:my-0'>
            {socialMedia.map((item) => (
              <li key={item.alt} className='text-describe cursor-pointer'>
                <a href={item.href} rel='noopener noreferrer' target='_blank'>
                  {<item.icon size={25} />}
                </a>
              </li>
            ))}
          </ul>
          <span className='text-describe text-center'>{t('made')}</span>
        </div>
      </div>
    </footer>
  );
}
