import Text from '@/components/Text';
import { css } from '../../../../../styled-system/css';
import Spacing from '@/components/Spacing';
import { Equipment } from './Equipment';

export function Equipments({ equipments }: { equipments: string[] }) {
  return (
    <div className={css({})}>
      <Text typography={'b1'} color={'content.strong'}>
        장비 살펴보기
      </Text>
      <Spacing size={16} />
      {equipments.map(equipment => (
        <Equipment key={equipment} id={equipment} />
      ))}
    </div>
  );
}
