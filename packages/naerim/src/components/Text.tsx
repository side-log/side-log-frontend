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
    lineHeight: '18.2px !important',
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
    <div
      className={cx(
        css({
          color,
          whiteSpace: 'nowrap',
        }),
        text({ typography }),
        className
      )}
    >
      {children}
    </div>
  );
}
