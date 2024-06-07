module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^~auth/(.*)': '<rootDir>/src/modules/auth/$1',
    '^~shared/(.*)': '<rootDir>/src/modules/shared/$1',
    '^~models/(.*)': '<rootDir>/src/modules/models/$1',
    '^~base/(.*)': '<rootDir>/src/base/$1',
    '^~common/(.*)': '<rootDir>/src/common/$1',
    '^~test/(.*)': '<rootDir>/test/$1',
    '^~/(.*)': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: {
          sourceMap: false
        }
      }
    ]
  },
  collectCoverageFrom: ['src/**', '!**/migrations/**'],
  //   coverageThreshold: {
  //     global: {
  //       branches: 95,
  //       functions: 95,
  //       lines: 95,
  //       statements: 95
  //     }
  //   },
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  testRegex: '.*\\.spec\\.ts$',
  coverageDirectory: './coverage',
  // Needed for memory leak issue with NodeJS 16. See https://github.com/facebook/jest/issues/11956
  workerIdleMemoryLimit: '50M'
};
