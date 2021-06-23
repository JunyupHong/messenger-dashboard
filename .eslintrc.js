module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 100,
        endOfLine: 'auto',
        arrowParens: 'avoid',
      },
    ],
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier', '@vue/typescript'],
};
