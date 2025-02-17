import Wrapper from '@/components/Wrapper';
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
