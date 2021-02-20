module.exports = {
  root: false,
  env: {
    node: true,
  },
  extends: ['plugin:vue/strongly-recommended'],
  rules: {
    semi: [2, 'always'],
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 2,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        env: {
          mode: 'development',
        },
      },
    },
  },
};
