import { css } from '../../../styled-system/css';
import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';

export default function Header() {
  return (
    <nav className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 4 })}>
      <HeaderLogo />
      <HeaderNav />
    </nav>
  );
}
