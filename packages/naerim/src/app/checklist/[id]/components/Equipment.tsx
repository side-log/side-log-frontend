'use client';

import { equipments } from '@/constants/equipment';
import { commaizeNumber } from '@/utils/commaizeNumber';
import Link from 'next/link';
import useReferrer from '@yeaaaah/shared/src/hooks/useReferrer';
import { css } from '../../../../../styled-system/css';
import Spacing from '@/components/Spacing';
import Text from '@/components/Text';

export function Equipment({ id }: { id: string }) {
  const referrer = useReferrer();
  const equipment = equipments.find(equipment => equipment.id === id);

  if (equipment == null) {
    return null;
  }

  return (
    <Link
      href={`/equipment/${id}?referrer=${referrer}`}
      className={css({
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <img
        src={equipment.image}
        alt={equipment.name}
        className={css({ width: '132px', height: '132px', borderRadius: '8px' })}
      />
      <Spacing size={8} />
      <Text typography={'b4'} color={'content.strong'}>
        {equipment.name}
      </Text>
      <Spacing size={4} />
      <Text typography={'b1'} color={'content.strong'}>
        {commaizeNumber(equipment.price)}원
      </Text>
    </Link>
  );
}
