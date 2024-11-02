import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { OverlayProvider } from 'overlay-kit';
import useInitializeViewportHeight from '@/hooks/useInitializeViewportHeight';

export default function App({ Component, pageProps }: AppProps) {
  useInitializeViewportHeight();

  return (
    <OverlayProvider>
      <Head>
        <title>손님의 발견</title>
        <meta property="og:title" content="손님의 발견" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:description" content={'내 가게 잘 될 수 있을까?\n동네 주민들의 의견을 모아 드릴게요'} />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
    </OverlayProvider>
  );
}
