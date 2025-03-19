import Header from '@/components/Header';
import Spacing from '@/components/Spacing';
import Text from '@/components/Text';
import { StepCard } from './components/StepCard';
import { steps } from '@/constants/step';
import { Gilda_Display } from 'next/font/google';
import type { Step } from './models/step';
import { css } from '../../../styled-system/css';
import { ClientLoggingScreen } from '@/components/ClientLoggingScreen';

const gildaFont = Gilda_Display({
  weight: '400',
  subsets: ['latin'],
});

export default async function CheckListPage() {
  const stepList: Step[] = steps;

  return (
    <ClientLoggingScreen
      id={100001}
      params={{
        screen_name: 'checklist',
      }}
    >
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
          체크리스트를 통해
          <br />
          쉽게 드립커피에 입문해보세요
        </Text>
      </section>
      <Spacing size={24} />
      <section className={css({ px: 4 })}>
        {stepList.map(step => (
          <StepCard key={step.id} step={step} />
        ))}
      </section>
      <Spacing size={80} />
    </ClientLoggingScreen>
  );
}
