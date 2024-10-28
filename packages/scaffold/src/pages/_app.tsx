import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { OverlayProvider } from 'overlay-kit';
import useInitializeViewportHeight from '@/hooks/useInitializeViewportHeight';

export default function App({ Component, pageProps }: AppProps) {
  useInitializeViewportHeight();

  return (
    <OverlayProvider>
      <Component {...pageProps} />
    </OverlayProvider>
  );
}
