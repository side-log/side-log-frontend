'use client';

import Text from '@/components/Text';
import { css } from '../../../../../styled-system/css';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { withReferrer } from '@/utils/withReferrer';
import useReferrer from '@yeaaaah/shared/src/hooks/useReferrer';

export function BottomCta({ step, isLastStep }: { step: number; isLastStep: boolean }) {
  const router = useRouter();
  const referrer = useReferrer();

  const handleNextStep = () => {
    router.push(withReferrer(`/checklist/${step + 1}?order=1`, { referrer }));
  };

  const handleGoHome = () => {
    router.push(withReferrer('/checklist', { referrer }));
  };

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
        <Button variant={'primary'} onClick={handleGoHome}>
          <Text typography={'b2'} color={'base.white'}>
            홈화면으로 이동
          </Text>
        </Button>
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
      <Button variant={'primary'} onClick={handleNextStep}>
        <Text typography={'b2'} color={'base.white'}>
          다음 스텝으로 이동
        </Text>
      </Button>
      <Button variant={'minor'} onClick={handleGoHome}>
        <Text typography={'b2'} color={'base.white'}>
          체크리스트 홈으로 이동
        </Text>
      </Button>
    </div>
  );
}
