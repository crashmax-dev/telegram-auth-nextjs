module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        telegram: '#54A9EB',
        gray: '#1E1E1E',
        'light-gray': '#3C3C3C'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
