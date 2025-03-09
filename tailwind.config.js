/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#00C950',
        secondary: '#1E2939',
        warning: '#FFDF20',
        info: '#A2F4FD',
        destructive: '#FB2C36',
        light: {
          100: '#FAE8FF',
          200: '#F6CFFF',
          300: '#F3A8FF',
        },
        dark: {
          100: '#8A0194',
          200: '#721378',
          300: '#0F0D23',
        },
      },
    },
  },
  plugins: [],
};
