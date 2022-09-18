import { hello } from '@/client/app'

describe('Hello Suite', () => {
  test('Hello ok', () => expect(hello()).toBe('Hello'))
})
