module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '**/__tests__/*.spec.(js|jsx|ts|tsx)',
  ],

}
