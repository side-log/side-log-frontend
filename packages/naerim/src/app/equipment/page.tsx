import { metadataGenerator } from '@/utils/metadata';
import { Metadata } from 'next';
import { EquipmentClient } from './components/EquipmentClient';

export const metadata: Metadata = metadataGenerator({
  title: '오픈 준비중... | 내림 nearim',
});

export default function EquipmentPage() {
  return <EquipmentClient />;
}
