import Header from '@/components/Header';
import Spacing from '@/components/Spacing';
import Text from '@/components/Text';
import { css } from '../../../styled-system/css';
import { gildaFont } from '../layout';

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
    </>
  );
}
