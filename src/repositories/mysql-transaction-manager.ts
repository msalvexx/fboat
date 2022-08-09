import { DataSource } from 'typeorm'

export namespace MySQLTransactionManager {
  export type Config = {
    connectionString?: string | undefined
    connectTimeout?: number | number
    charset?: string | undefined
    host?: string | undefined
    port?: number
    database?: string | undefined
    username?: string | undefined
    password?: string | undefined
  }
}

export class MySQLTransactionManager {
  private static instance?: MySQLTransactionManager
  private connection: DataSource
  private readonly defaultConfig: MySQLTransactionManager.Config = {
    host: 'localhost',
    port: 3306,
    username: 'dev',
    password: '1234',
    database: 'test'
  }

  private constructor () {}

  static getInstance (): MySQLTransactionManager {
    if (this.instance === undefined) {
      this.instance = new MySQLTransactionManager()
    }
    return this.instance
  }

  async connect (config: MySQLTransactionManager.Config = this.defaultConfig): Promise<void> {
    const datasource = new DataSource({
      type: 'mysql',
      url: config.connectionString,
      connectTimeout: config.connectTimeout,
      charset: config.charset,
      host: config.host,
      port: config.port,
      database: config.database,
      username: config.username,
      password: config.password
    })
    if (!await this.isConnected()) this.connection = await datasource.initialize()
  }

  async isConnected (): Promise<boolean> {
    return this.connection?.isInitialized
  }
}
