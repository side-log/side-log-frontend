'use client';

import { Icon } from '@/components/Icon';
import Header from '@/components/Header';
import { css } from '../../../styled-system/css';
import Text from '@/components/Text';
import Spacing from '@/components/Spacing';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import useReferrer from '@yeaaaah/shared/src/hooks/useReferrer';
import { withReferrer } from '@/utils/withReferrer';

export default function EquipmentPage() {
  const referrer = useReferrer();
  const router = useRouter();

  return (
    <>
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
        <Icon.Error />
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
          <Button variant={'secondary'} onClick={() => router.push(withReferrer('/checklist', { referrer }))}>
            체크리스트 바로가기
          </Button>
        </div>
      </div>
    </>
  );
}
