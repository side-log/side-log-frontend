'use client';

import Link from 'next/link';
import { LogoIcon } from '../Icon';
import { token } from '../../../styled-system/tokens';
import useReferrer from '@/hooks/useReferrer';

export default function HeaderLogo() {
  const referrer = useReferrer();

  return (
    <Link href={`/landing?referrer=${referrer}`}>
      <LogoIcon width={74} fill={token('colors.content.subtle')} />
    </Link>
  );
}
