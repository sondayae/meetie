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
          'linear-gradient(204deg, #E4E4FF -7.98%, #FFF 50%)',
      },

      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        disabled: 'hsl(var(--disabled))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },

			keyframes: {
				explosion: {
					'0%': {
						top: '100%'
					},
					'33%, 100%': {
						top: '-50%'
					}
				},
				rocketMove: {
					'0%, 100%': {
						transform: 'translate(5%, 15%)'
					},
					'50%': {
						transform: 'translate(-5%, 0%)'
					}
				},
				messageMove: {
					'0%, 100%': {
						transform: 'translateY(0%)',
						'animation-timing-function': 'cubic-bezier(0.8,0,1,1)'
					},
					'50%': {
						transform: 'translateY(-1%)',
						'animation-timing-function': 'cubic-bezier(0,0,0.2,1)'
					}
				},
				wavingHand: {
					'0%, 60%, 100%': {
						transform: 'rotate(0deg)'
					},
					'10%, 30%': {
						transform: 'rotate(14deg)'
					},
					'20%': {
						transform: 'rotate(-8deg)'
					},
					'40%': {
						transform: 'rotate(-4deg)'
					},
					'50%': {
						transform: 'rotate(10deg)'
					},
				}
			},
			animation: {
				rocketMove: 'rocketMove 3.5s linear infinite',
				messageMove: 'messageMove 2s infinite',
				wavingHand: 'wavingHand 2.5s infinite',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	darkMode: ['class', 'class'],
	plugins: [require("tailwindcss-animate")]

};
export default config;
