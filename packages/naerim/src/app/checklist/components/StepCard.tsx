'use client';

import Label from '@/components/Label';
import { Step } from '../models/step';
import Spacing from '@/components/Spacing';
import Text from '@/components/Text';
import { convertToNewLineJsx } from '@/utils/convertToNewLineJsx';
import { css } from '../../../../styled-system/css';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import useReferrer from '@/hooks/useReferrer';
import { Suspense } from 'react';

interface StepCardProps {
  step: Step;
}

function StepCardContent({ step }: StepCardProps) {
  const referrer = useReferrer();
  const router = useRouter();

  return (
    <div
      className={css({
        bg: 'background.normal',
        p: 4,
        borderRadius: 12,
        border: '1px solid',
        borderColor: 'base.white/10',
        mb: 4,
      })}
    >
      <Label typography={'l3'}>Step {step.id}</Label>
      <Spacing size={10} />
      <Text color={'content.strong'} typography={'t2'}>
        {step.title}
      </Text>
      <Spacing size={6} />
      <Text color={'content.subtle'} typography={'l2'}>
        {convertToNewLineJsx(step.description)}
      </Text>
      <Spacing size={16} />
      <div className={css({ width: '100%', height: 140 })}>
        <img
          src={step.image}
          alt={step.title}
          className={css({
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 8,
          })}
        />
      </div>
      <Spacing size={12} />
      <Button
        variant={'secondary'}
        onClick={() => {
          router.push(`/checklist/${step.id}?order=1&referrer=${referrer}`);
        }}
      >
        확인하기
      </Button>
    </div>
  );
}

export function StepCard(props: StepCardProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StepCardContent {...props} />
    </Suspense>
  );
}
