import { useState } from 'react';
import Link from 'next/link';

import {
  HiMenu,
  HiX,
  HiHome,
  HiStar,
  HiHeart,
  HiOutlineStatusOnline,
  HiTranslate,
} from 'react-icons/hi';
import { FaClipboardList, FaGhost } from 'react-icons/fa';

import { useTranslation } from 'next-i18next';

import { IconType } from 'react-icons';
import { useRouter } from 'next/router';

interface NavbarItem {
  name: string;
  href: string;
  icon: IconType;
  redirect: boolean;
}

export function useNavbarItems(): NavbarItem[] {
  const { t } = useTranslation('header');

  const navbarItems = [
    {
      name: t('home'),
      href: '/',
      icon: HiHome,
      redirect: true,
    },
    {
      name: t('commands'),
      href: '/commands',
      icon: FaClipboardList,
      redirect: true,
    },
    {
      name: t('boleham'),
      href: '/boleham',
      icon: HiStar,
      redirect: true,
    },
    {
      name: t('bicho'),
      href: '/bicho',
      icon: FaGhost,
      redirect: true,
    },
    {
      name: t('donate'),
      href: '/donate',
      icon: HiHeart,
      redirect: true,
    },
    {
      name: t('status'),
      href: process.env.NEXT_PUBLIC_STATUSPAGE_URL ?? '/status',
      icon: HiOutlineStatusOnline,
      redirect: true,
    },
    {
      name: t('language'),
      href: '/',
      icon: HiTranslate,
      redirect: false,
    },
  ];

  return navbarItems;
}

export function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const navbarItems = useNavbarItems();
  const router = useRouter();
  const { i18n, t } = useTranslation('header');

  const changeLocale = () => {
    router.push(router.asPath, undefined, {
      locale: i18n.language === 'pt-BR' ? 'en-US' : 'pt-BR',
    });
  };

  return (
    <header className='flex justify-between md:justify-center items-center p-5 container mx-auto max-w-7xl'>
      <Link href='/' passHref>
        <h1 className='font-bold text-md text-white cursor-pointer mr-2' data-test='logo'>
          MenheraBot
        </h1>
      </Link>
      <nav className='flex-1 hidden md:flex flex-row-reverse'>
        <ul className='flex lg:gap-10 gap-4'>
          {navbarItems.map((item) => (
            <li
              key={item.name}
              className='font-bold text-md hover:text-primary hover:cursor-pointer text-white'
            >
              {item.redirect ? (
                <Link href={item.href}>{item.name}</Link>
              ) : (
                <span onClick={changeLocale}>{item.name}</span>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <a href='/invite' target='_blank'>
        <button className='p-2 px-5 h-12 text-white bg-primary rounded-full font-bold hidden ml-14 focus:outline-none disabled:opacity-75 md:block hover:'>
          {t('add')}
        </button>
      </a>
      <HiMenu
        color='white'
        size={25}
        className='md:hidden'
        onClick={() => setIsOpen(true)}
        data-test='open-mobile-menu-btn'
      />
      {isOpen && (
        <div
          className='bg-primary-bg absolute w-full h-screen md:hidden top-0 bottom-0 left-0 z-40'
          data-test='mobile-opened-menu'
        >
          <div className='mx-2 p-2'>
            <div className='mt-6 flex-1 flex flex-row-reverse w-full'>
              <HiX
                color='#975AFF'
                size={25}
                onClick={() => setIsOpen(false)}
                data-test='close-mobile-menu-btn'
              />
            </div>
            <h1 className='font-bold text-xl mt-3 text-white'>{t('navigation')}</h1>
            <nav className='mt-6'>
              <ul className='flex flex-col font-medium'>
                {navbarItems.map((item) => (
                  <li
                    key={item.name}
                    className='border-b last:border-none border-border-color py-3 text-white'
                  >
                    {item.redirect ? (
                      <Link href={item.href}>
                        <a className='flex'>
                          {<item.icon color='#975AFF' size={25} className='mr-3' />}
                          {item.name}
                        </a>
                      </Link>
                    ) : (
                      <span className='flex cursor-pointer' onClick={changeLocale}>
                        {<item.icon color='#975AFF' size={25} className='mr-3' />}
                        {item.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
