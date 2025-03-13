'use client';

import { BottomFixedArea } from '@/components/FixedBottomArea';
import { css } from '../../../../styled-system/css';
import Link from 'next/link';
import PrimaryButton from '@/components/PrimaryButton';
import useReferrer from '@/hooks/useReferrer';

export function BottomCta() {
  const referrer = useReferrer();

  return (
    <BottomFixedArea>
      <div className={css({ padding: '0 20px 40px', backgroundColor: '#000000' })}>
        <Link href={'/checklist?referrer=' + referrer}>
          <PrimaryButton>
            <div
              className={css({
                color: 'base.white',
                textStyle: 'b2',
              })}
            >
              함께 천천히 커피 내리기
            </div>
          </PrimaryButton>
        </Link>
      </div>
    </BottomFixedArea>
  );
}
