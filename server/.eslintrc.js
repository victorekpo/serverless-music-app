module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  // Ignore files within the node_modules directory
  ignorePatterns: ['node_modules/**', 'cdk.out/**'],
  rules: {
    'no-duplicate-case': 'error',
    'no-empty': 'error',
    'no-extra-semi': 'error',
    'no-func-assign': 'error',
    'no-irregular-whitespace': 'error',
    'no-unreachable': 'error',
    curly: 'error',
    'dot-notation': 'error',
    eqeqeq: 'error',
    'no-empty-function': 'error',
    'no-multi-spaces': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-trailing-spaces': 'error',
    'default-case': 'error',
    'no-fallthrough': 'error',
    'no-unused-vars': 'error',
    'no-use-before-define': 'error',
    'no-redeclare': 'error',
    'brace-style': 'error',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    radix: 'off',
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-redeclare': 'error'
  }
};