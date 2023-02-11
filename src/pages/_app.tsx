import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import ErrorBoundary from '@/app/components/error-boundary';
import { PageContainer } from '@/app/layout/page-container';
import { store } from '@/shared/store';
import { PersistWrapper } from '@/shared/store/PersistWrapper';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
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
          <title>Ramin Rezaei</title>
          <meta name='copyright' content='2023' />
          <meta name='theme-color' content='#1e283c' />
          <meta name='application-name' content='Ramin Rezaei' />
          <meta name='msapplication-TileColor' content='#1e283c' />
          <link rel='canonical' href='https://www.raminrezaei.ir' />
          <meta name='msapplication-navbutton-color' content='#1e283c' />
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
        </Head>
        <NextNprogress
          height={2}
          showOnShallow
          color='#1e283c'
          stopDelayMs={200}
          startPosition={0.3}
          options={{ easing: 'ease', speed: 500, showSpinner: false }}
        />
        <ErrorBoundary>
          <PageContainer>
            <Component {...pageProps} />
          </PageContainer>
        </ErrorBoundary>
      </PersistWrapper>
    </Provider>
  );
}
