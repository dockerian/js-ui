const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e'
  ],
  testURL: 'http://localhost',
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: [
    '<rootDir>/tests/unit/jestMockument',
    '<rootDir>/tests/unit/setup'
  ],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!tests/**/*.{js,vue}',
    '!**/node_modules/**'
  ]
}
