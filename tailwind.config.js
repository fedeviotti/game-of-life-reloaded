const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      gridTemplateColumns: {
        // Simple 15 and 30 column grid
        15: 'repeat(15, minmax(min-content, 1fr))',
        20: 'repeat(20, minmax(min-content, 1fr))',
        25: 'repeat(25, minmax(min-content, 1fr))',
        30: 'repeat(30, minmax(min-content, 1fr))',
      },
      gridTemplateRows: {
        // Simple 15 and 30 row grid
        15: 'repeat(15, minmax(min-content, 1fr))',
        20: 'repeat(20, minmax(min-content, 1fr))',
        25: 'repeat(25, minmax(min-content, 1fr))',
        30: 'repeat(30, minmax(min-content, 1fr))',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
