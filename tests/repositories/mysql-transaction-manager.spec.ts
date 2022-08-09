import { MySQLTransactionManager } from '@/repositories/mysql-transaction-manager'

describe('MySQLTransactionManager', () => {
  test('Should return same instance when getInstance is called', () => {
    const sut = MySQLTransactionManager.getInstance()
    const sut2 = MySQLTransactionManager.getInstance()
    expect(sut).toBe(sut2)
  })
})
