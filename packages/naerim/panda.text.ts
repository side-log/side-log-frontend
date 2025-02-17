import { defineTextStyles } from '@pandacss/dev';

const textStyles = {
  b2: {
    value: {
      fontFamily: 'Pretendard',
      fontWeight: 500,
      fontSize: '15px',
      lineHeight: '22.5px',
    },
  },
  b3: {
    value: {
      fontFamily: 'Pretendard',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '22.5px',
    },
  },
  b4: {
    value: {
      fontFamily: 'Pretendard',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '21px',
    },
  },
} as const;

export const pandaTextStyles = defineTextStyles(textStyles);

export type TextStyles = keyof typeof textStyles;
