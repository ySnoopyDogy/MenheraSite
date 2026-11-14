import '../styles/global.css';

import { AppProps } from 'next/app';

import { Analytics } from '@vercel/analytics/react';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next/pages';
import Script from 'next/script';

const Application = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const pageview = (url: string): void => {
        gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
          page_path: url,
        });
      };

      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        strategy='afterInteractive'
        id='ga'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Analytics />
      <Component {...pageProps} />
    </>
  );
};

export default appWithTranslation(Application);
