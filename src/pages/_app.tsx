import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import NextNprogress from 'nextjs-progressbar';
import 'sweetalert2/src/sweetalert2.scss';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ErrorBoundary from '@/app/components/error-boundary';
import { BaseContainer } from '@/app/layout/base-container';
import { SplashScreen } from '@/shared/components/splash-screen';
import { gaPageView } from '@/shared/services/ga';
import { store } from '@/shared/store';
import { PersistWrapper } from '@/shared/store/PersistWrapper';
import { animator } from '@/shared/utils/animator';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gaPageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    let timeRef = setTimeout(() => {
      setShowSplashScreen(false);
    }, 2000);
    return () => clearTimeout(timeRef);
  }, []);

  return (
    <Provider store={store}>
      <PersistWrapper>
        <Head>
          {/* General */}
          <meta charSet='utf-8' />
          <meta name='language' content='en' />
          <link rel='manifest' href='/manifest.json' />
          <meta name='author' content='Ramin Rezaei' />
          <meta name='robots' content='index, follow' />
          <meta name='document-type' content='Public' />
          <meta name='resource-type' content='document' />
          <meta name='document-rating' content='General' />
          <meta http-equiv='content-language' content='en' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta http-equiv='X-UA-Compatible' content='IE=edge' />
          <link rel='icon' type='image/png' href='/favicon.png' />
          {/* Personal */}
          <title>Ramin Rezaei | Front-end Engineer</title>
          <meta name='copyright' content='2023' />
          <meta name='theme-color' content='#000' />
          <meta name='application-name' content='Ramin Rezaei' />
          <meta name='msapplication-TileColor' content='#000000' />
          <link rel='canonical' href='https://www.raminrezaei.ir' />
          <meta name='msapplication-navbutton-color' content='#000000' />
          <meta content='Ramin Rezaei' name='apple-mobile-web-app-title' />
          <meta name='description' content='Ramin Rezaei Personal Page.' />
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no'
          />
          <meta
            name='keywords'
            content='Ramin, Rezaei, Ramin Rezaei, fron-end, front-end developer, engineer, developer, React, Next, JavaScript'
          />
          {/* Pinned Sites */}
          <meta name='msapplication-starturl' content='/' />
          <meta name='msapplication-tooltip' content='Ramin Rezaei' />
          {/* IOS */}
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta content='default' name='apple-mobile-web-app-status-bar-style' />
          <link sizes='76x76' rel='apple-touch-icon' href='/icons/logo76.png' />
          <link sizes='120x120' rel='apple-touch-icon' href='/icons/logo120.png' />
          <link sizes='152x152' rel='apple-touch-icon' href='/icons/logo152.png' />
          <link sizes='192x192' rel='apple-touch-icon' href='/icons/logo192.png' />
          {/* Windows */}
          <meta content='/icons/logo192.png' name='msapplication-TileImage' />
          <meta name='msapplication-config' content='browserconfig.xml' />
          {/* <!-- Google tag (gtag.js) --> */}
          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=G-3Z7J68PEJJ'
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3Z7J68PEJJ');
            `
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K5SZXFS');`
            }}
          />

          <noscript>
            <iframe
              src='https://www.googletagmanager.com/ns.html?id=GTM-K5SZXFS'
              height='0'
              width='0'
              className='hidden opacity-0'
            ></iframe>
          </noscript>
        </Head>
        <NextNprogress
          height={2}
          showOnShallow
          color='#29B6F6'
          stopDelayMs={200}
          startPosition={0.3}
          options={{ easing: 'ease', speed: 500, showSpinner: false }}
        />
        <ErrorBoundary>
          {showSplashScreen ? (
            <SplashScreen />
          ) : (
            <BaseContainer className={animator({ name: 'fadeIn' })}>
              <Component {...pageProps} />
            </BaseContainer>
          )}
        </ErrorBoundary>
      </PersistWrapper>
    </Provider>
  );
}
