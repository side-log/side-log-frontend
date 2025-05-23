'use client';

import { ErrorIcon } from '@/components/Icon';
import Header from '@/components/Header';
import { css } from '../../../../styled-system/css';
import Text from '@/components/Text';
import Spacing from '@/components/Spacing';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import useReferrer from '@/hooks/useReferrer';
import { Suspense } from 'react';
import { ClientLoggingScreen } from '@/components/ClientLoggingScreen';

function ChecklistButton() {
  const router = useRouter();
  const referrer = useReferrer();

  return (
    <Button variant={'secondary'} onClick={() => router.push(`/checklist?referrer=${referrer}`)}>
      체크리스트 바로가기
    </Button>
  );
}

export function EquipmentClient() {
  return (
    <ClientLoggingScreen
      id={100003}
      params={{
        screen_name: 'equipment',
      }}
    >
      <Header />
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        })}
      >
        <ErrorIcon />
        <Text typography={'t1'} color={'content.strong'}>
          오픈 준비중인 기능이에요
        </Text>
        <Spacing size={8} />
        <Text typography={'b5'} color={'content.normal'} className={css({ textAlign: 'center' })}>
          빠른 시일내에 오픈해
          <br />
          커피를 함께 내릴 수 있도록 할게요
        </Text>
        <Spacing size={24} />
        <div className={css({ width: 240 })}>
          <Suspense fallback={<div>Loading...</div>}>
            <ChecklistButton />
          </Suspense>
        </div>
      </div>
    </ClientLoggingScreen>
  );
}
