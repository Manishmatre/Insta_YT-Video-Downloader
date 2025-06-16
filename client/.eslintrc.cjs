module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/prop-types': 'off',
    // Add more rules as needed
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist/'],
  overrides: [
    {
      files: ['*.cjs', '*.js'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['tailwind.config.js', 'postcss.config.js'],
      env: {
        node: true,
      },
    },
  ],
}; 