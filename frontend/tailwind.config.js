const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      screens: {
        'lost': '850px'
      },
      borderRadius: {
        'xl': '1rem',
        'nlg': '8px'
      },
      spacing: {
        '124': '30rem',
        '136': '40rem',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary': '#5850EC',
        'primary-dark': '#5046DB',
        'primary-light': '#A0A0FA',
        'primary-lighter': '#efeefe',
        'secondary': '#6B7280',
        'secondary-dark': '#374151',
        'secondary-darker': '#161E2E',
        'secondary-light': '#BDBDBD',
        'secondary-lighter': '#DEDEDE',
        'secondary-lightest': '#EBEBEB',
        'review-background': '#f9fafb',
      },
      transitionProperty: {
        'width': 'width',
      }
    },
  },
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ]
}
