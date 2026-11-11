import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', 'JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};

export default config;
