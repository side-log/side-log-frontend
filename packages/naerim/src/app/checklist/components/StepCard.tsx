'use client';

/* eslint-disable @next/next/no-img-element */
import Label from '@/components/Label';
import { Step } from '../models/step';
import Spacing from '@/components/Spacing';
import Text from '@/components/Text';
import { convertToNewLineJsx } from '@/utils/convertToNewLineJsx';
import { css } from '../../../../styled-system/css';
import Button from '@/components/Button';
import { redirect, RedirectType } from 'next/navigation';
import useReferrer from '@yeaaaah/shared/src/hooks/useReferrer';

interface StepCardProps {
  step: Step;
}

export default function StepCard({ step }: StepCardProps) {
  const referrer = useReferrer();

  return (
    <div
      className={css({
        bg: 'background.normal',
        p: 4,
        borderRadius: 12,
        border: '1px solid',
        borderColor: 'base.white/10',
      })}
    >
      <Label typography={'l3'}>Step 1</Label>
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
          redirect(`/checklist/${step.id}?order=0&referrer=${referrer}`, RedirectType.push);
        }}
      >
        확인하기
      </Button>
    </div>
  );
}
