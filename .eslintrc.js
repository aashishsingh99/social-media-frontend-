module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'prefer-destructuring': 0,
    'no-console': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'no-shadow': 0,
    'import/no-cycle': 0,
    'no-unused-vars': 0,
    'react/jsx-filename-extension': 0,
    'no-undef': 0,
    'import/no-useless-path-segments': 0,
    'object-curly-newline': 0,
    'quote-props': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/button-has-type': 0,
    'jsx-a11y/label-has-associated-control': 0,

  },
};
