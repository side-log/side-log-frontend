import { defineTextStyles } from '@pandacss/dev';

const textStyles = {
  b2: {
    value: {
      fontFamily: 'Pretendard',
      fontWeight: 500,
      fontSize: '15px',
      lineHeight: '22.5px',
      letterSpacing: '0%',
    },
  },
  b3: {
    value: {
      fontFamily: 'Pretendard',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '22.5px',
      letterSpacing: '0%',
    },
  },
} as const;

export const pandaTextStyles = defineTextStyles(textStyles);

export type TextStyles = keyof typeof textStyles;
