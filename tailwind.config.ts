import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-custom':
          'linear-gradient(191deg, #E4E4FF -7.98%, #FFF 44.59%)',
      },
      colors: {
        'main-purple': '#6224FD',
        'sub-purple': '#8655FF',
        'light-purple': '#F5F1FF',
        'gray-purple': '#82829B',
        'dark-gray': '#444444',
        disabled: '#D0D6E0',
        'middle-gray': '#DDDDDD',
        'light-gray': '#F5F5F5',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      keyframes: {
        explosion: {
          '0%': { top: '100%' },
          '33%, 100%': { top: '-50%' },
        },
        rocketMove: {
          '0%, 100%': { transform: 'translate(5%, 15%)' },
          '50%': { transform: 'translate(-5%, 0%)' },
        },
        messageMove: {
          '0%, 100%': {
            transform: 'translateY(0%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'translateY(-1%)',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      animation: {
        rocketMove: 'rocketMove 3.5s linear infinite',
        messageMove: 'messageMove 2s infinite',
      },
    },
  },
  darkMode: 'class',
};
export default config;
