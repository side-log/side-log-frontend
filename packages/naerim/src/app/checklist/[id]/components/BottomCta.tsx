'use client';

import PrimaryButton from '@/components/PrimaryButton';
import { useRouter } from 'next/navigation';
import { css } from '../../../../../styled-system/css';
import useReferrer from '@/hooks/useReferrer';
import { Suspense } from 'react';
import Link from 'next/link';

interface ClientBottomButtonProps {
  isLastOrder: boolean;
  isLastStep: boolean;
  step: number;
  order: number;
}

function ClientBottomButtonContent({ isLastOrder, isLastStep, step, order }: ClientBottomButtonProps) {
  const referrer = useReferrer();

  return (
    <div className={css({ padding: '0 20px 40px', backgroundColor: '#000000' })}>
      <Link
        href={
          isLastOrder
            ? `/checklist/complete?step=${step}&isLastStep=${isLastStep}&referrer=${referrer}`
            : `/checklist/${step}?order=${order + 1}&referrer=${referrer}`
        }
      >
        <PrimaryButton>{isLastOrder ? '완료' : '다음'}</PrimaryButton>
      </Link>
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
