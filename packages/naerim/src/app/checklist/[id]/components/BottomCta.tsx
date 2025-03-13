'use client';

import PrimaryButton from '@/components/PrimaryButton';
import { useRouter } from 'next/navigation';
import { css } from '../../../../../styled-system/css';
import useReferrer from '@/hooks/useReferrer';
import { Suspense } from 'react';

interface ClientBottomButtonProps {
  isLastOrder: boolean;
  isLastStep: boolean;
  step: number;
  order: number;
}

function ClientBottomButtonContent({ isLastOrder, isLastStep, step, order }: ClientBottomButtonProps) {
  const referrer = useReferrer();
  const router = useRouter();

  const handleCtaClick = () => {
    if (isLastOrder) {
      router.push(`/checklist/complete?step=${step}&isLastStep=${isLastStep}&referrer=${referrer}`);
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

export function ClientBottomButton(props: ClientBottomButtonProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientBottomButtonContent {...props} />
    </Suspense>
  );
}
