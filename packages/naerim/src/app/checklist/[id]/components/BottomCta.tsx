'use client';

import PrimaryButton from '@/components/PrimaryButton';
import { RedirectType } from 'next/navigation';

import { redirect } from 'next/navigation';
import { css } from '../../../../../styled-system/css';
import useReferrer from '@yeaaaah/shared/src/hooks/useReferrer';

export function ClientBottomButton({ isLastStep, step, order }: { isLastStep: boolean; step: number; order: number }) {
  const referrer = useReferrer();

  const handleCtaClick = () => {
    if (isLastStep) {
      redirect(`/checklist/complete?referrer=${referrer}`, RedirectType.push);
    } else {
      redirect(`/checklist/${step}?order=${order + 1}&referrer=${referrer}`, RedirectType.push);
    }
  };

  return (
    <div className={css({ padding: '0 20px 40px', backgroundColor: '#000000' })}>
      <PrimaryButton onClick={handleCtaClick}>{isLastStep ? '완료' : '다음'}</PrimaryButton>
    </div>
  );
}
