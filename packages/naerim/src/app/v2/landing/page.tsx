'use client';

import PrimaryButton from '@/components/PrimaryButton';
import { BottomFixedArea } from '@/components/FixedBottomArea';
import { Logo } from '@/components/Icon';
import Spacing from '@/components/Spacing';
import { useState, useEffect } from 'react';
import { css } from '../../../../styled-system/css';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';

const messages = [
  '천천히 내리고, 깊이 있게 즐기세요\n내림이 당신의 첫 드립커피와 함께할게요',
  '복잡할까 걱정할 필요는 없어요\n내림이 이끄는대로 천천히 따라오세요',
  '어느새 당신만의 멋진 커피 한잔이\n완성되어있을거에요',
];

export default function LandingPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 2000); // 3초마다 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className={css({
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        })}
      >
        <Logo width={146} />
        <Spacing size={240} />

        <AnimatePresence>
          <motion.div
            key={index}
            className={css({
              color: 'white',
              whiteSpace: 'pre-line',
              textAlign: 'center',
              position: 'absolute',
              width: '100%',
              marginBottom: '40px',
            })}
            initial={{ opacity: 0, y: '30%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-130%' }}
            transition={{
              opacity: { duration: 0.3, ease: 'easeOut' },
              y: { type: 'spring', stiffness: 70, damping: 20, mass: 1 },
              exit: { type: 'spring', stiffness: 480, damping: 50, mass: 1 },
              delay: 0.1,
            }}
          >
            {messages[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomFixedArea>
        <div className={css({ padding: '0 20px 40px', backgroundColor: '#000000' })}>
          <PrimaryButton>함께 천천히 커피 내리기</PrimaryButton>
        </div>
      </BottomFixedArea>
    </>
  );
}
