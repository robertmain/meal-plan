module.exports = {
  root: false,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/strongly-recommended',
  ],
  rules: {
    semi: [2, 'always'],
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
