import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cva, cx } from '../../styled-system/css';
import { SystemStyleObject } from '../../styled-system/types';

const variant: Record<string, SystemStyleObject> = {
  primary: {
    padding: '12.5px 0',
    backgroundColor: 'primary.normal',
    borderRadius: '8px',
  },
  secondary: {
    padding: '12.5px 0',
    backgroundColor: 'base.white',
    borderRadius: '8px',
    // border: '1px solid #ED801D',
  },
  minor: {
    padding: '12.5px 0',
    backgroundColor: 'background.normal',
    borderRadius: '8px',
    border: '1px solid #FFFFFF1A',
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
    <button data-key="logging-click" className={cx(button({ variant: props.variant }))} {...props}>
      {props.children}
    </button>
  );
}
