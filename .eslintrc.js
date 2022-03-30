module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'plugin:promise/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:array-func/recommended',
  ],
  plugins: [
    'react',
    'react-native',
    'simple-import-sort',
    'promise',
    'unused-imports',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    'react-native/no-inline-styles': 0,
    'react/jsx-filename-extension': ['error', {extensions: ['.tsx']}],
    '@typescript-eslint/consistent-type-imports': 2,
    'prefer-destructuring': 2,
    '@typescript-eslint/ban-ts-comment': 'off',

    'object-shorthand': ['error', 'always'],

    'react/prop-types': 0,
    'react/no-unescaped-entities': 0,

    'react-native/no-unused-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': [0, {skip: ['Section', 'Button']}],
    'react-native/no-single-element-style-arrays': 2,

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
