'use client';

import PrimaryButton from '@/components/PrimaryButton';
import { useRouter } from 'next/navigation';

import { css } from '../../../../../styled-system/css';

export function BottomCta({ link }: { link: string }) {
  const router = useRouter();

  const handleCtaClick = () => {
    router.push(link);
  };

  return (
    <div className={css({ padding: '0 20px 40px', backgroundColor: '#000000' })}>
      <PrimaryButton onClick={handleCtaClick}>장비 구매하기</PrimaryButton>
    </div>
  );
}
