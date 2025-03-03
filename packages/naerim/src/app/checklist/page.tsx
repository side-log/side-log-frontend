import Header from '@/components/Header';
import Spacing from '@/components/Spacing';
import Text from '@/components/Text';
import { css } from '../../../styled-system/css';
import { gildaFont } from '../layout';
import StepCard from './components/StepCard';

export default function CheckListPage() {
  return (
    <>
      <Header />
      <Spacing size={24} />
      <section className={css({ px: 4 })}>
        <Text
          className={[
            css({
              fontWeight: 400,
              fontSize: '24px',
              lineHeight: '36px',
            }),
            gildaFont.className,
          ].join(' ')}
          color={'base.white'}
        >
          Checklist
        </Text>
        <Spacing size={4} />
        <Text color={'content.subtle'} typography={'b5'}>
          {'체크리스트를 통해'}
          <br />
          {'쉽게 드립커피에 입문해보세요'}
        </Text>
      </section>
      <Spacing size={24} />
      <section className={css({ px: 4 })}>
        <StepCard
          step={{
            id: '1',
            title: '드립커피란 뭘까요?',
            description: '커피를 내리기 전에\n드립커피에 대해 먼저 알아봐요',
            image: 'https://placehold.co/600x400',
          }}
        />
      </section>
    </>
  );
}
