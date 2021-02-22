const { resolve } = require('path');

module.exports = {
  displayName: 'server',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: resolve(__dirname),
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  verbose: true,
};
