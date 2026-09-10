/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#4F46E5',
        deep: '#312E81',
        bright: '#6366F1',
        soft: '#EEF2FF',
        network: '#2563EB',
        softBlue: '#EFF6FF',
        growth: '#0F766E',
        canvas: '#F7F9FC',
        ink: '#0B1220',
        muted: '#526071',
        quiet: '#7A8797',
        line: '#DCE3EC',
      },
      fontFamily: {
        display: ['Poppins', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 14px 40px rgba(15, 23, 42, .07)',
        lift: '0 24px 70px rgba(49, 46, 129, .13)',
      },
      borderRadius: {
        xl2: '20px',
      },
      maxWidth: {
        shell: '1240px',
      },
    },
  },
  plugins: [],
};
