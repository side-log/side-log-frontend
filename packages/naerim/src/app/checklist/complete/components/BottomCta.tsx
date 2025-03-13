'use client';

import Text from '@/components/Text';
import { css } from '../../../../../styled-system/css';
import Button from '@/components/Button';
import useReferrer from '@yeaaaah/shared/src/hooks/useReferrer';
import Link from 'next/link';

export function BottomCta({ step, isLastStep }: { step: number; isLastStep: boolean }) {
  const referrer = useReferrer();

  if (isLastStep) {
    return (
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '0 16px 40px',
        })}
      >
        <Link href={`/checklist?referrer=${referrer}`}>
          <Button variant={'primary'}>
            <Text typography={'b2'} color={'base.white'}>
              홈화면으로 이동
            </Text>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '0 16px 40px',
      })}
    >
      <Link href={`/checklist/${step + 1}?order=1&referrer=${referrer}`}>
        <Button variant={'primary'}>
          <Text typography={'b2'} color={'base.white'}>
            다음 스텝으로 이동
          </Text>
        </Button>
      </Link>
      <Link href={`/checklist?referrer=${referrer}`}>
        <Button variant={'minor'}>
          <Text typography={'b2'} color={'base.white'}>
            체크리스트 홈으로 이동
          </Text>
        </Button>
      </Link>
    </div>
  );
}
