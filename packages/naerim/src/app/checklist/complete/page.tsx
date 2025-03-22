import { BottomFixedArea } from '@/components/FixedBottomArea';
import Header from '@/components/Header';
import { css } from '../../../../styled-system/css';
import Text from '@/components/Text';
import { Check } from '@/components/Icon';
import Spacing from '@/components/Spacing';
import { BottomCta } from './components/BottomCta';
import { ClientLoggingScreen } from '@/components/ClientLoggingScreen';
import { metadataGenerator } from '@/utils/metadata';
import { Metadata } from 'next';
import { getChecklistTable } from '@/remotes/notion/checklist';

interface ChecklistDetailPageProps {
  searchParams: Promise<{ step: string; isLastStep: string }>;
}

export async function generateMetadata({ searchParams }: ChecklistDetailPageProps): Promise<Metadata> {
  const { step } = await searchParams;
  const order = '1';

  const table = await getChecklistTable();
  const article = table.find(item => item?.step === step && item?.order?.toString() === order);

  if (!article) {
    return metadataGenerator({
      title: '존재하지 않는 체크리스트',
      description: '요청하신 체크리스트를 찾을 수 없습니다.',
    });
  }

  return metadataGenerator({
    title: `${article.Name} | 내림 nearim`,
  });
}

export default async function ChecklistDetailPage({ searchParams }: ChecklistDetailPageProps) {
  const { step, isLastStep } = await searchParams;

  return (
    <ClientLoggingScreen
      id={100005}
      params={{
        screen_name: 'checklist_complete',
        step,
        isLastStep,
      }}
    >
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
        <BottomCta step={Number(step)} isLastStep={isLastStep === 'true'} />
      </BottomFixedArea>
    </ClientLoggingScreen>
  );
}
