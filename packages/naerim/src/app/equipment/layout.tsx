import { metadataGenerator } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = metadataGenerator({
  title: '장비 추천',
  description: '내림이 추천하는 드립커피 장비들을 만나보세요.',
});

export default function EquipmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
