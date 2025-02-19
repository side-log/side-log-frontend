import Link from 'next/link';
import { Logo } from '../Icon';
import { token } from '../../../styled-system/tokens';

export default function HeaderLogo() {
  return (
    <Link href={''}>
      <Logo width={74} fill={token('colors.content.subtle')} />
    </Link>
  );
}
