module.exports = {
  purge: {
    content: [
      './src/**/*.vue',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.html',
      './src/**/*.pug',
      './src/**/*.md',
      './docs/**/*.md',
      './blog/**/*.md',
    ],
    options: {
      whitelist: [
        'body',
        'html',
        'img',
        'a',
        'g-image',
        'g-image--lazy',
        'g-image--loaded',
        'active',
      ],
    },
  },
  theme: {
    extend: {
      darkMode: 'class',
      spacing: {
        80: '20rem',
        108: '27rem',
      },
      borderWidth: {
        14: '14px',
      },
      width: {
        '1/7': '17.2857143%',
        '2/7': '25.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
    },
    container: {
      padding: '1rem',
    },
    colors: {
      background: {
        primary: 'var(--bg-background-primary)',
        secondary: 'var(--bg-background-secondary)',
        tertiary: 'var(--bg-background-tertiary)',

        form: 'var(--bg-background-form)',
      },

      copy: {
        primary: 'var(--text-copy-primary)',
        secondary: 'var(--text-copy-hover)',
      },

      'border-color': {
        primary: 'var(--border-border-color-primary)',
      },

      transparent: 'transparent',

      black: '#000',
      white: '#fff',

      secondary: {
        50: '#eeeef7',
        100: '#cbcde7',
        200: '#a8acd6',
        300: '#868bc6',
        400: '#636ab6',
        500: '#4d55a5',
        600: '#41478b',
        700: '#313668',
        800: '#212445',
        900: '#101223',
      },

      primary: {
        50: '#fef7e7',
        100: '#fce6b6',
        200: '#fbdd9d',
        300: '#f9cc6c',
        400: '#f7bb3b',
        500: '#f6b21a',
        600: '#f5ab0a',
        700: '#c48808',
        800: '#936606',
        900: '#624404',
      },

      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
    },
    fontFamily: {
      sans: [
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Ubuntu',
        'Cantarell',
        'Noto Sans',
        'sans-serif',
        'BlinkMacSystemFont',
        'Helvetica Neue',
        'Arial',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
  },
  variants: {
    // Some useful comment
  },
  plugins: [
    // Some useful comment
  ],
}
