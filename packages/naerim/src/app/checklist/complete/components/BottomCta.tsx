'use client';

import Text from '@/components/Text';
import { css } from '../../../../../styled-system/css';
import Button from '@/components/Button';

export function BottomCta() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '0 16px 40px',
      })}
    >
      <Button variant={'primary'}>
        <Text typography={'b2'} color={'base.white'}>
          다음 스텝으로 이동
        </Text>
      </Button>
      <Button variant={'minor'}>
        <Text typography={'b2'} color={'base.white'}>
          체크리스트 홈으로 이동
        </Text>
      </Button>
    </div>
  );
}
