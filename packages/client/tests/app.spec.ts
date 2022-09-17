import { hello } from '@/app'

describe('Hello Suite', () => {
  test('Hello ok', () => expect(hello()).toBe('Hello'))
})
