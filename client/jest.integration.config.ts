import defaultConfig from './jest.config'

export default {
  ...defaultConfig,
  testMatch: ['**/*.test.ts'],
  testTimeout: 240_000
}
