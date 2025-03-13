'use client';

import Link from 'next/link';
import { LogoIcon } from '../Icon';
import { token } from '../../../styled-system/tokens';
import { withReferrer } from '@/utils/withReferrer';
import useReferrer from '@/hooks/useReferrer';

export default function HeaderLogo() {
  const referrer = useReferrer();

  return (
    <Link href={withReferrer('/landing', { referrer })}>
      <LogoIcon width={74} fill={token('colors.content.subtle')} />
    </Link>
  );
}
