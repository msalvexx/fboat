import { hello } from '@/index'

describe('Hello Suite', () => {
  test('Hello ok', () => expect(hello()).toBe('Hello'))
})
