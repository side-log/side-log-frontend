import TipIcon from '@/../public/svg/tip.svg';
import QuestionIcon from '@/../public/svg/question.svg';
import { css } from '../../styled-system/css';
import Text from './Text';

export { default as Tip } from '@/../public/svg/tip.svg';
export { default as ArrowDown } from '@/../public/svg/arrow-down.svg';
export { default as Logo } from '@/../public/svg/logo.svg';
export { default as Check } from '@/../public/svg/check.svg';
export { default as Question } from '@/../public/svg/question.svg';
export { default as ErrorIcon } from '@/../public/svg/error.svg';

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
      return (props: React.SVGProps<SVGSVGElement>) => <TipIcon {...props} />;
    case 'question':
      return (props: React.SVGProps<SVGSVGElement>) => <QuestionIcon {...props} />;
    default:
      return null;
  }
}
