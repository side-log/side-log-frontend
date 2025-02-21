import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cva, cx } from '../../styled-system/css';
import { SystemStyleObject } from '../../styled-system/types';
import Text from './Text';

const variant: Record<string, SystemStyleObject> = {
  primary: {},
  secondary: {
    p: 2,
    bg: 'base.white',
    borderRadius: 8,
  },
} as const;

export const button = cva({
  base: {
    width: '100%',
  },
  variants: {
    variant,
  },
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: keyof typeof variant;
}

export default function Button(props: PropsWithChildren<ButtonProps>) {
  return (
    <button className={cx(button({ variant: props.variant }))} {...props}>
      <Text color={''}>{props.children}</Text>
    </button>
  );
}
