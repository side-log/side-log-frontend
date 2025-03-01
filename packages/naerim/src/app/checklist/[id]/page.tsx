import Header from '@/components/Header';
import { getChecklistArticle } from '@/remotes/notion/getPage';
import NotionComponent from './components/NotionComponent';

interface ChecklistDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ order: string }>;
}

export default async function ChecklistDetailPage({ params, searchParams }: ChecklistDetailPageProps) {
  const { id: step } = await params;
  const { order } = await searchParams;

  const { data } = await getChecklistArticle(step, order);

  return (
    <>
      <Header />
      <NotionComponent data={data} />
    </>
  );
}
