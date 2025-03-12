import { HTMLAttributes, PropsWithChildren } from 'react';
import { SystemStyleObject } from '../../styled-system/types';
import { css, cva, cx } from '../../styled-system/css';

interface TextProps {
  color: SystemStyleObject['color'];
  className?: HTMLAttributes<HTMLDivElement>['className'];
  typography?: Typography;
}

export type Typography = keyof typeof typography;

export const typography = {
  b1: {
    fontWeight: '600 !important',
    fontSize: '15px !important',
    lineHeight: '22.5px !important',
  },
  b2: {
    fontWeight: '500 !important',
    fontSize: '15px !important',
    lineHeight: '22.5px !important',
  },
  b3: {
    fontWeight: '400 !important',
    fontSize: '15px !important',
    lineHeight: '22.5px !important',
  },
  b4: {
    fontWeight: '600 !important',
    fontSize: '14px !important',
    lineHeight: '21px !important',
  },
  b5: {
    fontWeight: '400 !important',
    fontSize: '14px !important',
    lineHeight: '21px !important',
  },
  l1: {
    fontWeight: '500 !important',
    fontSize: '13px !important',
    lineHeight: '18.85px !important',
  },
  l2: {
    fontWeight: '400 !important',
    fontSize: '13px !important',
    lineHeight: '18.8px !important',
  },
  l3: {
    fontWeight: '500 !important',
    fontSize: '12px !important',
    lineHeight: '17.4px !important',
  },
  t1: {
    fontWeight: '600 !important',
    fontSize: '20px !important',
    lineHeight: '28px !important',
  },
  t2: {
    fontWeight: '600 !important',
    fontSize: '18px !important',
    lineHeight: '25.2px !important',
  },
  t3: {
    fontWeight: '600 !important',
    fontSize: '16px !important',
    lineHeight: '22.4px !important',
  },
} as const;

export const text = cva({
  base: {
    fontFamily: 'pretendard',
  },
  variants: {
    typography,
  },
});

export default function Text({ color, typography, className, children }: PropsWithChildren<TextProps>) {
  return (
    <span
      className={cx(
        css({
          color,
          whiteSpace: 'break-spaces',
        }),
        text({ typography }),
        className
      )}
    >
      {children}
    </span>
  );
}
