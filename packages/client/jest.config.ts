export default {
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.spec.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/client(.*)': '<rootDir>/src$1',
    '@/tests(.*)': '<rootDir>/tests$1',
    '@/core(.*)': '<rootDir>/../core/dist/src$1',
    '\\.scss$': 'identity-obj-proxy'
  }
}
