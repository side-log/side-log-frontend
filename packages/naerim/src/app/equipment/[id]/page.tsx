import { BottomFixedArea } from '@/components/FixedBottomArea';
import Header from '@/components/Header';
import { equipments } from '@/constants/equipment';
import { css } from '../../../../styled-system/css';
import Text from '@/components/Text';
import Spacing from '@/components/Spacing';
import { commaizeNumber } from '@/utils/commaizeNumber';
import { getIcon } from '@/components/Icon';
import { BottomCta } from './components/BottomCta';
import { ClientLoggingScreen } from '@/components/ClientLoggingScreen';
import { metadataGenerator } from '@/utils/metadata';
import { Metadata } from 'next';

interface EquipmentDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const equipment = equipments.find(equipment => equipment.id === params.id);

  if (!equipment) {
    return metadataGenerator({
      title: '존재하지 않는 장비',
      description: '요청하신 장비를 찾을 수 없습니다.',
    });
  }

  return metadataGenerator({
    title: `${equipment.name} | 내림 nearim`,
    image: equipment.image,
  });
}

export default async function EquipmentDetailPage({ params }: EquipmentDetailPageProps) {
  const { id } = await params;

  const equipment = equipments.find(equipment => equipment.id === id);

  if (equipment == null) {
    return <div>존재하지 않는 장비입니다.</div>;
  }

  return (
    <ClientLoggingScreen
      id={100004}
      params={{
        screen_name: 'equipment_detail',
        equipment_id: equipment.id,
        equipment_name: equipment.name,
      }}
    >
      <Header />
      <img
        src={equipment.image}
        alt={equipment.name}
        className={css({
          width: '100%',
          aspectRatio: '1.6/1',
          objectFit: 'contain',
          backgroundColor: 'base.white',
        })}
      />
      <div
        className={css({
          padding: '0 16px',
        })}
      >
        <Spacing size={20} />
        <Text typography={'t1'} color={'base.white'}>
          {equipment.name}
        </Text>
        <Spacing size={4} />
        <Text typography={'b3'} color={'content.normal'}>
          {commaizeNumber(equipment.price)}원
        </Text>
        <Spacing size={32} />
        <div
          className={css({
            width: '100%',
            height: '1px',
            backgroundColor: '#FFFFFF33',
          })}
        />
        <Spacing size={32} />
        <Text typography={'t3'} color={'base.white'}>
          특징
        </Text>
        <Spacing size={16} />
        {equipment.features.map((feature, index) => {
          const Number = getIcon((index + 1).toString());
          return (
            <div
              key={feature}
              className={css({
                display: 'flex',
                gap: '10px',
                padding: '14px 16px',
                borderRadius: '12px',
                backgroundColor: 'background.normal',
                marginBottom: '16px',
              })}
            >
              <div>{Number != null && <Number />}</div>
              <Text color={'content.normal'} typography={'b5'} className={css({ whiteSpace: 'pre-wrap' })}>
                {feature}
              </Text>
            </div>
          );
        })}
        <Spacing size={24} />
        <Text typography={'t3'} color={'base.white'}>
          전문가의 한마디
        </Text>
        <Spacing size={16} />
        <div
          className={css({
            display: 'flex',
            overflowX: 'auto',
            gap: '16px',
            paddingBottom: '16px',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          })}
        >
          {equipment.expertComments.map(expertComment => (
            <div
              key={expertComment}
              className={css({
                flex: '0 0 auto',
                padding: '16px',
                backgroundColor: 'background.normal',
                border: '1px solid #FFFFFF1A',
                borderRadius: '8px',
                maxWidth: '192px',
              })}
            >
              <Text typography={'b5'} color={'content.normal'}>
                {expertComment}
              </Text>
            </div>
          ))}
        </div>
      </div>
      <Spacing size={200} />
      <BottomFixedArea>
        <BottomCta link={equipment.link} />
      </BottomFixedArea>
    </ClientLoggingScreen>
  );
}
