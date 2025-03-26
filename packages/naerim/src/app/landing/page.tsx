'use client';

import { css } from '../../../styled-system/css';
import { token } from '../../../styled-system/tokens';
import { LogoIcon, ArrowDownIcon } from '@/components/Icon';

import Spacing from '@/components/Spacing';
import { Suspense } from 'react';
import { BottomCta } from './components/BottomCta';
import { ClientLoggingScreen } from '@/components/ClientLoggingScreen';

export default function LandingPage() {
  return (
    <ClientLoggingScreen
      id={100000}
      params={{
        screen_name: 'landing',
      }}
      className={css({
        height: '100%',
      })}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <div
          className={css({
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          })}
        >
          <LogoIcon width={146} fill={token('colors.content.strong')} />
          <Spacing size={16} />
          <div
            className={css({
              color: 'base.white',
              whiteSpace: 'pre-line',
              textAlign: 'center',
              textStyle: 'b3',
            })}
          >
            천천히 내리고, 깊이 있게 즐기세요
            <br />
            내림이 당신의 첫 드립커피와 함께할게요
          </div>
          <Spacing size={39} />
          <ArrowDownIcon />
          <Spacing size={39} />
          <div
            className={css({
              color: 'base.white',
              whiteSpace: 'pre-line',
              textAlign: 'center',
              textStyle: 'b3',
            })}
          >
            복잡할까 걱정할 필요는 없어요
            <br />
            내림이 이끄는대로 천천히 따라오세요
          </div>
          <Spacing size={39} />
          <ArrowDownIcon />
          <Spacing size={39} />
          <div
            className={css({
              color: 'base.white',
              whiteSpace: 'pre-line',
              textAlign: 'center',
              textStyle: 'b3',
            })}
          >
            어느새 당신만의 멋진 커피 한잔이
            <br />
            완성되어있을거에요
          </div>
          <Spacing size={100} />
        </div>
        <BottomCta />
      </Suspense>
    </ClientLoggingScreen>
  );
}
