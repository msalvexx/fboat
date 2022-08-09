export class MySQLTransactionManager {
  private static instance?: MySQLTransactionManager

  private constructor () {}

  static getInstance (): MySQLTransactionManager {
    if (this.instance === undefined) this.instance = new MySQLTransactionManager()
    return this.instance
  }
}
