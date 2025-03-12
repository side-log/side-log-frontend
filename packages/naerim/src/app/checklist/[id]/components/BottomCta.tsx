'use client';

import PrimaryButton from '@/components/PrimaryButton';
import { useRouter } from 'next/navigation';

import { css } from '../../../../../styled-system/css';
import useReferrer from '@yeaaaah/shared/src/hooks/useReferrer';

export function ClientBottomButton({
  isLastOrder,
  isLastStep,
  step,
  order,
}: {
  isLastOrder: boolean;
  isLastStep: boolean;
  step: number;
  order: number;
}) {
  const referrer = useReferrer();
  const router = useRouter();

  const handleCtaClick = () => {
    if (isLastOrder) {
      router.push(`/checklist/complete?step=${step}&isLastStep=true&referrer=${referrer}`);
    } else {
      router.push(`/checklist/${step}?order=${order + 1}&referrer=${referrer}`);
    }
  };

  return (
    <div className={css({ padding: '0 20px 40px', backgroundColor: '#000000' })}>
      <PrimaryButton onClick={handleCtaClick}>{isLastOrder ? '완료' : '다음'}</PrimaryButton>
    </div>
  );
}
