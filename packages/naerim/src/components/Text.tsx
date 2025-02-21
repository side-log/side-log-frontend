import { HTMLAttributes, PropsWithChildren } from 'react';
import { SystemStyleObject } from '../../styled-system/types';
import { css, cva, cx } from '../../styled-system/css';

interface TextProps {
  color: SystemStyleObject['color'];
  className?: HTMLAttributes<HTMLDivElement>['className'];
  typography?: Typography;
}

export type Typography = keyof typeof typography;

const typography = {
  b2: {
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '22.5px',
  },
  b3: {
    fontWeight: 400,
    fontSize: '15px',
    lineHeight: '22.5px',
  },
  b4: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '21px',
  },
  b5: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18.2px',
  },
  l2: {
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '18.8px',
  },
  l3: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '17.4px',
  },
  t2: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '25.2px',
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
