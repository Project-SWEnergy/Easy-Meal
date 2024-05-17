/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'lt-purple': '#8e1dbe',
        'dk-purple': '#711497',
        'label': "#404040",
        'placeholder': '#909090',
        'error': '#ff2040',
        'form': '#edf2f7',
        'light-color': '#F3E8F8'
      },
    },
  },
  plugins: [],
}

