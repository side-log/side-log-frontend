import Tip from '@/../public/svg/tip.svg';
import ArrowDown from '@/../public/svg/arrow-down.svg';
import Logo from '@/../public/svg/logo.svg';
import Check from '@/../public/svg/check.svg';
export function getIcon(name: string) {
  switch (name) {
    case 'tip':
      return Tip;
    default:
      return null;
  }
}

export { Tip, ArrowDown, Logo, Check };
