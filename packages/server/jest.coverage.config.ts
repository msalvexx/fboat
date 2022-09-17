import defaultConfig from './jest.config'

export default {
  ...defaultConfig,
  testMatch: [
    '**/*.spec.ts',
    '**/*.test.ts'
  ],
  testTimeout: 240_000
}
