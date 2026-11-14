/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      describe: ['Montserrat', 'Hind', 'Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#975AFF',
        secondary: '#2F2F2F',
        'primary-bg': '#24252a',
        'secondary-bg': '#232324',
        'border-color': '#191919',
        'separate-color': '#383838',
        'status-warning': '#EDE63A',
        'status-error': '#ED3A3A',
        'status-success': '#975AFF',
        describe: '#CDCDCD',
      },
    },
  },
  plugins: [],
};
