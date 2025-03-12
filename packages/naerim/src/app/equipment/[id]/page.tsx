import { BottomFixedArea } from '@/components/FixedBottomArea';
import Header from '@/components/Header';

interface ChecklistDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChecklistDetailPage({ params }: ChecklistDetailPageProps) {
  const { id } = await params;

  return (
    <>
      <Header />

      <BottomFixedArea></BottomFixedArea>
    </>
  );
}
