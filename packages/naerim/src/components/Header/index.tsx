import { Suspense } from 'react';
import { css } from '../../../styled-system/css';
import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';

export default function Header() {
  return (
    <nav className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 4 })}>
      <Suspense fallback={<div>Loading...</div>}>
        <HeaderLogo />
        <HeaderNav />
      </Suspense>
    </nav>
  );
}
