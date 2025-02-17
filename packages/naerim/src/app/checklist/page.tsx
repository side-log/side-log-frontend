import { Logo } from '@/components/Icon';
import { token } from '../../../styled-system/tokens';
import Link from 'next/link';
import { css } from '../../../styled-system/css';

export default function CheckListPage() {
  return (
    <>
      <Header />
    </>
  );
}

function Header() {
  return (
    <nav>
      <LogoArea />
      <MenuList />
    </nav>
  );
}

function LogoArea() {
  return (
    <Link href={''}>
      <Logo width={74} fill={token('colors.content.subtle')} />
    </Link>
  );
}

function MenuList() {
  return (
    <ul>
      <li>
        <Link
          className={css({
            textStyle: 'b4',
            color: 'content.strong',
          })}
          href="/checklist"
        >
          체크리스트
        </Link>
      </li>
      <li>
        <Link
          className={css({
            textStyle: 'b4',
            color: 'content.strong',
          })}
          href="/not-found"
        >
          장비탐색
        </Link>
      </li>
      <li>
        <Link
          className={css({
            textStyle: 'b4',
            color: 'content.strong',
          })}
          href="/not-found"
        >
          나의장비
        </Link>
      </li>
    </ul>
  );
}
