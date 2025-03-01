import Header from '@/components/Header';
import { getChecklistArticle } from '@/remotes/notion/getPage';
import NotionComponent from './components/NotionComponent';
import { css } from '../../../../styled-system/css';
import Spacing from '@/components/Spacing';
import Label from '@/components/Label';
import Text from '@/components/Text';
import { Chip } from '@/components/Chip';

interface ChecklistDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ order: string }>;
}

export default async function ChecklistDetailPage({ params, searchParams }: ChecklistDetailPageProps) {
  const { id: step } = await params;
  const { order } = await searchParams;

  const { data, properties } = await getChecklistArticle(step, order);

  console.log('🚀 ~ ChecklistDetailPage ~ properties:', properties);

  return (
    <>
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
          <Label typography={'l3'}>Step {properties.step}</Label>
          <Text typography={'b4'} color={'content.normal'}>
            {properties.name}
          </Text>
        </div>

        <Chip label={`${properties.step}/${properties.total}`} color={'content.normal'} typography={'l3'} />
      </div>
      <Spacing size={16} />
      <NotionComponent data={data} />
    </>
  );
}
