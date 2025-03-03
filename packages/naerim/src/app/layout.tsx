import { Gilda_Display } from 'next/font/google';
import localFont from 'next/font/local';
import Wrapper from '@/components/Wrapper';
import './globals.css';

export const gildaFont = Gilda_Display({
  weight: '400',
  subsets: ['latin'],
});

const pretendardFont = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pretendardFont.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#000" />
        <title>Document</title>
      </head>
      <body>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
