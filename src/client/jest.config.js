const { resolve } = require('path');

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  displayName: 'client',
  moduleFileExtensions: ['js', 'json', 'ts', 'vue', 'tsx'],
  rootDir: resolve(__dirname),
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['<rootDir>/**/*.spec.[jt]s(x)?'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
  },
  globals: {
    'vue-jest': {
      babelConfig: true,
    },
  },
};
