import localFont from 'next/font/local';
import Wrapper from '@/components/Wrapper';
import './globals.css';
import { css } from '../../styled-system/css';

const pretendardFont = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pretendardFont.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#000" />
        <meta name="google-site-verification" content="MJHnYoqXP2wfyv8F6PMCcjfJ4mzQcf2iPm40C7Rxmxk" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={css({
          backgroundColor: '#000000',
          minHeight: '100vh',
        })}
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
