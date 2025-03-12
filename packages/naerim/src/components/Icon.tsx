import Tip from '@/../public/svg/tip.svg';
import ArrowDown from '@/../public/svg/arrow-down.svg';
import Logo from '@/../public/svg/logo.svg';
import Check from '@/../public/svg/check.svg';
import Question from '@/../public/svg/question.svg';
import Error from '@/../public/svg/error.svg';
import { css } from '../../styled-system/css';
import Text from './Text';

export const Icon: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = { Tip, ArrowDown, Logo, Check, Error };

function NumberIcon({ number }: { number: number }) {
  return (
    <div
      className={css({
        width: '22px',
        height: '22px',
        paddingTop: '2px',
        borderRadius: 'full',
        backgroundColor: '#7A58A6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <Text color={'content.strong'} typography={'l3'}>
        {number}
      </Text>
    </div>
  );
}

export function getIcon(name: string) {
  if (!isNaN(Number(name))) {
    const IconComponent = () => <NumberIcon number={Number(name)} />;
    IconComponent.displayName = `NumberIcon_${name}`;
    return IconComponent;
  }

  switch (name) {
    case 'tip':
      return Tip;
    case 'question':
      return Question;
    default:
      return null;
  }
}
