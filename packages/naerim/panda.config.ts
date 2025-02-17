import { defineConfig } from '@pandacss/dev';
import { pandaTextStyles } from './panda.text';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          base: {
            white: {
              value: '#ffffff',
            },
            black: {
              value: '#000000',
            },
          },
          grey: {
            50: {
              value: '#F2F2F2',
            },
            100: {
              value: '#EBEBEB',
            },
            200: {
              value: '#D1D1D1',
            },
            300: {
              value: '#B8B8B8',
            },
            400: {
              value: '#9E9E9E',
            },
            500: {
              value: '#858585',
            },
            600: {
              value: '#6B6B6B',
            },
            700: {
              value: '#525252',
            },
            800: {
              value: '#2E2E2E',
            },
            900: {
              value: '#1A1A1A',
            },
            950: {
              value: '#0F0F0F',
            },
          },
          orange: {
            50: {
              value: '#FCF5F2',
            },
            100: {
              value: '#FBEFEA',
            },
            200: {
              value: '#F4CEBE',
            },
            300: {
              value: '#EFAC8F',
            },
            400: {
              value: '#ED895E',
            },
            500: {
              value: '#FF4E02',
            },
            600: {
              value: '#C9501D',
            },
            700: {
              value: '#A13D12',
            },
            800: {
              value: '#643C2B',
            },
            900: {
              value: '#41261B',
            },
          },
        },
      },
      semanticTokens: {
        colors: {
          primary: {
            subtle: {
              value: '{colors.orange.400}',
            },
            normal: {
              value: '{colors.orange.500}',
            },
            strong: {
              value: '{colors.orange.900}',
            },
          },
          background: {
            subtle: {
              value: '{colors.grey.800}',
            },
            normal: {
              value: '{colors.grey.900}',
            },
            strong: {
              value: '{colors.grey.950}',
            },
          },
          content: {
            subtle: {
              value: '{colors.grey.400}',
            },
            normal: {
              value: '{colors.grey.200}',
            },
            strong: {
              value: '{colors.base.white}',
            },
          },
        },
      },
      textStyles: pandaTextStyles,
    },
  },

  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',
});
