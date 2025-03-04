import Link from 'next/link';
import { Icon } from '../Icon';
import { token } from '../../../styled-system/tokens';

export default function HeaderLogo() {
  return (
    <Link href={''}>
      <Icon.Logo width={74} fill={token('colors.content.subtle')} />
    </Link>
  );
}
