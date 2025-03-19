import Spacing from '@/components/Spacing';
import Label from '@/components/Label';
import Text from '@/components/Text';
import { Chip } from '@/components/Chip';
import { getChecklistTable } from '@/remotes/notion/checklist';
import { fetchPage } from '@/remotes/notion';
import { NotionRenderer } from '@/components/NotionRenderer';
import { BottomFixedArea } from '@/components/FixedBottomArea';
import Header from '@/components/Header';
import { css } from '../../../../styled-system/css';
import { ClientBottomButton } from './components/BottomCta';
import { Equipments } from './components/Equipments';
import { ClientLoggingScreen } from '@/components/ClientLoggingScreen';

interface ChecklistDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ order?: string }>;
}

export default async function ChecklistDetailPage({ params, searchParams }: ChecklistDetailPageProps) {
  const { id: step } = await params;
  const { order = '1' } = await searchParams;

  const table = await getChecklistTable();
  const article = table.find(item => item?.step === step && item?.order?.toString() === order);

  const totalStep = table.reduce((max, item) => {
    const step = Number(item?.step ?? 0);
    return step > max ? step : max;
  }, 0);
  const totalOrder = table.filter(item => item?.step === step).length;

  const isLastOrder = totalOrder === parseInt(order);
  const isLastStep = totalStep === parseInt(step);

  if (article == null) {
    return <div>존재하지 않는 체크리스트입니다.</div>;
  }

  const page = await fetchPage(article.id);

  return (
    <ClientLoggingScreen
      id={100002}
      params={{
        screen_name: 'checklist_detail',
        step: article.step,
        order: article.order,
      }}
    >
      <Header />
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          padding: '18px 16px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          })}
        >
          <Label typography={'l3'}>Step {article.step}</Label>
          <Text typography={'b4'} color={'content.normal'}>
            {article.Name}
          </Text>
        </div>

        <Chip label={`${Number(article.order)}/${totalOrder}`} color={'content.normal'} typography={'l3'} />
      </div>
      <Spacing size={16} />
      <div
        className={css({
          padding: '0 16px',
        })}
      >
        <NotionRenderer blockMap={page} />
        {article.equipment != null && <Equipments equipments={article.equipment} />}
        <Spacing size={120} />
      </div>
      <BottomFixedArea>
        <ClientBottomButton
          isLastOrder={isLastOrder}
          isLastStep={isLastStep}
          step={Number(article.step)}
          order={Number(order)}
        />
      </BottomFixedArea>
    </ClientLoggingScreen>
  );
}
