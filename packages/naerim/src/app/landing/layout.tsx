import { metadataGenerator } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = metadataGenerator({
  title: '첫 드립 한 잔, 내 손으로 | 내림 nearim',
});

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
