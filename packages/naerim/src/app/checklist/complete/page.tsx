import { BottomFixedArea } from '@/components/FixedBottomArea';
import Header from '@/components/Header';
import { css } from '../../../../styled-system/css';
import Text from '@/components/Text';
import { Check } from '@/components/Icon';
import Spacing from '@/components/Spacing';
import { BottomCta } from './components/BottomCta';

interface ChecklistDetailPageProps {
  searchParams: Promise<{ step: string }>;
}

export default async function ChecklistDetailPage({ searchParams }: ChecklistDetailPageProps) {
  const { step } = await searchParams;

  return (
    <>
      <Header />
      <div
        className={css({
          flex: 1,
          minHeight: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <Check />
        <Spacing size={52} />
        <Text typography={'t1'} color={'base.white'}>
          step {step}을 완료했어요
        </Text>
      </div>
      <BottomFixedArea>
        <BottomCta />
      </BottomFixedArea>
    </>
  );
}
